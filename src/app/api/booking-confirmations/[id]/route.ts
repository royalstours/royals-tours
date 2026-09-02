import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BookingConfirmation from "@/models/BookingConfirmation";
import mongoose from "mongoose";

async function findBooking(identifier: string) {
  let booking = await BookingConfirmation.findOne({ bookingReference: decodeURIComponent(identifier) });
  if (!booking && mongoose.Types.ObjectId.isValid(identifier)) {
    booking = await BookingConfirmation.findById(identifier);
  }
  return booking;
}

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await props.params;
    const { id } = resolvedParams;

    await connectDB();
    const booking = await findBooking(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking confirmation not found" }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error: any) {
    console.error("GET /api/booking-confirmations/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch booking confirmation" },
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
    const booking = await findBooking(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking confirmation not found" }, { status: 404 });
    }

    // If changing booking reference, ensure it remains unique
    if (body.bookingReference && body.bookingReference !== booking.bookingReference) {
      const existing = await BookingConfirmation.findOne({ bookingReference: body.bookingReference });
      if (existing) {
        return NextResponse.json(
          { error: `Booking reference "${body.bookingReference}" is already in use.` },
          { status: 400 }
        );
      }
    }

    const updatedBooking = await BookingConfirmation.findByIdAndUpdate(
      booking._id,
      { $set: body },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedBooking);
  } catch (error: any) {
    console.error("PUT /api/booking-confirmations/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update booking confirmation" },
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
    const booking = await findBooking(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking confirmation not found" }, { status: 404 });
    }

    await BookingConfirmation.findByIdAndDelete(booking._id);
    return NextResponse.json({ message: "Booking confirmation deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/booking-confirmations/[id] error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete booking confirmation" },
      { status: 500 }
    );
  }
}
