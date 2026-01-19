import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Product from "@/models/Product";
export async function GET() {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Products" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const newProduct = await Product.create({
      ...data,
      userEmail: session.user.email,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
