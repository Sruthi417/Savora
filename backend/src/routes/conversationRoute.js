import express from "express";

import {
  createConversation,
  getConversations,
  getConversation,
  deleteConversation,
} from "../controllers/conversationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const conversationRouter = express.Router();

// Protect all conversation routes
conversationRouter.use(authMiddleware);

// Create a new chat
conversationRouter.post("/", createConversation);

// Get recent chats for sidebar
conversationRouter.get("/", getConversations);

// Open a previous conversation
conversationRouter.get("/:id", getConversation);

// Delete a conversation
conversationRouter.delete("/:id", deleteConversation);

export default conversationRouter;