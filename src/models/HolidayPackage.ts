import mongoose, { Schema, Document } from "mongoose";

export interface IItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights?: string[];
  meals?: string;
  stay?: string;
}

export interface IFaq {
  question: string;
  answer: string;
}

export interface IPricingTier {
  name: string;
  price: string;
  rawPrice: number;
  details?: string;
}

export interface IHolidayPackage extends Document {
  name: string;
  title: string;
  slogan: string;
  category: string;
  duration: string;
  badge: string;
  price: string;
  rawPrice: number;
  image: string;
  highlights: string[];
  description: string;
  location: string;
  bestTimeToVisit: string;
  groupSize: string;
  included: string[];
  excluded: string[];
  itinerary: IItineraryDay[];
  gallery: string[];
  faqs: IFaq[];
  isFixedDeparture: boolean;
  pricingTiers?: IPricingTier[];
  pdfItineraryUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ItineraryDaySchema = new Schema<IItineraryDay>({
  day: { type: Number, required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  highlights: { type: [String], default: [] },
  meals: { type: String, trim: true },
  stay: { type: String, trim: true },
});

const FaqSchema = new Schema<IFaq>({
  question: { type: String, required: true, trim: true },
  answer: { type: String, required: true, trim: true },
});

const HolidayPackageSchema = new Schema<IHolidayPackage>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    slogan: { type: String, trim: true, default: "" },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "domestic",
    },
    duration: { type: String, required: true, trim: true },
    badge: { type: String, default: "", trim: true },
    price: { type: String, required: true, trim: true },
    rawPrice: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    highlights: { type: [String], default: [] },
    description: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    bestTimeToVisit: { type: String, default: "", trim: true },
    groupSize: { type: String, default: "", trim: true },
    included: { type: [String], default: [] },
    excluded: { type: [String], default: [] },
    itinerary: { type: [ItineraryDaySchema], default: [] },
    gallery: { type: [String], default: [] },
    faqs: { type: [FaqSchema], default: [] },
    isFixedDeparture: { type: Boolean, default: false },
    pricingTiers: {
      type: [
        {
          name: { type: String, required: true },
          price: { type: String, required: true },
          rawPrice: { type: Number, required: true },
          details: { type: String, default: "" },
        },
      ],
      default: [],
    },
    pdfItineraryUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

export default mongoose.models.HolidayPackage ||
  mongoose.model<IHolidayPackage>("HolidayPackage", HolidayPackageSchema);
