import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const product = await Product.findById(id);
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
