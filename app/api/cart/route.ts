import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { Cart } from "@/models/Cart";

// GET - fetch user's cart
export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ items: [] });

  await connectDB();
  const cart = await Cart.findOne({ userId: session.user.email });
  return NextResponse.json({ items: cart?.items || [] });
}

// POST - save entire cart
export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();
  await connectDB();

  await Cart.findOneAndUpdate(
    { userId: session.user.email },
    { items },
    { upsert: true, new: true }
  );

  return NextResponse.json({ success: true });
}