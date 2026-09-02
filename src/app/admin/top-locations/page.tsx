"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TopLocation {
  _id: string;
  name: string;
  image: string;
  link?: string;
  inquiryName?: string;
  order: number;
}

export default function AdminTopLocationsPage() {
  const [locations, setLocations] = useState<TopLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchLocations() {
    try {
      const res = await fetch("/api/top-locations");
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (err) {
      console.error("Failed to load top locations:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/top-locations/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLocations((prev) => prev.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        setDeleteName(null);
      } else {
        alert("Failed to delete location.");
      }
    } catch (err) {
      alert("Error deleting location.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = locations.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.link && item.link.toLowerCase().includes(search.toLowerCase())) ||
      (item.inquiryName && item.inquiryName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Best Top Rated Locations
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage the locations showcased in the horizontal circular scrolling list on the home page.
          </p>
        </div>
        <Link
          href="/admin/top-locations/new"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Add Top Location</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search locations by name, link..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>Total Locations: <strong className="text-slate-800">{filtered.length}</strong></span>
        </div>
      </div>

      {/* Locations Listing */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading top location catalog...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">⭐</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Locations Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Try adjusting your search query, seeding the database, or creating a new location.
          </p>
          <Link
            href="/admin/top-locations/new"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create First Location
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Location</th>
                  <th className="py-4 px-4 text-center">Display Order</th>
                  <th className="py-4 px-4">Action Mode</th>
                  <th className="py-4 px-4">Action Target</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                      {item.order}
                    </td>
                    <td className="py-4 px-4">
                      {item.link ? (
                        <span className="bg-blue-50 text-blue-700 border border-blue-200/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase">
                          🔗 Link
                        </span>
                      ) : (
                        <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase">
                          💬 Inquiry
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-slate-500 break-all max-w-[200px]">
                      {item.link ? (
                        <span className="text-blue-600 font-bold">{item.link}</span>
                      ) : (
                        <span className="text-amber-600 font-bold">{item.inquiryName || item.name}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/top-locations/${item._id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteName(item.name);
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
              Delete Location?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete <strong>{deleteName}</strong>? This action will remove this location from the homepage dynamic list permanently.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setDeleteId(null);
                  setDeleteName(null);
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
                {deleting ? "Deleting..." : "Delete Location"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
