import { Schema, models, model } from "mongoose";

export interface IChefProfile {
  userId: Schema.Types.ObjectId;
  kitchenName: string;
  area: string;
  cuisineType: string;
  coverImage?: string;
  isActive: boolean; // chef চাইলে সাময়িকভাবে বন্ধ রাখতে পারবে (ছুটি, ইত্যাদি)
  rating: number;
  totalReviews: number;
  createdAt: Date;
}

const ChefProfileSchema = new Schema<IChefProfile>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  kitchenName: { type: String, required: true },
  area: { type: String, required: true },
  cuisineType: { type: String, required: true },
  coverImage: { type: String },
  isActive: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const ChefProfile =
  models.ChefProfile || model<IChefProfile>("ChefProfile", ChefProfileSchema);