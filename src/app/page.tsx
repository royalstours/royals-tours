"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import HeroSection, { HeroMediaItem } from "@/components/HeroSection";
import TopRatedLocations from "@/components/TopRatedLocations";
import TrustHighlightsSlider, { HighlightCardItem } from "@/components/TrustHighlightsSlider";
import { servicesList, testimonials, fixedDepartures, featuredPackages } from "@/data/travelData";

// Module-level client-side cache to prevent duplicate fetches on page navigations
let cachedAllItems: any[] | null = null;

export default function Home() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");

  const [dbFixedDepartures, setDbFixedDepartures] = useState<any[]>(fixedDepartures);
  const [dbFeaturedPackages, setDbFeaturedPackages] = useState<any[]>(featuredPackages);
  const [dbTestimonials, setDbTestimonials] = useState<any[] | null>(null);
  
  const [heroSlides, setHeroSlides] = useState<HeroMediaItem[]>([]);
  const [highlightCards, setHighlightCards] = useState<HighlightCardItem[]>([]);
  const [homeAbout, setHomeAbout] = useState<any>({
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
    imageAlt: "Travelers overlooking scenic valley"
  });

  useEffect(() => {
    async function loadDynamicData() {
      try {
        // Load travel items
        let data = cachedAllItems;
        if (!data) {
          const res = await fetch("/api/travel-items");
          if (res.ok) {
            data = await res.json();
            cachedAllItems = data;
          }
        }

        if (data && data.length > 0) {
          const formatPrice = (item: any) => {
            const rawPrice = item.pricingTiers && item.pricingTiers.length > 0
              ? item.pricingTiers[0].price || item.price
              : item.price;
            if (!rawPrice) return "";
            let clean = rawPrice.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
            return clean ? `₹${clean}` : "";
          };

          const fds = data.filter((item: any) => item.isFixedDeparture).map((item: any) => ({
            id: item.id,
            destination: item.name,
            slogan: item.slogan,
            highlights: item.highlights,
            price: formatPrice(item),
            image: item.image,
            duration: item.duration,
            description: item.description
          }));
          const pkgs = data.filter((item: any) => !item.isFixedDeparture).map((item: any) => ({
            id: item.id,
            name: item.name,
            subtext: item.slogan,
            category: item.category,
            duration: item.duration,
            badge: item.badge,
            price: formatPrice(item),
            rawPrice: item.rawPrice,
            image: item.image,
            highlights: item.highlights,
            description: item.description
          }));
          setDbFixedDepartures(fds);
          setDbFeaturedPackages(pkgs);
        }

        // Load hero slides
        try {
          const slidesRes = await fetch("/api/hero-slides");
          if (slidesRes.ok) {
            const slidesData = await slidesRes.json();
            if (slidesData && slidesData.length > 0) {
              setHeroSlides(slidesData.map((s: any) => ({
                id: s._id,
                type: s.type,
                src: s.src,
                mobileSrc: s.mobileSrc || "",
                poster: s.poster || "",
                mobilePoster: s.mobilePoster || "",
                alt: s.alt,
                badge: s.badge || "",
                title: s.title || "",
                subtitle: s.subtitle || "",
              })));
            }
          }
        } catch (err) {
          console.error("Failed to load dynamic hero slides:", err);
        }

        // Load highlight cards
        try {
          const cardsRes = await fetch("/api/highlight-cards");
          if (cardsRes.ok) {
            const cardsData = await cardsRes.json();
            if (cardsData && cardsData.length > 0) {
              setHighlightCards(cardsData.map((c: any) => ({
                id: c._id,
                type: c.type,
                src: c.src,
                mobileSrc: c.mobileSrc || "",
                poster: c.poster || "",
                mobilePoster: c.mobilePoster || "",
                alt: c.alt || "",
                badge: c.badge || "",
                title: c.title || "",
                subtitle: c.subtitle || "",
                ctaText: c.ctaText || "",
                ctaLink: c.ctaLink || "",
              })));
            }
          }
        } catch (err) {
          console.error("Failed to load dynamic highlight cards:", err);
        }

        // Load dynamic home about settings
        try {
          const aboutRes = await fetch("/api/home-about");
          if (aboutRes.ok) {
            const aboutData = await aboutRes.json();
            if (aboutData && !aboutData.error) {
              setHomeAbout(aboutData);
            }
          }
        } catch (err) {
          console.error("Failed to load dynamic home about info:", err);
        }

        // Load dynamic testimonials
        try {
          const testimonialsRes = await fetch("/api/testimonials");
          if (testimonialsRes.ok) {
            const testimonialsData = await testimonialsRes.json();
            setDbTestimonials(testimonialsData || []);
          } else {
            setDbTestimonials([]);
          }
        } catch (err) {
          console.error("Failed to load dynamic testimonials:", err);
          setDbTestimonials([]);
        }
      } catch (err) {
        console.error("Failed to load dynamic travel items:", err);
      }
    }
    loadDynamicData();
  }, []);

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  const repeatedTestimonials = (() => {
    const listSource = dbTestimonials === null || dbTestimonials.length === 0
      ? (dbTestimonials === null ? [] : testimonials)
      : dbTestimonials;

    let list = [...listSource];
    if (list.length === 0) return [];
    while (list.length < 6) {
      list = [...list, ...list];
    }
    return list;
  })();

  const fallbackSlides: HeroMediaItem[] = [
    {
      id: "slide-1",
      type: "image",
      src: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200",
      title: "Majestic Leh Ladakh Adventure",
      subtitle: "Cross High Mountain Passes & Ride Double-Humped Camels in Nubra",
      badge: "Group Departure",
      alt: "Leh Ladakh",
    },
    {
      id: "slide-2",
      type: "image",
      src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200",
      title: "Tropical Bali Cost Saver",
      subtitle: "Private Pool Villas, Nusa Penida Excursions & Tanah Lot Sunsets",
      badge: "Custom Package",
      alt: "Bali Indonesia",
    },
    {
      id: "slide-3",
      type: "image",
      src: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200",
      title: "Royals Kerala Backwaters",
      subtitle: "Athirappilly Falls, Munnar Tea Gardens & Houseboat Stay",
      badge: "Popular Holiday",
      alt: "Kerala Backwaters",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero Carousel */}
      <HeroSection
        mediaItems={heroSlides.length > 0 ? heroSlides : fallbackSlides}
        openInquiryModal={handleOpenInquiry}
      />

      {/* Trust Highlights Dynamic Slider */}
      {highlightCards.length > 0 && (
        <TrustHighlightsSlider highlightCards={highlightCards} />
      )}

      {/* Best Top Rated Locations Circle Selector */}
      <TopRatedLocations onOpenInquiry={handleOpenInquiry} />

      {/* Static Why Travel With Us Section */}
      <section className="bg-slate-900 py-16 border-b border-slate-950 relative overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
              Why Travel With Us
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              The Royals Tours Experience
            </h2>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              We focus on premium comfort, meticulous detail, and absolute safety for a worry-free travel experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-2xl font-bold">
                <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-white">
                Pure Veg &amp; Jain Catering
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For our domestic group tours, our private catering kitchen team travels with the group, preparing fresh, delicious Gujarati and Rajasthani pure vegetarian, Swaminarayan, and Jain meals daily.
              </p>
            </div>
            
            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-2xl font-bold">
                <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-white">
                Expert Tour Managers
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every tour departs with an experienced, helpful Royals Tours manager who oversees hotel check-ins, local transport, excursions, and ensures guest comfort from arrival to departure.
              </p>
            </div>

            <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 space-y-4 hover:border-amber-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 text-2xl font-bold">
                <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7 3.5 8.5l7.3 3.6-3.6 3.6L4.5 15l-1 1 2.5 1.5L7.5 20l1-1-.7-2.7 3.6-3.6 3.6 7.3z"/>
                </svg>
              </div>
              <h3 className="font-heading font-bold text-base uppercase text-white">
                Hassle-Free Booking
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                From round-trip flight booking and car rentals to visa processing support, passport assistance, and overseas travel insurance, we provide end-to-end support for a seamless holiday.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Welcome About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-605 tracking-widest bg-amber-500/15 px-3 py-1 rounded-full">
                  {homeAbout.welcomeTag}
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight leading-tight">
                  {homeAbout.heading}
                </h2>
                <div className="w-12 h-1 bg-amber-500 rounded mt-3"></div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-semibold">
                {homeAbout.paragraph1}
              </p>
              <p className="text-slate-550 text-xs leading-relaxed">
                {homeAbout.paragraph2}
              </p>

              {/* Stat badges */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <span className="block text-xl sm:text-2xl font-black font-heading text-amber-500">{homeAbout.stat1Value}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">{homeAbout.stat1Label}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <span className="block text-xl sm:text-2xl font-black font-heading text-amber-500">{homeAbout.stat2Value}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">{homeAbout.stat2Label}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center">
                  <span className="block text-xl sm:text-2xl font-black font-heading text-amber-500">{homeAbout.stat3Value}</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mt-1">{homeAbout.stat3Label}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden border border-slate-150 shadow-md group">
                <img
                  src={homeAbout.image}
                  alt={homeAbout.imageAlt}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Group Departures */}
      <section id="group-departures" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest bg-amber-500/15 px-3 py-1 rounded-full">
              VEG GROUP DEPARTURES
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900">
              Scheduled Veg Group Tours
            </h2>
            <div className="w-12 h-1 bg-amber-500 rounded mx-auto mt-2"></div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">
              Join one of our premium pure veg departures featuring private kitchen cooks preparing Gujarati and Jain meals.
            </p>
          </div>

          {/* Grid of departures */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dbFixedDepartures.slice(0, 6).map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-xs border border-slate-100 flex flex-col justify-between hover-card group">
                <div>
                  <Link href={`/destinations/${item.id}`} className="relative h-56 w-full overflow-hidden block">
                    <img
                      src={item.image}
                      alt={item.destination}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-slate-950/85 backdrop-blur-md text-amber-400 text-[9px] font-black tracking-widest px-3 py-1 rounded-full border border-amber-500/20 uppercase">
                      VEG GROUP TOUR
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/destinations/${item.id}`}>
                      <h3 className="text-base font-black text-slate-900 tracking-tight font-heading uppercase group-hover:text-amber-550 transition-colors">
                        {item.destination}
                      </h3>
                    </Link>

                    {item.slogan && (
                      <div className="mt-3 flex items-start gap-2 text-amber-800 bg-amber-50/50 border border-amber-100 rounded-xl p-3">
                        <svg className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
                        </svg>
                        <p className="text-[10px] font-semibold italic text-amber-905/90 leading-snug">
                          "{item.slogan}"
                        </p>
                      </div>
                    )}

                    {/* Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {item.highlights.slice(0, 4).map((hl: string, index: number) => (
                          <span
                            key={index}
                            className="bg-slate-50 text-slate-600 text-[9px] px-2 py-0.5 rounded border border-slate-100 font-bold uppercase tracking-wider"
                          >
                            • {hl}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider">PACKAGE COST</span>
                    <span className="text-base font-black text-amber-600 font-heading">{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/destinations/${item.id}`}
                      className="px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200/50 hover:bg-slate-200 transition-colors"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleOpenInquiry(item.destination)}
                      className="gradient-btn px-3.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-xs font-black font-heading text-slate-800 hover:text-amber-500 transition-colors uppercase tracking-wider bg-slate-100 border border-slate-200/50 px-6 py-2.5 rounded-full hover:shadow-sm"
            >
              Browse All Veg Group Departures →
            </Link>
          </div>

        </div>
      </section>

      {/* Featured Tour Packages */}
      <section id="featured-packages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest bg-amber-500/15 px-3 py-1 rounded-full">
              POPULAR HOLIDAYS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900">
              Featured Tour Escapes
            </h2>
            <div className="w-12 h-1 bg-amber-500 rounded mx-auto mt-2"></div>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed mt-1">
              Explore our handpicked customizable international getaways and special domestic journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dbFeaturedPackages.slice(0, 4).map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs flex flex-col justify-between hover-card group">
                <div>
                  <Link href={`/packages/${pkg.id}`} className="relative h-48 w-full overflow-hidden block">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {pkg.badge && !["international tour", "domestic tour", "domestic group tour"].includes(pkg.badge.toLowerCase()) && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[8px] uppercase tracking-wider px-2 py-0.5 rounded shadow">
                        {pkg.badge}
                      </div>
                    )}
                  </Link>

                  <div className="p-5">
                    <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded inline-block mb-2">
                      ⏳ {pkg.duration}
                    </span>
                    <Link href={`/packages/${pkg.id}`}>
                      <h3 className="font-black text-base text-slate-900 group-hover:text-amber-500 transition-colors uppercase tracking-tight leading-tight">
                        {pkg.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] text-slate-450 mt-1 font-semibold block leading-tight truncate">{pkg.subtext}</p>
                    
                    <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                  <div>
                    <span className="block text-[8px] text-slate-450 font-bold uppercase tracking-wider">Starting From</span>
                    <span className="text-base font-black text-amber-600 font-heading">{pkg.price}</span>
                  </div>
                  <Link
                    href={`/packages/${pkg.id}`}
                    className="gradient-btn px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 text-xs font-black font-heading text-slate-800 hover:text-amber-500 transition-colors uppercase tracking-wider bg-slate-100 border border-slate-200/50 px-6 py-2.5 rounded-full hover:shadow-sm"
            >
              Browse All Custom Tour Packages →
            </Link>
          </div>

        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-955">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-black uppercase text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">
              Our Services
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              End-To-End Travel Assistance
            </h2>
            <p className="text-xs text-slate-405 font-semibold leading-relaxed">
              We handle every detail of your journey so you can focus entirely on creating unforgettable moments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-955 p-8 rounded-3xl border border-slate-800 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-extrabold text-base uppercase text-white">
                        {srv.title}
                      </h3>
                      {srv.badge && (
                        <span className="bg-amber-500/20 text-amber-400 font-black text-[8px] uppercase px-2 py-0.5 rounded-full border border-amber-500/15">
                          {srv.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                      {srv.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-slate-800 mt-6">
                  <ul className="space-y-2">
                    {srv.features.slice(0, 3).map((feat, fidx) => (
                      <li key={fidx} className="flex items-start gap-2 text-[10px] font-bold text-slate-400">
                        <span className="text-emerald-500">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Testimonials Carousel marquee */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
            <span className="text-[10px] font-black uppercase text-amber-600 tracking-widest bg-amber-500/15 px-3 py-1 rounded-full">
              TESTIMONIALS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900">
              Happy Guests Speak
            </h2>
            <div className="w-12 h-1 bg-amber-500 rounded mx-auto mt-2"></div>
          </div>

          <div className="marquee-container py-4">
            <div className="marquee-content">
              {repeatedTestimonials.map((test, index) => (
                <div key={`t1-${index}-${test._id || test.id}`} className="w-87.5 shrink-0 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between hover-card">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {Array.from({ length: test.rating || 5 }).map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-current text-amber-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-slate-650 italic leading-relaxed line-clamp-4">
                      "{test.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                      {test.avatar ? (
                        <img
                          src={test.avatar}
                          alt={test.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {test.name.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-heading leading-tight uppercase">{test.name}</h4>
                      <span className="text-[9px] text-amber-600 font-bold block mt-0.5 uppercase tracking-wide">{test.trip}</span>
                      {test.role && (
                        <span className="text-[8px] text-slate-400 block mt-0.5 font-normal uppercase tracking-wider">{test.role}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-content" aria-hidden="true">
              {repeatedTestimonials.map((test, index) => (
                <div key={`t2-${index}-${test._id || test.id}`} className="w-87.5 shrink-0 bg-white p-6 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between hover-card">
                  <div>
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {Array.from({ length: test.rating || 5 }).map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-current text-amber-500" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-slate-650 italic leading-relaxed line-clamp-4">
                      "{test.comment}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                      {test.avatar ? (
                        <img
                          src={test.avatar}
                          alt={test.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {test.name.slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 font-heading leading-tight uppercase">{test.name}</h4>
                      <span className="text-[9px] text-amber-600 font-bold block mt-0.5 uppercase tracking-wide">{test.trip}</span>
                      {test.role && (
                        <span className="text-[8px] text-slate-400 block mt-0.5 font-normal uppercase tracking-wider">{test.role}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Floating Action WhatsApp widget */}
      <a
        href="https://wa.me/919723820277?text=Hello+Royals+Tours,+I+am+interested+in+booking+a+tour+package."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 floating-widget cursor-pointer"
        aria-label="WhatsApp Us"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Footer />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialDestination={selectedDest}
      />
    </div>
  );
}
