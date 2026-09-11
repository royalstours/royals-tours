import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import HolidayPackage from "@/models/HolidayPackage";
import { detailedTravelItems } from "@/data/travelData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.royalstours.com").replace(/\/+$/, "");
  const now = new Date();

  // 1. Core static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/holiday`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/destinations`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
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
    console.error("Sitemap dynamic database fetch error (using static catalog):", err);
  }

  // 3. Map to clean sitemap objects
  const packagePages: MetadataRoute.Sitemap = Array.from(packageMap.entries()).map(([slug, lastModified]) => ({
    url: `${baseUrl}/packages/${slug}`,
    lastModified: lastModified || now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...packagePages];
}
