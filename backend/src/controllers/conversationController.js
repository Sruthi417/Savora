import Conversation from "../models/Conversation.js";

// ==========================
// Create New Conversation
// ==========================

export const createConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.create({
      userId: req.user.userId,
      title: "New Chat",
      messages: [],
    });

    res.status(201).json({
      conversation,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================
// Get Recent Conversations
// ==========================

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      userId: req.user.userId,
    })
      .select("_id title createdAt updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      conversations,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================
// Get One Conversation
// ==========================

export const getConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOne({
      _id: id,
      userId: req.user.userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      conversation,
    });
  } catch (error) {
    next(error);
  }
};


// ==========================
// Delete Conversation
// ==========================

export const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    res.status(200).json({
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};