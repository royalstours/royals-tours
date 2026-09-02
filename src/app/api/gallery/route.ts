import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch gallery items" },
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

    const { title, location, category, image, caption, order } = body;

    if (!title || !location || !category || !image || !caption) {
      return NextResponse.json(
        { error: "Title, Location, Category, Image and Caption are required." },
        { status: 400 }
      );
    }

    if (category !== "international" && category !== "trek" && category !== "community") {
      return NextResponse.json(
        { error: "Category must be either 'international', 'trek' or 'community'." },
        { status: 400 }
      );
    }

    const newItem = await GalleryItem.create({
      title: title.trim(),
      location: location.trim(),
      category,
      image: image.trim(),
      caption: caption.trim(),
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create gallery item" },
      { status: 500 }
    );
  }
}
