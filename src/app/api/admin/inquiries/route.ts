import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
  } catch (error: any) {
    console.error("GET /api/admin/inquiries error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}
