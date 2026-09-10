import mongoose, { Schema, Document } from "mongoose";

export interface IHomeAbout extends Document {
  // Banner
  bannerTag: string;
  bannerTitle: string;
  bannerSubtitle: string;

  // Intro Story
  welcomeTag: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;

  // Media (Image or Video)
  mediaType: "image" | "video";
  mediaUrl: string;
  mediaPoster?: string;
  image: string; // for backward compatibility
  imageAlt: string;

  // Values / Core Pillars
  valuesTag: string;
  valuesHeading: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;

  // Stats Counters
  stat1Value: string;
  stat1Label: string;
  stat1Sub?: string;

  stat2Value: string;
  stat2Label: string;
  stat2Sub?: string;

  stat3Value: string;
  stat3Label: string;
  stat3Sub?: string;

  createdAt: Date;
  updatedAt: Date;
}

const HomeAboutSchema = new Schema<IHomeAbout>(
  {
    bannerTag: { type: String, trim: true, default: "Our Story" },
    bannerTitle: { type: String, trim: true, default: "About Royals Tours" },
    bannerSubtitle: { type: String, trim: true, default: "Crafting majestic travel memories and pure vegetarian group holiday experiences." },

    welcomeTag: { type: String, trim: true, default: "Experience the Difference" },
    heading: { type: String, trim: true, default: "A Heritage of Trusted Travel Organization" },
    paragraph1: { type: String, trim: true, default: "" },
    paragraph2: { type: String, trim: true, default: "" },

    mediaType: { type: String, enum: ["image", "video"], default: "video" },
    mediaUrl: { type: String, trim: true, default: "https://res.cloudinary.com/dgb6durda/video/upload/v1788347407/royal_tours/za5i4d6iepgkjjclkqbl.mp4" },
    mediaPoster: { type: String, trim: true, default: "" },
    image: { type: String, trim: true, default: "https://res.cloudinary.com/dgb6durda/video/upload/v1788347407/royal_tours/za5i4d6iepgkjjclkqbl.mp4" },
    imageAlt: { type: String, trim: true, default: "Majestic Himalayan mountain landscapes and happy travelers" },

    valuesTag: { type: String, trim: true, default: "Our Values" },
    valuesHeading: { type: String, trim: true, default: "Our Core Guiding Principles" },
    pillar1Title: { type: String, trim: true, default: "Vegetarian Gastronomy" },
    pillar1Desc: { type: String, trim: true, default: "" },
    pillar2Title: { type: String, trim: true, default: "Curated Itineraries" },
    pillar2Desc: { type: String, trim: true, default: "" },
    pillar3Title: { type: String, trim: true, default: "Absolute Hospitality" },
    pillar3Desc: { type: String, trim: true, default: "" },

    stat1Value: { type: String, trim: true, default: "8000+" },
    stat1Label: { type: String, trim: true, default: "Delighted Travelers" },
    stat1Sub: { type: String, trim: true, default: "Joined our group and private holiday packages" },

    stat2Value: { type: String, trim: true, default: "50+" },
    stat2Label: { type: String, trim: true, default: "Top Global Locations" },
    stat2Sub: { type: String, trim: true, default: "Domestic wonders and exotic international getaways" },

    stat3Value: { type: String, trim: true, default: "100%" },
    stat3Label: { type: String, trim: true, default: "Pure Veg / Jain Support" },
    stat3Sub: { type: String, trim: true, default: "Private kitchen staff traveling on domestic group tours" },
  },
  { timestamps: true }
);

export default mongoose.models.HomeAbout ||
  mongoose.model<IHomeAbout>("HomeAbout", HomeAboutSchema);
