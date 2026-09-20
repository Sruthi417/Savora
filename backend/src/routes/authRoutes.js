import { Router } from "express";

import {
  googleLogin,
  googleCallback,
  logout,
} from "../controllers/authController.js";

const authRouter = Router();

authRouter.get("/google", googleLogin);
authRouter.get("/google/callback", googleCallback);
authRouter.post("/logout", logout);

export default authRouter;