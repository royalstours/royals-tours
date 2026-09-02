import mongoose, { Schema, Document } from "mongoose";

export interface IBookingConfirmation extends Document {
  bookingReference: string; // unique reference e.g., "RT/2026/0001"
  bookingDate: Date;
  leadTraveler: {
    name: string;
    phone: string;
    email: string;
  };
  totalTravelers: string; // e.g. "2 Adults"
  destination: string; // e.g. "Phuket, Krabi, Koh Samui, Thailand"
  travelDates: string; // e.g. "20 Nov 2026 – 27 Nov 2026"
  duration: string; // e.g. "7 Nights / 8 Days"
  inclusions: string[];
  tripDetails: {
    packageName: string;
    hotelCategory: string;
    travelers: string;
    checkIn: string; // e.g. "02:00 PM"
    checkOut: string; // e.g. "11:00 AM"
    packageType: string;
    travelStyle: string;
  };
  importantNotes: string[];
  thankYouNote: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    instagram: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BookingConfirmationSchema = new Schema<IBookingConfirmation>(
  {
    bookingReference: { type: String, required: true, unique: true, trim: true },
    bookingDate: { type: Date, required: true, default: Date.now },
    leadTraveler: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
    totalTravelers: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    travelDates: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    inclusions: { type: [String], default: [] },
    tripDetails: {
      packageName: { type: String, required: true, trim: true },
      hotelCategory: { type: String, required: true, trim: true },
      travelers: { type: String, required: true, trim: true },
      checkIn: { type: String, required: true, trim: true, default: "02:00 PM" },
      checkOut: { type: String, required: true, trim: true, default: "11:00 AM" },
      packageType: { type: String, required: true, trim: true, default: "International Leisure" },
      travelStyle: { type: String, required: true, trim: true, default: "Leisure / Group Tour" },
    },
    importantNotes: { type: [String], default: [] },
    thankYouNote: {
      type: String,
      default: "Your journey is confirmed. Get ready to create unforgettable memories with Royals Tours!",
    },
    contactInfo: {
      phone: { type: String, default: "+91 97238 20277" },
      email: { type: String, default: "royalstours.amd@gmail.com" },
      website: { type: String, default: "royaltoursahmedabad.com" },
      instagram: { type: String, default: "@royal_tours" },
    },
  },
  { timestamps: true }
);

export default mongoose.models.BookingConfirmation ||
  mongoose.model<IBookingConfirmation>("BookingConfirmation", BookingConfirmationSchema);
