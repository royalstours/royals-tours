import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";
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

// Helper to find travel item by Mongoose ObjectId or slug/name
async function findTravelItem(identifier: string) {
  if (mongoose.Types.ObjectId.isValid(identifier)) {
    let item = await DomesticTravelItem.findById(identifier);
    let category = "domestic";
    if (!item) {
      item = await InternationalTravelItem.findById(identifier);
      category = "international";
    }
    if (!item) {
      item = await TravelItem.findById(identifier);
      if (item) category = item.category || "domestic";
    }
    if (item) return { item, category, Model: category === "domestic" ? DomesticTravelItem : (category === "international" ? InternationalTravelItem : TravelItem) };
  }

  // Fallback lookup by id slug or name
  let item = await DomesticTravelItem.findOne({
    $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }]
  });
  let category = "domestic";
  if (!item) {
    item = await InternationalTravelItem.findOne({
      $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }]
    });
    category = "international";
  }
  if (!item) {
    item = await TravelItem.findOne({
      $or: [{ id: identifier }, { name: new RegExp(`^${identifier}$`, "i") }]
    });
    if (item) category = item.category || "domestic";
  }

  return item ? { item, category, Model: category === "domestic" ? DomesticTravelItem : (category === "international" ? InternationalTravelItem : TravelItem) } : null;
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
    if (body.category && body.category !== result.category) {
      // Category changed, delete from old and insert to new
      await result.Model.findByIdAndDelete(result.item._id);
      const TargetModel = body.category === "domestic" ? DomesticTravelItem : InternationalTravelItem;
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
