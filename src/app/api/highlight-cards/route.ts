import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HighlightCard from "@/models/HighlightCard";

export async function GET() {
  try {
    await connectDB();
    const cards = await HighlightCard.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(cards);
  } catch (error: any) {
    console.error("GET /api/highlight-cards error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch highlight cards" },
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

    const { type, src, mobileSrc, poster, mobilePoster, alt, order, badge, title, subtitle, ctaText, ctaLink } = body;

    if (!type || !src || !alt) {
      return NextResponse.json(
        { error: "Type, Source URL, and Alt text are required." },
        { status: 400 }
      );
    }

    if (type !== "image" && type !== "video") {
      return NextResponse.json(
        { error: "Type must be either 'image' or 'video'." },
        { status: 400 }
      );
    }

    const newCard = await HighlightCard.create({
      type,
      src: src.trim(),
      mobileSrc: mobileSrc ? mobileSrc.trim() : "",
      poster: poster ? poster.trim() : "",
      mobilePoster: mobilePoster ? mobilePoster.trim() : "",
      alt: alt.trim(),
      order: order !== undefined ? Number(order) : 0,
      badge: badge ? badge.trim() : "",
      title: title ? title.trim() : "",
      subtitle: subtitle ? subtitle.trim() : "",
      ctaText: ctaText ? ctaText.trim() : "",
      ctaLink: ctaLink ? ctaLink.trim() : "",
    });

    return NextResponse.json(newCard, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/highlight-cards error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create highlight card" },
      { status: 500 }
    );
  }
}
