"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

interface AboutData {
  bannerTag: string;
  bannerTitle: string;
  bannerSubtitle: string;
  welcomeTag: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  mediaPoster?: string;
  image?: string;
  imageAlt: string;
  valuesTag: string;
  valuesHeading: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  stat1Value: string;
  stat1Label: string;
  stat1Sub?: string;
  stat2Value: string;
  stat2Label: string;
  stat2Sub?: string;
  stat3Value: string;
  stat3Label: string;
  stat3Sub?: string;
}

const DEFAULT_ABOUT: AboutData = {
  bannerTag: "Our Story",
  bannerTitle: "About Royals Tours",
  bannerSubtitle: "Crafting majestic travel memories and pure vegetarian group holiday experiences.",
  welcomeTag: "Experience the Difference",
  heading: "A Heritage of Trusted Travel Organization",
  paragraph1: "Based in the heart of Ahmedabad, Royals Tours was founded to bring families, couples, and group travelers together. We specialize in making travel completely stress-free, comfortable, and safe.",
  paragraph2: "Our unique domestic group tours travel with their own catering staff, offering freshly prepared Swaminarayan, Jain, and Pure Vegetarian meals. No matter if you are climbing the heights of Tawang, exploring the backwaters of Kerala, or flying to the exotic beaches of Bali and Vietnam, we ensure you travel like royalty.",
  mediaType: "video",
  mediaUrl: "https://res.cloudinary.com/dgb6durda/video/upload/v1788347407/royal_tours/za5i4d6iepgkjjclkqbl.mp4",
  mediaPoster: "",
  image: "https://res.cloudinary.com/dgb6durda/video/upload/v1788347407/royal_tours/za5i4d6iepgkjjclkqbl.mp4",
  imageAlt: "Majestic Himalayan mountain landscapes and happy travelers",
  valuesTag: "Our Values",
  valuesHeading: "Our Core Guiding Principles",
  pillar1Title: "Vegetarian Gastronomy",
  pillar1Desc: "We believe good food is essential to a happy holiday. Traveling with our cooks ensures our guests never compromise on fresh Swaminarayan and Jain dietary preferences.",
  pillar2Title: "Curated Itineraries",
  pillar2Desc: "Our tour paths are balanced and researched. We mix must-see cultural icons (like Paro Taktsang or Golden Bridge) with scenic leisure stops and time for local shopping.",
  pillar3Title: "Absolute Hospitality",
  pillar3Desc: "We treat every traveler as a member of the Royals Tours family. Our dedicated tour managers provide warm, attentive coordination from departure to return.",
  stat1Value: "8000+",
  stat1Label: "Delighted Travelers",
  stat1Sub: "Joined our group and private holiday packages",
  stat2Value: "50+",
  stat2Label: "Top Global Locations",
  stat2Sub: "Domestic wonders and exotic international getaways",
  stat3Value: "100%",
  stat3Label: "Pure Veg / Jain Support",
  stat3Sub: "Private kitchen staff traveling on domestic group tours",
};

let cachedAbout: AboutData | null = null;

