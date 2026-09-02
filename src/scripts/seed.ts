import { connectDB } from "../lib/mongodb";
import TravelItem from "../models/TravelItem";
import DomesticTravelItem from "../models/DomesticTravelItem";
import InternationalTravelItem from "../models/InternationalTravelItem";
import User from "../models/User";
import FAQ from "../models/FAQ";
import TopRatedLocation from "../models/TopRatedLocation";
import GalleryItem from "../models/GalleryItem";
import { detailedTravelItems, comprehensiveFaqs, galleryImages } from "../data/travelData";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected successfully.");

    // 1. Seed admin user
    const envEmail = process.env.ADMIN_EMAIL || "royalstours.amd@gmail.com";
    const envPassword = process.env.ADMIN_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(envPassword, 10);

    console.log("Seeding admin user...");
    const seededUser = await User.findOneAndUpdate(
      { email: envEmail.toLowerCase() },
      {
        name: "Royals Tours Admin",
        email: envEmail.toLowerCase(),
        password: hashedPassword,
        role: "admin",
      },
      { upsert: true, new: true }
    );
    console.log(`Admin user seeded: ${seededUser.email}`);

    // 2. Seed travel items
    console.log("Seeding travel items...");
    const itemsToSeed = Object.values(detailedTravelItems);
    
    // Clear both collections by dropping them to remove old indexes
    try {
      await DomesticTravelItem.collection.drop();
    } catch (e) {
      console.log("DomesticTravelItem collection drop ignored");
    }
    try {
      await InternationalTravelItem.collection.drop();
    } catch (e) {
      console.log("InternationalTravelItem collection drop ignored");
    }
    console.log("Cleared existing Domestic and International collections by dropping.");

    let domesticCount = 0;
    let internationalCount = 0;

    for (let i = 0; i < itemsToSeed.length; i++) {
      const item = itemsToSeed[i];
      
      const payload = {
        name: item.name || item.title || "Tour Package",
        title: item.title || item.name || "Tour Package",
        slogan: item.slogan || "",
        category: item.category || "domestic",
        duration: item.duration || "Nights / Days",
        badge: item.badge || "",
        price: item.price || "Contact Us",
        rawPrice: item.rawPrice || 0,
        image: item.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
        highlights: item.highlights || [],
        description: item.description || item.title || item.name || "Package details",
        location: item.location || "India",
        bestTimeToVisit: item.bestTimeToVisit || "",
        groupSize: item.groupSize || "",
        included: item.included || [],
        excluded: item.excluded || [],
        itinerary: (item.itinerary || []).map((day: any) => ({
          day: day.day,
          title: day.title || "Day Highlight",
          description: day.description || day.title || "Day itinerary details",
          highlights: day.highlights || [],
          meals: day.meals || "",
          stay: day.stay || "",
        })),
        gallery: item.gallery || [],
        faqs: (item.faqs || []).map((faq: any) => ({
          question: faq.question || "FAQ Question",
          answer: faq.answer || "FAQ Answer",
        })),
        isFixedDeparture: !!item.isFixedDeparture,
        pricingTiers: item.pricingTiers || [],
        pdfItineraryUrl: item.pdfItineraryUrl || "",
      };

      if (item.category === "domestic") {
        await DomesticTravelItem.findOneAndUpdate(
          { title: item.title || item.name },
          { ...payload, order: domesticCount },
          { upsert: true, new: true, runValidators: true }
        );
        domesticCount++;
      } else {
        await InternationalTravelItem.findOneAndUpdate(
          { title: item.title || item.name },
          { ...payload, order: internationalCount },
          { upsert: true, new: true, runValidators: true }
        );
        internationalCount++;
      }
    }
    console.log(`Seeded ${domesticCount} domestic and ${internationalCount} international travel packages.`);

    // 3. Seed top rated locations
    console.log("Seeding top rated locations...");
    const defaultTopLocations = [
      {
        name: "Kashmir",
        image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=600",
        link: "/packages/kashmir",
        order: 1,
      },
      {
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600",
        link: "/packages/bali-cost-saver-ii-summer-2026",
        order: 2,
      },
      {
        name: "Chardham Yatra",
        image: "https://images.unsplash.com/photo-1602631985686-2bb060a9e20e?q=80&w=600",
        link: "/packages/chardham-yatra",
        order: 3,
      },
      {
        name: "Vietnam Wonders",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=600",
        link: "/packages/vietnam-wonders-explorer",
        order: 4,
      },
      {
        name: "Leh Ladakh",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600",
        link: "/packages/majestic-leh-ladakh-adventure",
        order: 5,
      },
      {
        name: "Goa Getaway",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
        link: "/packages/go-goa-vacation-package",
        order: 6,
      },
      {
        name: "Royals Kerala",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=600",
        link: "/packages/royal-kerala",
        order: 7,
      },
      {
        name: "Singapore & Cruise",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600",
        link: "/packages/singapore-cruise-malaysia",
        order: 8,
      },
      {
        name: "Bhutan Himalayan",
        image: "https://images.unsplash.com/photo-1544811096-89a14f806d55?q=80&w=600",
        link: "/packages/bhutan-himalayan",
        order: 9,
      },
      {
        name: "Assam & Meghalaya",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?q=80&w=600",
        link: "/packages/assam-meghalaya-tour",
        order: 10,
      },
    ];

    for (const loc of defaultTopLocations) {
      await TopRatedLocation.findOneAndUpdate(
        { name: loc.name },
        { ...loc },
        { upsert: true, new: true }
      );
    }
    console.log(`Seeded ${defaultTopLocations.length} top locations.`);

    // 4. Seed FAQs
    console.log("Seeding FAQs...");
    const seededFaqsCount = await FAQ.countDocuments();
    if (seededFaqsCount === 0) {
      const faqsToSeed = comprehensiveFaqs.map((faq, idx) => ({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: idx,
      }));
      await FAQ.insertMany(faqsToSeed);
      console.log(`Seeded ${faqsToSeed.length} FAQs.`);
    } else {
      console.log(`${seededFaqsCount} FAQs already exist.`);
    }

    // 5. Seed Gallery Items
    console.log("Seeding Gallery Items...");
    try {
      await GalleryItem.collection.drop();
    } catch (e) {
      console.log("GalleryItem collection drop ignored");
    }
    const photosToSeed = galleryImages.map((img, idx) => ({
      title: img.title,
      location: img.location,
      category: img.category,
      image: img.image,
      caption: img.caption,
      order: idx,
    }));
    await GalleryItem.insertMany(photosToSeed);
    console.log(`Seeded ${photosToSeed.length} Gallery items.`);

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
