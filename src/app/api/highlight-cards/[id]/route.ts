import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HighlightCard from "@/models/HighlightCard";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid card ID." }, { status: 400 });
    }

    await connectDB();
    const card = await HighlightCard.findById(id);
    if (!card) {
      return NextResponse.json({ error: "Highlight card not found" }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (error: any) {
    console.error("GET /api/highlight-cards/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch highlight card" },
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
      return NextResponse.json({ error: "Invalid card ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const card = await HighlightCard.findById(id);
    if (!card) {
      return NextResponse.json({ error: "Highlight card not found" }, { status: 404 });
    }

    const { type, src, mobileSrc, poster, mobilePoster, alt, order, badge, title, subtitle, ctaText, ctaLink } = body;

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
    if (order !== undefined) updatedData.order = Number(order);
    if (badge !== undefined) updatedData.badge = badge ? badge.trim() : "";
    if (title !== undefined) updatedData.title = title ? title.trim() : "";
    if (subtitle !== undefined) updatedData.subtitle = subtitle ? subtitle.trim() : "";
    if (ctaText !== undefined) updatedData.ctaText = ctaText ? ctaText.trim() : "";
    if (ctaLink !== undefined) updatedData.ctaLink = ctaLink ? ctaLink.trim() : "";

    const updatedCard = await HighlightCard.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedCard);
  } catch (error: any) {
    console.error("PUT /api/highlight-cards/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update highlight card" },
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
      return NextResponse.json({ error: "Invalid card ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();

    const card = await HighlightCard.findById(id);
    if (!card) {
      return NextResponse.json({ error: "Highlight card not found" }, { status: 404 });
    }

    await HighlightCard.findByIdAndDelete(id);

    return NextResponse.json({ message: "Highlight card deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/highlight-cards/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete highlight card" },
      { status: 500 }
    );
  }
}
