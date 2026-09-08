"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { fixedDepartures, featuredPackages } from "@/data/travelData";

// Module-level client-side cache to prevent duplicate fetches on page navigations
let cachedDestinations: any[] | null = null;

export default function DestinationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "international" | "domestic" | "trek">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [finderDuration, setFinderDuration] = useState<"all" | "short" | "medium" | "long" | "grand">("all");
  const [finderPax, setFinderPax] = useState<"all" | "2" | "4" | "6" | "12">("all");
  const [dbFixedDepartures, setDbFixedDepartures] = useState<any[]>(fixedDepartures);
  const [dbFeaturedPackages, setDbFeaturedPackages] = useState<any[]>(featuredPackages);

  useEffect(() => {
    async function loadDynamicData() {
      try {
        let data = cachedDestinations;
        if (!data) {
          const res = await fetch("/api/travel-items");
          if (res.ok) {
            data = await res.json();
            cachedDestinations = data;
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
      } catch (err) {
        console.error("Failed to load dynamic destinations:", err);
      }
    }
    loadDynamicData();
  }, []);

  const openInquiryModal = (destination = "") => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  // Combine group departures and packages into unified destination view
  const allDestinations = [
    ...dbFixedDepartures.map(fd => ({
      id: fd.id,
      name: fd.destination,
      slogan: fd.slogan,
      category: "international" as const,
      highlights: fd.highlights,
      price: fd.price,
      image: fd.image,
      isFixedDeparture: true,
      duration: fd.duration || "5N / 6D",
      description: fd.description || "Group departure date with locked inclusions and guided tour."
    })),
    ...dbFeaturedPackages.map(pkg => ({
      id: pkg.id,
      name: pkg.name,
      slogan: pkg.subtext,
      category: pkg.category,
      highlights: pkg.highlights,
      price: pkg.price,
      image: pkg.image,
      isFixedDeparture: false,
      duration: pkg.duration,
      description: pkg.description
    }))
  ];

  // Helpers for filtering duration and group size (number of persons)
  const getDaysCount = (durationStr: string): number => {
    const match = durationStr.match(/(\d+)\s*D/i) || durationStr.match(/(\d+)\s*Days/i) || durationStr.match(/Day\s*(\d+)/i);
    return match ? parseInt(match[1]) : 5;
  };

  const matchesPax = (pkg: any, selectedPax: string): boolean => {
    if (selectedPax === "all") return true;
    const paxNum = parseInt(selectedPax);
    
    // Check groupSize range if exists
    const groupSizeStr = pkg.groupSize || (pkg.isFixedDeparture ? "12 - 18 Travelers" : "2 - 12 Travelers"); // Fallback for group departures
    const matchRange = groupSizeStr.match(/(\d+)\s*-\s*(\d+)/);
    if (matchRange) {
      const min = parseInt(matchRange[1]);
      const max = parseInt(matchRange[2]);
      return paxNum >= min && paxNum <= max;
    }
    
    // Fallback overrides
    if (pkg.id === "pkg-ladakh-bike") {
      return paxNum >= 6; // min 6 pax
    }
    return true;
  };

  const filtered = allDestinations.filter(item => {
    // 1. Category Filter
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    if (!matchesCat) return false;

    // 2. Search Filter
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slogan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h: string) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    if (!matchesSearch) return false;

    // 3. Duration Filter
    if (finderDuration !== "all") {
      const days = getDaysCount(item.duration);
      if (finderDuration === "short" && days > 3) return false;
      if (finderDuration === "medium" && (days < 4 || days > 6)) return false;
      if (finderDuration === "long" && (days < 7 || days > 9)) return false;
      if (finderDuration === "grand" && days < 10) return false;
    }

    // 4. Pax/Traveler Filter
    const matchesGroup = matchesPax(item, finderPax);
    if (!matchesGroup) return false;

    return true;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenInquiry={openInquiryModal} />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600"
            alt="Traveler looking out over majestic mountain range"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-heading font-bold text-white tracking-widest bg-white/20 border border-white/30 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
            EXPLORE THE WORLD WITH US
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight drop-shadow-sm">
            Our Featured <span className="text-amber-200">Destinations</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Discover our international group departures featuring country slogans, tropical island retreats, and domestic summit treks.
          </p>
        </div>
      </section>

      {/* Trip Finder Wizard Banner */}
      <section className="relative -mt-10 mb-10 z-20 max-w-6xl mx-auto px-4 select-none">
        <div className="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 border border-orange-100 shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5">
            <span className="text-orange-500 text-lg">🎯</span>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Find Your Ideal Destination</h3>
              <p className="text-slate-500 text-xs mt-0.5">Specify your requirements to filter perfect matched itineraries.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Where do you want to explore?</label>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
              >
                <option value="all">All Destinations</option>
                <option value="international">International Departures</option>
                <option value="domestic">Domestic Getaways</option>
                <option value="trek">Treks &amp; Summits</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">How many days?</label>
              <select
                value={finderDuration}
                onChange={(e) => setFinderDuration(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
              >
                <option value="all">Any Duration</option>
                <option value="short">2 - 3 Days (Weekend Escapes)</option>
                <option value="medium">4 - 6 Days (Classic Tours)</option>
                <option value="long">7 - 9 Days (Explorer Holidays)</option>
                <option value="grand">10+ Days (Grand Journeys)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Number of Travelers?</label>
              <select
                value={finderPax}
                onChange={(e) => setFinderPax(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
              >
                <option value="all">Any Group Size</option>
                <option value="2">Couple (2 Persons)</option>
                <option value="4">Small Group (3 - 5 Persons)</option>
                <option value="6">Medium Group (6 - 8 Persons)</option>
                <option value="12">Large Group (10 - 12+ Persons)</option>
              </select>
            </div>
          </div>

          {(activeCategory !== "all" || finderDuration !== "all" || finderPax !== "all") && (
            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500">
                <span>Active Requirements:</span>
                {activeCategory !== "all" && <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded font-semibold uppercase text-[10px]">{activeCategory}</span>}
                {finderDuration !== "all" && <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10px]">{finderDuration === "short" ? "2-3 Days" : finderDuration === "medium" ? "4-6 Days" : finderDuration === "long" ? "7-9 Days" : "10+ Days"}</span>}
                {finderPax !== "all" && <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10px]">{finderPax} Travelers</span>}
              </div>
              <button
                onClick={() => { setActiveCategory("all"); setFinderDuration("all"); setFinderPax("all"); }}
                className="text-orange-600 hover:text-orange-700 font-bold transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Filter Bar & Search */}
      <section className="py-10 bg-white border-b border-slate-200 top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Destinations" },
              { id: "international", label: "✈️ International Departures" },
              { id: "domestic", label: "🏖️ Domestic Getaways" },
              { id: "trek", label: "🏔️ Treks & Summits" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold font-heading transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Bhutan, Thailand, Trek..."
              className="w-full bg-slate-50 border border-slate-300 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800"
            />
            <svg className="absolute right-3.5 top-2.5 text-slate-400 w-3.5 h-3.5 stroke-current fill-none pointer-events-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <svg className="w-12 h-12 stroke-slate-350 fill-none mx-auto mb-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3 className="text-lg font-bold font-heading text-slate-900">No destinations found</h3>
              <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting another category filter.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-4 gradient-btn px-5 py-2 rounded-full text-xs font-bold font-heading"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(item => (
                <div
                  key={item.id}
                  id={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/70 hover:border-orange-300 hover:shadow-orange-500/10 flex flex-col justify-between hover-card group"
                >
                  <div>
                    {/* Card Image */}
                    <Link href={item.isFixedDeparture ? `/destinations/${item.id}` : `/packages/${item.id}`} className="relative h-60 w-full overflow-hidden block">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {item.isFixedDeparture && (
                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-orange-600 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full border border-orange-300 shadow-xs">
                          GROUP DEPARTURE
                        </div>
                      )}
                    </Link>

                    {/* Card Body */}
                    <div className="p-6">
                      <Link href={item.isFixedDeparture ? `/destinations/${item.id}` : `/packages/${item.id}`}>
                        <h3 className="text-lg font-extrabold text-slate-900 font-heading tracking-wide uppercase group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>

                      {/* COUNTRY SLOGAN / SUBTEXT DISPLAY */}
                      <div className="mt-3 flex items-start gap-2 text-orange-950 bg-gradient-to-r from-orange-50/80 to-amber-50/80 border border-orange-200/60 rounded-xl p-3 shadow-2xs">
                        <svg className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z" />
                        </svg>
                        <p className="text-xs font-semibold italic text-orange-900/90 leading-snug">
                          "{item.slogan}"
                        </p>
                      </div>

                      <p className="text-xs text-slate-600 mt-3 leading-relaxed font-medium">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.highlights.map((h: string, idx: number) => (
                          <span
                            key={idx}
                            className="bg-orange-50/60 text-orange-900 text-[11px] px-2.5 py-1 rounded-md border border-orange-100 font-medium"
                          >
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
                    <div>
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Package Price</span>
                      <span className="text-xl font-black text-orange-600 font-heading">{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={item.isFixedDeparture ? `/destinations/${item.id}` : `/packages/${item.id}`}
                        className="px-3.5 py-2 rounded-full text-xs font-bold font-heading text-slate-800 bg-white border border-slate-200 hover:bg-orange-50 hover:text-orange-600 transition-colors shadow-2xs"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => openInquiryModal(item.name)}
                        className="gradient-btn px-4 py-2 rounded-full text-xs font-bold font-heading flex items-center gap-1 cursor-pointer"
                      >
                        Book
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDestination={selectedDestination}
      />
      <Footer />
    </div>
  );
}
