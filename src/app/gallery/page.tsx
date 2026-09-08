"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";
import { galleryImages, GalleryItem } from "@/data/travelData";

export default function GalleryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"all" | "international" | "trek" | "community">("all");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [dbPhotos, setDbPhotos] = useState<GalleryItem[]>([]);

  const openInquiryModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function loadPhotos() {
      try {
        const res = await fetch("/api/gallery");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setDbPhotos(
              data.map((item: any) => ({
                id: item._id,
                title: item.title,
                location: item.location,
                category: item.category,
                image: item.image,
                caption: item.caption,
              }))
            );
          }
        }
      } catch (err) {
        console.error("Failed to fetch dynamic gallery items:", err);
      }
    }
    loadPhotos();
  }, []);

  const activePhotosList = dbPhotos.length > 0 ? dbPhotos : galleryImages;

  const filteredPhotos = activePhotosList.filter((img) => {
    if (activeCategory === "all") return true;
    return img.category === activeCategory;
  });

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenInquiry={openInquiryModal} />

      {/* Page Header */}
      <section className="relative pt-32 pb-20 bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1600"
            alt="Group of travelers laughing around bonfire"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-heading font-bold text-white tracking-widest bg-white/20 border border-white/30 px-4 py-1.5 rounded-full inline-block mb-4 backdrop-blur-sm">
            REAL TRAVELER MEMORIES
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight drop-shadow-sm">
            Our Travel <span className="text-amber-200">Gallery</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
            Take a peak into our group departure trips, mountain summit climbs, and beach moments around the world.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: "All Moments" },
              { id: "international", label: "✈️ International Trips" },
              { id: "trek", label: "🏔️ Mountain Treks" },
              { id: "community", label: "🤝 Group Bonding" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold font-heading transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 cursor-pointer"
              >
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase px-3 py-1 rounded-md shadow flex items-center gap-1.5">
                    <svg className="w-3 h-3 stroke-slate-950 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {item.location}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                    <h3 className="font-extrabold text-base font-heading group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof CTA */}
          <div className="mt-16 bg-gradient-to-r from-orange-50 via-amber-50 to-teal-50 text-slate-850 rounded-3xl p-8 sm:p-12 border border-orange-100 text-center space-y-4 shadow-sm">
            <span className="text-orange-500 text-2xl block">📸</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              Want to Be Featured in Our Next Journey?
            </h3>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Join our upcoming group departure trips to Bhutan, Thailand, Sri Lanka, Malaysia, or Dubai and capture your own memories!
            </p>
            <div className="pt-2">
              <button
                onClick={openInquiryModal}
                className="gradient-btn px-8 py-3.5 rounded-full text-sm font-bold font-heading cursor-pointer shadow-lg text-white"
              >
                Book Your Seat Now
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedPhoto(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          ></div>
          <div className="relative bg-white border border-slate-200 rounded-3xl max-w-3xl w-full overflow-hidden z-10 shadow-2xl">
            <div className="relative h-96 w-full">
              <Image
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-orange-500 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 bg-white text-slate-800 space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-orange-600 font-bold uppercase tracking-wider">
                  <svg className="w-3.5 h-3.5 stroke-orange-600 fill-none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {selectedPhoto.location}
                </span>
              <h3 className="text-xl font-bold font-heading text-slate-900">{selectedPhoto.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
}
