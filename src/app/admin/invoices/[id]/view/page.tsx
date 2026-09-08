"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface InvoiceItem {
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billedTo: {
    name: string;
    phone: string;
    email: string;
  };
  bookingReference: string;
  paymentStatus: "Confirmed" | "Pending" | "Paid" | "Partially Paid";
  tripDetails: {
    destination: string;
    travelDates: string;
    duration: string;
    travelers: string;
    packageName: string;
    hotelCategory: string;
  };
  items: InvoiceItem[];
  priceSummary: {
    subtotal: number;
    discount: number;
    totalAmount: number;
    amountPaid: number;
    balanceDue: number;
  };
  inclusions: string[];
  importantNotes: string[];
  thankYouNote: string;
  contactInfo: {
    phone: string;
    email: string;
    website: string;
    instagram: string;
  };
}

export default function InvoiceViewPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadInvoice() {
      try {
        const res = await fetch(`/api/invoices/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInvoice(data);
        } else {
          setError("Failed to load invoice details.");
        }
      } catch (err) {
        setError("An unexpected error occurred while loading.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadInvoice();
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
          const target = clonedDoc.getElementById("invoice-print-area");
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
      pdf.save(`Invoice_${invoice?.invoiceNumber.replace(/\//g, "_")}.pdf`);
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

  if (error || !invoice) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white border border-slate-100 rounded-3xl text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h3 className="font-heading font-black text-lg text-slate-900 uppercase">Error Loading Details</h3>
        <p className="text-xs text-slate-500">{error || "Record not found."}</p>
        <Link
          href="/admin/invoices"
          className="inline-block bg-slate-900 text-white font-bold text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl"
        >
          Back to Invoices
        </Link>
      </div>
    );
  }

  const formattedInvoiceDate = new Date(invoice.invoiceDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedDueDate = new Date(invoice.dueDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Action Controls Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs max-w-[1120px] mx-auto select-none">
        <div className="flex gap-2">
          <Link
            href="/admin/invoices"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase tracking-wider font-bold rounded-xl"
          >
            ← Back
          </Link>
          <Link
            href={`/admin/invoices/${invoice._id}/edit`}
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
          id="invoice-print-area"
          className="w-[1120px] h-[700px] bg-white relative p-6 font-sans text-slate-800 flex flex-col justify-between select-none overflow-hidden border border-slate-100 rounded-2xl shadow-xl mx-auto shrink-0 print:border-0 print:shadow-none print:rounded-none"
          style={{ boxSizing: "border-box" }}
        >
          {/* Header Container */}
          <div className="relative h-[155px] -mx-6 -mt-6 overflow-hidden shrink-0">
            {/* Top Navy Blue Header Banner */}
            <div className="absolute inset-0 bg-[#0A1128] z-0 overflow-hidden">
              <svg className="absolute bottom-0 left-0 w-full h-[60px] pointer-events-none" viewBox="0 0 1120 60" fill="none" preserveAspectRatio="none">
                <path d="M0 60C220 15 420 45 620 30C820 15 1020 45 1120 20V60H0Z" fill="#ffffff" />
                <path d="M0 60C220 15 420 45 620 30C820 15 1020 45 1120 20" stroke="#FF5E36" strokeWidth="1.8" />
              </svg>
              {/* Dashed Airplane loop path */}
              <svg className="absolute w-[200px] h-[55px] top-[75px] left-[150px] pointer-events-none" viewBox="0 0 200 55" fill="none">
                <path d="M10 45 C 50 15 110 15 170 30" stroke="#FF5E36" strokeWidth="1" strokeDasharray="3 3" />
                <text x="172" y="32" fill="#F59E0B" fontSize="10" transform="rotate(15, 172, 32)">✈</text>
              </svg>
            </div>

            {/* Header Block Contents */}
            <div className="flex justify-between items-start z-10 relative p-6 pt-5">
              {/* Logo & Brand info */}
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 shrink-0 flex items-center justify-center relative">
                  <img
                    src="/website-logo.webp"
                    alt="Royals Tours Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-black text-xl tracking-tight text-white leading-none">
                    ROYALS <span className="text-amber-550">TOURS</span>
                  </span>
                  <span className="text-[7.5px] text-white/70 font-bold uppercase tracking-[0.25em] mt-1.5 leading-none">
                    MAJESTIC JOURNEYS. MEMORIES.
                  </span>
                </div>
              </div>

              {/* Slogan */}
              <div className="flex flex-col items-center justify-center text-center mt-2 w-[240px]">
                <span className="font-script text-amber-500 text-3xl font-bold leading-none">Royals</span>
                <span className="font-heading font-black text-white text-md tracking-tight uppercase leading-none mt-0.5">Billing</span>
              </div>

              {/* Invoice box on right side of header */}
              <div className="w-60 flex flex-col gap-2">
                <h4 className="font-heading font-black text-2xl uppercase tracking-wider text-white text-right leading-none">
                  INVOICE
                </h4>
                <div className="border border-amber-500 rounded-lg bg-transparent text-amber-500 font-mono font-black text-center py-1 text-[11.5px] tracking-widest leading-none mt-0.5">
                  {invoice.invoiceNumber}
                </div>
                <div className="flex flex-col gap-1.5 mt-1.5 text-right items-end">
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-[8.5px] text-white font-bold uppercase flex gap-1 items-center">
                      <span className="text-white/60">INVOICE DATE</span>
                      <span className="text-white/80">:</span>
                      <span className="text-white font-sans font-bold">{formattedInvoiceDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="text-[8.5px] text-white font-bold uppercase flex gap-1 items-center">
                      <span className="text-white/60">DUE DATE</span>
                      <span className="text-white/80">:</span>
                      <span className="text-white font-sans font-bold">{formattedDueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Info Row */}
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between z-10 relative my-3 mt-4">
            {/* Billed To */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-2">
              <div className="w-8.5 h-8.5 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4.5 h-4.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">BILLED TO</span>
                <span className="block text-[11.5px] font-black text-slate-900 truncate mt-0.5" title={invoice.billedTo?.name}>
                  {invoice.billedTo?.name}
                </span>
                <span className="block text-[8px] text-slate-500 font-semibold truncate mt-0.5 leading-none">
                  {invoice.billedTo?.phone}
                </span>
                <span className="block text-[8px] text-slate-500 font-semibold truncate mt-0.5 leading-none">
                  {invoice.billedTo?.email}
                </span>
              </div>
            </div>

            <div className="border-r border-slate-200 h-8" />

            {/* Booking Reference */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-4">
              <div className="w-8.5 h-8.5 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4.5 h-4.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">BOOKING REFERENCE</span>
                <span className="block text-[11px] font-mono font-black text-slate-900 mt-1 leading-none">{invoice.bookingReference}</span>
              </div>
            </div>

            <div className="border-r border-slate-200 h-8" />

            {/* Payment Status badge */}
            <div className="flex items-center gap-2.5 flex-1 min-w-0 px-4">
              <div className="w-8.5 h-8.5 rounded-full border border-amber-200 bg-amber-50/50 flex items-center justify-center shrink-0">
                <svg className="w-4.5 h-4.5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div className="min-w-0 flex flex-col justify-center">
                <span className="block text-[7.5px] text-slate-400 font-black uppercase tracking-wider leading-none">PAYMENT STATUS</span>
                <div className="mt-1">
                  {invoice.paymentStatus === "Paid" && (
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-0.5 rounded-full text-[8.5px] font-black uppercase tracking-wider">
                      Paid
                    </span>
                  )}
                  {invoice.paymentStatus === "Confirmed" && (
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-0.5 rounded-full text-[8.5px] font-black uppercase">
                      Confirmed
                    </span>
                  )}
                  {invoice.paymentStatus === "Partially Paid" && (
                    <span className="bg-amber-50 text-amber-600 border border-amber-200 px-3 py-0.5 rounded-full text-[8.5px] font-black uppercase">
                      Partially Paid
                    </span>
                  )}
                  {invoice.paymentStatus === "Pending" && (
                    <span className="bg-rose-50 text-rose-600 border border-rose-200 px-3 py-0.5 rounded-full text-[8.5px] font-black uppercase">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Three-columns body container */}
          <div className="grid grid-cols-12 gap-4 z-10 relative flex-1 items-stretch">
            {/* Column 1: TRIP DETAILS */}
            <div className="col-span-3 border border-slate-200 bg-white rounded-xl p-3 flex flex-col justify-between text-[8px] leading-tight pt-7 relative">
              <div className="absolute -top-3.5 left-4 right-4 bg-[#080F1E] text-white rounded-full py-1.5 px-3 flex items-center justify-center gap-1.5 shadow-sm">
                <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-heading font-black text-[8.5px] uppercase tracking-wider">TRIP DETAILS</span>
              </div>
              <div className="flex flex-col gap-2 text-slate-600 font-bold mt-1.5 py-1">
                <div className="grid grid-cols-[14px_68px_6px_1fr] items-center border-b border-slate-50 pb-1">
                  <span className="text-amber-500 text-[10px]">📍</span>
                  <span className="font-black text-slate-900 tracking-wider">DESTINATION</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1" title={invoice.tripDetails?.destination}>
                    {invoice.tripDetails?.destination}
                  </span>
                </div>
                <div className="grid grid-cols-[14px_68px_6px_1fr] items-center border-b border-slate-50 pb-1">
                  <span className="text-amber-500 text-[10px]">📅</span>
                  <span className="font-black text-slate-900 tracking-wider">TRAVEL DATES</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1" title={invoice.tripDetails?.travelDates}>
                    {invoice.tripDetails?.travelDates}
                  </span>
                </div>
                <div className="grid grid-cols-[14px_68px_6px_1fr] items-center border-b border-slate-50 pb-1">
                  <span className="text-amber-500 text-[10px]">🌙</span>
                  <span className="font-black text-slate-900 tracking-wider">DURATION</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{invoice.tripDetails?.duration}</span>
                </div>
                <div className="grid grid-cols-[14px_68px_6px_1fr] items-center border-b border-slate-50 pb-1">
                  <span className="text-amber-500 text-[10px]">👥</span>
                  <span className="font-black text-slate-900 tracking-wider">TRAVELERS</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{invoice.tripDetails?.travelers}</span>
                </div>
                <div className="grid grid-cols-[14px_68px_6px_1fr] items-center border-b border-slate-50 pb-1">
                  <span className="text-amber-500 text-[10px]">💼</span>
                  <span className="font-black text-slate-900 tracking-wider">PACKAGE</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1" title={invoice.tripDetails?.packageName}>
                    {invoice.tripDetails?.packageName}
                  </span>
                </div>
                <div className="grid grid-cols-[14px_68px_6px_1fr] items-center pb-0.5">
                  <span className="text-amber-500 text-[10px]">🏢</span>
                  <span className="font-black text-slate-900 tracking-wider">CATEGORY</span>
                  <span className="text-slate-400 text-center">:</span>
                  <span className="font-bold text-slate-800 truncate pl-1">{invoice.tripDetails?.hotelCategory}</span>
                </div>
              </div>
            </div>

            {/* Column 2: LINE ITEMS TABLE */}
            <div className="col-span-6 border border-slate-200 bg-white rounded-xl shadow-xs flex flex-col overflow-hidden">
              <table className="w-full text-left border-collapse text-[9px] relative h-full">
                <thead>
                  <tr className="bg-[#080F1E] text-white text-[8px] font-black uppercase tracking-wider">
                    <th className="py-2.5 px-3 w-8 text-center border-r border-[#080F1E]">#</th>
                    <th className="py-2.5 px-3">DESCRIPTION</th>
                    <th className="py-2.5 px-2 w-10 text-center">QTY</th>
                    <th className="py-2.5 px-3 w-22 text-right">UNIT PRICE (₹)</th>
                    <th className="py-2.5 px-3 w-24 text-right">AMOUNT (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-bold">
                  {invoice.items?.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/20">
                      <td className="py-2.5 px-3 text-center text-slate-400 font-normal">{index + 1}</td>
                      <td className="py-2.5 px-3 truncate max-w-[200px] text-slate-900" title={item.description}>
                        {item.description}
                      </td>
                      <td className="py-2.5 px-2 text-center text-slate-800">{item.qty}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">{item.unitPrice.toLocaleString("en-IN")}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-900">{item.amount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - (invoice.items?.length || 0)) }).map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-9 border-b border-slate-100">
                      <td className="py-2.5 px-3"></td>
                      <td className="py-2.5 px-3"></td>
                      <td className="py-2.5 px-2"></td>
                      <td className="py-2.5 px-3"></td>
                      <td className="py-2.5 px-3"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Column 3: PRICE SUMMARY */}
            <div className="col-span-3 border border-slate-200 bg-white rounded-xl p-3 flex flex-col justify-between text-[9px] font-bold text-slate-500 pt-7 relative">
              <div className="absolute -top-3.5 left-4 right-4 bg-[#080F1E] text-white rounded-full py-1.5 px-3 flex items-center justify-center gap-1.5 shadow-sm">
                <span className="font-heading font-black text-[8.5px] uppercase tracking-wider">PRICE SUMMARY</span>
              </div>
              <div className="flex flex-col gap-1 mt-1.5">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">SUBTOTAL</span>
                  <span className="text-slate-400 font-semibold">:</span>
                  <span className="font-mono text-slate-900 text-right pr-1">₹ {invoice.priceSummary?.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">DISCOUNT</span>
                  <span className="text-slate-400 font-semibold">:</span>
                  <span className="font-mono text-slate-900 text-right pr-1">- ₹ {invoice.priceSummary?.discount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-slate-200 font-black">
                  <span className="text-[9px] font-black text-slate-900 uppercase tracking-wider">TOTAL AMOUNT</span>
                  <span className="text-orange-605 font-semibold">:</span>
                  <span className="font-mono text-base text-orange-600 text-right pr-1 font-black">₹ {invoice.priceSummary?.totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <div className="bg-[#0A1128] text-white rounded-lg px-2.5 py-1.5 flex justify-between items-center font-black">
                  <span className="text-[7.5px] uppercase tracking-wider text-white/70">AMOUNT PAID</span>
                  <span className="text-amber-500 mr-2">:</span>
                  <span className="font-mono text-[10.5px]">₹ {invoice.priceSummary?.amountPaid.toLocaleString("en-IN")}</span>
                </div>
                <div className="bg-[#FF5E36] text-white rounded-lg px-2.5 py-1.5 flex justify-between items-center font-black">
                  <span className="text-[7.5px] uppercase tracking-wider text-white/90">BALANCE DUE</span>
                  <span className="text-white mr-2">:</span>
                  <span className="font-mono text-[10.5px]">₹ {invoice.priceSummary?.balanceDue.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row of Inclusions, Notes, Thank you */}
          <div className="grid grid-cols-12 gap-4 z-10 relative mt-4">
            {/* Inclusions */}
            <div className="col-span-5 border border-slate-200 bg-white rounded-xl p-3 pt-6.5 relative flex flex-col justify-between">
              <h5 className="absolute -top-2.5 left-4 bg-slate-950 text-white font-heading font-black text-[8px] uppercase tracking-wider px-3 py-1 rounded-md">
                PACKAGE INCLUSIONS
              </h5>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 overflow-hidden text-[9px] py-0.5">
                {invoice.inclusions?.slice(0, 6).map((inc, i) => (
                  <div key={i} className="flex items-start gap-1 leading-tight text-slate-700 font-bold min-w-0">
                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[7px] font-black shrink-0">✓</span>
                    <span className="truncate" title={inc}>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="col-span-4 border border-slate-200 bg-white rounded-xl p-3 pt-6.5 relative flex flex-col justify-between">
              <h5 className="absolute -top-2.5 left-4 bg-slate-950 text-white font-heading font-black text-[8px] uppercase tracking-wider px-3 py-1 rounded-md">
                IMPORTANT NOTES
              </h5>
              <div className="flex flex-col gap-1 overflow-hidden text-[9px] text-slate-500 font-bold leading-tight py-0.5">
                {invoice.importantNotes?.slice(0, 4).map((note, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 min-w-0">
                    <span className="w-1.2 h-1.2 rounded-full bg-amber-500 shrink-0 mt-1" />
                    <span className="truncate" title={note}>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Thank you note */}
            <div className="col-span-3 border border-slate-200 bg-white rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
              <svg className="absolute inset-0 w-full h-full opacity-[0.03] text-slate-600 pointer-events-none z-0" viewBox="0 0 150 150" fill="none" stroke="#080F1E" strokeWidth="1">
                <path d="M 10 130 C 70 80 130 130 110 50 C 90 20 40 50 30 100" strokeDasharray="3 3" />
              </svg>
              <div className="z-10 leading-tight">
                <span className="font-script text-amber-600 text-2.5xl font-black block">Thank you!</span>
                <p className="text-[9px] text-slate-500 font-bold mt-0.5">
                  {invoice.thankYouNote || "Thank you for choosing Royals Tours. We look forward to traveling with you!"}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info Bar */}
          <div className="h-10 bg-[#080F1E] rounded-xl mt-4 flex items-center justify-between px-4 z-10 relative overflow-hidden text-white border-none select-none">
            <div className="flex items-center gap-1.5 text-[8.5px] text-white/80 font-bold uppercase tracking-wider">
              <span className="font-script text-amber-500 text-lg lowercase normal-case tracking-normal pl-0.5">We're here to help!</span>
              <span className="text-white/20 mx-1.5">|</span>
              <span className="text-amber-550 text-[10px]">📞</span> <span className="font-semibold">{invoice.contactInfo?.phone}</span>
              <span className="text-white/20 mx-1.5">|</span>
              <span className="text-amber-550 text-[10px]">✉</span> <span className="font-semibold lowercase normal-case">{invoice.contactInfo?.email}</span>
            </div>
            
            <div className="flex items-center gap-4 text-[8px] text-white/80 font-bold uppercase tracking-wider">
              <span>🌐 {invoice.contactInfo?.website}</span>
              <span>📸 {invoice.contactInfo?.instagram}</span>
            </div>

            <div className="flex items-center gap-1.5 text-white pr-1 select-none shrink-0 font-heading font-black text-[7.5px] lowercase tracking-normal">
              <span>Let's explore the world together.</span>
              <span className="text-amber-500 text-[9px]">♥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
