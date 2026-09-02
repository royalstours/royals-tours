import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";

export async function GET() {
  try {
    await connectDB();
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    return NextResponse.json(invoices);
  } catch (error: any) {
    console.error("GET /api/invoices error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      dueDate,
      billedTo,
      bookingReference,
      tripDetails,
      items,
      priceSummary,
    } = body;

    // Validate required fields
    if (
      !dueDate ||
      !billedTo?.name ||
      !billedTo?.phone ||
      !billedTo?.email ||
      !bookingReference ||
      !tripDetails?.destination ||
      !tripDetails?.travelDates ||
      !tripDetails?.duration ||
      !tripDetails?.travelers ||
      !tripDetails?.packageName ||
      !tripDetails?.hotelCategory ||
      !items ||
      items.length === 0 ||
      priceSummary?.subtotal === undefined ||
      priceSummary?.totalAmount === undefined ||
      priceSummary?.balanceDue === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required invoice fields." },
        { status: 400 }
      );
    }

    let invoiceNumber = body.invoiceNumber;

    // Auto-generate invoice number if not provided
    if (!invoiceNumber) {
      const year = new Date().getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59);

      // Count invoices in the current year
      const count = await Invoice.countDocuments({
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      });

      const nextNum = String(count + 1).padStart(4, "0");
      invoiceNumber = `INV/${year}/${nextNum}`;

      // Check if number is already taken
      let exists = await Invoice.findOne({ invoiceNumber });
      let increment = 1;
      while (exists) {
        const altNum = String(count + 1 + increment).padStart(4, "0");
        invoiceNumber = `INV/${year}/${altNum}`;
        exists = await Invoice.findOne({ invoiceNumber });
        increment++;
      }
    } else {
      // Check if manual number is unique
      const existing = await Invoice.findOne({ invoiceNumber });
      if (existing) {
        return NextResponse.json(
          { error: `Invoice number "${invoiceNumber}" already exists.` },
          { status: 400 }
        );
      }
    }

    const newInvoice = await Invoice.create({
      ...body,
      invoiceNumber,
    });

    return NextResponse.json(newInvoice, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/invoices error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create invoice" },
      { status: 500 }
    );
  }
}
