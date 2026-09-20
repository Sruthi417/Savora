import express from "express";

import { sendMessage } from "../controllers/chatController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import chatRateLimiter from "../middleware/rateLimiter.js";

const chatRouter = express.Router();

// User must be logged in
chatRouter.use(authMiddleware);

// Rate limit chat requests
chatRouter.post("/", chatRateLimiter, sendMessage);

export default chatRouter;