import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  NODE_ENV,
  CLIENT_URL,
  db_URI,
  SERVER_URL,
  JWT_SECRET,
  JWT_EXPIRY,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GEMINI_TITLE_API_KEY,
  GEMINI_CHAT_API_KEY,
  GEMINI_API_KEY,

} = process.env;
