import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import TopRatedLocation from "@/models/TopRatedLocation";

export async function GET() {
  try {
    await connectDB();
    const locations = await TopRatedLocation.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(locations);
  } catch (error: any) {
    console.error("GET /api/top-locations error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch top rated locations" },
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

    const { name, image, link, inquiryName, order } = body;

    if (!name || !image) {
      return NextResponse.json(
        { error: "Name and image are required." },
        { status: 400 }
      );
    }

    const newLocation = await TopRatedLocation.create({
      name: name.trim(),
      image: image.trim(),
      link: link ? link.trim() : "",
      inquiryName: inquiryName ? inquiryName.trim() : "",
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/top-locations error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create top rated location" },
      { status: 500 }
    );
  }
}
