import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { authOptions } from "../auth/[...nextauth]/route";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      console.log("No Session Found!");
      return NextResponse.json(
        { error: "Unauthorized! Please login first." },
        { status: 401 }
      );
    }

    const { product } = await req.json();

    if (!product) {
      return NextResponse.json(
        { error: "Product data is missing" },
        { status: 400 }
      );
    }

    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              images: [product.image],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId: session.user.id,
        productId: product._id,
        price: product.price,
      },
      success_url: `${req.headers.get(
        "origin"
      )}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/product/${product._id}`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (err) {
    console.error("STRIPE API ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
