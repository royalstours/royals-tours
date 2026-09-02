"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface HeroSlide {
  _id: string;
  type: "image" | "video";
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  order: number;
}

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchSlides() {
    try {
      const res = await fetch("/api/hero-slides");
      if (res.ok) {
        const data = await res.json();
        setSlides(data);
      }
    } catch (err) {
      console.error("Failed to load hero slides:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/hero-slides/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSlides((prev) => prev.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        setDeleteTitle(null);
      } else {
        alert("Failed to delete slide.");
      }
    } catch (err) {
      alert("Error deleting slide.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = slides.filter(
    (item) =>
      item.alt.toLowerCase().includes(search.toLowerCase()) ||
      (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
      (item.badge && item.badge.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Hero Carousel Slides
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage the background slides (images & videos) displayed on the main home page Hero banner.
          </p>
        </div>
        <Link
          href="/admin/hero-slides/new"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Add New Slide</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search slides by alt text, title, badge..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>Total Slides: <strong className="text-slate-800">{filtered.length}</strong></span>
        </div>
      </div>

      {/* Slides Listing */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading slide catalog...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">🖼️</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Slides Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Create a new slide to display dynamic content on the main landing page banner.
          </p>
          <Link
            href="/admin/hero-slides/new"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create First Slide
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Slide Media</th>
                  <th className="py-4 px-4 text-center">Type</th>
                  <th className="py-4 px-4">Badge / Title</th>
                  <th className="py-4 px-4 text-center">Display Order</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-16 h-10 rounded overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200">
                        {item.type === "video" ? (
                          <video
                            src={item.src}
                            poster={item.poster}
                            className="w-full h-full object-cover"
                            muted
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="max-w-[200px]">
                        <span className="font-bold text-slate-900 block truncate">{item.alt}</span>
                        {item.mobileSrc && (
                          <span className="text-[9px] text-amber-600 font-black tracking-wider uppercase block mt-0.5">
                            📱 Separate Mobile View
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.type === "video" ? (
                        <span className="bg-blue-50 text-blue-700 border border-blue-200/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase">
                          📹 Video
                        </span>
                      ) : (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase">
                          🖼️ Image
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {item.title ? (
                        <div>
                          {item.badge && (
                            <span className="text-[10px] text-amber-600 font-bold block uppercase tracking-wider mb-0.5">
                              {item.badge}
                            </span>
                          )}
                          <span className="text-slate-800 font-bold block truncate max-w-xs">{item.title}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-normal italic">No titles set</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                      {item.order}
                    </td>
                    <td className="py-4 px-6 text-center space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/hero-slides/${item._id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteTitle(item.title || item.alt);
                        }}
                        className="text-rose-600 hover:text-rose-500 font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-100 shadow-2xl animate-dialog">
            <span className="text-3xl block mb-2 text-rose-500">⚠️</span>
            <h3 className="font-heading font-black text-lg text-slate-900 uppercase">
              Delete Slide?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete <strong>{deleteTitle}</strong>? This action will remove this slide from the homepage Hero banner permanently.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setDeleteId(null);
                  setDeleteTitle(null);
                }}
                disabled={deleting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Slide"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
