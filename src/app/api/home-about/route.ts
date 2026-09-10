import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HomeAbout from "@/models/HomeAbout";

const FALLBACK_ABOUT = {
  bannerTag: "Our Story",
  bannerTitle: "About Royals Tours",
  bannerSubtitle: "Crafting majestic travel memories and pure vegetarian group holiday experiences.",

  welcomeTag: "Experience the Difference",
  heading: "A Heritage of Trusted Travel Organization",
  paragraph1: "Based in the heart of Ahmedabad, Royals Tours was founded to bring families, couples, and group travelers together. We specialize in making travel completely stress-free, comfortable, and safe.",
  paragraph2: "Our unique domestic group tours travel with their own catering staff, offering freshly prepared Swaminarayan, Jain, and Pure Vegetarian meals. No matter if you are climbing the heights of Tawang, exploring the backwaters of Kerala, or flying to the exotic beaches of Bali and Vietnam, we ensure you travel like royalty.",

  mediaType: "video",
  mediaUrl: "https://res.cloudinary.com/dgb6durda/video/upload/v1788347407/royal_tours/za5i4d6iepgkjjclkqbl.mp4",
  mediaPoster: "",
  image: "https://res.cloudinary.com/dgb6durda/video/upload/v1788347407/royal_tours/za5i4d6iepgkjjclkqbl.mp4",
  imageAlt: "Majestic Himalayan mountain landscapes and happy travelers",

  valuesTag: "Our Values",
  valuesHeading: "Our Core Guiding Principles",
  pillar1Title: "Vegetarian Gastronomy",
  pillar1Desc: "We believe good food is essential to a happy holiday. Traveling with our cooks ensures our guests never compromise on fresh Swaminarayan and Jain dietary preferences.",
  pillar2Title: "Curated Itineraries",
  pillar2Desc: "Our tour paths are balanced and researched. We mix must-see cultural icons (like Paro Taktsang or Golden Bridge) with scenic leisure stops and time for local shopping.",
  pillar3Title: "Absolute Hospitality",
  pillar3Desc: "We treat every traveler as a member of the Royals Tours family. Our dedicated tour managers provide warm, attentive coordination from departure to return.",

  stat1Value: "8000+",
  stat1Label: "Delighted Travelers",
  stat1Sub: "Joined our group and private holiday packages",

  stat2Value: "50+",
  stat2Label: "Top Global Locations",
  stat2Sub: "Domestic wonders and exotic international getaways",

  stat3Value: "100%",
  stat3Label: "Pure Veg / Jain Support",
  stat3Sub: "Private kitchen staff traveling on domestic group tours",
};

