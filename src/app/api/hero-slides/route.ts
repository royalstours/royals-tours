import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HeroSlide from "@/models/HeroSlide";

export async function GET() {
  try {
    await connectDB();
    const slides = await HeroSlide.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(slides);
  } catch (error: any) {
    console.error("GET /api/hero-slides error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch hero slides" },
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

    const { type, src, mobileSrc, poster, mobilePoster, alt, badge, title, subtitle, order } = body;

    if (!type || !src || !alt) {
      return NextResponse.json(
        { error: "Type, source URL, and alt text are required." },
        { status: 400 }
      );
    }

    if (type !== "image" && type !== "video") {
      return NextResponse.json(
        { error: "Type must be either 'image' or 'video'." },
        { status: 400 }
      );
    }

    const newSlide = await HeroSlide.create({
      type,
      src: src.trim(),
      mobileSrc: mobileSrc ? mobileSrc.trim() : "",
      poster: poster ? poster.trim() : "",
      mobilePoster: mobilePoster ? mobilePoster.trim() : "",
      alt: alt.trim(),
      badge: badge ? badge.trim() : "",
      title: title ? title.trim() : "",
      subtitle: subtitle ? subtitle.trim() : "",
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json(newSlide, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/hero-slides error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create hero slide" },
      { status: 500 }
    );
  }
}
