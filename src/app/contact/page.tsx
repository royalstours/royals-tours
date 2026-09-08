"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

export default function ContactPage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleOpenInquiry = (destination = "") => {
    setSelectedDest(destination);
    setInquiryOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        }, 3000);
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Message send error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar onOpenInquiry={handleOpenInquiry} />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white pt-32 pb-16 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <div className="absolute right-[-20px] bottom-[-40px] text-white/10 font-black text-[120px] pointer-events-none select-none uppercase">
          Contact
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-4">
          <span className="bg-white/20 text-white border border-white/30 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest inline-block backdrop-blur-sm">
            Connect
          </span>
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-tight text-white drop-shadow-sm">
            Contact Royals Tours
          </h1>
          <p className="text-xs text-white/90 font-medium max-w-lg leading-relaxed">
            Need help planning? Get in touch with our travel team in Ahmedabad.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Contact Info Cards */}
          <div className="space-y-6">
            
            {/* Phone Helplines */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-orange-300 shadow-xs space-y-4 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-lg">
                <svg className="w-5 h-5 stroke-orange-500 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400">
                  Call / WhatsApp
                </h3>
                <div className="mt-2 space-y-1 text-sm font-semibold text-slate-900">
                  <a href="tel:+919723820277" className="block hover:text-orange-600 transition-colors">+91 97238 20277</a>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-teal-300 shadow-xs space-y-4 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-lg">
                <svg className="w-5 h-5 stroke-teal-600 fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400">
                  Email Helpline
                </h3>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  <a href="mailto:royalstours.amd@gmail.com" className="hover:text-orange-600 transition-colors">royalstours.amd@gmail.com</a>
                </div>
              </div>
            </div>

            {/* Address */}
            <a 
              href="https://maps.app.goo.gl/j6B38M5stnRt5kae7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xs space-y-4 block hover:border-orange-400 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-lg group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                <svg className="w-5 h-5 stroke-amber-500 fill-none group-hover:stroke-white transition-colors duration-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400 group-hover:text-orange-600 transition-colors duration-300">
                  Office Address
                </h3>
                <p className="mt-2 text-xs font-semibold text-slate-800 leading-relaxed">
                  Royals Tours, Office No. 456, M/7, Second Floor,
                  Chandan Complex, Above Mirch Masala, Opp. Femina Town,
                  Swastik Cross Road, C.G. Road, Navrangpura, Ahmedabad - 380009
                </p>
              </div>
            </a>

          </div>

          {/* Inquiry / Message Form */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-lg lg:col-span-2">
            {isSubmitted ? (
              <div className="py-16 text-center space-y-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-500 animate-bounce">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-heading font-black text-lg uppercase text-slate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm">
                  Thank you for writing to Royals Tours. Our team will read your message and respond back shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="font-heading font-black text-base uppercase text-slate-900">
                    Send Us a Message
                  </h2>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                    General &amp; custom holiday inquiries
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. +91 97238 20277"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  {/* Subject */}
                  <div className="flex flex-col">
                    <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1.5">
                      Inquiry Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="e.g. Booking Kashmir Package"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label className="text-[9px] uppercase font-black text-slate-400 tracking-wider mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write details of your travel plan or question here..."
                    className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full gradient-btn py-3 rounded-xl font-heading font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-white shadow-md shadow-orange-500/20"
                >
                  {loading ? "Sending..." : "Send Message"}
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
      </main>

      <Footer />

      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        initialDestination={selectedDest}
      />
    </div>
  );
}
