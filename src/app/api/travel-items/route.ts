import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";
import HolidayPackage from "@/models/HolidayPackage";

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
      const domesticItems = (await DomesticTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
      const holidayDomestic = (await HolidayPackage.find({ ...query, category: "domestic" }).sort({ order: 1 })).map(serializeTravelItem);
      dbItems = [...domesticItems, ...holidayDomestic];
    } else if (category === "international") {
      const intlItems = (await InternationalTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
      const holidayIntl = (await HolidayPackage.find({ ...query, category: "international" }).sort({ order: 1 })).map(serializeTravelItem);
      dbItems = [...intlItems, ...holidayIntl];
    } else if (category && category !== "all") {
      // Custom category query against HolidayPackage & legacy TravelItem
      const holidayCatItems = (await HolidayPackage.find({ ...query, category: new RegExp(`^${category}$`, "i") }).sort({ order: 1 })).map(serializeTravelItem);
      const legacyCatItems = (await TravelItem.find({ ...query, category: new RegExp(`^${category}$`, "i") }).sort({ order: 1 })).map(serializeTravelItem);
      dbItems = [...holidayCatItems, ...legacyCatItems];
    } else {
      const domesticItems = (await DomesticTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
      const internationalItems = (await InternationalTravelItem.find(query).sort({ order: 1 })).map(serializeTravelItem);
      const holidayItems = (await HolidayPackage.find(query).sort({ order: 1 })).map(serializeTravelItem);
      
      // Merge unique by title/id
      const seenTitles = new Set();
      const combined = [];
      for (const item of [...domesticItems, ...internationalItems, ...holidayItems]) {
        const key = item.title?.toLowerCase() || item.id;
        if (!seenTitles.has(key)) {
          seenTitles.add(key);
          combined.push(item);
        }
      }
      dbItems = combined;
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

    let Model = HolidayPackage;
    if (body.category === "domestic" && body.isFixedDeparture) {
      Model = DomesticTravelItem;
    } else if (body.category === "international" && body.isFixedDeparture) {
      Model = InternationalTravelItem;
    } else {
      Model = HolidayPackage;
    }

    // Check if title is unique across collections
    const existingDomestic = await DomesticTravelItem.findOne({ title: body.title });
    const existingInternational = await InternationalTravelItem.findOne({ title: body.title });
    const existingHoliday = await HolidayPackage.findOne({ title: body.title });
    if (existingDomestic || existingInternational || existingHoliday) {
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
