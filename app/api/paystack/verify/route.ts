import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Cart } from "@/models/Cart";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reference } = await req.json();

  // Verify with Paystack
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });

  const data = await res.json();

  if (data.data?.status !== "success") {
    return NextResponse.json({ error: "Payment not successful" }, { status: 400 });
  }

  await connectDB();

  // Avoid saving duplicate orders
  const exists = await Order.findOne({ reference });
  if (!exists) {
    const cart = await Cart.findOne({ userId: session.user.email });
    await Order.create({
      userId: session.user.email,
      items: cart?.items || [],
      total: data.data.amount / 100,
      reference,
      status: "paid",
    });
    // Clear cart
    await Cart.findOneAndUpdate({ userId: session.user.email }, { items: [] });
  }

  return NextResponse.json({ success: true });
}