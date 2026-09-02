import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Itinerary from "@/models/Itinerary";

export async function GET() {
  try {
    await connectDB();
    const itineraries = await Itinerary.find({}).sort({ createdAt: -1 });
    return NextResponse.json(itineraries);
  } catch (error: any) {
    console.error("GET /api/itineraries error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch itineraries" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      packageName,
      durationText,
      price,
      priceValidity,
      days,
    } = body;

    // Validate required fields
    if (!packageName || !durationText || !price || !priceValidity || !days || days.length === 0) {
      return NextResponse.json(
        { error: "Missing required itinerary fields: packageName, durationText, price, priceValidity, and days are required." },
        { status: 400 }
      );
    }

    let itineraryNumber = body.itineraryNumber;

    // Auto-generate itinerary number if not provided
    if (!itineraryNumber) {
      const year = new Date().getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59);

      // Count itineraries in the current year
      const count = await Itinerary.countDocuments({
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      });

      const nextNum = String(count + 1).padStart(4, "0");
      itineraryNumber = `ITN/${year}/${nextNum}`;

      // Check if number is already taken
      let exists = await Itinerary.findOne({ itineraryNumber });
      let increment = 1;
      while (exists) {
        const altNum = String(count + 1 + increment).padStart(4, "0");
        itineraryNumber = `ITN/${year}/${altNum}`;
        exists = await Itinerary.findOne({ itineraryNumber });
        increment++;
      }
    } else {
      // Check if manual number is unique
      const existing = await Itinerary.findOne({ itineraryNumber });
      if (existing) {
        return NextResponse.json(
          { error: `Itinerary reference number "${itineraryNumber}" already exists.` },
          { status: 400 }
        );
      }
    }

    const newItinerary = await Itinerary.create({
      ...body,
      itineraryNumber,
    });

    return NextResponse.json(newItinerary, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/itineraries error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create itinerary" },
      { status: 500 }
    );
  }
}
