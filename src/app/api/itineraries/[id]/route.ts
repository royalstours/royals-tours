import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Itinerary from "@/models/Itinerary";
import mongoose from "mongoose";

async function findItinerary(identifier: string) {
  let itinerary = await Itinerary.findOne({ itineraryNumber: decodeURIComponent(identifier) });
  if (!itinerary && mongoose.Types.ObjectId.isValid(identifier)) {
    itinerary = await Itinerary.findById(identifier);
  }
  return itinerary;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await connectDB();
    const itinerary = await findItinerary(id);

    if (!itinerary) {
      return NextResponse.json({ error: "Itinerary not found" }, { status: 404 });
    }

    return NextResponse.json(itinerary);
  } catch (error: any) {
    console.error("GET /api/itineraries/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch itinerary" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await req.json();

    await connectDB();
    const itinerary = await findItinerary(id);

    if (!itinerary) {
      return NextResponse.json({ error: "Itinerary not found" }, { status: 404 });
    }

    // If changing itinerary number, ensure it remains unique
    if (body.itineraryNumber && body.itineraryNumber !== itinerary.itineraryNumber) {
      const existing = await Itinerary.findOne({ itineraryNumber: body.itineraryNumber });
      if (existing) {
        return NextResponse.json(
          { error: `Itinerary reference number "${body.itineraryNumber}" is already in use.` },
          { status: 400 }
        );
      }
    }

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      itinerary._id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedItinerary);
  } catch (error: any) {
    console.error("PUT /api/itineraries/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update itinerary" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    await connectDB();
    const itinerary = await findItinerary(id);

    if (!itinerary) {
      return NextResponse.json({ error: "Itinerary not found" }, { status: 404 });
    }

    await Itinerary.findByIdAndDelete(itinerary._id);
    return NextResponse.json({ message: "Itinerary deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/itineraries/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete itinerary" },
      { status: 500 }
    );
  }
}
