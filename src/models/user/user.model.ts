import { Schema, model } from "mongoose";

const userSchema = new Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});

export const User = model("User", userSchema);
