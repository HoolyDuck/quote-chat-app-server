import { Router } from "express";
import { chatRouter } from "./chat/chat.routes";
import { authRouter } from "./auth/auth.routes";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/chat", chatRouter);

export { appRouter };
