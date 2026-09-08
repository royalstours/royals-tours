"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { getDestinationById, detailedTravelItems, DetailedTravelItem } from "@/data/travelData";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [destination, setDestination] = useState<DetailedTravelItem | undefined>(() => getDestinationById(resolvedParams.id));
  const [relatedDestinations, setRelatedDestinations] = useState<DetailedTravelItem[]>(() => {
    const staticItem = getDestinationById(resolvedParams.id);
    return staticItem
      ? Object.values(detailedTravelItems).filter(item => item.id !== staticItem.id).slice(0, 3)
      : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(0);

  useEffect(() => {
    async function loadDynamicItem() {
      try {
        const res = await fetch(`/api/travel-items/${resolvedParams.id}`);
        if (res.ok) {
          const dynamicItem = await res.json();
          if (dynamicItem) {
            setDestination(dynamicItem);
            
            // Also fetch all to populate dynamic related items
            const allRes = await fetch("/api/travel-items");
            if (allRes.ok) {
              const allData = await allRes.json();
              const dynamicRelated = allData
                .filter((item: any) => item.id !== dynamicItem.id)
                .slice(0, 3);
              setRelatedDestinations(dynamicRelated);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic destination details:", err);
      }
    }
    loadDynamicItem();
  }, [resolvedParams.id]);

  if (!destination) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between">
        <Navbar onOpenInquiry={() => setIsModalOpen(true)} />
        <div className="max-w-md mx-auto px-4 py-40 text-center">
          <svg className="w-16 h-16 stroke-orange-500 fill-none mx-auto mb-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">Destination Not Found</h1>
          <p className="text-slate-500 text-sm mt-2">
            The travel destination you are looking for might have been moved or updated.
          </p>
          <Link
            href="/destinations"
            className="mt-6 inline-block gradient-btn px-6 py-3 rounded-full text-xs font-bold font-heading text-white shadow-md"
          >
            Explore All Destinations
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenInquiry={() => setIsModalOpen(true)} />

      {/* ==========================================
          HERO BANNER SECTION
          ========================================== */}
      <section className="relative pt-32 pb-24 bg-slate-900 text-white overflow-hidden select-none">
        <div className="absolute inset-0 z-0">
          <Image
            src={destination.image}
            alt={destination.title || destination.name}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-white/90 mb-6">
            <Link href="/" className="hover:text-amber-200 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/destinations" className="hover:text-amber-200 transition-colors">Destinations</Link>
            <span>/</span>
            <span className="text-amber-200">{destination.name}</span>
          </div>

          <div className="max-w-3xl">
            {destination.badge && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 border border-white/40 text-white text-xs font-heading font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                <svg className="w-3.5 h-3.5 text-amber-200 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
                </svg>{" "}
                {destination.badge}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
              {destination.title || destination.name}
            </h1>

            <p className="mt-4 text-base sm:text-xl text-amber-100 font-heading italic">
              "{destination.slogan}"
            </p>

            {/* Key Quick Stats */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-white">
              <div className="bg-white/20 border border-white/30 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                <svg className="w-4.5 h-4.5 stroke-white fill-none shrink-0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <span className="block text-[10px] text-white/80 uppercase font-bold">Location</span>
                  <span className="font-bold text-white">{destination.name}</span>
                </div>
              </div>

              <div className="bg-white/20 border border-white/30 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                <svg className="w-4.5 h-4.5 stroke-white fill-none shrink-0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <div>
                  <span className="block text-[10px] text-white/80 uppercase font-bold">Group Size</span>
                  <span className="font-bold text-white">{destination.groupSize}</span>
                </div>
              </div>

              <div className="bg-white/20 border border-white/30 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-sm">
                <svg className="w-4.5 h-4.5 stroke-white fill-none shrink-0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <div>
                  <span className="block text-[10px] text-white/80 uppercase font-bold">Best Season</span>
                  <span className="font-bold text-white">{destination.bestTimeToVisit}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN DETAIL CONTENT & SIDEBAR
          ========================================== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: Main Details */}
            <div className="lg:col-span-8 space-y-12">

              {/* OVERVIEW SECTION */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
                <span className="text-xs uppercase font-heading font-bold text-amber-500 tracking-wider">
                  ABOUT THIS TRIP
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Destination Overview
                </h2>
                <div className="w-12 h-1 bg-amber-500 rounded mt-3 mb-6" />

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  {destination.description}
                </p>

                {/* Key Highlights Grid */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="text-xs uppercase font-bold font-heading text-slate-400 tracking-wider mb-4">
                    Trip Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destination.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="bg-orange-50/70 border border-orange-200/60 rounded-xl p-3.5 flex items-center gap-3"
                      >
                        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                          ✓
                        </span>
                        <span className="text-xs font-semibold text-slate-800 font-heading">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ITINERARY TIMELINE ACCORDION */}
              {destination.itinerary && destination.itinerary.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
                  <span className="text-xs uppercase font-heading font-bold text-orange-600 tracking-wider">
                    DAY BY DAY SCHEDULE
                  </span>
                  <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Tour Itinerary
                  </h2>
                  <div className="w-16 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500 rounded-full mt-3 mb-6" />

                  <div className="space-y-4">
                    {destination.itinerary.map((day) => {
                      const isOpen = activeDay === day.day;
                      return (
                        <div
                          key={day.day}
                          className={`rounded-2xl border transition-all overflow-hidden ${
                            isOpen
                              ? "border-orange-400 bg-orange-50/30 shadow-sm"
                              : "border-slate-200 bg-white hover:border-orange-200"
                          }`}
                        >
                          <button
                            onClick={() => setActiveDay(isOpen ? null : day.day)}
                            className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white font-black font-heading flex items-center justify-center text-xs shrink-0 shadow-sm">
                                Day {day.day}
                              </span>
                              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base font-heading">
                                {day.title}
                              </h3>
                            </div>
                            <span className="text-slate-400 font-bold text-lg">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 border-t border-orange-200/40 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
                              <p className="whitespace-pre-line font-medium text-slate-700">{day.description}</p>

                              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-slate-500">
                                {day.meals && (
                                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-md text-orange-700">
                                    <svg className="w-3.5 h-3.5 stroke-orange-600 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                                    </svg>
                                    {day.meals}
                                  </span>
                                )}
                                {day.stay && (
                                  <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-md text-slate-700">
                                    <svg className="w-3.5 h-3.5 stroke-slate-700 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                      <path d="M3 21h18M9 21V9a3 3 0 0 1 6 0v12M2 9h20M2 17h2M20 17h2M2 5h20M9 5h6" />
                                    </svg>
                                    {day.stay}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* INCLUSIONS & EXCLUSIONS GRID */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
                <span className="text-xs uppercase font-heading font-bold text-orange-600 tracking-wider">
                  WHAT TO EXPECT
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Inclusions &amp; Exclusions
                </h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500 rounded-full mt-3 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* INCLUSIONS */}
                  <div className="bg-emerald-50/50 border border-emerald-200/70 rounded-2xl p-6">
                    <h3 className="text-sm font-extrabold text-emerald-900 font-heading uppercase tracking-wider flex items-center gap-2 mb-4">
                      <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">✓</span>
                      What's Included
                    </h3>
                    <ul className="space-y-3">
                      {destination.included.map((inc, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5">
                          <span className="text-emerald-600 font-bold text-base leading-none">✓</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* EXCLUSIONS */}
                  <div className="bg-rose-50/50 border border-rose-200/70 rounded-2xl p-6">
                    <h3 className="text-sm font-extrabold text-rose-900 font-heading uppercase tracking-wider flex items-center gap-2 mb-4">
                      <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs">✕</span>
                      What's Excluded
                    </h3>
                    <ul className="space-y-3">
                      {destination.excluded.map((exc, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-700 font-medium flex items-start gap-2.5">
                          <span className="text-rose-500 font-bold text-base leading-none">✕</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* GALLERY PREVIEW */}
              {destination.gallery && destination.gallery.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
                  <span className="text-xs uppercase font-heading font-bold text-amber-500 tracking-wider">
                    DESTINATION HIGHLIGHTS
                  </span>
                  <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Photo Gallery
                  </h2>
                  <div className="w-12 h-1 bg-amber-500 rounded mt-3 mb-6" />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {destination.gallery.map((img, i) => (
                      <div key={i} className="relative h-48 rounded-2xl overflow-hidden shadow-sm group">
                        <Image
                          src={img}
                          alt={`${destination.name} gallery ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQS SECTION */}
              {destination.faqs && destination.faqs.length > 0 && (
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
                  <span className="text-xs uppercase font-heading font-bold text-amber-500 tracking-wider">
                    NEED HELP?
                  </span>
                  <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                    Frequently Asked Questions
                  </h2>
                  <div className="w-12 h-1 bg-amber-500 rounded mt-3 mb-6" />

                  <div className="space-y-4">
                    {destination.faqs.map((faq, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                        <h3 className="font-extrabold text-slate-900 text-sm font-heading">
                          ❓ {faq.question}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: STICKY BOOKING SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-xl sticky top-28 space-y-6">
                
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider block">
                    PACKAGE STARTING PRICE
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black font-heading text-orange-600">
                      {(() => {
                        const formatPrice = (priceStr: string) => {
                          if (!priceStr) return "";
                          let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                          return clean ? `₹${clean}` : "";
                        };
                        const rawPrice = destination.pricingTiers && destination.pricingTiers.length > 0
                          ? destination.pricingTiers[selectedTierIndex]?.price || destination.price
                          : destination.price;
                        return formatPrice(rawPrice);
                      })()}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-1">
                    *Taxes included, flexible payment options available
                  </span>
                </div>

                {/* Pricing Tiers Calculator */}
                {destination.pricingTiers && destination.pricingTiers.length > 0 && (
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Select Package Option / Tier
                    </span>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {destination.pricingTiers.map((tier, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedTierIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl border text-[11px] font-semibold font-heading transition-all cursor-pointer ${
                            selectedTierIndex === idx
                              ? "border-orange-500 bg-orange-50/80 text-orange-950 shadow-xs"
                              : "border-slate-200 bg-slate-50 text-slate-700 hover:border-orange-300"
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span>{tier.name}</span>
                            <span className="text-orange-600 shrink-0">
                              {(() => {
                                const formatPrice = (priceStr: string) => {
                                  if (!priceStr) return "";
                                  let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                                  return clean ? `₹${clean}` : "";
                                };
                                return formatPrice(tier.price);
                              })()}
                            </span>
                          </div>
                          {tier.details && (
                            <p className="text-[10px] font-normal text-slate-500 mt-1 leading-snug">
                              {tier.details}
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* PDF Itinerary Download */}
                {destination.pdfItineraryUrl && (
                  <div className="border-t border-slate-100 pt-4">
                    <a
                      href={destination.pdfItineraryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700 py-3 rounded-xl font-heading font-bold text-xs text-center flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                    >
                      <span>📄</span> Download Detailed PDF
                    </a>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Type:</span>
                    <span className="font-bold text-orange-600">{destination.badge}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Location:</span>
                    <span className="font-bold text-slate-900">{destination.name}</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full gradient-btn py-4 rounded-full font-heading font-bold text-sm text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] transition-transform text-white"
                >
                  Book / Request Customization
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Trust guarantee banner */}
                <div className="bg-orange-50/80 border border-orange-200/80 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2 text-orange-700 font-bold">
                    <span>🛡️</span>
                    <span>Explore &amp; Unite Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    • 100% Price Lock with initial booking deposit<br />
                    • Dedicated Trip Captain support on all departures<br />
                    • Flexible dates &amp; customized itinerary options
                  </p>
                </div>

                <div className="text-center pt-2">
                  <a
                    href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20know%20more%20about%20the%20trip%20to%20"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-teal-700 hover:underline inline-flex items-center gap-1.5 font-semibold"
                  >
                    <span>💬</span> Chat with Trip Expert on WhatsApp
                  </a>
                </div>

              </div>
            </div>

          </div>

          {/* RELATED DESTINATIONS */}
          {relatedDestinations.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200">
              <div className="text-center mb-10">
                <span className="text-xs uppercase font-heading font-bold text-amber-500 tracking-wider">
                  MORE EXPERIENCES
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Similar Travel Destinations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedDestinations.map(item => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200/70 shadow-sm flex flex-col justify-between hover-card group"
                  >
                    <div>
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-slate-900 font-heading text-base group-hover:text-amber-500 transition-colors uppercase">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
                      <span className="text-sm font-extrabold text-amber-600 font-heading">
                        {(() => {
                          const formatPrice = (priceStr: string) => {
                            if (!priceStr) return "";
                            let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                            return clean ? `₹${clean}` : "";
                          };
                          return formatPrice(item.price);
                        })()}
                      </span>
                      <Link
                        href={`/destinations/${item.id}`}
                        className="text-xs font-bold font-heading text-slate-900 hover:text-amber-500 flex items-center gap-1"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDestination={destination.name}
      />
      <Footer />
    </div>
  );
}
