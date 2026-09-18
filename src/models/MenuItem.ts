import { Schema, models, model } from "mongoose";

export type MealType = "lunch" | "dinner";

export interface IMenuItem {
  chefId: Schema.Types.ObjectId; // ChefProfile এর _id
  name: string;
  description?: string;
  price: number;
  image?: string;
  mealType: MealType;
  date: Date; // কোন দিনের জন্য এই মেনু
  availableSlots: number;
  bookedSlots: number;
  isAvailable: boolean;
  createdAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  chefId: { type: Schema.Types.ObjectId, ref: "ChefProfile", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  image: { type: String },
  mealType: { type: String, enum: ["lunch", "dinner"], required: true },
  date: { type: Date, required: true },
  availableSlots: { type: Number, required: true, min: 0 },
  bookedSlots: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// একই chef, একই দিন, একই meal type এর ডুপ্লিকেট এন্ট্রি ঠেকাতে
MenuItemSchema.index({ chefId: 1, date: 1, mealType: 1 }, { unique: false });

export const MenuItem =
  models.MenuItem || model<IMenuItem>("MenuItem", MenuItemSchema);