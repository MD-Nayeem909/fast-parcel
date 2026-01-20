import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, productId, price } = await req.json();

    const newOrder = await Order.create({
      userId,
      productId,
      price,
      status: "Paid",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, orderId: newOrder._id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
