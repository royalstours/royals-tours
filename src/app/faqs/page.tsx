"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { comprehensiveFaqs } from "@/data/travelData";
import { useEffect } from "react";

const getCategoryIcon = (id: string) => {
  switch (id) {
    case "all":
      return (
        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "departures":
      return (
        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7 3.5 8.5l7.3 3.6-3.6 3.6L4.5 15l-1 1 2.5 1.5L7.5 20l1-1-.7-2.7 3.6-3.6 3.6 7.3z"/>
        </svg>
      );
    case "visas":
      return (
        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "payments":
      return (
        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      );
    case "solo":
      return (
        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      );
    case "treks":
      return (
        <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 22L12 8l8 14M12 22L17 12l5 10" />
        </svg>
      );
    default:
      return null;
  }
};

export default function FaqsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const [faqs, setFaqs] = useState<{ category: string; question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const res = await fetch("/api/faqs");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setFaqs(data);
          }
        }
      } catch (err) {
        console.error("Failed to load dynamic FAQs, falling back to static data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFaqs();
  }, []);

  const openInquiryModal = () => {
    setIsModalOpen(true);
  };

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "departures", label: "Group Departures" },
    { id: "visas", label: "Visas & Passports" },
    { id: "payments", label: "Payments & Refunds" },
    { id: "solo", label: "Solo Travel & Sharing" },
    { id: "treks", label: "Weekend Treks" },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : comprehensiveFaqs;

  const filteredFaqs = displayFaqs.filter(faq => {
    const matchesCat = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenInquiry={openInquiryModal} />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1600"
            alt="Travel counselor giving advice to traveler"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-heading font-bold text-white tracking-widest bg-white/20 border border-white/30 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
            HELP &amp; KNOWLEDGE BASE
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight drop-shadow-sm">
            Frequently Asked <span className="text-amber-200">Questions</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Find answers to common questions about international group departures, visa procedures, solo room sharing, and payment schedules.
          </p>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenIndex(0); }}
                className={`px-4 py-2 rounded-full text-xs font-bold font-heading transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {getCategoryIcon(cat.id)}
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search visa, deposit, refund..."
              className="w-full bg-slate-50 border border-slate-300 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-800"
            />
            <svg className="absolute right-3.5 top-2.5 text-slate-400 w-3.5 h-3.5 stroke-current fill-none pointer-events-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <svg className="w-12 h-12 stroke-slate-350 fill-none mx-auto mb-2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <h3 className="text-lg font-bold font-heading text-slate-900">No matching questions found</h3>
              <p className="text-xs text-slate-500 mt-1">Have a specific question not answered here? Reach out to us directly!</p>
              <Link
                href="/contact"
                className="mt-4 inline-block gradient-btn px-6 py-2.5 rounded-full text-xs font-bold font-heading"
              >
                Contact Support Specialist
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between font-heading font-bold text-slate-900 text-base focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="text-amber-500 text-xl font-bold ml-4 shrink-0">
                      {openIndex === idx ? "−" : "+"}
                    </span>
                  </button>

                  {openIndex === idx && (
                    <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Need More Assistance Card */}
          <div className="mt-14 bg-gradient-to-r from-orange-50 via-amber-50 to-teal-50 text-slate-850 rounded-3xl p-8 border border-orange-100/80 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-xl font-bold font-heading text-slate-900">Still have questions?</h3>
              <p className="text-xs text-slate-600 mt-1">Our travel specialists are available on WhatsApp and Phone 7 days a week.</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919723820277"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-xs font-bold font-heading transition-colors shadow-xs"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="gradient-btn px-5 py-2.5 rounded-full text-xs font-bold font-heading text-white shadow-xs"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </div>
  );
}
