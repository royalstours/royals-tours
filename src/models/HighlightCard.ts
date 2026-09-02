import mongoose, { Schema, Document } from "mongoose";

export interface IHighlightCard extends Document {
  type: "image" | "video";
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  alt: string;
  order: number;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HighlightCardSchema = new Schema<IHighlightCard>(
  {
    type: { type: String, required: true, enum: ["image", "video"] },
    src: { type: String, required: true, trim: true },
    mobileSrc: { type: String, trim: true, default: "" },
    poster: { type: String, trim: true, default: "" },
    mobilePoster: { type: String, trim: true, default: "" },
    alt: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    badge: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    subtitle: { type: String, trim: true, default: "" },
    ctaText: { type: String, trim: true, default: "" },
    ctaLink: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.HighlightCard ||
  mongoose.model<IHighlightCard>("HighlightCard", HighlightCardSchema);
