import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import FAQ from "@/models/FAQ";

export async function GET() {
  try {
    await connectDB();
    const list = await FAQ.find({}).sort({ order: 1, createdAt: -1 });
    return NextResponse.json(list);
  } catch (error: any) {
    console.error("GET /api/faqs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch FAQs" },
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

    const { question, answer, category, order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required." },
        { status: 400 }
      );
    }

    const newFAQ = await FAQ.create({
      question: question.trim(),
      answer: answer.trim(),
      category: category ? category.trim() : "general",
      order: order !== undefined ? Number(order) : 0,
    });

    return NextResponse.json(newFAQ, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/faqs error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
