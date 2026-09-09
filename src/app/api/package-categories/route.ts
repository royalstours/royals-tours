import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PackageCategory from "@/models/PackageCategory";

export async function GET() {
  try {
    await connectDB();
    const categories = await PackageCategory.find().sort({ order: 1, createdAt: 1 });
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error("GET /api/package-categories error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch package categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const name = body.name.trim();
    let slug = body.slug ? body.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "";
    if (!slug) {
      slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    }

    // Check if category name or slug already exists
    const existing = await PackageCategory.findOne({
      $or: [{ name: new RegExp(`^${name}$`, "i") }, { slug }]
    });

    if (existing) {
      return NextResponse.json(
        { error: `Category "${name}" or slug "${slug}" already exists.` },
        { status: 400 }
      );
    }

    const count = await PackageCategory.countDocuments();

    const category = await PackageCategory.create({
      name,
      slug,
      description: body.description || "",
      icon: body.icon || "🧳",
      order: body.order !== undefined ? Number(body.order) : count,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/package-categories error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create package category" },
      { status: 500 }
    );
  }
}
