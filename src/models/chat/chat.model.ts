import { model, Schema } from "mongoose";
import { User } from "../user/user.model";

const chatSchema = new Schema({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});


export const Chat = model("Chat", chatSchema);
