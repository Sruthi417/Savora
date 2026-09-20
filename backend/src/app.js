import express from "express";
import cors from "cors";
import { CLIENT_URL } from "./config/env.js";
import router from "./routes.js";
import cookieParser from "cookie-parser";


const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const allowedOrigins = [
  CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:3001",

].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);



app.use("/api", router);


app.get("/", (req, res) => {
  res.send("Savora Backend Running");
});

export default app;
