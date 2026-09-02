import mongoose, { Schema, Document } from "mongoose";

export interface IHeroSlide extends Document {
  type: "image" | "video";
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSlideSchema = new Schema<IHeroSlide>(
  {
    type: { type: String, required: true, enum: ["image", "video"] },
    src: { type: String, required: true, trim: true },
    mobileSrc: { type: String, trim: true, default: "" },
    poster: { type: String, trim: true, default: "" },
    mobilePoster: { type: String, trim: true, default: "" },
    alt: { type: String, required: true, trim: true },
    badge: { type: String, trim: true, default: "" },
    title: { type: String, trim: true, default: "" },
    subtitle: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.HeroSlide ||
  mongoose.model<IHeroSlide>("HeroSlide", HeroSlideSchema);
