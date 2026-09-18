import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ChefApplication } from "@/models/ChefApplication";

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

  application.status = "rejected";
  await application.save();

  return NextResponse.json({ message: "Application rejected" });
}