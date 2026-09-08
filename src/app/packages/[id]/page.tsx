"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
}

interface PricingTier {
  name: string;
  price: string;
  rawPrice: number;
  details?: string;
}

interface TravelItem {
  _id: string;
  id: string;
  name: string;
  title: string;
  slogan: string;
  category: "international" | "domestic" | "trek";
  duration: string;
  badge: string;
  price: string;
  rawPrice: number;
  image: string;
  highlights: string[];
  description: string;
  location: string;
  bestTimeToVisit: string;
  groupSize: string;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  gallery: string[];
  faqs: { question: string; answer: string }[];
  isFixedDeparture: boolean;
  pricingTiers: PricingTier[];
  pdfItineraryUrl?: string;
}

export default function PackageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const [item, setItem] = useState<TravelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"itinerary" | "inclusions" | "guidelines">("itinerary");
  
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/travel-items/${id}`);
        if (res.ok) {
          const data = await res.json();
          setItem(data);
        }
      } catch (err) {
        console.error("Failed to load tour details:", err);
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenInquiry={handleOpenInquiry} />
        <div className="flex-1 flex items-center justify-center min-h-[400px]">
          <span className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
            🔄 Loading Tour Itinerary...
          </span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenInquiry={handleOpenInquiry} />
        <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-white">
          <span className="text-4xl mb-4">🗺️</span>
          <h1 className="font-heading font-black text-xl uppercase text-slate-800">
            Tour Package Not Found
          </h1>
          <p className="text-xs text-slate-450 mt-1 mb-6">
            The tour package you are looking for does not exist or has been modified.
          </p>
          <Link
            href="/packages"
            className="gradient-btn px-6 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white shadow-md"
          >
            Browse Travel Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const waText = `Hi Royals Tours, I am interested in booking the *${item.title}* (${item.duration}) package. Please share availability and travel details.`;
  const waUrl = `https://wa.me/919723820277?text=${encodeURIComponent(waText)}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[380px] bg-slate-900 overflow-hidden pt-20">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30 z-10" />
        <div className="absolute inset-0 z-20 flex items-end pb-12">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              {item.category === "international" ? (
                <span className="bg-white/20 text-white border border-white/30 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
                  <svg className="w-3 h-3 stroke-amber-200 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7 3.5 8.5l7.3 3.6-3.6 3.6L4.5 15l-1 1 2.5 1.5L7.5 20l1-1-.7-2.7 3.6-3.6 3.6 7.3z"/>
                  </svg>
                  International Group departure
                </span>
              ) : (
                <span className="bg-white/20 text-white border border-white/30 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
                  <svg className="w-3 h-3 stroke-emerald-200 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                  </svg>
                  Domestic Pure Veg departure
                </span>
              )}
              {item.badge && (
                <span className="bg-white/20 text-white border border-white/30 text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest backdrop-blur-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white max-w-4xl leading-tight drop-shadow-sm">
              {item.title}
            </h1>
            {item.slogan && (
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold max-w-2xl drop-shadow-2xs">
                {item.slogan}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Details Panel */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Itinerary, details, inclusions */}
          <div className="flex-1 space-y-8 min-w-0">
            
            {/* Overview / Description */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h2 className="font-heading font-black text-lg uppercase text-slate-900 border-b border-slate-100 pb-3">
                Tour Overview
              </h2>
              <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-line font-medium">
                {item.description}
              </p>
            </div>

            {/* Inclusions USP special callout */}
            {item.category === "domestic" && (
              <div className="bg-emerald-50 border border-emerald-200/80 p-6 rounded-3xl flex gap-4 items-start shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-5 h-5 stroke-emerald-600 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h4 className="font-heading font-black text-xs uppercase text-emerald-800">
                    Swaminarayan &amp; Jain Food special
                  </h4>
                  <p className="text-[11px] text-emerald-700 leading-relaxed font-medium">
                    This domestic tour features daily hot meals (Breakfast &amp; Dinner) prepared by our own catering kitchen team traveling with the group. Pure Veg, Swaminarayan, and Jain food requirements are fully accommodated.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden">
              <div className="flex border-b border-slate-100 bg-slate-50">
                <button
                  onClick={() => setActiveTab("itinerary")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                    activeTab === "itinerary"
                      ? "text-orange-600 bg-white border-orange-500 font-black"
                      : "text-slate-500 hover:text-orange-600 border-transparent"
                  }`}
                >
                  🗺️ Detailed Itinerary
                </button>
                <button
                  onClick={() => setActiveTab("inclusions")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                    activeTab === "inclusions"
                      ? "text-orange-600 bg-white border-orange-500 font-black"
                      : "text-slate-500 hover:text-orange-600 border-transparent"
                  }`}
                >
                  📝 Inclusions &amp; Exclusions
                </button>
                <button
                  onClick={() => setActiveTab("guidelines")}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                    activeTab === "guidelines"
                      ? "text-orange-600 bg-white border-orange-500 font-black"
                      : "text-slate-500 hover:text-orange-600 border-transparent"
                  }`}
                >
                  📑 Travel Guidelines
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {/* 1. Tab: Detailed Itinerary */}
                {activeTab === "itinerary" && (
                  <div className="space-y-8 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-100">
                    {item.itinerary.map((day, idx) => (
                      <div key={idx} className="relative pl-12 space-y-3">
                        {/* Day Counter Bubble */}
                        <div className="absolute left-1 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-amber-200 flex items-center justify-center text-white font-heading font-black text-xs z-10 shadow-md shadow-orange-500/20">
                          {String(day.day).padStart(2, "0")}
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="font-heading font-black text-sm uppercase text-slate-950 leading-tight">
                            {day.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-[8px] font-black uppercase text-slate-400">
                            {day.meals && (
                              <span className="bg-orange-50/60 border border-orange-100 text-orange-900 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                                <svg className="w-2.5 h-2.5 stroke-orange-600 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                                </svg>
                                {day.meals}
                              </span>
                            )}
                            {day.stay && (
                              <span className="bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1 font-bold text-slate-600">
                                <svg className="w-2.5 h-2.5 stroke-slate-500 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                  <path d="M3 21h18M9 21V9a3 3 0 0 1 6 0v12M2 9h20M2 17h2M20 17h2M2 5h20M9 5h6" />
                                </svg>
                                {day.stay}
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                          {day.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. Tab: Inclusions & Exclusions */}
                {activeTab === "inclusions" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {/* Inclusions */}
                    <div className="space-y-4 pr-0 md:pr-6">
                      <h3 className="font-heading font-black text-xs uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                        <span className="text-base font-black">✓</span> What's Included
                      </h3>
                      <ul className="space-y-3">
                        {item.included.map((inc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-650 font-bold">
                            <span className="text-emerald-500 shrink-0 font-black">✓</span>
                            <span className="leading-tight">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div className="space-y-4 pt-6 md:pt-0 pl-0 md:pl-8 border-t md:border-t-0">
                      <h3 className="font-heading font-black text-xs uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                        <span className="text-base font-black">✕</span> What's Excluded
                      </h3>
                      <ul className="space-y-3">
                        {item.excluded.map((exc, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-650 font-bold">
                            <span className="text-rose-500 shrink-0 font-black">✕</span>
                            <span className="leading-tight">{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 3. Tab: Travel Guidelines */}
                {activeTab === "guidelines" && (
                  <div className="space-y-6">
                    <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl space-y-2">
                      <h4 className="font-heading font-black text-xs uppercase text-amber-800 flex items-center gap-2">
                        ⚠️ Important Identification &amp; ID Proofs
                      </h4>
                      <p className="text-[11px] text-amber-700 leading-relaxed font-semibold">
                        Every traveler must carry original identification documents for permits and clearances (e.g. valid Passport, original Election card, or Aadhaar card where applicable). PAN Cards are typically not accepted at borders or permit checkpoints.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                        General Tour Terms &amp; Policies
                      </h3>
                      <ul className="space-y-3 text-xs text-slate-650 font-semibold leading-relaxed">
                        <li>• **Group Size**: Our tours run with group sizes ranging from 15 to 25 guests, accompanied by a dedicated tour manager.</li>
                        <li>• **Vehicles**: Point-to-point AC tourist coach/travelers. Please note AC is switched off in high hill terrains.</li>
                        <li>• **Inner Line Permits**: Royals Tours provides full guidance and assistance for all inner line permit processing (Tawang, Ladakh, Sikkim). Guests must carry 6-8 passport-size color photographs.</li>
                        <li>• **Special Altitude Health Alert**: For destinations at high altitudes (like Leh-Ladakh or Kailash Mansarovar), guests with breathing or cardiac histories are requested to consult a doctor before booking.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking & Pricing Card */}
          <aside className="w-full lg:w-96 shrink-0 lg:sticky lg:top-24 space-y-6 z-20">
            
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider block">
                  Package Pricing starts at
                </span>
                <span className="text-2xl font-heading font-black text-orange-600">
                  {(() => {
                    const formatPrice = (priceStr: string) => {
                      if (!priceStr) return "";
                      let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                      return clean ? `₹${clean}` : "";
                    };
                    if (item.pricingTiers && item.pricingTiers.length > 0) {
                      return formatPrice(item.pricingTiers[0].price);
                    }
                    return formatPrice(item.price);
                  })()}
                </span>
                <span className="text-[10px] text-slate-400 block font-bold mt-1">
                  *Rates are valid for Indian Nationals only (GST extra)
                </span>
              </div>

              {/* Pricing Tiers Table */}
              {item.pricingTiers && item.pricingTiers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-heading font-black text-xs uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                    Occupancy Options
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                    {item.pricingTiers.map((tier, idx) => {
                      const formatPrice = (priceStr: string) => {
                        if (!priceStr) return "";
                        let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                        return clean ? `₹${clean}` : "";
                      };
                      return (
                        <div key={idx} className="py-2.5 flex justify-between gap-3 items-center">
                          <div>
                            <span className="font-bold text-slate-900 uppercase text-[10px] block">{tier.name}</span>
                            {tier.details && <span className="text-[9px] text-slate-400 block leading-none mt-0.5">{tier.details}</span>}
                          </div>
                          <span className="font-heading font-bold text-orange-600 font-mono">
                            {formatPrice(tier.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Inclusions Summary Icons */}
              <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-4 text-center">
                <div className="p-2 rounded-2xl bg-sky-50/50">
                  <svg className="w-5 h-5 stroke-sky-600 fill-none mx-auto mb-1.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 21h18M9 21V9a3 3 0 0 1 6 0v12M2 9h20M2 17h2M20 17h2M2 5h20M9 5h6" />
                  </svg>
                  <span className="text-[9px] font-black text-sky-800 uppercase tracking-wide">3★/4★ Hotel</span>
                </div>
                <div className="p-2 rounded-2xl bg-emerald-50/50">
                  <svg className="w-5 h-5 stroke-emerald-600 fill-none mx-auto mb-1.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                  </svg>
                  <span className="text-[9px] font-black text-emerald-800 uppercase tracking-wide">Pure Veg</span>
                </div>
                <div className="p-2 rounded-2xl bg-amber-50/50">
                  <svg className="w-5 h-5 stroke-amber-600 fill-none mx-auto mb-1.5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7h2m14 0c0 1.1-.9 2-2 2s-2-.9-2-2 1.1-2 2-2 2 .9 2 2zm-12 0c0 1.1-.9 2-2 2s-2-.9-2-2 1.1-2 2-2 2 .9 2 2z" />
                  </svg>
                  <span className="text-[9px] font-black text-amber-800 uppercase tracking-wide">Sightseeing</span>
                </div>
              </div>

              {/* Booking CTA Buttons */}
              <div className="flex flex-col gap-3">
                {item.pdfItineraryUrl && (
                  <a
                    href={item.pdfItineraryUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-800 border border-slate-200 font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>📄</span> Download Itinerary PDF
                  </a>
                )}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  💬 Book / Inquire via WhatsApp
                </a>
                <button
                  onClick={() => handleOpenInquiry(item.title)}
                  className="w-full text-center gradient-btn text-white font-heading font-bold text-xs uppercase tracking-wider py-3.5 rounded-2xl shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                >
                  ⚡ Send Booking Inquiry
                </button>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-md space-y-4">
              <h4 className="font-heading font-black text-xs uppercase tracking-wider text-orange-600">
                Direct Contact Helpline
              </h4>
              <div className="space-y-3 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2.5">
                  <span>📞</span>
                  <a href="tel:+919723820277" className="hover:text-orange-600 transition-colors">+91 97238 20277</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span>✉️</span>
                  <a href="mailto:royalstours.amd@gmail.com" className="hover:text-orange-600 transition-colors">royalstours.amd@gmail.com</a>
                </div>
              </div>
            </div>

          </aside>

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
