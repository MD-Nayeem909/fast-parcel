import { NextResponse } from "next/server";
import { Notification } from "@/models/Notification";
import dbConnect from "@/lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role");
  const email = searchParams.get("email");

  await dbConnect();

  const query = {
    $or: [{ receiverRole: role }, { receiverEmail: email }],
  };

  const notifications = await Notification.find(query)
    .sort({ createdAt: -1 })
    .limit(10);

  return NextResponse.json(notifications);
}

export async function PATCH(req) {
  try {
    const { role, email } = await req.json();
    await dbConnect();

    await Notification.updateMany(
      {
        $or: [{ receiverRole: role }, { receiverEmail: email }],
        isRead: false,
      },
      { $set: { isRead: true } }
    );

    return NextResponse.json(
      { message: "Marked all as read" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
