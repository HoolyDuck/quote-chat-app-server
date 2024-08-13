import mongoose from "mongoose";
import { DbChat } from "../chat/db-chat";
import { DbUser } from "../user/db-user.type";

export type DbMessage = {
  _id: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId | DbChat;
  content: string;
  sender?: mongoose.Types.ObjectId | DbUser;
};
