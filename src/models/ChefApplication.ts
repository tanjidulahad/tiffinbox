import { Schema, models, model } from "mongoose";

export interface IChefApplication {
  userId: Schema.Types.ObjectId | { name: string; email: string };
  kitchenName: string;
  area: string;
  cuisineType: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

const ChefApplicationSchema = new Schema<IChefApplication>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  kitchenName: { type: String, required: true },
  area: { type: String, required: true },
  cuisineType: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

export const ChefApplication = models.ChefApplication || model<IChefApplication>("ChefApplication", ChefApplicationSchema);