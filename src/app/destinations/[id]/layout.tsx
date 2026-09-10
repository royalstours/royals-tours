import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import { getDestinationById } from "@/data/travelData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let title = "Destination Departure";
  let description =
    "Scheduled pure veg group tour departure with dedicated private kitchen cooks by Royals Tours Ahmedabad.";
  let image = "/website-logo.webp";
  let location = "";

  // 1. Check local static fallback
  const staticItem = getDestinationById(id);
  if (staticItem) {
    title = (staticItem as any).destination || staticItem.name || staticItem.title || title;
    description = staticItem.slogan || staticItem.description?.slice(0, 160) || description;
    image = staticItem.image || image;
    location = staticItem.location || "";
  }

  // 2. Check MongoDB
  try {
    await connectDB();
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };

    const dbItem: any = await TravelItem.findOne(query).lean();
    if (dbItem) {
      title = dbItem.destination || dbItem.name || dbItem.title || title;
      description = dbItem.slogan || dbItem.description?.slice(0, 160) || description;
      image = dbItem.image || image;
      location = dbItem.location || location;
    }
  } catch (err) {
    // Fallback gracefully
  }

  return {
    title: `${title} | Fixed Departure | Royals Tours`,
    description,
    keywords: [
      title,
      `${title} Fixed Departure`,
      `${title} Veg Group Tour`,
      location ? `${location} Tour` : "",
      "Pure Veg Group Tour Ahmedabad",
      "Maharaj Kitchen Tour",
    ].filter(Boolean),
    alternates: {
      canonical: `/destinations/${id}`,
    },
    openGraph: {
      title: `${title} | Veg Group Departure | Royals Tours`,
      description,
      url: `/destinations/${id}`,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Royals Tours`,
      description,
      images: [image],
    },
  };
}

export default function DestinationDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
