import { Schema, models, model } from "mongoose";

export type ExtraRole = "chef" | "admin";

export interface IUser {
  name: string;
  email: string;
  password: string;
  roles: ExtraRole[];
  phone?: string;
  address?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  roles: {
    type: [String],
    enum: ["chef", "admin"],
    default: [],
  },
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = models.User || model<IUser>("User", UserSchema);