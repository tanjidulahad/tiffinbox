import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ChefApplication } from "@/models/ChefApplication";

export async function GET() {
  const session = await auth();
  if (!session?.user?.roles?.includes("admin")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectDB();

  const applications = await ChefApplication.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json({ applications });
}