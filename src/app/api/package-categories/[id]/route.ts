import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PackageCategory from "@/models/PackageCategory";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    await connectDB();
    let category = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await PackageCategory.findById(id);
    }
    if (!category) {
      category = await PackageCategory.findOne({ slug: id.toLowerCase() });
    }

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error: any) {
    console.error("GET /api/package-categories/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch category" },
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
      query = { slug: id.toLowerCase() };
    }

    const updateData: any = {};
    if (body.name) updateData.name = body.name.trim();
    if (body.slug) {
      updateData.slug = body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    if (body.description !== undefined) updateData.description = body.description;
    if (body.icon !== undefined) updateData.icon = body.icon;
    if (body.order !== undefined) updateData.order = Number(body.order);

    const updated = await PackageCategory.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("PUT /api/package-categories/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
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
      query = { slug: id.toLowerCase() };
    }

    const deleted = await PackageCategory.findOneAndDelete(query);

    if (!deleted) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/package-categories/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
