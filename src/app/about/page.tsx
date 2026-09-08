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
            <h2 className="font-heading font-black text-xl sm:text-3xl uppercase tracking-tight text-slate-900 leading-tight">
              A Heritage of Trusted Travel Organization
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Based in the heart of Ahmedabad, Royals Tours was founded to bring families, couples, and group travelers together. We specialize in making travel completely stress-free, comfortable, and safe.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              Our unique domestic group tours travel with their own catering staff, offering freshly prepared Swaminarayan, Jain, and Pure Vegetarian meals. No matter if you are climbing the heights of Tawang, exploring the backwaters of Kerala, or flying to the exotic beaches of Bali and Vietnam, we ensure you travel like royalty.
            </p>
            <div className="flex gap-4">
              <Link
                href="/packages"
                className="gradient-btn px-6 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white shadow-md cursor-pointer"
              >
                Browse Catalog
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-heading font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xs transition-colors"
              >
                Contact Helplines
              </Link>
            </div>
          </div>

          <div className="h-96 rounded-3xl overflow-hidden shadow-lg border border-slate-100 relative bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1590050752117-238cb0612b1b?q=80&w=800"
              alt="Himalayan Mountains Scenic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Pillars / USPs Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-heading font-black text-lg uppercase tracking-tight text-slate-900">
              Our Core Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <svg className="w-8 h-8 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
              </svg>
              <h3 className="font-heading font-bold text-sm uppercase text-slate-900">
                Vegetarian Gastronomy
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                We believe good food is essential to a happy holiday. Traveling with our cooks ensures our guests never compromise on fresh Swaminarayan and Jain dietary preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <svg className="w-8 h-8 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              <h3 className="font-heading font-bold text-sm uppercase text-slate-900">
                Curated itineraries
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                Our tour paths are balanced and researched. We mix must-see cultural icons (like Paro Taktsang or Golden Bridge) with scenic leisure stops and time for local shopping.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <svg className="w-8 h-8 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h3 className="font-heading font-bold text-sm uppercase text-slate-900">
                Absolute Hospitality
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                We treat every traveler as a member of the Royals Tours family. Our dedicated tour managers provide warm, attentive coordination from departure to return.
              </p>
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
