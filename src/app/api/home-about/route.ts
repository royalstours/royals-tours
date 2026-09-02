import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import HomeAbout from "@/models/HomeAbout";

const FALLBACK_ABOUT = {
  welcomeTag: "WELCOME TO EXPLORE AND UNITE",
  heading: "We Craft Travel Experiences That Bring People Together",
  paragraph1: "At Explore and Unite, we believe travel is not just about visiting places—it is about the connections you make, the laughter you share around bonfires, and memories that stay with you forever.",
  paragraph2: "Whether you are joining our curated International Group Departures across Asia & Middle East, conquering scenic mountain summits, or planning a customized holiday with loved ones, we ensure every journey is seamless and unforgettable.",
  stat1Value: "5000+",
  stat1Label: "Happy Travelers",
  stat2Value: "40+",
  stat2Label: "Global Destinations",
  stat3Value: "99%",
  stat3Label: "Satisfaction Rate",
  image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000",
  imageAlt: "Hiker overlooking scenic valley at sunset"
};

export async function GET() {
  try {
    await connectDB();
    let about = await HomeAbout.findOne({});
    if (!about) {
      // Return static fallback defaults, do not force database insertion on GET
      return NextResponse.json(FALLBACK_ABOUT);
    }
    
    // Merge database record with fallbacks for any missing/empty properties
    const data = {
      welcomeTag: about.welcomeTag || FALLBACK_ABOUT.welcomeTag,
      heading: about.heading || FALLBACK_ABOUT.heading,
      paragraph1: about.paragraph1 || FALLBACK_ABOUT.paragraph1,
      paragraph2: about.paragraph2 || FALLBACK_ABOUT.paragraph2,
      stat1Value: about.stat1Value || FALLBACK_ABOUT.stat1Value,
      stat1Label: about.stat1Label || FALLBACK_ABOUT.stat1Label,
      stat2Value: about.stat2Value || FALLBACK_ABOUT.stat2Value,
      stat2Label: about.stat2Label || FALLBACK_ABOUT.stat2Label,
      stat3Value: about.stat3Value || FALLBACK_ABOUT.stat3Value,
      stat3Label: about.stat3Label || FALLBACK_ABOUT.stat3Label,
      image: about.image || FALLBACK_ABOUT.image,
      imageAlt: about.imageAlt || FALLBACK_ABOUT.imageAlt,
      _id: about._id
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("GET /api/home-about error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch homepage about info" },
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

    let about = await HomeAbout.findOne({});
    
    const payload = {
      welcomeTag: (body.welcomeTag || "").trim(),
      heading: (body.heading || "").trim(),
      paragraph1: (body.paragraph1 || "").trim(),
      paragraph2: (body.paragraph2 || "").trim(),
      stat1Value: (body.stat1Value || "").trim(),
      stat1Label: (body.stat1Label || "").trim(),
      stat2Value: (body.stat2Value || "").trim(),
      stat2Label: (body.stat2Label || "").trim(),
      stat3Value: (body.stat3Value || "").trim(),
      stat3Label: (body.stat3Label || "").trim(),
      image: (body.image || "").trim(),
      imageAlt: (body.imageAlt || "").trim(),
    };

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
      { error: error.message || "Failed to save homepage about info" },
      { status: 500 }
    );
  }
}
