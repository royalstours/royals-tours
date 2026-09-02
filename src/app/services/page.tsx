"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { servicesList } from "@/data/travelData";

const getServiceIcon = (emoji: string) => {
  switch (emoji) {
    case "🍱":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v4M18 8V2M21 2v9a5 5 0 0 1-5 5h-1v6" />
        </svg>
      );
    case "✈️":
    case "✈":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7 3.5 8.5l7.3 3.6-3.6 3.6L4.5 15l-1 1 2.5 1.5L7.5 20l1-1-.7-2.7 3.6-3.6 3.6 7.3z"/>
        </svg>
      );
    case "🏨":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 21h18M9 21V9a3 3 0 0 1 6 0v12M2 9h20M2 17h2M20 17h2M2 5h20M9 5h6" />
        </svg>
      );
    case "🎟️":
    case "🎟":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M6 5v4M6 15v4M18 5v4M18 15v4" />
        </svg>
      );
    case "🚗":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11.2 2 11.8 2 12.4V16c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      );
    case "📑":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "📖":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20M4 19.5V3.5A2.5 2.5 0 0 1 6.5 1H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
        </svg>
      );
    case "🚢":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M2 21h20M19.3 14.8C21.1 13.5 22 11.7 22 10V3h-4v3H6V3H2v7c0 1.7.9 3.5 2.7 4.8L2 19h20l-2.7-4.2zM12 6v4" />
        </svg>
      );
    case "🛡️":
    case "🛡":
      return (
        <svg className="w-6 h-6 stroke-amber-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    default:
      return <span className="text-xl">{emoji}</span>;
  }
};

export default function ServicesPage() {
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
      <section className="bg-slate-950 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/30 z-10" />
        <div className="absolute right-[-20px] bottom-[-40px] text-white/5 font-black text-[120px] pointer-events-none select-none uppercase">
          Services
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4">
          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block">
            What We Do
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-white">
            Our Travel Services
          </h1>
          <p className="text-xs text-slate-450 font-semibold max-w-lg leading-relaxed">
            From visa assistance to booking flight tickets and car rentals, we coordinate every detail of your vacation.
          </p>
        </div>
      </section>

      {/* Services Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow space-y-16">
        
        {/* Core USP Special Callout */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden border border-slate-800">
          <div className="space-y-4 relative z-10 flex-1">
            <span className="bg-amber-500 text-slate-950 text-[9px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider">
              Exclusive Domestic USP
            </span>
            <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
              Catering Kitchen pure Veg Group Departures
            </h2>
            <p className="text-xs text-slate-350 leading-relaxed font-semibold max-w-2xl">
              We travel with our own dedicated team of Gujarati &amp; Rajasthani cooks. During your tour, we prepare fresh, hot, pure vegetarian, Swaminarayan, and Jain meals daily. Ideal for family group travel!
            </p>
          </div>
          <button
            onClick={() => handleOpenInquiry("Pure Veg Group Departure")}
            className="gradient-btn px-6 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-slate-950 shrink-0 relative z-10 cursor-pointer"
          >
            Inquire About Veg Tours
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv) => (
            <div
              key={srv.id}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl shadow-xs">
                  {getServiceIcon(srv.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-black text-base uppercase text-slate-900 leading-tight">
                      {srv.title}
                    </h3>
                    {srv.badge && (
                      <span className="bg-amber-500/20 text-amber-600 font-black text-[8px] uppercase px-2 py-0.5 rounded-full border border-amber-500/15">
                        {srv.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                    {srv.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {srv.description}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <ul className="space-y-2">
                  {srv.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-[10px] font-bold text-slate-600">
                      <span className="text-emerald-500 shrink-0">✓</span>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
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
