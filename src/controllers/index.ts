import { chatService } from "../services";
import { AuthController } from "./auth/auth.controller";
import { ChatController } from "./chat/chat.controller";

export const authController = new AuthController();
export const chatController = new ChatController(chatService);