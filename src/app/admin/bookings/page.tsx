"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Booking {
  _id: string;
  bookingReference: string;
  bookingDate: string;
  leadTraveler: {
    name: string;
    phone: string;
    email: string;
  };
  totalTravelers: string;
  destination: string;
  travelDates: string;
  duration: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteRef, setDeleteRef] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  async function fetchBookings() {
    try {
      const res = await fetch("/api/booking-confirmations");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/booking-confirmations/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== deleteId));
        setDeleteId(null);
      } else {
        alert("Failed to delete booking confirmation.");
      }
    } catch (err) {
      alert("Error deleting booking confirmation.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = bookings.filter(
    (b) =>
      b.bookingReference.toLowerCase().includes(search.toLowerCase()) ||
      b.leadTraveler?.name.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.leadTraveler?.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Booking Confirmations
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Create, manage, print and download customer booking confirmations.
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Create Booking Confirmation</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search reference, traveler, destination..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400 bg-white"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>Total confirmations: <strong className="text-slate-800">{filtered.length}</strong></span>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading booking confirmations...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">🎟️</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Bookings Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Try adjusting your search query or create a new booking confirmation.
          </p>
          <Link
            href="/admin/bookings/new"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create Confirmation
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Reference</th>
                  <th className="py-4 px-4">Lead Traveler</th>
                  <th className="py-4 px-4">Destination</th>
                  <th className="py-4 px-4">Travel Dates</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                      {b.bookingReference}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-slate-900 block">{b.leadTraveler?.name}</span>
                      <span className="text-[10px] text-slate-400">{b.leadTraveler?.phone} • {b.leadTraveler?.email}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-800">{b.destination}</td>
                    <td className="py-4 px-4">
                      <div>{b.travelDates}</div>
                      <div className="text-[10px] text-slate-400">{b.duration}</div>
                    </td>
                    <td className="py-4 px-6 text-center space-x-3">
                      <Link
                        href={`/admin/bookings/${b._id}/view`}
                        className="text-emerald-600 hover:text-emerald-500 font-bold"
                      >
                        📄 View &amp; PDF
                      </Link>
                      <Link
                        href={`/admin/bookings/${b._id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => {
                          setDeleteId(b._id);
                          setDeleteRef(b.bookingReference);
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

      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-100 shadow-2xl animate-dialog">
            <span className="text-3xl block mb-2 text-rose-500">⚠️</span>
            <h3 className="font-heading font-black text-lg text-slate-900 uppercase">
              Delete Confirmation?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete the booking confirmation <strong>{deleteRef}</strong>? This action will remove the record from MongoDB permanently.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-rose-600 hover:bg-rose-50 text-white font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
