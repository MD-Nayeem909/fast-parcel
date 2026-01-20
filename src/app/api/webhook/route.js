import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectDB from "@/lib/db";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    await connectDB();

    const { userId, productId, price } = session.metadata;

    try {
      await Order.create({
        userId,
        productId,
        price: parseFloat(price),
        status: "Paid",
        paymentId: session.id,
      });
      console.log("Order saved to database!");
    } catch (dbErr) {
      console.error("Error saving order:", dbErr.message);
    }
  }

  return NextResponse.json({ received: true });
}
