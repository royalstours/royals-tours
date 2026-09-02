import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import TravelItem from "@/models/TravelItem";
import DomesticTravelItem from "@/models/DomesticTravelItem";
import InternationalTravelItem from "@/models/InternationalTravelItem";
import User from "@/models/User";
import FAQ from "@/models/FAQ";
import TopRatedLocation from "@/models/TopRatedLocation";
import HeroSlide from "@/models/HeroSlide";
import HighlightCard from "@/models/HighlightCard";
import HomeAbout from "@/models/HomeAbout";
import Testimonial from "@/models/Testimonial";
import GalleryItem from "@/models/GalleryItem";
import { detailedTravelItems, comprehensiveFaqs, testimonials, galleryImages } from "@/data/travelData";
import bcrypt from "bcryptjs";

export async function POST() {
  try {
    await connectDB();

    // 1. Seed admin user
    const envEmail = process.env.ADMIN_EMAIL || "royalstours.amd@gmail.com";
    const envPassword = process.env.ADMIN_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(envPassword, 10);

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

    // 2. Seed travel items
    const itemsToSeed = Object.values(detailedTravelItems);
    // Clear both collections by dropping them to remove old indexes
    try {
      await DomesticTravelItem.collection.drop();
    } catch (e) {
      console.log("DomesticTravelItem collection drop ignored (probably doesn't exist yet)");
    }
    try {
      await InternationalTravelItem.collection.drop();
    } catch (e) {
      console.log("InternationalTravelItem collection drop ignored (probably doesn't exist yet)");
    }

    let domesticCount = 0;
    let internationalCount = 0;
    const seedResults = [];

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
        const seededItem = await DomesticTravelItem.findOneAndUpdate(
          { title: item.title || item.name },
          { ...payload, order: domesticCount },
          { upsert: true, new: true, runValidators: true }
        );
        seedResults.push(seededItem);
        domesticCount++;
      } else {
        const seededItem = await InternationalTravelItem.findOneAndUpdate(
          { title: item.title || item.name },
          { ...payload, order: internationalCount },
          { upsert: true, new: true, runValidators: true }
        );
        seedResults.push(seededItem);
        internationalCount++;
      }
    }

    // 3. Seed top rated locations
    const defaultTopLocations = [
      {
        name: "Kashmir",
        image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=800",
        link: "/packages/kashmir",
        order: 1,
      },
      {
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800",
        link: "/packages/bali-cost-saver-ii-summer-2026",
        order: 2,
      },
      {
        name: "Chardham Yatra",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800",
        link: "/packages/chardham-yatra",
        order: 3,
      },
      {
        name: "Vietnam Wonders",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800",
        link: "/packages/vietnam-wonders-explorer",
        order: 4,
      },
      {
        name: "Leh Ladakh",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=800",
        link: "/packages/majestic-leh-ladakh-adventure",
        order: 5,
      },
      {
        name: "Goa Getaway",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800",
        link: "/packages/go-goa-vacation-package",
        order: 6,
      },
      {
        name: "Royals Kerala",
        image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800",
        link: "/packages/royal-kerala",
        order: 7,
      },
      {
        name: "Singapore & Cruise",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800",
        link: "/packages/singapore-cruise-malaysia",
        order: 8,
      },
      {
        name: "Bhutan Himalayan",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800",
        link: "/packages/bhutan-himalayan",
        order: 9,
      },
      {
        name: "Assam & Meghalaya",
        image: "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=800",
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

    // 4. Seed FAQs if empty
    const seededFaqsCount = await FAQ.countDocuments();
    let seededFaqsCountResult = 0;
    if (seededFaqsCount === 0) {
      const faqsToSeed = comprehensiveFaqs.map((faq, idx) => ({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: idx,
      }));
      await FAQ.insertMany(faqsToSeed);
      seededFaqsCountResult = faqsToSeed.length;
    }

    // 5. Seed Hero Slides if empty
    const seededHeroCount = await HeroSlide.countDocuments();
    let seededHeroCountResult = 0;
    if (seededHeroCount === 0) {
      const heroSlidesToSeed = [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200",
          title: "Majestic Leh Ladakh Adventure",
          subtitle: "Cross High Mountain Passes & Ride Double-Humped Camels in Nubra",
          badge: "Special Departure",
          alt: "Leh Ladakh",
          order: 0,
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
          title: "Tropical Bali Cost Saver",
          subtitle: "Private Pool Villas, Nusa Penida Excursions & Tanah Lot Sunsets",
          badge: "Custom Package",
          alt: "Bali Indonesia",
          order: 1,
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200",
          title: "Royals Kerala Backwaters",
          subtitle: "Athirappilly Falls, Munnar Tea Gardens & Houseboat Stay",
          badge: "Popular Holiday",
          alt: "Kerala Backwaters",
          order: 2,
        },
      ];
      await HeroSlide.insertMany(heroSlidesToSeed);
      seededHeroCountResult = heroSlidesToSeed.length;
    }

    // 6. Seed Highlight Cards if empty
    const seededHighlightsCount = await HighlightCard.countDocuments();
    let seededHighlightsCountResult = 0;
    if (seededHighlightsCount === 0) {
      const highlightsToSeed = [
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
          alt: "Pure Veg Catering Support",
          badge: "Our Specialty",
          title: "Pure Veg & Jain Meals On Tour",
          subtitle: "Professional Gujarati & Rajasthani kitchen cooks accompany our domestic groups daily.",
          ctaText: "Explore Group Tours",
          ctaLink: "/destinations",
          order: 0,
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
          alt: "Expert Tour Managers",
          badge: "Customer Care",
          title: "Experienced Tour Managers",
          subtitle: "Helpful managers supervise local hotels, flights, and check-ins throughout the journey.",
          ctaText: "Learn More",
          ctaLink: "/about",
          order: 1,
        },
      ];
      await HighlightCard.insertMany(highlightsToSeed);
      seededHighlightsCountResult = highlightsToSeed.length;
    }

    // 7. Seed Home About if empty
    const seededAboutCount = await HomeAbout.countDocuments();
    let seededAboutCountResult = 0;
    if (seededAboutCount === 0) {
      const homeAboutData = {
        welcomeTag: "WELCOME TO ROYALS TOURS",
        heading: "We Craft Premium Travel Experiences With Pure Veg & Jain Catering",
        paragraph1: "At Royals Tours, we believe travel is about comfort, safety, and absolute peace of mind. For our domestic group departures, we travel with our own private kitchen cooks preparing fresh Gujarati and Rajasthani pure veg, Swaminarayan, and Jain meals daily.",
        paragraph2: "Whether you are embarking on our curated group tours across Leh Ladakh, Kashmir, or Chardham, or booking a custom international holiday to Bali or Vietnam, we ensure end-to-end assistance from flights to check-ins.",
        stat1Value: "8000+",
        stat1Label: "Happy Guests",
        stat2Value: "50+",
        stat2Label: "Top Locations",
        stat3Value: "100%",
        stat3Label: "Veg/Jain Kitchens Support",
        image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1000",
        imageAlt: "Travelers overlooking scenic valley",
      };
      await HomeAbout.create(homeAboutData);
      seededAboutCountResult = 1;
    }

    // 8. Seed Testimonials if empty
    const seededTestimonialsCount = await Testimonial.countDocuments();
    let seededTestimonialsCountResult = 0;
    if (seededTestimonialsCount === 0) {
      const testimonialsToSeed = testimonials.map((t, idx) => ({
        name: t.name,
        role: t.role || "Traveler",
        trip: t.trip,
        comment: t.comment,
        rating: t.rating || 5,
        avatar: t.avatar || "",
        order: idx,
      }));
      await Testimonial.insertMany(testimonialsToSeed);
      seededTestimonialsCountResult = testimonialsToSeed.length;
    }

    // 9. Seed Gallery Items
    try {
      await GalleryItem.collection.drop();
    } catch (e) {
      console.log("GalleryItem collection drop ignored (probably doesn't exist yet)");
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
    const seededGalleryCountResult = photosToSeed.length;

    return NextResponse.json({
      message: "Database seeded successfully",
      adminUser: {
        email: seededUser.email,
        role: seededUser.role,
      },
      seededItemsCount: seedResults.length,
      seededTopLocationsCount: defaultTopLocations.length,
      seededFaqsCount: seededFaqsCountResult || seededFaqsCount,
      seededHeroSlidesCount: seededHeroCountResult || seededHeroCount,
      seededHighlightCardsCount: seededHighlightsCountResult || seededHighlightsCount,
      seededHomeAboutCount: seededAboutCountResult || seededAboutCount,
      seededTestimonialsCount: seededTestimonialsCountResult || seededTestimonialsCount,
      seededGalleryCount: seededGalleryCountResult,
    });
  } catch (error: any) {
    console.error("Database seeding failure:", error);
    return NextResponse.json(
      { error: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
