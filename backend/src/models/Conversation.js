import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    // User who owns this conversation
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Title shown in the sidebar
    title: {
      type: String,
      default: "New Chat",
      trim: true,
    },

    // Messages inside the conversation
    messages: [messageSchema],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;