export async function GET() {
  try {
    await connectDB();
    let about = await HomeAbout.findOne({});
    if (!about) {
      return NextResponse.json(FALLBACK_ABOUT);
    }

    const data = {
      bannerTag: about.bannerTag || FALLBACK_ABOUT.bannerTag,
      bannerTitle: about.bannerTitle || FALLBACK_ABOUT.bannerTitle,
      bannerSubtitle: about.bannerSubtitle || FALLBACK_ABOUT.bannerSubtitle,

      welcomeTag: about.welcomeTag || FALLBACK_ABOUT.welcomeTag,
      heading: about.heading || FALLBACK_ABOUT.heading,
      paragraph1: about.paragraph1 || FALLBACK_ABOUT.paragraph1,
      paragraph2: about.paragraph2 || FALLBACK_ABOUT.paragraph2,

      mediaType: about.mediaType || (about.mediaUrl && /\.(mp4|webm|mov)$/i.test(about.mediaUrl) ? "video" : "image"),
      mediaUrl: about.mediaUrl || about.image || FALLBACK_ABOUT.mediaUrl,
      mediaPoster: about.mediaPoster || "",
      image: about.image || about.mediaUrl || FALLBACK_ABOUT.image,
      imageAlt: about.imageAlt || FALLBACK_ABOUT.imageAlt,

      valuesTag: about.valuesTag || FALLBACK_ABOUT.valuesTag,
      valuesHeading: about.valuesHeading || FALLBACK_ABOUT.valuesHeading,
      pillar1Title: about.pillar1Title || FALLBACK_ABOUT.pillar1Title,
      pillar1Desc: about.pillar1Desc || FALLBACK_ABOUT.pillar1Desc,
      pillar2Title: about.pillar2Title || FALLBACK_ABOUT.pillar2Title,
      pillar2Desc: about.pillar2Desc || FALLBACK_ABOUT.pillar2Desc,
      pillar3Title: about.pillar3Title || FALLBACK_ABOUT.pillar3Title,
      pillar3Desc: about.pillar3Desc || FALLBACK_ABOUT.pillar3Desc,

      stat1Value: about.stat1Value || FALLBACK_ABOUT.stat1Value,
      stat1Label: about.stat1Label || FALLBACK_ABOUT.stat1Label,
      stat1Sub: about.stat1Sub || FALLBACK_ABOUT.stat1Sub,

      stat2Value: about.stat2Value || FALLBACK_ABOUT.stat2Value,
      stat2Label: about.stat2Label || FALLBACK_ABOUT.stat2Label,
      stat2Sub: about.stat2Sub || FALLBACK_ABOUT.stat2Sub,

      stat3Value: about.stat3Value || FALLBACK_ABOUT.stat3Value,
      stat3Label: about.stat3Label || FALLBACK_ABOUT.stat3Label,
      stat3Sub: about.stat3Sub || FALLBACK_ABOUT.stat3Sub,

      _id: about._id,
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /api/home-about error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch about us info" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const mediaUrl = (body.mediaUrl || body.image || "").trim();
    const isVideo = body.mediaType === "video" || /\.(mp4|webm|mov|m4v|mkv|avi)$/i.test(mediaUrl);
    const mediaType = isVideo ? "video" : "image";

    const payload = {
      bannerTag: (body.bannerTag || FALLBACK_ABOUT.bannerTag).trim(),
      bannerTitle: (body.bannerTitle || FALLBACK_ABOUT.bannerTitle).trim(),
      bannerSubtitle: (body.bannerSubtitle || FALLBACK_ABOUT.bannerSubtitle).trim(),

      welcomeTag: (body.welcomeTag || FALLBACK_ABOUT.welcomeTag).trim(),
      heading: (body.heading || FALLBACK_ABOUT.heading).trim(),
      paragraph1: (body.paragraph1 || "").trim(),
      paragraph2: (body.paragraph2 || "").trim(),

      mediaType,
      mediaUrl,
      mediaPoster: (body.mediaPoster || "").trim(),
      image: mediaUrl, // sync for backward compatibility
      imageAlt: (body.imageAlt || FALLBACK_ABOUT.imageAlt).trim(),

      valuesTag: (body.valuesTag || FALLBACK_ABOUT.valuesTag).trim(),
      valuesHeading: (body.valuesHeading || FALLBACK_ABOUT.valuesHeading).trim(),
      pillar1Title: (body.pillar1Title || FALLBACK_ABOUT.pillar1Title).trim(),
      pillar1Desc: (body.pillar1Desc || "").trim(),
      pillar2Title: (body.pillar2Title || FALLBACK_ABOUT.pillar2Title).trim(),
      pillar2Desc: (body.pillar2Desc || "").trim(),
      pillar3Title: (body.pillar3Title || FALLBACK_ABOUT.pillar3Title).trim(),
      pillar3Desc: (body.pillar3Desc || "").trim(),

      stat1Value: (body.stat1Value || FALLBACK_ABOUT.stat1Value).trim(),
      stat1Label: (body.stat1Label || FALLBACK_ABOUT.stat1Label).trim(),
      stat1Sub: (body.stat1Sub || FALLBACK_ABOUT.stat1Sub).trim(),

      stat2Value: (body.stat2Value || FALLBACK_ABOUT.stat2Value).trim(),
      stat2Label: (body.stat2Label || FALLBACK_ABOUT.stat2Label).trim(),
      stat2Sub: (body.stat2Sub || FALLBACK_ABOUT.stat2Sub).trim(),

      stat3Value: (body.stat3Value || FALLBACK_ABOUT.stat3Value).trim(),
      stat3Label: (body.stat3Label || FALLBACK_ABOUT.stat3Label).trim(),
      stat3Sub: (body.stat3Sub || FALLBACK_ABOUT.stat3Sub).trim(),
    };

    let about = await HomeAbout.findOne({});

    if (about) {
      about = await HomeAbout.findByIdAndUpdate(
        about._id,
        { $set: payload },
        { new: true, runValidators: true }
      );
    } else {
      about = await HomeAbout.create(payload);
    }

    return NextResponse.json(about);
  } catch (error: any) {
    console.error("PUT /api/home-about error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save about us info" },
      { status: 500 }
    );
  }
}
