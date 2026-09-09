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
  category: string;
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

interface PackageCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

let cachedItems: TravelItem[] | null = null;
let cachedCategories: PackageCategory[] | null = null;

export default function PackagesCatalog() {
  return (
    <Suspense fallback={
      <div className="flex flex-col min-h-screen">
        <Navbar onOpenInquiry={() => {}} />
        <div className="flex-grow flex items-center justify-center bg-slate-50">
          <span className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
            🔄 Loading Holiday Catalog...
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
  const [categories, setCategories] = useState<PackageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam.toLowerCase());
    } else {
      setActiveCategory("all");
    }
  }, [catParam]);
  
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  useEffect(() => {
    async function loadData() {
      if (cachedItems && cachedCategories) {
        setItems(cachedItems);
        setCategories(cachedCategories);
        setLoading(false);
        return;
      }
      try {
        const [itemRes, catRes] = await Promise.all([
          fetch("/api/travel-items"),
          fetch("/api/package-categories"),
        ]);
        if (itemRes.ok) {
          const itemData = await itemRes.json();
          cachedItems = itemData;
          setItems(itemData);
        }
        if (catRes.ok) {
          const catData = await catRes.json();
          cachedCategories = catData;
          setCategories(catData);
        }
      } catch (err) {
        console.error("Failed to load catalog data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredItems = items.filter((item) => {
    // 1. Filter by Active Category Tab
    if (activeCategory !== "all") {
      const itemCat = item.category?.toLowerCase();
      if (itemCat !== activeCategory && !itemCat.includes(activeCategory)) {
        return false;
      }
    }
    
    // 2. Filter by Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.name?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.location?.toLowerCase().includes(q)
      );
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Hero Banner Header */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white pt-32 pb-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute right-[-20px] bottom-[-40px] text-white/5 font-black text-[120px] pointer-events-none select-none uppercase">
          Holiday
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4">
          <span className="bg-white/15 text-white border border-white/20 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block backdrop-blur-sm">
            Holiday Catalog
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-white drop-shadow-sm">
            Majestic Holiday Packages
          </h1>
          <p className="text-xs text-white/80 font-medium max-w-lg leading-relaxed">
            Curated domestic group departures with pure veg kitchen cooks, exotic international escapes, honeymoons, and custom holidays.
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
                Holiday Categories
              </h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`text-left w-full px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === "all"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                      : "bg-slate-50 text-slate-700 hover:bg-orange-50/70 hover:text-orange-600 border border-slate-200/60"
                  }`}
                >
                  🌐 All Packages ({items.length})
                </button>
                {categories.map((cat) => {
                  const count = items.filter(
                    (i) =>
                      i.category?.toLowerCase() === cat.slug.toLowerCase() ||
                      i.category?.toLowerCase() === cat.name.toLowerCase()
                  ).length;
                  return (
                    <button
                      key={cat._id}
                      onClick={() => setActiveCategory(cat.slug.toLowerCase())}
                      className={`text-left w-full px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        activeCategory === cat.slug.toLowerCase()
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                          : "bg-slate-50 text-slate-700 hover:bg-orange-50/70 hover:text-orange-600 border border-slate-200/60"
                      }`}
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex items-center gap-2 truncate">
                          <span>{cat.icon || "🧳"}</span>
                          <span className="truncate">{cat.name}</span>
                        </span>
                        <span className="text-[10px] font-normal opacity-80 shrink-0">({count})</span>
                      </span>
                    </button>
                  );
                })}
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
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                          ⏱ {item.duration}
                        </span>
                        <span className="text-xs font-black uppercase text-amber-300 bg-black/50 px-2 py-0.5 rounded border border-amber-300/30">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-heading font-black text-sm uppercase text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Highlights Pills */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.highlights.slice(0, 2).map((h, i) => (
                            <span key={i} className="text-[9px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md font-medium border border-slate-100">
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Pricing and Action */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">
                            Starting from
                          </span>
                          <span className="text-sm font-heading font-black text-slate-900">
                            {item.price}
                          </span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Details →
                        </span>
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
