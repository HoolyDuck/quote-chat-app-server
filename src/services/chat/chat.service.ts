import { CreateChatDto } from "../../common/types/chat/create-chat.dto";
import { DbUser } from "../../common/types/user/db-user.type";
import { Chat } from "../../models/chat/chat.model";
import { User } from "../../models/user/user.model";

class ChatService {
  async create(createChatDto: CreateChatDto, user: DbUser) {
    const chat = await Chat.create({
      ...createChatDto,
      author: user._id,
    });

    await User.updateOne({ _id: user._id }, { $push: { chats: chat._id } });

    return chat;
  }

  async getChats(user: DbUser) {
    return Chat.find({ author: user._id }).populate("messages");
  }

  async getChatById(id: string, user: DbUser) {
    const chat = await Chat.findById(id);

    if (!chat) {
      return null;
    }

    if (chat.author.toString() !== user._id.toString()) {
      throw new Error("Forbidden");
    }

    return chat.populate("messages");
  }

  async deleteChat(id: string) {
    const chat = await Chat.findByIdAndDelete(id);

    if (!chat) {
      return null;
    }

    await User.updateOne({ _id: chat.author }, { $pull: { chats: chat._id } });

    return chat;
  }

  async updateChat(id: string, updateChatDto: CreateChatDto) {
    return Chat.findByIdAndUpdate(id, updateChatDto, { new: true });
  }
}

export { ChatService };
