import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HeroSlide from "@/models/HeroSlide";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid slide ID." }, { status: 400 });
    }

    await connectDB();
    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    return NextResponse.json(slide);
  } catch (error: any) {
    console.error("GET /api/hero-slides/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch hero slide" },
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
      return NextResponse.json({ error: "Invalid slide ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    const { type, src, mobileSrc, poster, mobilePoster, alt, badge, title, subtitle, order } = body;

    const updatedData: any = {};
    if (type !== undefined) {
      if (type !== "image" && type !== "video") {
        return NextResponse.json({ error: "Type must be 'image' or 'video'." }, { status: 400 });
      }
      updatedData.type = type;
    }
    if (src !== undefined) updatedData.src = src.trim();
    if (mobileSrc !== undefined) updatedData.mobileSrc = mobileSrc ? mobileSrc.trim() : "";
    if (poster !== undefined) updatedData.poster = poster ? poster.trim() : "";
    if (mobilePoster !== undefined) updatedData.mobilePoster = mobilePoster ? mobilePoster.trim() : "";
    if (alt !== undefined) updatedData.alt = alt.trim();
    if (badge !== undefined) updatedData.badge = badge ? badge.trim() : "";
    if (title !== undefined) updatedData.title = title ? title.trim() : "";
    if (subtitle !== undefined) updatedData.subtitle = subtitle ? subtitle.trim() : "";
    if (order !== undefined) updatedData.order = Number(order);

    const updatedSlide = await HeroSlide.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedSlide);
  } catch (error: any) {
    console.error("PUT /api/hero-slides/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update hero slide" },
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
      return NextResponse.json({ error: "Invalid slide ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();

    const slide = await HeroSlide.findById(id);
    if (!slide) {
      return NextResponse.json({ error: "Hero slide not found" }, { status: 404 });
    }

    await HeroSlide.findByIdAndDelete(id);

    return NextResponse.json({ message: "Hero slide deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/hero-slides/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete hero slide" },
      { status: 500 }
    );
  }
}
