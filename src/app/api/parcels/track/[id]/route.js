import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Parcel from "@/models/Parcel";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const parcel = await Parcel.findOne({ trackingId: id })
      .populate("assignedAgentId", "name phone")
      .lean();

    if (!parcel) {
      return NextResponse.json(
        { success: false, message: "Invalid Tracking ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: parcel });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
