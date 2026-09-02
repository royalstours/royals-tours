import mongoose, { Schema, Document } from "mongoose";

export interface IInvoiceItem {
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface IInvoice extends Document {
  invoiceNumber: string; // unique e.g., "INV/2026/0001"
  invoiceDate: Date;
  dueDate: Date;
  billedTo: {
    name: string;
    phone: string;
    email: string;
  };
  bookingReference: string; // e.g. "RT/2026/0001"
  paymentStatus: "Confirmed" | "Pending" | "Paid" | "Partially Paid";
  tripDetails: {
    destination: string;
    travelDates: string;
    duration: string;
    travelers: string;
    packageName: string;
    hotelCategory: string;
  };
  items: IInvoiceItem[];
  priceSummary: {
    subtotal: number;
    discount: number;
    totalAmount: number;
    amountPaid: number;
    balanceDue: number;
  };
  inclusions: string[];
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

const InvoiceItemSchema = new Schema<IInvoiceItem>({
  description: { type: String, required: true, trim: true },
  qty: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true, min: 0 },
  amount: { type: Number, required: true, min: 0 },
});

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    invoiceDate: { type: Date, required: true, default: Date.now },
    dueDate: { type: Date, required: true },
    billedTo: {
      name: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },
    bookingReference: { type: String, required: true, trim: true },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Confirmed", "Pending", "Paid", "Partially Paid"],
      default: "Confirmed",
    },
    tripDetails: {
      destination: { type: String, required: true, trim: true },
      travelDates: { type: String, required: true, trim: true },
      duration: { type: String, required: true, trim: true },
      travelers: { type: String, required: true, trim: true },
      packageName: { type: String, required: true, trim: true },
      hotelCategory: { type: String, required: true, trim: true },
    },
    items: { type: [InvoiceItemSchema], default: [] },
    priceSummary: {
      subtotal: { type: Number, required: true, min: 0 },
      discount: { type: Number, required: true, default: 0, min: 0 },
      totalAmount: { type: Number, required: true, min: 0 },
      amountPaid: { type: Number, required: true, default: 0, min: 0 },
      balanceDue: { type: Number, required: true, min: 0 },
    },
    inclusions: { type: [String], default: [] },
    importantNotes: { type: [String], default: [] },
    thankYouNote: {
      type: String,
      default: "Thank you for choosing Royals Tours. We can't wait to be part of your journey!",
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

export default mongoose.models.Invoice ||
  mongoose.model<IInvoice>("Invoice", InvoiceSchema);
