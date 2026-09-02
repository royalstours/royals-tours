import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import TopRatedLocation from "@/models/TopRatedLocation";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";
import TravelItem from "@/models/TravelItem";

export async function GET() {
  try {
    await connectDB();
    const locations = await TopRatedLocation.find({}).sort({ order: 1, createdAt: -1 });

    // Fetch all items from group departures / travel items
    const [domestic, intl, general] = await Promise.all([
      DomesticTravelItem.find({}).lean(),
      InternationalTravelItem.find({}).lean(),
      TravelItem.find({}).lean(),
    ]);

    const allItems = [...domestic, ...intl, ...general];

    const clean = (s: string) => (s || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    function matchItem(loc: any) {
      if (!loc) return null;
      // 1. Match by link containing item _id or slug
      if (loc.link) {
        for (const item of allItems) {
          const idStr = item._id ? item._id.toString() : "";
          if ((idStr && loc.link.includes(idStr)) || (item.id && loc.link.includes(item.id))) {
            return item;
          }
        }
      }

      // 2. Match by normalized name
      const locClean = clean(loc.name);
      for (const item of allItems) {
        const itemClean = clean(item.name);
        if (itemClean === locClean || itemClean.includes(locClean) || locClean.includes(itemClean)) {
          return item;
        }
      }

      // 3. Keyword heuristics
      const keywords = ["kashmir", "bali", "chardham", "vietnam", "ladakh", "goa", "kerala", "singapore", "bhutan", "assam", "meghalaya"];
      for (const kw of keywords) {
        if (locClean.includes(kw)) {
          const found = allItems.find((i: any) => clean(i.name).includes(kw));
          if (found) return found;
        }
      }

      return null;
    }

    const enrichedLocations = locations.map((loc: any) => {
      const matched = matchItem(loc);
      if (matched) {
        return {
          _id: loc._id,
          name: loc.name,
          image: matched.image || loc.image,
          link: `/destinations/${matched._id}`,
          inquiryName: loc.inquiryName || matched.name,
          order: loc.order,
        };
      }
      return loc;
    });

    return NextResponse.json(enrichedLocations);
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
