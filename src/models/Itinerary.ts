import mongoose, { Schema, Document } from "mongoose";

export interface IItineraryDay {
  dayNum: number;
  title: string;
  description: string;
  image: string; // Cloudinary or public image URL
}

export interface IItinerary extends Document {
  itineraryNumber: string; // e.g., "ITN/2026/0001"
  packageName: string; // e.g. "Azerbaijan Tour"
  subtitle: string; // e.g. "Your Journey, Your Way"
  durationText: string; // e.g. "6 DAYS | 5 NIGHTS"
  price: string; // e.g. "₹ 49,999"
  priceSuffix: string; // e.g. "PER PERSON"
  priceValidity: string; // e.g. "31st Oct 2026"
  days: IItineraryDay[]; // up to 6 days
  whatsIncluded: {
    stay: string;
    meals: string;
    transfers: string;
    tours: string;
    entries: string;
    support: string;
  };
  inclusions: string[];
  exclusions: string[];
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryDaySchema = new Schema<IItineraryDay>({
  dayNum: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  image: { type: String, required: true, default: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600" },
});

const ItinerarySchema = new Schema<IItinerary>(
  {
    itineraryNumber: { type: String, required: true, unique: true, trim: true },
    packageName: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, default: "Your Journey, Your Way", trim: true },
    durationText: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    priceSuffix: { type: String, required: true, default: "PER PERSON", trim: true },
    priceValidity: { type: String, required: true, trim: true },
    days: { type: [ItineraryDaySchema], default: [] },
    whatsIncluded: {
      stay: { type: String, default: "Comfortable accommodation on twin sharing basis as per itinerary" },
      meals: { type: String, default: "Daily breakfast at the hotel" },
      transfers: { type: String, default: "All transfers & sightseeing by private AC vehicle" },
      tours: { type: String, default: "All tours & activities as per itinerary" },
      entries: { type: String, default: "Entry fees to all attractions mentioned in the itinerary" },
      support: { type: String, default: "Assistance during the trip 24/7 support" },
    },
    inclusions: { type: [String], default: [] },
    exclusions: { type: [String], default: [] },
    notes: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Itinerary ||
  mongoose.model<IItinerary>("Itinerary", ItinerarySchema);
