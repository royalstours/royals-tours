"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

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
  inclusions: string[];
  tripDetails: {
    packageName: string;
    hotelCategory: string;
    travelers: string;
    checkIn: string;
    checkOut: string;
    packageType: string;
    travelStyle: string;
  };
  importantNotes: string[];
  thankYouNote: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    instagram: string;
  };
}

export default function BookingViewPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/booking-confirmations/${id}`);
        if (res.ok) {
          const data = await res.json();
          setBooking(data);
        } else {
          setError("Failed to load booking confirmation details.");
        }
      } catch (err) {
        setError("An unexpected error occurred while loading.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadBooking();
    }
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!printAreaRef.current || pdfGenerating) return;
    setPdfGenerating(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const jsPDF = (await import("jspdf")).default;

      const element = printAreaRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const target = clonedDoc.getElementById("booking-print-area");
          const allSvgs = clonedDoc.querySelectorAll("svg");
          allSvgs.forEach((svg: any) => {
            if (!target || !target.contains(svg)) {
              try {
                svg.remove();
              } catch (e) {}
            }
          });

          if (target) {
            target.style.position = "static";
            target.style.margin = "0 auto";
            target.style.boxShadow = "none";
            target.style.borderRadius = "0px";
            target.style.border = "none";

            clonedDoc.body.innerHTML = "";
            clonedDoc.body.appendChild(target);
          }
        }
      });

      const imgData = canvas.toDataURL("image/png");
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = 297;
      const pdfHeight = 210;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      pdf.save(`Booking_Confirmation_${booking?.bookingReference.replace(/\//g, "_")}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Please try again or use Ctrl+P to print.");
    } finally {
      setPdfGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
          Generating preview layout...
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white border border-slate-100 rounded-3xl text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h3 className="font-heading font-black text-lg text-slate-900 uppercase">Error Loading Details</h3>
        <p className="text-xs text-slate-500">{error || "Record not found."}</p>
        <Link
          href="/admin/bookings"
          className="inline-block bg-slate-900 text-white font-bold text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl"
        >
          Back to Bookings
        </Link>
      </div>
    );
  }

  const formattedBookingDate = new Date(booking.bookingDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Action Controls Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs max-w-[1120px] mx-auto select-none">
        <div className="flex gap-2">
          <Link
            href="/admin/bookings"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase tracking-wider font-bold rounded-xl"
          >
            ← Back
          </Link>
          <Link
            href={`/admin/bookings/${booking._id}/edit`}
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase tracking-wider font-bold rounded-xl"
          >
            ✏️ Edit Info
          </Link>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfGenerating}
          className="bg-emerald-600 hover:bg-emerald-550 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60 text-slate-950"
        >
          <span>{pdfGenerating ? "Generating PDF..." : "📥 Download PDF Document"}</span>
        </button>
      </div>

      {/* Outer wrapper for responsive scaling */}
      <div className="w-full overflow-x-auto pb-6">
        <div 
          ref={printAreaRef}
          id="booking-print-area"
          className="w-[1120px] h-[700px] bg-white relative p-6 font-sans text-slate-800 flex flex-col justify-between select-none overflow-hidden border border-slate-100 rounded-2xl shadow-xl mx-auto shrink-0 print:border-0 print:shadow-none print:rounded-none"
          style={{ boxSizing: "border-box" }}
        >
          {/* Top-left navy swoop curve with gold border */}
          <div className="absolute top-0 left-0 w-[480px] h-[160px] z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 480 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H420C350 0 290 40 230 80C170 120 90 160 0 160V0Z" fill="#0A1128" />
              <path d="M420 0C350 0 290 40 230 80C170 120 90 160 0 160" stroke="#FF5E36" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Header Block */}
          <div className="flex justify-between items-start z-10 relative">
            {/* Logo & Brand Info */}
            <div className="flex items-center gap-2.5">
              <div className="w-[70px] h-[70px] shrink-0 flex items-center justify-center relative">
                <img
                  src="/website-logo.webp"
                  alt="Royals Tours Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg tracking-tight text-white leading-none">
                  ROYALS <span className="text-amber-500">TOURS</span>
                </span>
                <span className="text-[7px] text-white/85 font-bold uppercase tracking-[0.22em] mt-1.5 leading-none">
                  MAJESTIC JOURNEYS. MEMORIES.
                </span>
              </div>
            </div>

            {/* Slogan */}
            <div className="flex flex-col items-center justify-center text-center mt-2 relative w-[240px] h-[100px]">
              <svg className="absolute w-[220px] h-[45px] bottom-[-15px] left-2.5 z-0 pointer-events-none" viewBox="0 0 220 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 35 C 60 15 120 15 210 25" stroke="#FF5E36" strokeWidth="1" strokeDasharray="3 3" />
                <text x="212" y="27" fill="#F59E0B" fontSize="10" transform="rotate(10, 212, 27)">✈</text>
              </svg>
              <span className="font-script text-amber-500 text-3xl font-bold leading-none z-10">Royals</span>
              <span className="font-heading font-black text-slate-900 text-md tracking-tight uppercase leading-none z-10">Departures</span>
            </div>

            {/* Booking confirmation details box */}
            <div className="w-60 flex flex-col gap-2">
              <h4 className="font-heading font-black text-[12px] uppercase tracking-wider text-slate-900 flex items-center justify-end gap-1.5 pb-1 border-b border-slate-200">
                <span>BOOKING VOUCHER</span>
                <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </h4>
              <div className="flex items-center gap-2.5 mt-1">
                <div className="w-7 h-7 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Booking Reference</span>
                  <span className="text-[11px] font-mono font-black text-slate-900 mt-0.5">{booking.bookingReference}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Booking Date</span>
                  <span className="text-[11px] font-bold text-slate-900 mt-0.5">{formattedBookingDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Card */}
          <div className="border border-slate-200 bg-white rounded-xl p-3 flex items-center justify-between z-10 relative my-3">
            {/* Lead Traveler */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2">
              <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Lead Traveler</span>
                <span className="block text-[10.5px] font-black text-slate-900 truncate mt-0.5" title={booking.leadTraveler?.name}>
                  {booking.leadTraveler?.name}
                </span>
                <span className="block text-[7px] text-slate-400 font-semibold truncate leading-none mt-0.5">
                  {booking.leadTraveler?.phone || booking.leadTraveler?.email}
                </span>
              </div>
            </div>

            <div className="border-r border-slate-200 h-7" />

            {/* Total Travelers */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2">
              <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Total Travelers</span>
                <span className="block text-[10.5px] font-black text-slate-900 truncate mt-0.5">{booking.totalTravelers}</span>
              </div>
            </div>

            <div className="border-r border-slate-200 h-7" />

            {/* Destination */}
            <div className="flex items-center gap-2.5 flex-[1.2] min-w-0 px-2">
              <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Destination</span>
                <span className="block text-[10.5px] font-black text-slate-900 truncate mt-0.5" title={booking.destination}>
                  {booking.destination}
                </span>
              </div>
            </div>

            <div className="border-r border-slate-200 h-7" />

            {/* Travel Dates */}
            <div className="flex items-center gap-2.5 flex-[1.2] min-w-0 px-2">
              <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Travel Dates</span>
                <span className="block text-[10.5px] font-black text-slate-900 truncate mt-0.5" title={booking.travelDates}>
                  {booking.travelDates}
                </span>
              </div>
            </div>

            <div className="border-r border-slate-200 h-7" />

            {/* Duration */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2">
              <div className="w-8 h-8 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">Duration</span>
                <span className="block text-[10.5px] font-black text-slate-900 truncate mt-0.5">{booking.duration}</span>
              </div>
            </div>
          </div>

          {/* Three-columns body container */}
          <div className="grid grid-cols-12 gap-4 z-10 relative flex-1 items-stretch">
            {/* Column 1: INCLUSIONS & IMPORTANT NOTES stacked (span 5) */}
            <div className="col-span-5 flex flex-col justify-between h-full">
              {/* Inclusions */}
              <div className="border border-slate-200 bg-white rounded-xl p-3.5 relative flex flex-col justify-between flex-1 min-h-0 pt-6">
                <h5 className="absolute -top-2.5 left-4 bg-slate-950 text-white font-heading font-black text-[8.5px] uppercase tracking-wider px-3.5 py-1 rounded-md">
                  INCLUSIONS
                </h5>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 overflow-hidden text-[9px] py-1">
                  {booking.inclusions?.slice(0, 8).map((inc, i) => (
                    <div key={i} className="flex items-start gap-1.5 leading-tight text-slate-700 font-bold min-w-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[7px] font-black shrink-0">✓</span>
                      <span className="truncate" title={inc}>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Notes */}
              <div className="border border-slate-200 bg-white rounded-xl p-3.5 relative flex flex-col justify-between flex-1 min-h-0 pt-6 mt-4.5">
                <h5 className="absolute -top-2.5 left-4 bg-slate-950 text-white font-heading font-black text-[8.5px] uppercase tracking-wider px-3.5 py-1 rounded-md">
                  IMPORTANT NOTES
                </h5>
                <div className="flex flex-col gap-1.5 overflow-hidden text-[9px] text-slate-500 font-bold leading-tight py-1">
                  {booking.importantNotes?.slice(0, 5).map((note, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1" />
                      <span className="truncate" title={note}>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: TRIP DETAILS (span 4) */}
            <div className="col-span-4 border border-slate-200 bg-white rounded-xl p-3.5 relative flex flex-col pt-6">
              <h5 className="absolute -top-2.5 left-4 bg-slate-950 text-white font-heading font-black text-[8.5px] uppercase tracking-wider px-3.5 py-1 rounded-md">
                TRIP DETAILS
              </h5>
              <div className="flex flex-col gap-2.5 text-[9.5px] text-slate-600 font-semibold py-1">
                {/* Package */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5 border-b border-slate-50">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">PACKAGE</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1" title={booking.tripDetails?.packageName}>
                    {booking.tripDetails?.packageName}
                  </span>
                </div>
                {/* Hotel Category */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5 border-b border-slate-50">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">HOTEL CATEGORY</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{booking.tripDetails?.hotelCategory}</span>
                </div>
                {/* Travelers */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5 border-b border-slate-50">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">TRAVELERS</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{booking.tripDetails?.travelers}</span>
                </div>
                {/* Check-In */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5 border-b border-slate-50">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">CHECK-IN</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{booking.tripDetails?.checkIn}</span>
                </div>
                {/* Check-Out */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5 border-b border-slate-50">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">CHECK-OUT</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{booking.tripDetails?.checkOut}</span>
                </div>
                {/* Package Type */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5 border-b border-slate-50">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h2a2.5 2.5 0 002.5-2.5V14a2 2 0 012-2h.09M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">PACKAGE TYPE</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{booking.tripDetails?.packageType}</span>
                </div>
                {/* Travel Style */}
                <div className="grid grid-cols-[16px_100px_8px_1fr] items-center py-0.5">
                  <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="font-black text-slate-900 tracking-wider">TRAVEL STYLE</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{booking.tripDetails?.travelStyle}</span>
                </div>
              </div>
            </div>

            {/* Column 3: Thank You note card (span 3) */}
            <div className="col-span-3 border border-slate-200 bg-white rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-[0.03] text-slate-650 pointer-events-none z-0" viewBox="0 0 200 200" fill="none" stroke="#080F1E" strokeWidth="1">
                <path d="M 20 180 C 100 120 180 180 150 80 C 130 30 70 80 50 140" strokeDasharray="3 3" />
              </svg>
              <div className="space-y-1.5 z-10">
                <span className="font-script text-amber-600 text-3xl font-black block">Thank You!</span>
                <p className="text-[9.5px] text-slate-500 leading-normal font-bold">
                  {booking.thankYouNote || "Your journey is confirmed with Royals Tours. Get ready to experience travel like royalty!"}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="h-10 border border-slate-200/80 bg-slate-50/50 rounded-xl mt-4 flex items-center justify-between px-4 z-10 relative overflow-hidden print:border-t">
            <div className="flex items-center gap-1.5 text-[8.5px] text-slate-500 font-bold uppercase tracking-wider">
              <span className="font-script text-amber-655 text-lg lowercase normal-case tracking-normal pl-0.5">We're here to help!</span>
              <span className="text-slate-300 mx-1">|</span>
              <span className="text-amber-600">📞</span> <span>{booking.contactInfo?.phone}</span>
              <span className="text-slate-300 mx-1">|</span>
              <span className="text-amber-600">✉</span> <span>{booking.contactInfo?.email}</span>
            </div>
            
            <div className="flex items-center gap-4 text-[8px] text-slate-500 font-bold uppercase tracking-wider mr-[430px]">
              <span>🌐 {booking.contactInfo?.website}</span>
              <span>📸 {booking.contactInfo?.instagram}</span>
            </div>

            {/* Navy curve overlay block */}
            <div className="absolute top-0 bottom-0 right-0 w-[420px] z-20 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 420 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <path d="M420 40H0 C40 40 80 20 120 0 H420 V40Z" fill="#0A1128" />
                <path d="M0 40C40 40 80 20 120 0H420" stroke="#FF5E36" strokeWidth="1.5" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-end pr-5 text-white font-heading font-black text-[7.5px] uppercase tracking-wider">
                <span>Let's explore the world together.</span>
                <span className="text-amber-500 ml-1.5 text-[9px]">♥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
