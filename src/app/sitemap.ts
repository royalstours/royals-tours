import type { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import HolidayPackage from "@/models/HolidayPackage";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";
import { detailedTravelItems, featuredPackages, fixedDepartures } from "@/data/travelData";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.royalstours.com").replace(/\/+$/, "");
  const now = new Date();

  // 1. High-priority core public pages
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

  // 2. Map of dynamic URLs to prevent duplicates and ensure clean metadata
  const dynamicUrlMap = new Map<
    string,
    {
      url: string;
      lastModified: Date;
      changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
      priority: number;
    }
  >();

  const registerUrl = (
    path: string,
    lastModified: Date = now,
    changeFrequency: "daily" | "weekly" | "monthly" | "yearly" = "weekly",
    priority = 0.8
  ) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const fullUrl = `${baseUrl}${cleanPath}`;
    if (!dynamicUrlMap.has(fullUrl)) {
      dynamicUrlMap.set(fullUrl, {
        url: fullUrl,
        lastModified,
        changeFrequency,
        priority,
      });
    }
  };

  // Seed with catalog packages from travelData
  Object.keys(detailedTravelItems || {}).forEach((slug) => {
    if (slug) {
      registerUrl(`/packages/${slug}`, now, "weekly", 0.8);
    }
  });

  (featuredPackages || []).forEach((pkg) => {
    if (pkg.id) {
      registerUrl(`/packages/${pkg.id}`, now, "weekly", 0.8);
    }
  });

  (fixedDepartures || []).forEach((fd) => {
    if (fd.id) {
      registerUrl(`/packages/${fd.id}`, now, "weekly", 0.8);
      registerUrl(`/destinations/${fd.id}`, now, "weekly", 0.8);
    }
  });

  // Query MongoDB collections with resilient timeout
  try {
    const connectPromise = Promise.race([
      connectDB(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("MongoDB connection timeout in sitemap")), 2500)
      ),
    ]);
    await connectPromise;

    const [travelItems, holidayPackages, domesticItems, internationalItems] = await Promise.all([
      TravelItem.find({}, "id _id isFixedDeparture updatedAt").maxTimeMS(2000).lean(),
      HolidayPackage.find({}, "id _id updatedAt").maxTimeMS(2000).lean(),
      DomesticTravelItem.find({}, "id _id updatedAt").maxTimeMS(2000).lean(),
      InternationalTravelItem.find({}, "id _id updatedAt").maxTimeMS(2000).lean(),
    ]);

    (travelItems || []).forEach((item: any) => {
      const slug = item.id || item._id?.toString();
      const lastMod = item.updatedAt ? new Date(item.updatedAt) : now;
      if (slug) {
        registerUrl(`/packages/${slug}`, lastMod, "weekly", 0.8);
        if (item.isFixedDeparture) {
          registerUrl(`/destinations/${slug}`, lastMod, "weekly", 0.8);
        }
      }
    });

    (holidayPackages || []).forEach((item: any) => {
      const slug = item.id || item._id?.toString();
      const lastMod = item.updatedAt ? new Date(item.updatedAt) : now;
      if (slug) {
        registerUrl(`/packages/${slug}`, lastMod, "weekly", 0.8);
      }
    });

    (domesticItems || []).forEach((item: any) => {
      const slug = item.id || item._id?.toString();
      const lastMod = item.updatedAt ? new Date(item.updatedAt) : now;
      if (slug) {
        registerUrl(`/packages/${slug}`, lastMod, "weekly", 0.8);
        registerUrl(`/destinations/${slug}`, lastMod, "weekly", 0.8);
      }
    });

    (internationalItems || []).forEach((item: any) => {
      const slug = item.id || item._id?.toString();
      const lastMod = item.updatedAt ? new Date(item.updatedAt) : now;
      if (slug) {
        registerUrl(`/packages/${slug}`, lastMod, "weekly", 0.8);
        registerUrl(`/destinations/${slug}`, lastMod, "weekly", 0.8);
      }
    });
  } catch (err) {
    console.error("Sitemap dynamic database resolution note:", err);
  }

  const dynamicRoutes: MetadataRoute.Sitemap = Array.from(dynamicUrlMap.values());

  return [...staticRoutes, ...dynamicRoutes];
}
