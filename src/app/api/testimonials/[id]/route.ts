import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid testimonial ID." }, { status: 400 });
    }

    await connectDB();
    const item = await Testimonial.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error("GET /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid testimonial ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const item = await Testimonial.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    const { name, role, trip, comment, rating, avatar, order } = body;

    const updatedData: any = {};
    if (name !== undefined) updatedData.name = name.trim();
    if (role !== undefined) updatedData.role = role ? role.trim() : "";
    if (trip !== undefined) updatedData.trip = trip.trim();
    if (comment !== undefined) updatedData.comment = comment.trim();
    if (rating !== undefined) updatedData.rating = Number(rating);
    if (avatar !== undefined) updatedData.avatar = avatar ? avatar.trim() : "";
    if (order !== undefined) updatedData.order = Number(order);

    const updatedItem = await Testimonial.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error("PUT /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid testimonial ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();

    const item = await Testimonial.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/testimonials/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