export default function AboutPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");
  const [about, setAbout] = useState<AboutData>(cachedAbout || DEFAULT_ABOUT);
  const [loading, setLoading] = useState(!cachedAbout);

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  useEffect(() => {
    async function loadAbout() {
      try {
        const res = await fetch("/api/home-about");
        if (res.ok) {
          const data = await res.json();
          cachedAbout = data;
          setAbout(data);
        }
      } catch (err) {
        console.error("Failed to load about us details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAbout();
  }, []);

  const isVideo =
    about.mediaType === "video" ||
    Boolean(about.mediaUrl && /\.(mp4|webm|mov|m4v|mkv|avi)($|\?)/i.test(about.mediaUrl)) ||
    Boolean(about.mediaUrl && about.mediaUrl.includes("/video/upload/"));

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute right-[-20px] bottom-[-40px] text-white/5 font-black text-[120px] pointer-events-none select-none uppercase">
          About
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4">
          <span className="bg-white/15 text-white border border-white/20 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block backdrop-blur-sm">
            {about.bannerTag || "Our Story"}
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-white drop-shadow-sm">
            {about.bannerTitle || "About Royals Tours"}
          </h1>
          <p className="text-xs text-white/80 font-medium max-w-lg leading-relaxed">
            {about.bannerSubtitle || "Crafting majestic travel memories and pure vegetarian group holiday experiences."}
          </p>
        </div>
      </section>

      {/* Story Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow space-y-16">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest bg-orange-50 border border-orange-200/80 px-3 py-1 rounded-full inline-block mb-3">
                {about.welcomeTag || "Experience the Difference"}
              </span>
              <h2 className="font-heading font-black text-xl sm:text-3xl uppercase tracking-tight text-slate-900 leading-tight">
                {about.heading || "A Heritage of Trusted Travel Organization"}
              </h2>
              <div className="w-14 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-3"></div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold whitespace-pre-line">
              {about.paragraph1}
            </p>
            {about.paragraph2 && (
              <p className="text-xs text-slate-600 leading-relaxed font-semibold whitespace-pre-line">
                {about.paragraph2}
              </p>
            )}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/packages"
                className="gradient-btn px-6 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer"
              >
                Browse Catalog
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-orange-50/60 border border-slate-200 text-slate-800 hover:text-orange-600 font-heading font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xs transition-colors"
              >
                Contact Helplines
              </Link>
            </div>
          </div>

          {/* Media Box (Image or Video) */}
          <div className="h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-900 group">
            {isVideo ? (
              <video
                key={about.mediaUrl || about.image}
                src={about.mediaUrl || about.image}
                poster={about.mediaPoster || undefined}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (about.mediaUrl || about.image) ? (
              <img
                key={about.mediaUrl || about.image}
                src={about.mediaUrl || about.image}
                alt={about.imageAlt || "About Royals Tours"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-slate-900 flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-amber-400 animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Pillars / USPs Grid with Vibrant Travel Palettes */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase text-teal-600 tracking-widest bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              {about.valuesTag || "Our Values"}
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mt-2">
              {about.valuesHeading || "Our Core Guiding Principles"}
            </h2>
            <div className="w-14 h-1.5 bg-gradient-to-r from-teal-500 via-amber-400 to-orange-500 rounded-full mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Pure Veg Kitchen */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-emerald-300 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-xs">
                <svg className="w-6 h-6 stroke-emerald-600 fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                </svg>
              </div>
              <h3 className="font-heading font-extrabold text-base uppercase text-slate-900">
                {about.pillar1Title || "Vegetarian Gastronomy"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {about.pillar1Desc || "We believe good food is essential to a happy holiday. Traveling with our cooks ensures our guests never compromise on fresh Swaminarayan and Jain dietary preferences."}
              </p>
            </div>

            {/* Pillar 2: Curated Paths */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-sky-300 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-xs">
                <svg className="w-6 h-6 stroke-sky-600 fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                </svg>
              </div>
              <h3 className="font-heading font-extrabold text-base uppercase text-slate-900">
                {about.pillar2Title || "Curated Itineraries"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {about.pillar2Desc || "Our tour paths are balanced and researched. We mix must-see cultural icons with scenic leisure stops and time for local shopping."}
              </p>
            </div>

            {/* Pillar 3: Absolute Hospitality */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 hover:border-orange-300 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-xs">
                <svg className="w-6 h-6 stroke-orange-600 fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="font-heading font-extrabold text-base uppercase text-slate-900">
                {about.pillar3Title || "Absolute Hospitality"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                {about.pillar3Desc || "We treat every traveler as a member of the Royals Tours family. Our dedicated tour managers provide warm, attentive coordination from departure to return."}
              </p>
            </div>
          </div>
        </div>

        {/* Travel Highlights & Stats Strip */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-heading text-orange-600">{about.stat1Value || "8000+"}</span>
              <p className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">{about.stat1Label || "Delighted Travelers"}</p>
              <p className="text-[11px] text-slate-500 font-medium">{about.stat1Sub || "Joined our group and private holiday packages"}</p>
            </div>
            <div className="space-y-1 border-y md:border-y-0 md:border-x border-slate-150 py-6 md:py-0">
              <span className="text-3xl sm:text-4xl font-black font-heading text-teal-600">{about.stat2Value || "50+"}</span>
              <p className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">{about.stat2Label || "Top Global Locations"}</p>
              <p className="text-[11px] text-slate-500 font-medium">{about.stat2Sub || "Domestic wonders and exotic international getaways"}</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-heading text-amber-600">{about.stat3Value || "100%"}</span>
              <p className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">{about.stat3Label || "Pure Veg / Jain Support"}</p>
              <p className="text-[11px] text-slate-500 font-medium">{about.stat3Sub || "Private kitchen staff traveling on domestic group tours"}</p>
            </div>
          </div>
        </div>

      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialDestination={selectedDest}
      />
    </div>
  );
}
