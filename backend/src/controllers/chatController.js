import Conversation from "../models/Conversation.js";
import generateAIResponse from "../services/aiService.js";
import {generateConversationTitle} from "../services/titleService.js";
import getLocationFromCoordinates from "../services/locationService.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message, latitude, longitude } = req.body;

    // Basic validation
    if (!conversationId || !message?.trim()) {
      return res.status(400).json({
        message: "Conversation ID and message are required.",
      });
    }

    // Find conversation belonging to logged-in user
    const conversation = await Conversation.findOne({
      _id: conversationId,
      userId: req.user.userId,
    });

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found.",
      });
    }

    // Add user's message
    conversation.messages.push({
      role: "user",
      content: message.trim(),
    });

    /*
     * Get location only when coordinates are available.
     */
    let location = null;

    if (latitude && longitude) {
      location = await getLocationFromCoordinates(
        latitude,
        longitude
      );
    }

    /*
     * Generate title only for the first user message.
     */
    if (conversation.messages.length === 1) {
      conversation.title = await generateConversationTitle(
        message.trim()
      );
    }

    /*
     * Send conversation history + location to Gemini.
     */
    const aiResponse = await generateAIResponse(
      conversation.messages,
      location
    );

    // Save AI response
    conversation.messages.push({
      role: "assistant",
      content: aiResponse,
    });

    await conversation.save();

    res.status(200).json({
      message: aiResponse,
      conversation: {
        id: conversation._id,
        title: conversation.title,
      },
    });
  } catch (error) {
    next(error);
  }
};