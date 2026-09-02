"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onOpenInquiry: (destination?: string) => void;
}

interface SearchItem {
  id: string;
  name: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  image: string;
  isFixedDeparture: boolean;
}

export default function Navbar({ onOpenInquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Search logic states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [travelItems, setTravelItems] = useState<SearchItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);

  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const fetchItems = async () => {
    if (loadingItems) return;
    setLoadingItems(true);
    try {
      const res = await fetch("/api/travel-items");
      if (res.ok) {
        const data = await res.json();
        setTravelItems(data);
      }
    } catch (err) {
      console.error("Error fetching travel items for search:", err);
    } finally {
      setLoadingItems(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const isDesktopClickOutside =
        !desktopSearchRef.current || !desktopSearchRef.current.contains(event.target as Node);
      const isMobileClickOutside =
        !mobileSearchRef.current || !mobileSearchRef.current.contains(event.target as Node);

      if (isDesktopClickOutside && isMobileClickOutside) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = searchQuery.trim() === ""
    ? []
    : travelItems.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      });

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Group Departures", href: "/destinations" },
    { label: "Tours", href: "/packages" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact Us", href: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path.startsWith("/packages?")) {
      const url = new URL(path, "http://localhost");
      const cat = url.searchParams.get("cat");
      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);
        return pathname === "/packages" && currentParams.get("cat") === cat;
      }
      return false;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-2 xl:gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-[55px] h-[55px] sm:w-[82px] sm:h-[82px] transition-transform group-hover:scale-105 flex items-center justify-center">
              <img
                src="/website-logo.webp"
                alt="Royals Tours Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-heading font-extrabold text-[12px] xs:text-sm sm:text-base leading-tight tracking-wider">
                ROYALS <span className="text-amber-500">TOURS</span>
              </span>
              <span className="hidden sm:block text-[9px] text-slate-500 font-sans tracking-[0.18em] leading-none mt-0.5">
                MAJESTIC JOURNEYS. MEMORIES.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden xl:flex items-center gap-3 2xl:gap-6">
            <nav className="flex items-center gap-2.5 2xl:gap-4.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[10px] 2xl:text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                    isActive(item.href)
                      ? "text-amber-600 font-bold"
                      : "text-slate-700 hover:text-amber-600"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full animate-fade-in" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="relative shrink-0" ref={desktopSearchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (travelItems.length === 0) fetchItems();
                }}
                placeholder="Search tours..."
                className="bg-slate-100 hover:bg-slate-200/60 border border-slate-350 focus:border-amber-500 rounded-full pl-9 pr-8 py-2 text-[10.5px] 2xl:text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all w-32 focus:w-44 2xl:w-44 2xl:focus:w-56"
              />
              <svg className="absolute left-3 top-3 text-slate-500 w-3.5 h-3.5 stroke-current fill-none pointer-events-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-950 text-xs focus:outline-none"
                >
                  ✕
                </button>
              )}

              {/* Suggestions Panel */}
              {isSearchFocused && searchQuery.trim() !== "" && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                  {filteredItems.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      No packages found
                    </div>
                  ) : (
                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-900">
                      {filteredItems.map((item) => (
                        <Link
                          key={item.id}
                          href={`/packages/${item.id}`}
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-3 hover:bg-slate-900/80 transition-colors group"
                        >
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-850 shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${
                                item.isFixedDeparture 
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              }`}>
                                {item.isFixedDeparture ? "Group Tour" : "Custom Pkg"}
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold uppercase">{item.duration}</span>
                            </div>
                            <h4 className="text-xs font-bold text-white mt-1 truncate group-hover:text-amber-400 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-slate-450 mt-0.5">
                              Starts from <span className="text-amber-550 font-bold">{item.price}</span>
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden xl:block shrink-0">
            <button
              onClick={() => onOpenInquiry("")}
              className="gradient-btn px-6 py-2.5 rounded-full font-heading font-semibold text-xs flex items-center gap-2 cursor-pointer text-slate-950 shadow-lg shadow-amber-500/10"
            >
              Enquire Now
              <svg className="w-4.5 h-4.5 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          {/* Mobile Search Bar (outside hamburger menu) */}
          <div className="xl:hidden relative flex-1 max-w-[130px] xs:max-w-[180px] sm:max-w-[220px]" ref={mobileSearchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true);
                if (travelItems.length === 0) fetchItems();
              }}
              placeholder="Search..."
              className="w-full bg-slate-100 hover:bg-slate-200/80 border border-slate-300 focus:border-amber-500 rounded-full pl-8 pr-7 py-1.5 text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            />
            <svg className="absolute left-3 top-2.5 text-slate-500 w-3 h-3 stroke-current fill-none pointer-events-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-900 text-[10px] focus:outline-none"
              >
                ✕
              </button>
            )}

            {/* Mobile Suggestions Panel */}
            {isSearchFocused && searchQuery.trim() !== "" && (
              <div className="absolute right-0 mt-3 w-[280px] sm:w-80 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                {filteredItems.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">
                    No results found
                  </div>
                ) : (
                  <div className="max-h-60 overflow-y-auto divide-y divide-slate-900">
                    {filteredItems.map((item) => (
                      <Link
                        key={item.id}
                        href={`/packages/${item.id}`}
                        onClick={() => {
                          setSearchQuery("");
                          setIsSearchFocused(false);
                        }}
                        className="flex items-center gap-3 p-2.5 hover:bg-slate-900/80 transition-colors group"
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-1">
                            <span className={`text-[7px] font-extrabold uppercase px-1.5 py-0.5 rounded-full border ${
                              item.isFixedDeparture 
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}>
                              {item.isFixedDeparture ? "Group" : "Custom"}
                            </span>
                            <span className="text-[8.5px] text-slate-400 font-bold uppercase">{item.duration}</span>
                          </div>
                          <h4 className="text-xs font-bold text-white mt-1 truncate group-hover:text-amber-400 transition-colors">
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-amber-600 p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 shadow-xl select-none">
          {/* Mobile Links */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive(item.href)
                    ? "bg-slate-100 text-amber-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry("");
              }}
              className="w-full gradient-btn py-3.5 rounded-xl font-heading font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer text-slate-950"
            >
              Enquire Now
              <svg className="w-4 h-4 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
