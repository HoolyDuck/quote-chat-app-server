import mongoose from "mongoose";
import { DbMessage } from "../message/db-message.type";
import { DbUser } from "../user/db-user.type";

export type DbChat = {
  _id: mongoose.Types.ObjectId;
  author: mongoose.Types.ObjectId | DbUser;
  messages: mongoose.Types.ObjectId[] | DbMessage[];
  firstName: string;
  lastName: string;
};
