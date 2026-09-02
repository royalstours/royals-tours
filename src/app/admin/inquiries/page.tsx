"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  travelDate?: string;
  travelers?: number;
  subject?: string;
  message: string;
  status: "pending" | "contacted" | "booked" | "cancelled";
  notes?: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Notes Modal State
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [notesText, setNotesText] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  async function fetchInquiries() {
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === id ? { ...inq, status: updated.status } : inq))
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      alert("Error updating inquiry status.");
    }
  };

  const handleNotesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry) return;
    setSavingNotes(true);

    try {
      const res = await fetch(`/api/admin/inquiries/${activeInquiry._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: notesText }),
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries((prev) =>
          prev.map((inq) => (inq._id === activeInquiry._id ? { ...inq, notes: updated.notes } : inq))
        );
        setActiveInquiry(null);
        setNotesText("");
      } else {
        alert("Failed to update remarks.");
      }
    } catch (err) {
      alert("Error updating inquiry remarks.");
    } finally {
      setSavingNotes(false);
    }
  };

  const openNotesModal = (inq: Inquiry) => {
    setActiveInquiry(inq);
    setNotesText(inq.notes || "");
  };

  const filtered = inquiries.filter((inq) => {
    const matchesFilter = statusFilter === "all" || inq.status === statusFilter;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.toLowerCase().includes(search.toLowerCase()) ||
      (inq.destination && inq.destination.toLowerCase().includes(search.toLowerCase())) ||
      (inq.subject && inq.subject.toLowerCase().includes(search.toLowerCase())) ||
      inq.message.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Inquiries &amp; Leads Dashboard
        </h2>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Review visitor submissions, edit status pipelines, and track communications notes.
        </p>
      </div>

      {/* Filter and Stats Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search leads by client name, trip, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        {/* Status Pipeline Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {[
            { id: "all", label: "All leads" },
            { id: "pending", label: "🔴 Pending" },
            { id: "contacted", label: "🟡 Contacted" },
            { id: "booked", label: "🟢 Booked" },
            { id: "cancelled", label: "⚫ Cancelled" },
          ].map((statusTab) => (
            <button
              key={statusTab.id}
              onClick={() => setStatusFilter(statusTab.id)}
              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === statusTab.id
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {statusTab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading client leads list...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">📧</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Leads Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Try adjusting your search filters.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Traveler Info</th>
                  <th className="py-4 px-4">Selected Trip / Form</th>
                  <th className="py-4 px-4">Client Message</th>
                  <th className="py-4 px-4">Status Pipeline</th>
                  <th className="py-4 px-4">Admin Remarks</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-650">
                {filtered.map((inq) => (
                  <tr key={inq._id} className="hover:bg-slate-50/50 align-top">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900">{inq.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">{inq.phone}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{inq.email}</div>
                      <div className="text-[9px] text-slate-300 font-bold uppercase mt-2">
                        {new Date(inq.createdAt).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {inq.destination ? (
                        <>
                          <span className="text-slate-800 font-bold uppercase block">{inq.destination}</span>
                          {(inq.travelDate || inq.travelers) && (
                            <div className="text-[10px] text-slate-500 font-semibold mt-1 flex flex-col gap-0.5">
                              {inq.travelers && <span>👥 {inq.travelers} Traveler(s)</span>}
                              {inq.travelDate && <span>📅 Date: {inq.travelDate}</span>}
                            </div>
                          )}
                        </>
                      ) : (
                        <span className="text-slate-550 italic block">{inq.subject || "General Inquiry"}</span>
                      )}
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="text-slate-500 text-[11px] leading-relaxed break-words font-medium whitespace-pre-line">
                        {inq.message}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq._id, e.target.value)}
                        className={`text-[10px] font-black uppercase px-2.5 py-1.5 rounded-lg border focus:outline-none cursor-pointer ${
                          inq.status === "pending"
                            ? "bg-rose-50 border-rose-200 text-rose-700"
                            : inq.status === "contacted"
                            ? "bg-amber-50 border-amber-200 text-amber-700"
                            : inq.status === "booked"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-slate-50 border-slate-200 text-slate-500"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="booked">Booked</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      {inq.notes ? (
                        <div className="bg-slate-50 p-2.5 border border-slate-100 rounded-xl text-[10px] leading-relaxed font-bold text-slate-550 relative">
                          <p>{inq.notes}</p>
                        </div>
                      ) : (
                        <span className="text-slate-300 italic text-[10px]">No remark logs</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => openNotesModal(inq)}
                        className="bg-slate-100 hover:bg-slate-200 border border-slate-200/50 text-slate-700 font-black uppercase text-[9px] tracking-wider px-3 py-1.5 rounded-lg cursor-pointer transition-all"
                      >
                        📝 Log Remarks
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Remarks Notes Modal Popup */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 select-none">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-100 shadow-2xl animate-dialog">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="font-heading font-black text-sm uppercase tracking-wider text-slate-800">
                Remark Logs: {activeInquiry.name}
              </h3>
              <button
                onClick={() => setActiveInquiry(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleNotesSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                  Internal Admin Follow-up Remarks
                </label>
                <textarea
                  rows={4}
                  required
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="e.g. Called client. Requested quotes for 4 people. Sent itinerary details via WhatsApp..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveInquiry(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingNotes}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black uppercase text-[10px] tracking-wider px-5 py-2.5 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  {savingNotes ? "Saving..." : "Save Remarks"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
