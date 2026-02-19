import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { Profile } from "@/models/Profile";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({}, { status: 401 });

  await connectDB();
  const profile = await Profile.findOne({ userId: session.user.email });
  return NextResponse.json(profile || {});
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  await connectDB();

  await Profile.findOneAndUpdate(
    { userId: session.user.email },
    { ...body, userId: session.user.email },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}