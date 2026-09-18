import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ChefApplication } from "@/models/ChefApplication";
import { ChefProfile } from "@/models/ChefProfile";
import { User } from "@/models/User";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.roles?.includes("admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const application = await ChefApplication.findById(params.id);
  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  application.status = "approved";
  await application.save();

  // ChefProfile তৈরি (যদি আগে থেকে না থাকে)
  const existingProfile = await ChefProfile.findOne({
    userId: application.userId,
  });
  if (!existingProfile) {
    await ChefProfile.create({
      userId: application.userId,
      kitchenName: application.kitchenName,
      area: application.area,
      cuisineType: application.cuisineType,
    });
  }

  await User.findByIdAndUpdate(application.userId, {
    $addToSet: { roles: "chef" },
  });

  return NextResponse.json({ message: "Chef approved" });
}