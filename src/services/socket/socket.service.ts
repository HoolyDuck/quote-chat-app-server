import { Socket } from "socket.io";
import { MessageService } from "../message/message.service";
import { CreateMessageDto } from "../../common/types/message/create-message.dto";
import { DbUser } from "../../common/types/user/db-user.type";

const funnyText = "I am a bot and I am here to help you.";

class SocketService {
  #messageService: MessageService;

  constructor(messageService: MessageService) {
    this.#messageService = messageService;
  }

  sendMessage = async (
    socket: Socket,
    createMessageDto: CreateMessageDto,
    chatId: string
  ) => {
    try {
      const user = <DbUser>socket.data.user;
      const message = await this.#messageService.create(
        createMessageDto,
        chatId,
        user._id.toString()
      );

      socket.emit("message_sent", message);
      const timeout = setTimeout(async () => {
        const res = await this.#messageService.create(
          { content: funnyText },
          chatId
        );
        socket.emit("response", res);
      }, 3000);

      socket.on("stop", () => {
        clearTimeout(timeout);
      });
    } catch (error: any) {
      socket.emit("error", error.message);
    }
  };
}

export { SocketService };
