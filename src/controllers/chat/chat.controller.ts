import { Request, Response } from "express";
import { ChatService } from "../../services/chat/chat.service";
import { DbUser } from "../../common/types/user/db-user.type";
import { GetChatsParams } from "../../common/types/chat/get-chats-params.type";

class ChatController {
  private chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
  }

  createChat = async (req: Request, res: Response) => {
    const { body, user } = req;
    const chat = await this.chatService.create(body, <DbUser>user);
    res.json(chat);
  };

  getChats = async (req: Request, res: Response) => {
    const user = <DbUser>req.user;
    const params = <GetChatsParams>req.query;
    const chats = await this.chatService.getChats(user, params);
    res.json({ chats });
  };

  getChatById = async (req: Request, res: Response) => {
    const { user } = req;
    const { id } = req.params;
    const chat = await this.chatService.getChatById(id, <DbUser>user);
    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }
    res.json(chat);
  };

  deleteChat = async (req: Request, res: Response) => {
    const { id } = req.params;
    const chat = await this.chatService.deleteChat(id);
    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }
    res.json(chat);
  };

  updateChat = async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    const chat = await this.chatService.updateChat(id, body);
    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }
    res.json(chat);
  };
}

export { ChatController };
