import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import HolidayPackage from "@/models/HolidayPackage";
import { detailedTravelItems } from "@/data/travelData";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.royalstours.com").replace(/\/+$/, "");

  // 1. Core static indexable pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/holiday`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-09-10"),
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date("2026-09-10"),
    },
  ];

  // 2. Collect unique canonical package slugs
  const packageMap = new Map<string, Date | undefined>();

  // Seed with all catalog package slugs
  for (const slug of Object.keys(detailedTravelItems)) {
    if (slug && !/^[0-9a-fA-F]{24}$/.test(slug)) {
      packageMap.set(slug, new Date("2026-09-08"));
    }
  }

  // Fetch live published items from MongoDB (if connected)
  try {
    const connectWithTimeout = Promise.race([
      connectDB(),
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 2500)),
    ]);
    await connectWithTimeout;

    const dbTravelItems: any[] = await TravelItem.find({}, "id _id updatedAt").maxTimeMS(2000).lean();
    for (const item of dbTravelItems) {
      const slug = item.id;
      // Filter out raw MongoDB ObjectIds (24 hex characters)
      if (slug && !/^[0-9a-fA-F]{24}$/.test(slug)) {
        packageMap.set(slug, item.updatedAt ? new Date(item.updatedAt) : new Date("2026-09-08"));
      }
    }

    const dbHolidayPackages: any[] = await HolidayPackage.find({}, "id _id updatedAt").maxTimeMS(2000).lean();
    for (const item of dbHolidayPackages) {
      const slug = item.id;
      if (slug && !/^[0-9a-fA-F]{24}$/.test(slug)) {
        packageMap.set(slug, item.updatedAt ? new Date(item.updatedAt) : new Date("2026-09-08"));
      }
    }
  } catch (err) {
    console.error("Sitemap dynamic database fetch error (falling back to static catalog):", err);
  }

  // 3. Map to clean sitemap objects without changefreq or priority
  const packagePages: MetadataRoute.Sitemap = Array.from(packageMap.entries()).map(([slug, lastModified]) => {
    const entry: { url: string; lastModified?: Date } = {
      url: `${baseUrl}/packages/${slug}`,
    };
    if (lastModified) {
      entry.lastModified = lastModified;
    }
    return entry;
  });

  return [...staticPages, ...packagePages];
}

