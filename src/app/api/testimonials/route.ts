import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await connectDB();
    const list = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(list);
  } catch (error: any) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const { name, role, trip, comment, rating, avatar, order } = body;

    if (!name || !trip || !comment) {
      return NextResponse.json(
        { error: "Name, trip, and comment are required." },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name: name.trim(),
      role: role ? role.trim() : "",
      trip: trip.trim(),
      comment: comment.trim(),
      rating: rating !== undefined ? Number(rating) : 5,
      avatar: avatar ? avatar.trim() : "",
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
