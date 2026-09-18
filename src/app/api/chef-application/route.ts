import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ChefApplication } from "@/models/ChefApplication";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const existing = await ChefApplication.findOne({
    userId: session.user.id,
    status: { $in: ["pending", "approved"] },
  });
  if (existing) {
    return NextResponse.json(
      { error: "You already have an application" },
      { status: 400 }
    );
  }

  const { kitchenName, area, cuisineType } = await req.json();

  await ChefApplication.create({
    userId: session.user.id,
    kitchenName,
    area,
    cuisineType,
  });

  return NextResponse.json({ message: "Application submitted" });
}


export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const application = await ChefApplication.findOne({
    userId: session.user.id,
  }).sort({ createdAt: -1 });

  return NextResponse.json({ application });
}