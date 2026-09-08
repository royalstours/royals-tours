"use client";

import { useState, useEffect } from "react";
import { detailedTravelItems } from "@/data/travelData";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
}

export default function InquiryModal({
  isOpen,
  onClose,
  initialDestination = "",
}: InquiryModalProps) {
  const [selectedDestination, setSelectedDestination] = useState(initialDestination);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelDate: "",
    travelers: 1,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedDestination(initialDestination);
  }, [initialDestination]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          destination: selectedDestination,
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setForm({ name: "", email: "", phone: "", travelDate: "", travelers: 1, message: "" });
          onClose();
        }, 2500);
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error("Inquiry submit error:", err);
      alert("An unexpected error occurred while sending your inquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      ></div>

      {/* Dialog Container */}
      <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl z-10 animate-dialog border border-orange-100 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white px-6 py-5 flex items-center justify-between shadow-md">
          <div>
            <h3 className="text-base font-extrabold font-heading tracking-wide uppercase">
              Plan Your Next Trip
            </h3>
            <p className="text-[10px] text-white/90 font-bold tracking-wider mt-0.5">
              ROYALS TOURS INQUIRY FORM
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 focus:outline-none transition-colors"
            aria-label="Close dialog"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Form */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 mb-4 animate-bounce">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-900 font-heading">
                Inquiry Sent Successfully!
              </h4>
              <p className="text-sm text-slate-500 mt-2 max-w-xs">
                Thank you for reaching out. Our travel expert will contact you shortly with complete details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800"
                  />
                </div>
                {/* Phone */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. +91 97238 20277"
                    className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800"
                  />
                </div>
              </div>

              {/* Date & Travelers Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Travel Date */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Preferred Travel Date
                  </label>
                  <input
                    type="date"
                    value={form.travelDate}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800 cursor-pointer"
                  />
                </div>
                {/* Number of Travelers */}
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Number of Travelers
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={form.travelers}
                    onChange={(e) => setForm({ ...form, travelers: parseInt(e.target.value) || 1 })}
                    className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                  Selected Destination / Package
                </label>
                <select
                  value={selectedDestination}
                  onChange={(e) => setSelectedDestination(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800 cursor-pointer"
                >
                  <option value="">-- Select a Destination --</option>
                  {Object.values(detailedTravelItems).map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name} ({item.category === "international" ? "International" : "Domestic"})
                    </option>
                  ))}
                  <option value="Custom Tour / Tailor-Made Holiday">Custom Tour (Tailor-made request)</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                  Special Requests / Message
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="e.g. Food preference (Jain/Swaminarayan), room sharing preferences..."
                  className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-slate-800 resize-none"
                ></textarea>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn mt-2 py-3.5 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-white shadow-md shadow-orange-500/20"
              >
                {loading ? "Sending Inquiry..." : "Submit Booking Inquiry"}
                {!loading && (
                  <svg className="w-4 h-4 transform rotate-45" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
