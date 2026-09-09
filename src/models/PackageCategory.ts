import mongoose, { Schema, Document } from "mongoose";

export interface IPackageCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PackageCategorySchema = new Schema<IPackageCategory>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, required: true, trim: true, unique: true, lowercase: true },
    description: { type: String, default: "", trim: true },
    icon: { type: String, default: "🧳", trim: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.models.PackageCategory ||
  mongoose.model<IPackageCategory>("PackageCategory", PackageCategorySchema);
