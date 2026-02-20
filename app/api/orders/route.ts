import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json([], { status: 401 });

  await connectDB();
  const orders = await Order.find({ userId: session.user.email }).sort({ createdAt: -1 });
  return NextResponse.json(orders);
}