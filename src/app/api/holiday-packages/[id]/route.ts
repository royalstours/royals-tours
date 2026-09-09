import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import HolidayPackage from "@/models/HolidayPackage";
import mongoose from "mongoose";

function serializeHolidayPackage(item: any) {
  if (!item) return null;
  const obj = item.toObject ? item.toObject() : item;
  return {
    ...obj,
    id: obj._id ? obj._id.toString() : obj.id,
  };
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    await connectDB();

    let item = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      item = await HolidayPackage.findById(id);
    }
    if (!item) {
      item = await HolidayPackage.findOne({
        $or: [{ id: id }, { name: new RegExp(`^${id}$`, "i") }, { title: new RegExp(`^${id}$`, "i") }]
      });
    }

    if (!item) {
      return NextResponse.json({ error: "Holiday package not found" }, { status: 404 });
    }

    return NextResponse.json(serializeHolidayPackage(item));
  } catch (error: any) {
    console.error("GET /api/holiday-packages/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch holiday package" },
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

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { $or: [{ id: id }, { name: new RegExp(`^${id}$`, "i") }] };
    }

    const updatedData = { ...body };
    if (body.rawPrice !== undefined) {
      updatedData.rawPrice = Number(body.rawPrice);
    }

    const updated = await HolidayPackage.findOneAndUpdate(
      query,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Holiday package not found" }, { status: 404 });
    }

    return NextResponse.json(serializeHolidayPackage(updated));
  } catch (error: any) {
    console.error("PUT /api/holiday-packages/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update holiday package" },
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

    await connectDB();

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { $or: [{ id: id }, { name: new RegExp(`^${id}$`, "i") }] };
    }

    const deleted = await HolidayPackage.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Holiday package not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Holiday package deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/holiday-packages/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete holiday package" },
      { status: 500 }
    );
  }
}
