import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid item ID." }, { status: 400 });
    }

    await connectDB();
    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error("GET /api/gallery/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch gallery item" },
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
      return NextResponse.json({ error: "Invalid item ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    const { title, location, category, image, caption, order } = body;

    const updatedData: any = {};
    if (title !== undefined) updatedData.title = title.trim();
    if (location !== undefined) updatedData.location = location.trim();
    if (category !== undefined) {
      if (category !== "international" && category !== "trek" && category !== "community") {
        return NextResponse.json({ error: "Invalid category." }, { status: 400 });
      }
      updatedData.category = category;
    }
    if (image !== undefined) updatedData.image = image.trim();
    if (caption !== undefined) updatedData.caption = caption.trim();
    if (order !== undefined) updatedData.order = Number(order);

    const updatedItem = await GalleryItem.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error("PUT /api/gallery/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update gallery item" },
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
      return NextResponse.json({ error: "Invalid item ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Gallery item not found" }, { status: 404 });
    }

    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
