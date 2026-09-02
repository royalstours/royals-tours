"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Itinerary {
  _id: string;
  itineraryNumber: string;
  packageName: string;
  subtitle: string;
  durationText: string;
  price: string;
  priceValidity: string;
  createdAt: string;
}

export default function AdminItinerariesPage() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteRef, setDeleteRef] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  async function fetchItineraries() {
    try {
      const res = await fetch("/api/itineraries");
      if (res.ok) {
        const data = await res.json();
        setItineraries(data);
      }
    } catch (err) {
      console.error("Failed to load itineraries:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItineraries();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/itineraries/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItineraries((prev) => prev.filter((itn) => itn._id !== deleteId));
        setDeleteId(null);
      } else {
        alert("Failed to delete itinerary.");
      }
    } catch (err) {
      alert("Error deleting itinerary.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = itineraries.filter(
    (itn) =>
      itn.itineraryNumber.toLowerCase().includes(search.toLowerCase()) ||
      itn.packageName.toLowerCase().includes(search.toLowerCase()) ||
      itn.durationText.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Manual Itinerary Management
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Create, manage, print and download beautiful dynamic 4-page tour itineraries.
          </p>
        </div>
        <Link
          href="/admin/itineraries/new"
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Create Itinerary</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search itineraries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 pl-10 text-xs font-bold focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-xs">🔍</span>
        </div>
        <div className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">
          Total: {filtered.length} Itineraries
        </div>
      </div>

      {/* List / Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
            Loading itineraries database...
          </div>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 space-y-4">
          <span className="text-4xl">🗺️</span>
          <h3 className="font-heading font-black text-lg text-slate-900 uppercase">No Itineraries Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {search ? "No records match your query. Try adjusting your filters." : "Create your first itinerary to download beautiful multi-page booklets."}
          </p>
          {!search && (
            <Link
              href="/admin/itineraries/new"
              className="inline-block bg-slate-900 text-white font-bold text-[10px] tracking-wider uppercase px-5 py-3 rounded-xl hover:bg-slate-850"
            >
              Get Started
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Ref Code</th>
                  <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Destination Package</th>
                  <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Duration</th>
                  <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Cost</th>
                  <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Validity</th>
                  <th className="p-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((itn) => (
                  <tr key={itn._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 text-xs font-bold text-slate-900">{itn.itineraryNumber}</td>
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{itn.packageName}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{itn.subtitle}</span>
                      </div>
                    </td>
                    <td className="p-4 text-xs font-bold text-slate-500">{itn.durationText}</td>
                    <td className="p-4 text-xs font-extrabold text-amber-600">{itn.price}</td>
                    <td className="p-4 text-xs font-bold text-slate-500">{itn.priceValidity}</td>
                    <td className="p-4 text-right space-x-1">
                      <Link
                        href={`/admin/itineraries/${itn._id}/view`}
                        className="inline-block px-3 py-1.5 border border-emerald-100 text-emerald-600 hover:bg-emerald-50 text-[10px] uppercase tracking-wider font-extrabold rounded-lg transition-colors"
                      >
                        📥 Download PDF
                      </Link>
                      <Link
                        href={`/admin/itineraries/${itn._id}/edit`}
                        className="inline-block px-3 py-1.5 border border-slate-200 text-slate-700 hover:bg-slate-100 text-[10px] uppercase tracking-wider font-extrabold rounded-lg transition-colors"
                      >
                        ✏️ Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(itn._id);
                          setDeleteRef(itn.itineraryNumber);
                        }}
                        className="px-3 py-1.5 border border-red-100 text-red-600 hover:bg-red-50 text-[10px] uppercase tracking-wider font-extrabold rounded-lg transition-colors"
                      >
                        🗑️ Delete
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-xl border border-slate-100 animate-scaleUp">
            <div className="text-center space-y-2">
              <span className="text-3xl">⚠️</span>
              <h3 className="font-heading font-black text-lg text-slate-900 uppercase">Delete Itinerary</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete itinerary <strong className="text-slate-700">{deleteRef}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
