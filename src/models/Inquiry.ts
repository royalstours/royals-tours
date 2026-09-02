import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  destination?: string;
  travelDate?: string;
  travelers?: number;
  subject?: string;
  message?: string;
  status: "pending" | "contacted" | "booked" | "cancelled";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    destination: { type: String, trim: true, default: "" },
    travelDate: { type: String, trim: true, default: "" },
    travelers: { type: Number, default: 1 },
    subject: { type: String, trim: true, default: "" },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "contacted", "booked", "cancelled"],
      default: "pending",
    },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
