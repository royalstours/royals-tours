import mongoose, { Schema, Document } from "mongoose";

export interface IHomeAbout extends Document {
  welcomeTag: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  image: string;
  imageAlt: string;
  createdAt: Date;
  updatedAt: Date;
}

const HomeAboutSchema = new Schema<IHomeAbout>(
  {
    welcomeTag: { type: String, trim: true, default: "" },
    heading: { type: String, trim: true, default: "" },
    paragraph1: { type: String, trim: true, default: "" },
    paragraph2: { type: String, trim: true, default: "" },
    stat1Value: { type: String, trim: true, default: "" },
    stat1Label: { type: String, trim: true, default: "" },
    stat2Value: { type: String, trim: true, default: "" },
    stat2Label: { type: String, trim: true, default: "" },
    stat3Value: { type: String, trim: true, default: "" },
    stat3Label: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "" },
    imageAlt: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.HomeAbout ||
  mongoose.model<IHomeAbout>("HomeAbout", HomeAboutSchema);
