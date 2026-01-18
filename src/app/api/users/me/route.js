import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const user = await User.findById(session.user.id).select("-password");

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
