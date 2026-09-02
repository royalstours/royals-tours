import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import TopRatedLocation from "@/models/TopRatedLocation";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const location = await TopRatedLocation.findById(id);
    if (!location) {
      return NextResponse.json({ error: "Top rated location not found" }, { status: 404 });
    }

    return NextResponse.json(location);
  } catch (error: any) {
    console.error("GET /api/top-locations/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch top rated location" },
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const location = await TopRatedLocation.findById(id);
    if (!location) {
      return NextResponse.json({ error: "Top rated location not found" }, { status: 404 });
    }

    const { name, image, link, inquiryName, order } = body;

    const updatedData: any = {};
    if (name !== undefined) updatedData.name = name.trim();
    if (image !== undefined) updatedData.image = image.trim();
    if (link !== undefined) updatedData.link = link ? link.trim() : "";
    if (inquiryName !== undefined) updatedData.inquiryName = inquiryName ? inquiryName.trim() : "";
    if (order !== undefined) updatedData.order = Number(order);

    const updatedLocation = await TopRatedLocation.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedLocation);
  } catch (error: any) {
    console.error("PUT /api/top-locations/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update top rated location" },
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
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();

    const location = await TopRatedLocation.findById(id);
    if (!location) {
      return NextResponse.json({ error: "Top rated location not found" }, { status: 404 });
    }

    await TopRatedLocation.findByIdAndDelete(id);

    return NextResponse.json({ message: "Top rated location deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/top-locations/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete top rated location" },
      { status: 500 }
    );
  }
}
