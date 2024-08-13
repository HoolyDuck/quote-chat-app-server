import { CreateChatDto } from "../../common/types/chat/create-chat.dto";
import { CreateMessageDto } from "../../common/types/message/create-message.dto";
import { DbUser } from "../../common/types/user/db-user.type";
import { Chat } from "../../models/chat/chat.model";
import { Message } from "../../models/message/message.model";

class MessageService {
  async create(
    createMessageDto: CreateMessageDto,
    chatId: string,
    userId?: string
  ) {
    console.log("chatId", chatId);
    const chat = await Chat.findById(chatId);
    if (!chat) {
      throw new Error("Chat not found");
    }

    const message = await Message.create({
      chat: chatId,
      sender: userId,
      ...createMessageDto,
    });

    // push message to chat
    chat.messages.push(message._id);
    await chat.save();

    return message;
  }
}

export { MessageService };
