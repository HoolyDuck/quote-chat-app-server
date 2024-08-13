import { CreateUserDto } from "../../common/types/user/create-user-dto.type";
import { DbUser } from "../../common/types/user/db-user.type";
import { getChatName } from "../../common/utils/get-chat-name.utils";
import { Chat } from "../../models/chat/chat.model";
import { User } from "../../models/user/user.model";
import { ChatService } from "../chat/chat.service";

class UserService {
  #chatService: ChatService;

  constructor(chatService: ChatService) {
    this.#chatService = chatService;
  }

  async getUserByGoogleId(googleId: string): Promise<DbUser | null> {
    return User.findOne({
      googleId,
    });
  }

  createUser = async (createUserDto: CreateUserDto): Promise<DbUser> => {
    const user = await User.create(createUserDto);

    for (let i = 0; i < 3; i++) {
      await this.#chatService.create(
        {
          ...getChatName(),
        },
        user
      );
    }

    return user;
  };

  async getUserById(userId: string): Promise<DbUser | null> {
    return User.findOne({
      _id: userId,
    });
  }
}

export { UserService };
