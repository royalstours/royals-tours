import mongoose, { Schema, Document } from "mongoose";

export interface IFileAsset extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

const FileAssetSchema: Schema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
      default: "application/pdf",
    },
    data: {
      type: Buffer,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FileAsset ||
  mongoose.model<IFileAsset>("FileAsset", FileAssetSchema);
