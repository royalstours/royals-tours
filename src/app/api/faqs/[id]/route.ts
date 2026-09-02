import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import mongoose from "mongoose";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID." }, { status: 400 });
    }

    await connectDB();
    const item = await FAQ.findById(id);
    if (!item) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error("GET /api/faqs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch FAQ" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const item = await FAQ.findById(id);
    if (!item) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    const { question, answer, category, order } = body;

    const updatedData: any = {};
    if (question !== undefined) updatedData.question = question.trim();
    if (answer !== undefined) updatedData.answer = answer.trim();
    if (category !== undefined) updatedData.category = category ? category.trim() : "general";
    if (order !== undefined) updatedData.order = Number(order);

    const updatedItem = await FAQ.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error("PUT /api/faqs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid FAQ ID." }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();

    const item = await FAQ.findById(id);
    if (!item) {
      return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
    }

    await FAQ.findByIdAndDelete(id);

    return NextResponse.json({ message: "FAQ deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/faqs/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
