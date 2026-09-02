import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";
import mongoose from "mongoose";

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid inquiry ID." }, { status: 400 });
    }

    const body = await req.json();
    await connectDB();

    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      id,
      {
        $set: {
          status: body.status,
          notes: body.notes,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedInquiry) {
      return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return NextResponse.json(updatedInquiry);
  } catch (error: any) {
    console.error("PUT /api/admin/inquiries/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
