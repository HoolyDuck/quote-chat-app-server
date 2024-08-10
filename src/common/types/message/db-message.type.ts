import mongoose from "mongoose";
import { DbChat } from "../chat/db-chat";

export type DbMessage = {
  _id: mongoose.Types.ObjectId;
  chat: mongoose.Types.ObjectId | DbChat;
  content: string;
};
