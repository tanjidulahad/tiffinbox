import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ChefProfile } from "@/models/ChefProfile";
import { MenuItem } from "@/models/MenuItem";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.roles?.includes("chef")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const chefProfile = await ChefProfile.findOne({ userId: session.user.id });
  if (!chefProfile) {
    return NextResponse.json(
      { error: "Chef profile not found" },
      { status: 404 }
    );
  }

  const { name, description, price, mealType, date, availableSlots } =
    await req.json();

  const menuItem = await MenuItem.create({
    chefId: chefProfile._id,
    name,
    description,
    price,
    mealType,
    date,
    availableSlots,
  });

  return NextResponse.json({ menuItem }, { status: 201 });
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.roles?.includes("chef")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const chefProfile = await ChefProfile.findOne({ userId: session.user.id });
  if (!chefProfile) {
    return NextResponse.json(
      { error: "Chef profile not found" },
      { status: 404 }
    );
  }

  const menuItems = await MenuItem.find({ chefId: chefProfile._id }).sort({
    date: -1,
  });

  return NextResponse.json({ menuItems });
}