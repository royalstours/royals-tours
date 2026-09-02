"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TestimonialItem {
  _id: string;
  name: string;
  role?: string;
  trip: string;
  comment: string;
  rating: number;
  avatar?: string;
  order: number;
  createdAt: string;
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchTestimonials() {
    try {
      const res = await fetch("/api/testimonials");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data);
      }
    } catch (err) {
      console.error("Failed to load testimonials:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/testimonials/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        setDeleteName(null);
      } else {
        alert("Failed to delete testimonial.");
      }
    } catch (err) {
      alert("Error deleting testimonial.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = testimonials.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.trip.toLowerCase().includes(search.toLowerCase()) ||
      item.comment.toLowerCase().includes(search.toLowerCase()) ||
      (item.role && item.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Traveler Testimonials
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage reviews and ratings shared by the explorer community for the homepage infinite slider.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Add New Testimonial</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search reviews by name, trip, role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>Total Reviews: <strong className="text-slate-800">{filtered.length}</strong></span>
        </div>
      </div>

      {/* Testimonials Listing */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading testimonial index...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">💬</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Testimonials Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Create testimonials to showcase feedback from your client departures on the live website.
          </p>
          <Link
            href="/admin/testimonials/new"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create First Testimonial
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Traveler</th>
                  <th className="py-4 px-4">Trip Info</th>
                  <th className="py-4 px-4">Review Content</th>
                  <th className="py-4 px-4 text-center">Rating</th>
                  <th className="py-4 px-4 text-center">Display Order</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200">
                        {item.avatar ? (
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                            {item.name.slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                        {item.role && (
                          <span className="text-[10px] text-slate-400 block font-normal">{item.role}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-amber-600">
                      {item.trip}
                    </td>
                    <td className="py-4 px-4 max-w-sm">
                      <p className="line-clamp-2 text-slate-500 font-medium italic">
                        "{item.comment}"
                      </p>
                    </td>
                    <td className="py-4 px-4 text-center text-amber-500 text-sm font-mono tracking-tight font-black">
                      {"★".repeat(item.rating)}
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                      {item.order}
                    </td>
                    <td className="py-4 px-6 text-center space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/testimonials/${item._id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteName(item.name);
                        }}
                        className="text-rose-500 hover:text-rose-400 font-bold cursor-pointer"
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-sm w-full p-6 shadow-xl animate-dialog">
            <h3 className="font-heading font-black text-lg text-slate-950 uppercase">Confirm Deletion</h3>
            <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to remove the testimonial from <strong className="text-slate-800">{deleteName}</strong>? This action is permanent.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setDeleteId(null);
                  setDeleteName(null);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase py-3 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "🗑️ Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
