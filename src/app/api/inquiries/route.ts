import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Inquiry from "@/models/Inquiry";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { error: "Name, Email, and Phone are required." },
        { status: 400 }
      );
    }

    const newInquiry = await Inquiry.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      destination: body.destination || "",
      travelDate: body.travelDate || "",
      travelers: body.travelers ? Number(body.travelers) : 1,
      subject: body.subject || "",
      message: body.message || "",
      status: "pending",
      notes: "",
    });

    return NextResponse.json(newInquiry, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
