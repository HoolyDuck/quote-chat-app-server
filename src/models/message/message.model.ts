import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  content: { type: String, required: true },
});

export const Message = model("Message", messageSchema);
