import { ChatService } from "./chat/chat.service";
import { UserService } from "./user/user.service";

export const userService = new UserService();
export const chatService = new ChatService();
