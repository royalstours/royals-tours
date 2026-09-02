import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BookingConfirmation from "@/models/BookingConfirmation";

export async function GET() {
  try {
    await connectDB();
    const bookings = await BookingConfirmation.find({}).sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error("GET /api/booking-confirmations error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      leadTraveler,
      totalTravelers,
      destination,
      travelDates,
      duration,
      tripDetails,
    } = body;

    // Validate required fields
    if (
      !leadTraveler?.name ||
      !leadTraveler?.phone ||
      !leadTraveler?.email ||
      !totalTravelers ||
      !destination ||
      !travelDates ||
      !duration ||
      !tripDetails?.packageName ||
      !tripDetails?.hotelCategory ||
      !tripDetails?.travelers
    ) {
      return NextResponse.json(
        { error: "Missing required booking confirmation fields." },
        { status: 400 }
      );
    }

    let bookingReference = body.bookingReference;

    // Auto-generate booking reference if not provided
    if (!bookingReference) {
      const year = new Date().getFullYear();
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59);

      // Count bookings in the current year
      const count = await BookingConfirmation.countDocuments({
        createdAt: { $gte: startOfYear, $lte: endOfYear },
      });

      const nextNum = String(count + 1).padStart(4, "0");
      bookingReference = `RT/${year}/${nextNum}`;

      // Check if reference is already taken (edge case)
      let exists = await BookingConfirmation.findOne({ bookingReference });
      let increment = 1;
      while (exists) {
        const altNum = String(count + 1 + increment).padStart(4, "0");
        bookingReference = `RT/${year}/${altNum}`;
        exists = await BookingConfirmation.findOne({ bookingReference });
        increment++;
      }
    } else {
      // Check if manual reference is unique
      const existing = await BookingConfirmation.findOne({ bookingReference });
      if (existing) {
        return NextResponse.json(
          { error: `Booking reference "${bookingReference}" already exists.` },
          { status: 400 }
        );
      }
    }

    const newBooking = await BookingConfirmation.create({
      ...body,
      bookingReference,
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/booking-confirmations error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create booking confirmation" },
      { status: 500 }
    );
  }
}
