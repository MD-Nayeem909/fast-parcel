import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Parcel from "@/models/Parcel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// --- POST: Create Parcel ---
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    // Generate tracking ID
    const uniqueTrackingId =
      "TRK-" +
      Date.now().toString().slice(-6) +
      Math.random().toString(36).substring(2, 5).toUpperCase();

    const parcelData = {
      trackingId: uniqueTrackingId,
      senderInfo: {
        name: body.senderName,
        address: body.senderAddress,
        phone: body.senderPhone || "N/A",
      },
      receiverInfo: {
        name: body.receiverName,
        address: body.receiverAddress,
        phone: body.receiverPhone || "N/A",
      },
      description: body.description,
      cost: body.cost,
      customerId: session.user.id,
      statusHistory: [{ status: "pending", note: "Parcel request created" }],
    };

    const parcel = await Parcel.create(parcelData);

    return NextResponse.json({ success: true, data: parcel }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create parcel" },
      { status: 500 }
    );
  }
}

// --- GET: Fetch Parcels Based on Role ---
export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    await dbConnect();
    let query = {};
    if (session.user.role === "customer") {
      query = { customerId: session.user.id };
    } else if (session.user.role === "agent") {
      query = { assignedAgentId: session.user.id };
    }

    // Admin sees all

    const parcels = await Parcel.find(query)
      .sort({ createdAt: -1 })
      .populate("assignedAgentId", "name email")
      .populate("customerId", "name email");

    return NextResponse.json({
      success: true,
      count: parcels.length,
      data: parcels,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
