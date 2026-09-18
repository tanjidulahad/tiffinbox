import { z } from "zod";

export const chefApplicationSchema = z.object({
  kitchenName: z.string().min(2, "Kitchen name must be at least 2 characters"),
  area: z.string().min(2, "Please enter your area"),
  cuisineType: z.string().min(2, "Please describe your cuisine type"),
});

export type ChefApplicationInput = z.infer<typeof chefApplicationSchema>;