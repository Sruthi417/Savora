import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  CLIENT_URL,
} from "../config/env.js";

// Frontend and backend live on different domains (Vercel / Render),
// so this cookie is always cross-site — browsers only send
// cross-site cookies when they're `Secure; SameSite=None`. This is
// deliberately NOT gated on NODE_ENV: Render doesn't set that env
// var automatically, so it was silently falling back to
// `secure:false; sameSite:"lax"`, which browsers never send on a
// cross-site fetch — every post-login `/user/me` call 401'd, and
// the app treated that as "not logged in" and looped back into
// Google's login flow again. `Secure` cookies still work fine on
// `http://localhost` in every modern browser (localhost is treated
// as a trustworthy origin), so this is safe in local dev too.
const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};


// Google OAuth client
const googleClient = new OAuth2Client({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: GOOGLE_CALLBACK_URL,
});


// ==========================
// Start Google Sign In
// ==========================

export const googleLogin = (req, res) => {
  const { state } = req.query;

  const authorizationUrl = googleClient.generateAuthUrl({
    scope: ["openid", "email", "profile"],
    // Round-tripped back to us in the callback so we can send the
    // user back to whatever they were doing before signing in
    // (e.g. a prompt typed on the homepage).
    ...(state ? { state } : {}),
  });

  res.redirect(authorizationUrl);
};


// ==========================
// Google Callback
// ==========================

export const googleCallback = async (req, res, next) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({
        message: "Google authorization code is missing",
      });
    }

    // Exchange Google's code for tokens
    const { tokens } = await googleClient.getToken(code);

    // Verify Google's ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: GOOGLE_CLIENT_ID,
    });

    // Get Google user information
    const googleUser = ticket.getPayload();

    const {
      sub: googleId,
      name,
      email,
      picture,
    } = googleUser;


    // Find user in MongoDB
    let user = await User.findOne({ googleId });


    // Create user if first login
    if (!user) {
      user = await User.create({
        googleId,
        name,
        email,
        image: picture || null,
      });
    }


    // Generate Savora JWT
    const token = generateToken(user._id);


    // Store JWT in HttpOnly cookie
    res.cookie("token", token, {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    // Redirect user to planner, restoring any prompt typed
    // pre-login (carried through Google's `state` param).
    const redirectUrl = state
      ? `${CLIENT_URL}/planner?prompt=${encodeURIComponent(state)}`
      : `${CLIENT_URL}/planner`;

    res.redirect(redirectUrl);

  } catch (error) {
    next(error);
  }
};


// ==========================
// Logout
// ==========================

export const logout = (req, res) => {
  res.clearCookie("token", AUTH_COOKIE_OPTIONS);

  res.status(200).json({
    message: "Logged out successfully",
  });
};