import api from "./axios";

// Get all conversations
export const getConversations = () => {
  return api.get("/conversations");
};

// Create a new conversation
export const createConversation = () => {
  return api.post("/conversations");
};

// Get a single conversation
export const getConversation = (conversationId) => {
  return api.get(`/conversations/${conversationId}`);
};

// Delete a conversation
export const deleteConversation = (conversationId) => {
  return api.delete(`/conversations/${conversationId}`);
};