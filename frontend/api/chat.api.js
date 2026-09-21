import api from "./axios";

// Send message + user's location to backend
export const sendMessage = (data) => {
  return api.post("/chat", data);
};