import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Invoice from "@/models/Invoice";
import mongoose from "mongoose";

async function findInvoice(identifier: string) {
  let invoice = await Invoice.findOne({ invoiceNumber: decodeURIComponent(identifier) });
  if (!invoice && mongoose.Types.ObjectId.isValid(identifier)) {
    invoice = await Invoice.findById(identifier);
  }
  return invoice;
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    await connectDB();
    const invoice = await findInvoice(id);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json(invoice);
  } catch (error: any) {
    console.error("GET /api/invoices/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch invoice" },
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
    const invoice = await findInvoice(id);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // If changing invoice number, ensure it remains unique
    if (body.invoiceNumber && body.invoiceNumber !== invoice.invoiceNumber) {
      const existing = await Invoice.findOne({ invoiceNumber: body.invoiceNumber });
      if (existing) {
        return NextResponse.json(
          { error: `Invoice number "${body.invoiceNumber}" is already in use.` },
          { status: 400 }
        );
      }
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      invoice._id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedInvoice);
  } catch (error: any) {
    console.error("PUT /api/invoices/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update invoice" },
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
    const invoice = await findInvoice(id);

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    await Invoice.findByIdAndDelete(invoice._id);
    return NextResponse.json({ message: "Invoice deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/invoices/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete invoice" },
      { status: 500 }
    );
  }
}
