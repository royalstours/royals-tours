import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";
import HolidayPackage from "@/models/HolidayPackage";
import mongoose from "mongoose";
import TopRatedLocation from "@/models/TopRatedLocation";

function serializeTravelItem(item: any) {
  if (!item) return null;
  const obj = item.toObject ? item.toObject() : item;
  return {
    ...obj,
    id: obj._id ? obj._id.toString() : obj.id,
  };
}

// Helper to find travel item by Mongoose ObjectId or slug/name across all collections
async function findTravelItem(identifier: string) {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    let item = await HolidayPackage.findById(identifier);
    if (item) return { item, category: item.category, Model: HolidayPackage };

    item = await DomesticTravelItem.findById(identifier);
    if (item) return { item, category: "domestic", Model: DomesticTravelItem };

    item = await InternationalTravelItem.findById(identifier);
    if (item) return { item, category: "international", Model: InternationalTravelItem };

    item = await TravelItem.findById(identifier);
    if (item) return { item, category: item.category || "domestic", Model: TravelItem };
  }

  // Fallback lookup by id slug or name
  let item = await HolidayPackage.findOne({
    $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }, { title: new RegExp(`^${identifier}$`, "i") }]
  });
  if (item) return { item, category: item.category, Model: HolidayPackage };

  item = await DomesticTravelItem.findOne({
    $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }]
  });
  if (item) return { item, category: "domestic", Model: DomesticTravelItem };

  item = await InternationalTravelItem.findOne({
    $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }]
  });
  if (item) return { item, category: "international", Model: InternationalTravelItem };

  item = await TravelItem.findOne({
    $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }]
  });
  if (item) return { item, category: item.category || "domestic", Model: TravelItem };

  return null;
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    await connectDB();
    const result = await findTravelItem(id);

    if (!result) {
      return NextResponse.json({ error: "Travel item not found" }, { status: 404 });
    }

    return NextResponse.json(serializeTravelItem(result.item));
  } catch (error: any) {
    console.error("GET /api/travel-items/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch travel item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;
    const body = await req.json();

    await connectDB();
    const result = await findTravelItem(id);

    if (!result) {
      return NextResponse.json({ error: "Travel item not found" }, { status: 404 });
    }

    // Update fields
    const updatedData = { ...body };
    if (body.rawPrice !== undefined) {
      updatedData.rawPrice = Number(body.rawPrice);
    }

    let updatedItem;
    // Check if target model should change based on category / fixed departure
    let TargetModel = result.Model;
    if (body.category && body.category !== result.category) {
      if (body.category === "domestic" && body.isFixedDeparture) {
        TargetModel = DomesticTravelItem;
      } else if (body.category === "international" && body.isFixedDeparture) {
        TargetModel = InternationalTravelItem;
      } else {
        TargetModel = HolidayPackage;
      }
    }

    if (TargetModel !== result.Model) {
      // Move between collections
      await result.Model.findByIdAndDelete(result.item._id);
      const count = await TargetModel.countDocuments();
      
      const payload = {
        ...result.item.toObject(),
        ...updatedData,
        order: count
      };
      delete payload._id;
      delete payload.__v;
      
      updatedItem = await TargetModel.create(payload);
    } else {
      updatedItem = await result.Model.findByIdAndUpdate(
        result.item._id,
        { $set: updatedData },
        { new: true, runValidators: true }
      );
    }

    // Automatically sync updated image to TopRatedLocations if applicable
    if (updatedData.image) {
      const itemMongoId = result.item._id.toString();
      const itemName = result.item.name;
      await TopRatedLocation.updateMany(
        {
          $or: [
            { link: { $regex: itemMongoId } },
            { name: new RegExp(itemName, "i") },
          ]
        },
        { $set: { image: updatedData.image } }
      );
    }

    return NextResponse.json(serializeTravelItem(updatedItem));
  } catch (error: any) {
    console.error("PUT /api/travel-items/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update travel item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    const result = await findTravelItem(id);

    if (!result) {
      return NextResponse.json({ error: "Travel item not found" }, { status: 404 });
    }

    await result.Model.findByIdAndDelete(result.item._id);

    return NextResponse.json({ message: "Travel item deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/travel-items/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete travel item" },
      { status: 500 }
    );
  }
}
