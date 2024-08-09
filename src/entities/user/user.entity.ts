import { Schema, model } from "mongoose";

const userSchema = new Schema({
  googleId: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
});

export const User = model("User", userSchema);
