import rateLimit from "express-rate-limit";

const chatRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes

  max: 20, // 20 requests per user in 10 minutes

  keyGenerator: (req) => {
    // Use logged-in user's MongoDB ID
    return req.user.userId.toString();
  },

  message: {
    message:
      "You've reached Savora's chat limit for now. Please wait a few minutes before sending another message.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

export default chatRateLimiter;