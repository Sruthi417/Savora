import { Router } from "express";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js"
import conversationRouter from "./routes/conversationRoute.js"
import chatRouter from "./routes/chatRoutes.js";

const router = Router();


router.use("/auth", authRouter);
router.use("/user",userRouter);
router.use("/conversations",conversationRouter)
router.use("/chat",chatRouter)

export default router