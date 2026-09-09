import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HolidayPackage from "@/models/HolidayPackage";

function serializeHolidayPackage(item: any) {
  if (!item) return null;
  const obj = item.toObject ? item.toObject() : item;
  return {
    ...obj,
    id: obj._id ? obj._id.toString() : obj.id,
  };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const isFixedDeparture = searchParams.get("isFixedDeparture");

    await connectDB();

    const query: any = {};
    if (category && category !== "all") {
      query.category = new RegExp(`^${category}$`, "i");
    }
    if (isFixedDeparture !== null && isFixedDeparture !== undefined) {
      query.isFixedDeparture = isFixedDeparture === "true";
    }

    const dbItems = await HolidayPackage.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(dbItems.map(serializeHolidayPackage));
  } catch (error: any) {
    console.error("GET /api/holiday-packages error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch holiday packages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.title || !body.category || body.rawPrice === undefined || !body.duration || !body.image) {
      return NextResponse.json(
        { error: "Name, Title, Category, Price, Duration, and Main Image are required." },
        { status: 400 }
      );
    }

    // Check if title is unique in HolidayPackage
    const existing = await HolidayPackage.findOne({ title: body.title });
    if (existing) {
      return NextResponse.json(
        { error: `A holiday package with title "${body.title}" already exists.` },
        { status: 400 }
      );
    }

    const count = await HolidayPackage.countDocuments();

    const newItem = await HolidayPackage.create({
      ...body,
      rawPrice: Number(body.rawPrice),
      order: count,
    });

    return NextResponse.json(serializeHolidayPackage(newItem), { status: 201 });
  } catch (error: any) {
    console.error("POST /api/holiday-packages error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create holiday package" },
      { status: 500 }
    );
  }
}
