import mongoose from "mongoose";

export type DbUser = {
  _id: mongoose.Types.ObjectId;
  googleId: string;
  name: string;
  avatar?: string | null;
};
