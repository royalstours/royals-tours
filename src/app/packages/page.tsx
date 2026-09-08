"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

interface TravelItem {
  _id: string;
  id: string;
  name: string;
  title: string;
  category: "international" | "domestic" | "trek";
  duration: string;
  badge: string;
  price: string;
  rawPrice: number;
  image: string;
  highlights: string[];
  description: string;
  location?: string;
  isFixedDeparture: boolean;
  pricingTiers?: { name: string; price: string; rawPrice: number; details?: string }[];
}

// Module-level client-side cache to prevent duplicate fetches on page navigations
let cachedItems: TravelItem[] | null = null;

export default function PackagesCatalog() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenInquiry={() => {}} />
        <div className="flex-grow flex items-center justify-center bg-slate-50">
          <span className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
            🔄 Loading Travel Catalog...
          </span>
        </div>
        <Footer />
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}

function CatalogContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");

  const [items, setItems] = useState<TravelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "domestic" | "international">("all");

  useEffect(() => {
    if (catParam === "domestic" || catParam === "international") {
      setActiveTab(catParam);
    } else {
      setActiveTab("all");
    }
  }, [catParam]);
  
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  useEffect(() => {
    async function loadItems() {
      if (cachedItems) {
        setItems(cachedItems);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/travel-items");
        if (res.ok) {
          const data = await res.json();
          cachedItems = data;
          setItems(data);
        }
      } catch (err) {
        console.error("Failed to load catalog items:", err);
      } finally {
        setLoading(false);
      }
    }
    loadItems();
  }, []);

  const filteredItems = items.filter((item) => {
    // 1. Filter by Active Category Tab
    if (activeTab === "domestic" && item.category !== "domestic") return false;
    if (activeTab === "international" && item.category !== "international") return false;
    
    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q)
      );
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero Banner Header */}
      <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white pt-32 pb-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute right-[-20px] bottom-[-40px] text-white/10 font-black text-[120px] pointer-events-none select-none uppercase">
          Tours
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4">
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block backdrop-blur-sm">
            Our Catalog
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-white drop-shadow-sm">
            Majestic Tour Packages
          </h1>
          <p className="text-xs text-white/90 font-medium max-w-lg leading-relaxed">
            Choose from our pre-scheduled Pure Veg domestic group departures or custom international vacation packages.
          </p>
        </div>
      </section>

      {/* Catalog Grid Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6 lg:sticky lg:top-28 self-start">
            
            {/* Search Input */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3">
              <h3 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Search Packages
              </h3>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to next..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 placeholder-slate-400"
                />
                <svg className="absolute right-3 top-3 text-slate-400 w-3.5 h-3.5 stroke-current fill-none pointer-events-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              </div>
            </div>

            {/* Category Selectors */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-xs uppercase tracking-wider text-slate-900">
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`text-left w-full px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "all"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-50 text-slate-700 hover:bg-orange-50/70 hover:text-orange-600 border border-slate-200/60"
                  }`}
                >
                  🌐 All Offerings ({items.length})
                </button>
                <button
                  onClick={() => setActiveTab("domestic")}
                  className={`text-left w-full px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "domestic"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-50 text-slate-700 hover:bg-orange-50/70 hover:text-orange-600 border border-slate-200/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                    </svg>
                    Domestic Group Tours ({items.filter(i => i.category === "domestic").length})
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("international")}
                  className={`text-left w-full px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "international"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-50 text-slate-700 hover:bg-orange-50/70 hover:text-orange-600 border border-slate-200/60"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7 3.5 8.5l7.3 3.6-3.6 3.6L4.5 15l-1 1 2.5 1.5L7.5 20l1-1-.7-2.7 3.6-3.6 3.6 7.3z"/>
                    </svg>
                    International Vacations ({items.filter(i => i.category === "international").length})
                  </span>
                </button>
              </div>
            </div>

          </aside>

          {/* Results Grid */}
          <div className="flex-1 space-y-8">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Showing {filteredItems.length} travel packages</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center min-h-[300px]">
                <span className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse flex items-center gap-2">
                  🔄 Loading Travel Catalog...
                </span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-slate-100">
                <span className="text-3xl block mb-4">🗺️</span>
                <h3 className="font-heading font-black text-base uppercase text-slate-800">
                  No packages matched your filter
                </h3>
                <p className="text-xs text-slate-450 mt-1">
                  Try clearing search inputs or checking another category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Link
                    key={item._id}
                    href={`/packages/${item.id}`}
                    className="bg-white rounded-3xl border border-slate-150 hover:border-orange-300 shadow-xs hover-card flex flex-col overflow-hidden text-left group"
                  >
                    {/* Image Header */}
                    <div className="relative h-48 bg-slate-100 shrink-0">
                      {item.badge && !["international tour", "domestic tour", "domestic group tour"].includes(item.badge.toLowerCase()) && (
                        <span className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-orange-600 border border-orange-300 px-3 py-1 rounded-full font-black text-[8px] uppercase tracking-wider shadow-xs">
                          {item.badge}
                        </span>
                      )}
                      <span className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-md text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                        <svg className="w-2.5 h-2.5 stroke-sky-700 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {item.duration}
                      </span>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase text-orange-600 tracking-wider">
                        {item.category === "international" ? (
                          <span className="flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 stroke-orange-600 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7 3.5 8.5l7.3 3.6-3.6 3.6L4.5 15l-1 1 2.5 1.5L7.5 20l1-1-.7-2.7 3.6-3.6 3.6 7.3z"/>
                            </svg>
                            International Tour
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 stroke-orange-600 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                            </svg>
                            Domestic Group Tour
                          </span>
                        )}
                        </span>
                        <h3 className="font-heading font-black text-sm uppercase text-slate-950 group-hover:text-orange-600 transition-colors leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">
                          {item.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {/* Mini Highlights */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                            {item.highlights.slice(0, 3).map((hl, hlIdx) => (
                              <span
                                key={hlIdx}
                                className="bg-orange-50/60 border border-orange-100 text-orange-900 font-bold text-[8px] uppercase px-2 py-0.5 rounded-md"
                              >
                                {hl}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price & CTA Link */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-[8px] font-black text-slate-400 uppercase block leading-none">
                              Price starts at
                            </span>
                            <span className="text-xs font-heading font-black text-orange-600">
                              {(() => {
                                const formatPrice = (priceStr: string) => {
                                  if (!priceStr) return "";
                                  let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                                  return clean ? `₹${clean}` : "";
                                };
                                const rawPrice = item.pricingTiers && item.pricingTiers.length > 0
                                  ? item.pricingTiers[0].price || item.price
                                  : item.price;
                                return formatPrice(rawPrice);
                              })()}
                            </span>
                          </div>
                          <div
                            className="gradient-btn font-heading font-black text-[9px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all shadow-xs"
                          >
                            Explore →
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                ))}
              </div>
            )}

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
