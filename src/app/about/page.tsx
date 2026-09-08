"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

export default function AboutPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white pt-32 pb-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute right-[-20px] bottom-[-40px] text-white/10 font-black text-[120px] pointer-events-none select-none uppercase">
          About
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4">
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block backdrop-blur-sm">
            Our Story
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-white drop-shadow-sm">
            About Royals Tours
          </h1>
          <p className="text-xs text-white/90 font-medium max-w-lg leading-relaxed">
            Crafting majestic travel memories and pure vegetarian group holiday experiences.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow space-y-16">
        
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase text-orange-600 tracking-widest bg-orange-100/80 border border-orange-200 px-3 py-1 rounded-full inline-block mb-3">
                Experience the Difference
              </span>
              <h2 className="font-heading font-black text-xl sm:text-3xl uppercase tracking-tight text-slate-900 leading-tight">
                A Heritage of Trusted Travel Organization
              </h2>
              <div className="w-14 h-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mt-3"></div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Based in the heart of Ahmedabad, Royals Tours was founded to bring families, couples, and group travelers together. We specialize in making travel completely stress-free, comfortable, and safe.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Our unique domestic group tours travel with their own catering staff, offering freshly prepared Swaminarayan, Jain, and Pure Vegetarian meals. No matter if you are climbing the heights of Tawang, exploring the backwaters of Kerala, or flying to the exotic beaches of Bali and Vietnam, we ensure you travel like royalty.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/packages"
                className="gradient-btn px-6 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 cursor-pointer"
              >
                Browse Catalog
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-orange-50/60 border border-orange-200/80 text-orange-700 font-heading font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xs transition-colors"
              >
                Contact Helplines
              </Link>
            </div>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden shadow-xl border-2 border-orange-100 relative bg-slate-100 group">
            <img
              src="https://images.unsplash.com/photo-1590050752117-238cb0612b1b?q=80&w=800"
              alt="Himalayan Mountains Scenic"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Pillars / USPs Grid with Vibrant Travel Palettes */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-black uppercase text-teal-600 tracking-widest bg-teal-100/80 border border-teal-200 px-3 py-1 rounded-full">
              Our Values
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-slate-900 mt-2">
              Our Core Guiding Principles
            </h2>
            <div className="w-14 h-1.5 bg-gradient-to-r from-teal-500 via-amber-400 to-orange-500 rounded-full mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1: Pure Veg Kitchen */}
            <div className="bg-gradient-to-b from-emerald-50/40 to-white p-8 rounded-3xl border border-emerald-100 hover:border-emerald-400 shadow-sm hover:shadow-xl shadow-emerald-500/5 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-xs">
                <svg className="w-6 h-6 stroke-emerald-600 fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
                </svg>
              </div>
              <h3 className="font-heading font-extrabold text-base uppercase text-slate-900">
                Vegetarian Gastronomy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                We believe good food is essential to a happy holiday. Traveling with our cooks ensures our guests never compromise on fresh Swaminarayan and Jain dietary preferences.
              </p>
            </div>

            {/* Pillar 2: Curated Paths */}
            <div className="bg-gradient-to-b from-sky-50/40 to-white p-8 rounded-3xl border border-sky-100 hover:border-sky-400 shadow-sm hover:shadow-xl shadow-sky-500/5 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 shadow-xs">
                <svg className="w-6 h-6 stroke-sky-600 fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" y1="3" x2="9" y2="18" />
                  <line x1="15" y1="6" x2="15" y2="21" />
                </svg>
              </div>
              <h3 className="font-heading font-extrabold text-base uppercase text-slate-900">
                Curated Itineraries
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                Our tour paths are balanced and researched. We mix must-see cultural icons (like Paro Taktsang or Golden Bridge) with scenic leisure stops and time for local shopping.
              </p>
            </div>

            {/* Pillar 3: Absolute Hospitality */}
            <div className="bg-gradient-to-b from-orange-50/40 to-white p-8 rounded-3xl border border-orange-100 hover:border-orange-400 shadow-sm hover:shadow-xl shadow-orange-500/5 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 shadow-xs">
                <svg className="w-6 h-6 stroke-orange-600 fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="font-heading font-extrabold text-base uppercase text-slate-900">
                Absolute Hospitality
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                We treat every traveler as a member of the Royals Tours family. Our dedicated tour managers provide warm, attentive coordination from departure to return.
              </p>
            </div>
          </div>
        </div>

        {/* Travel Highlights & Stats Strip */}
        <div className="bg-gradient-to-r from-orange-50/90 via-amber-50/80 to-teal-50/90 border border-orange-100/90 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-heading text-orange-600">8000+</span>
              <p className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">Delighted Travelers</p>
              <p className="text-[11px] text-slate-500 font-medium">Joined our group and private holiday packages</p>
            </div>
            <div className="space-y-1 border-y md:border-y-0 md:border-x border-orange-200/60 py-6 md:py-0">
              <span className="text-3xl sm:text-4xl font-black font-heading text-teal-600">50+</span>
              <p className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">Top Global Locations</p>
              <p className="text-[11px] text-slate-500 font-medium">Domestic wonders and exotic international getaways</p>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black font-heading text-amber-600">100%</span>
              <p className="text-xs uppercase font-extrabold text-slate-800 tracking-wider">Pure Veg / Jain Support</p>
              <p className="text-[11px] text-slate-500 font-medium">Private kitchen staff traveling on domestic group tours</p>
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
