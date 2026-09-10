import type { Metadata } from "next";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import HolidayPackage from "@/models/HolidayPackage";
import { featuredPackages, fixedDepartures } from "@/data/travelData";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  let title = "Tour Package";
  let description =
    "Explore customized tour packages with Royals Tours Ahmedabad. Pure veg group departures and curated holiday experiences.";
  let image = "/website-logo.webp";
  let location = "";

  // 1. Check local static fallback
  const staticItem =
    featuredPackages.find((p) => p.id === id) ||
    fixedDepartures.find((f) => f.id === id);

  if (staticItem) {
    title = (staticItem as any).name || (staticItem as any).destination || title;
    description =
      (staticItem as any).subtext ||
      (staticItem as any).slogan ||
      staticItem.description ||
      description;
    image = staticItem.image || image;
  }

  // 2. Check MongoDB
  try {
    await connectDB();
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { $or: [{ id }, { _id: id }] } : { id };

    const dbItem: any =
      (await TravelItem.findOne(query).lean()) ||
      (await HolidayPackage.findOne(query).lean());

    if (dbItem) {
      title = dbItem.name || dbItem.title || title;
      description = dbItem.slogan || dbItem.description?.slice(0, 160) || description;
      image = dbItem.image || image;
      location = dbItem.location || "";
    }
  } catch (err) {
    // Fallback gracefully to static data
  }

  return {
    title: `${title} | Tour Package`,
    description,
    keywords: [
      title,
      `${title} Tour Package`,
      location ? `${location} Tour` : "",
      "Royals Tours Package",
      "Pure Veg Tour",
      "Ahmedabad Tour Package",
    ].filter(Boolean),
    alternates: {
      canonical: `/packages/${id}`,
    },
    openGraph: {
      title: `${title} | Royals Tours Ahmedabad`,
      description,
      url: `/packages/${id}`,
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

export default function PackageDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
