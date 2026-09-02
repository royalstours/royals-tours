"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface GalleryPhoto {
  _id: string;
  title: string;
  location: string;
  category: "international" | "trek" | "community";
  image: string;
  caption: string;
  order: number;
}

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchPhotos() {
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch (err) {
      console.error("Failed to load gallery photos:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/gallery/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPhotos((prev) => prev.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        setDeleteTitle(null);
      } else {
        alert("Failed to delete photo.");
      }
    } catch (err) {
      alert("Error deleting photo.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = photos.filter(
    (item) =>
      (item.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.location || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Travel Photo Gallery
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage pictures, locations, categories, and descriptions shown in the frontend Travel Gallery page.
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Add Photo</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by title, location or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>Total Photos: <strong className="text-slate-800">{filtered.length}</strong></span>
        </div>
      </div>

      {/* Table Listing */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading gallery photos...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">📸</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Photos Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Upload travel photos with categories and captions to customize your gallery.
          </p>
          <Link
            href="/admin/gallery/new"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Upload First Photo
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-4">Title</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4 text-center">Category</th>
                  <th className="py-4 px-4 text-center">Order</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6">
                      <div className="w-16 h-12 rounded overflow-hidden relative border border-slate-200 bg-slate-50 shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-slate-800 max-w-[150px] truncate" title={item.title}>
                      {item.title}
                    </td>
                    <td className="py-4 px-4 max-w-[150px] truncate" title={item.location}>
                      {item.location}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                        item.category === "international"
                          ? "bg-blue-50 text-blue-700 border-blue-200/50"
                          : item.category === "trek"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/50"
                          : "bg-purple-50 text-purple-700 border-purple-200/50"
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                      {item.order}
                    </td>
                    <td className="py-4 px-6 text-center space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/gallery/${item._id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteTitle(item.title);
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
              Delete Photo?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete <strong>{deleteTitle}</strong>?
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
                {deleting ? "Deleting..." : "Delete Photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
