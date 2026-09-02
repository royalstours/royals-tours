import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";

function serializeTravelItem(item: any) {
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
    if (isFixedDeparture !== null && isFixedDeparture !== undefined) {
      query.isFixedDeparture = isFixedDeparture === "true";
    }

    let dbItems = [];
    if (category === "domestic") {
      dbItems = (await DomesticTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
    } else if (category === "international") {
      dbItems = (await InternationalTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
    } else {
      const domesticItems = (await DomesticTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
      const internationalItems = (await InternationalTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
      dbItems = [...domesticItems, ...internationalItems];
    }
    return NextResponse.json(dbItems);
  } catch (error: any) {
    console.error("GET /api/travel-items error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch travel items from MongoDB" },
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

    const Model = body.category === "domestic" ? DomesticTravelItem : InternationalTravelItem;

    // Check if title is unique
    const existingDomestic = await DomesticTravelItem.findOne({ title: body.title });
    const existingInternational = await InternationalTravelItem.findOne({ title: body.title });
    if (existingDomestic || existingInternational) {
      return NextResponse.json(
        { error: `A travel item with title "${body.title}" already exists.` },
        { status: 400 }
      );
    }

    // Get next order index
    const count = await Model.countDocuments();

    const newItem = await Model.create({
      ...body,
      rawPrice: Number(body.rawPrice),
      order: count,
    });

    return NextResponse.json(serializeTravelItem(newItem), { status: 201 });
  } catch (error: any) {
    console.error("POST /api/travel-items error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create travel item" },
      { status: 500 }
    );
  }
}
