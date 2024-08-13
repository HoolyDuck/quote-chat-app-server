import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  content: { type: String, required: true },
  // if no sender then message is from system
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});

export const Message = model("Message", messageSchema);
