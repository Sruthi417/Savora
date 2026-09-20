import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getUserProfile);

export default userRouter;