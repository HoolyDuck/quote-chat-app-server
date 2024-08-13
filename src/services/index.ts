import { ChatService } from "./chat/chat.service";
import { MessageService } from "./message/message.service";
import { SocketService } from "./socket/socket.service";
import { UserService } from "./user/user.service";

export const chatService = new ChatService();
export const userService = new UserService(chatService);
export const messageService = new MessageService();
export const socketService = new SocketService(messageService);
