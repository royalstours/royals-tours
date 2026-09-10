import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import HolidayPackage from "@/models/HolidayPackage";
import { fixedDepartures, featuredPackages } from "@/data/travelData";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://royalstours.in";
  const now = new Date();

  // Core static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
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

  // Dynamic route collectors
  const packageEntries = new Map<string, { lastModified: Date; isFixedDeparture?: boolean }>();
  const destinationEntries = new Map<string, Date>();

  // 1. Seed with local fallback data
  for (const item of featuredPackages) {
    if (item.id) {
      packageEntries.set(String(item.id), { lastModified: now, isFixedDeparture: false });
    }
  }

  for (const fd of fixedDepartures) {
    if (fd.id) {
      const idStr = String(fd.id);
      packageEntries.set(idStr, { lastModified: now, isFixedDeparture: true });
      destinationEntries.set(idStr, now);
    }
  }

  // 2. Fetch live data from MongoDB
  try {
    await connectDB();

    const dbTravelItems: any[] = await TravelItem.find(
      {},
      "id _id updatedAt isFixedDeparture"
    ).lean();

    for (const item of dbTravelItems) {
      const id = String(item.id || item._id);
      const lastModified = item.updatedAt ? new Date(item.updatedAt) : now;
      packageEntries.set(id, {
        lastModified,
        isFixedDeparture: Boolean(item.isFixedDeparture),
      });

      if (item.isFixedDeparture) {
        destinationEntries.set(id, lastModified);
      }
    }

    const dbHolidayPackages: any[] = await HolidayPackage.find(
      {},
      "id _id updatedAt isFixedDeparture"
    ).lean();

    for (const item of dbHolidayPackages) {
      const id = String(item.id || item._id);
      const lastModified = item.updatedAt ? new Date(item.updatedAt) : now;
      packageEntries.set(id, {
        lastModified,
        isFixedDeparture: Boolean(item.isFixedDeparture),
      });
    }
  } catch (err) {
    console.error("Sitemap dynamic database fetch error (falling back to static catalog):", err);
  }

  // Convert package entries to sitemap items
  const dynamicPackageRoutes: MetadataRoute.Sitemap = Array.from(packageEntries.entries()).map(
    ([id, meta]) => ({
      url: `${baseUrl}/packages/${id}`,
      lastModified: meta.lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  // Convert destination entries to sitemap items
  const dynamicDestinationRoutes: MetadataRoute.Sitemap = Array.from(destinationEntries.entries()).map(
    ([id, lastModified]) => ({
      url: `${baseUrl}/destinations/${id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticRoutes, ...dynamicPackageRoutes, ...dynamicDestinationRoutes];
}
