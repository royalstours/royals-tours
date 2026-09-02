import mongoose, { Schema, Document } from "mongoose";

export interface ITopRatedLocation extends Document {
  name: string;
  image: string;
  link?: string;
  inquiryName?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopRatedLocationSchema = new Schema<ITopRatedLocation>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, trim: true, default: "" },
    inquiryName: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.TopRatedLocation ||
  mongoose.model<ITopRatedLocation>("TopRatedLocation", TopRatedLocationSchema);
