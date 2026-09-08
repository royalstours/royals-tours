"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-12 border-t border-slate-200 relative">
      {/* 3px continuous travel gradient top stripe */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-amber-400 via-teal-500 to-sky-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-[60px] h-[60px] transition-transform group-hover:scale-105 flex items-center justify-center">
                <img
                  src="/website-logo.webp"
                  alt="Royals Tours Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-heading font-extrabold text-lg leading-tight tracking-wider">
                  ROYALS <span className="text-orange-500">TOURS</span>
                </span>
                <span className="text-[10px] text-slate-500 font-sans tracking-[0.18em]">
                  MAJESTIC JOURNEYS. MEMORIES.
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
               Ahmedabad's leading tour organizer specializing in domestic pure veg group departures (with our own kitchen cooks) and premium international customized holiday packages.
            </p>

            <div className="text-xs text-slate-600 space-y-1">
              <a
                href="https://maps.app.goo.gl/j6B38M5stnRt5kae7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-orange-600 transition-colors duration-300"
              >
                <span className="text-orange-500">📍</span>
                <span>
                  Royals Tours, Office No. 456, M/7, Second Floor,
                  Chandan Complex, Above Mirch Masala, Opp. Femina Town,
                  Swastik Cross Road, C.G. Road, Navrangpura, Ahmedabad - 380009
                </span>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919723820277"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition-colors shadow-sm"
                aria-label="WhatsApp"
              >
                💬
              </a>
              <a
                href="tel:+919723820277"
                className="w-9 h-9 rounded-full bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white border border-orange-200 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Call Direct"
              >
                📞
              </a>
              <a
                href="mailto:royalstours.amd@gmail.com"
                className="w-9 h-9 rounded-full bg-teal-50 hover:bg-teal-500 text-teal-600 hover:text-white border border-teal-200 flex items-center justify-center transition-colors shadow-sm"
                aria-label="Email Us"
              >
                ✉️
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-slate-900 font-heading font-bold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="hover:text-orange-600 transition-colors">
                  Group Departures
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-orange-600 transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-600 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-orange-600 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-orange-600 transition-colors">
                  FAQs Help
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-orange-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Departures */}
          <div>
            <h4 className="text-slate-900 font-heading font-bold text-sm tracking-wider uppercase mb-4">
              Popular Departures
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/packages/chardham-yatra" className="hover:text-orange-600 transition-colors">
                  Chardham Yatra
                </Link>
              </li>
              <li>
                <Link href="/packages/bali-cost-saver-ii-summer-2026" className="hover:text-orange-600 transition-colors">
                  Bali Cost Saver Luxury
                </Link>
              </li>
              <li>
                <Link href="/packages/vietnam-wonders-explorer" className="hover:text-orange-600 transition-colors">
                  Vietnam wonders Explorer
                </Link>
              </li>
              <li>
                <Link href="/packages/assam-meghalaya-tour" className="hover:text-orange-600 transition-colors">
                  Assam Meghalaya Tour
                </Link>
              </li>
              <li>
                <Link href="/packages/majestic-leh-ladakh-adventure" className="hover:text-orange-600 transition-colors">
                  Majestic Leh Ladakh
                </Link>
              </li>
              <li>
                <Link href="/packages/royal-kerala" className="hover:text-orange-600 transition-colors">
                  Royals Kerala Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-slate-900 font-heading font-bold text-sm tracking-wider uppercase mb-4">
              Newsletter
            </h4>
            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Subscribe to get exclusive group departure deals &amp; Swaminarayan/Jain special tour alerts.
            </p>
            
            {subscribed ? (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-700 text-xs p-3 rounded-xl font-medium">
                ✓ Subscribed! You will receive our latest tour departure deals.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <button
                  type="submit"
                  className="w-full gradient-btn py-2 rounded-xl text-xs font-bold font-heading cursor-pointer text-white shadow-md shadow-orange-500/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Royals Tours. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-orange-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-orange-600 transition-colors">
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-500">Ahmedabad, Gujarat, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
