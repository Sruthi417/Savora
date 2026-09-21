import api from "./axios";

// Get logged-in user's profile
export const getUserProfile = () => {
  return api.get("/user/me");
};

// Logout user
export const logoutUser = () => {
  return api.post("/auth/logout");
};