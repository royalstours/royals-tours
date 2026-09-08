"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface NavbarProps {
  onOpenInquiry: (destination?: string) => void;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Group Departures", href: "/destinations" },
  { label: "International Tours", href: "/packages?cat=international" },
  { label: "Domestic Tours", href: "/packages?cat=domestic" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/contact" },
];

function NavbarInner({ onOpenInquiry }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    if (path.includes("?")) {
      const [pathBase, queryStr] = path.split("?");
      const params = new URLSearchParams(queryStr);
      const cat = params.get("cat");
      return pathname === pathBase && searchParams.get("cat") === cat;
    }
    return pathname === path || (path !== "/" && pathname.startsWith(path) && !pathname.includes("?"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      {/* Top Vibrant Travel Gradient Stripe */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500" />

      <div className="max-w-360 mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-2 xl:gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-13.75 h-13.75 sm:w-20.5 sm:h-20.5 transition-transform group-hover:scale-105 flex items-center justify-center">
              <img
                src="/website-logo.webp"
                alt="Royals Tours Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-slate-900 font-heading font-extrabold text-[12px] xs:text-sm sm:text-base leading-tight tracking-wider">
                ROYALS <span className="text-orange-500">TOURS</span>
              </span>
              <span className="hidden sm:block text-[9px] text-slate-500 font-sans tracking-[0.18em] leading-none mt-0.5">
                MAJESTIC JOURNEYS. MEMORIES.
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-2.5 2xl:gap-4.5">
            <nav className="flex items-center gap-2 2xl:gap-3.5">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[9.5px] 2xl:text-xs font-bold uppercase tracking-wider transition-colors relative py-1.5 whitespace-nowrap ${
                    isActive(item.href)
                      ? "text-orange-600 font-extrabold"
                      : "text-slate-700 hover:text-orange-500"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full shadow-[0_0_8px_rgba(255,107,53,0.5)] animate-fade-in" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden xl:block shrink-0">
            <button
              onClick={() => onOpenInquiry("")}
              className="gradient-btn px-6 py-2.5 rounded-full font-heading font-bold text-xs flex items-center gap-2 cursor-pointer text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
            >
              Enquire Now
              <svg className="w-4.5 h-4.5 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-800 hover:text-orange-500 p-2 focus:outline-none"
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
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-b border-orange-100 px-4 pt-4 pb-6 space-y-4 shadow-xl select-none">
          {/* Mobile Links */}
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive(item.href)
                    ? "bg-orange-50 text-orange-600 font-bold border border-orange-200"
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
              className="w-full gradient-btn py-3.5 rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 cursor-pointer text-white shadow-lg shadow-orange-500/25"
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

export default function Navbar(props: NavbarProps) {
  return (
    <Suspense fallback={
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav h-20 sm:h-24">
        <div className="h-[2.5px] w-full bg-gradient-to-r from-orange-500 via-amber-400 to-teal-500" />
        <div className="max-w-360 mx-auto px-4 sm:px-6 xl:px-8 flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-13.75 h-13.75 sm:w-20.5 sm:h-20.5 flex items-center justify-center">
              <img src="/website-logo.webp" alt="Royals Tours Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-slate-900 font-heading font-extrabold text-[12px] xs:text-sm sm:text-base leading-tight tracking-wider">
              ROYALS <span className="text-orange-500">TOURS</span>
            </span>
          </Link>
        </div>
      </header>
    }>
      <NavbarInner {...props} />
    </Suspense>
  );
}

