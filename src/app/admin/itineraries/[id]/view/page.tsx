"use client";

import { use, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ItineraryDay {
  dayNum: number;
  title: string;
  description: string;
  image: string;
}

interface Itinerary {
  _id: string;
  itineraryNumber: string;
  packageName: string;
  subtitle: string;
  durationText: string;
  price: string;
  priceSuffix: string;
  priceValidity: string;
  days: ItineraryDay[];
  whatsIncluded: {
    stay: string;
    meals: string;
    transfers: string;
    tours: string;
    entries: string;
    support: string;
  };
  inclusions: string[];
  exclusions: string[];
  notes: string[];
}

export default function ItineraryViewPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pdfGenerating, setPdfGenerating] = useState(false);

  useEffect(() => {
    async function loadItinerary() {
      try {
        const res = await fetch(`/api/itineraries/${id}`);
        if (res.ok) {
          const data = await res.json();
          setItinerary(data);
        } else {
          setError("Failed to load itinerary details.");
        }
      } catch (err) {
        setError("An unexpected error occurred while loading.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      loadItinerary();
    }
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!itinerary || pdfGenerating) return;
    setPdfGenerating(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const jsPDF = (await import("jspdf")).default;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Loop through all 4 pages
      for (let i = 1; i <= 4; i++) {
        const pageEl = document.getElementById(`itinerary-page-${i}`);
        if (!pageEl) continue;

        const canvas = await html2canvas(pageEl, {
          scale: 2, // high quality
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc) => {
            // Isolate the specific page being printed in the cloned DOM
            const pageInClone = clonedDoc.getElementById(`itinerary-page-${i}`);
            if (pageInClone) {
              // Ensure cloned body is perfectly clean and has no scrollbars or margins
              clonedDoc.body.style.margin = "0";
              clonedDoc.body.style.padding = "0";
              clonedDoc.body.style.overflow = "hidden";
              clonedDoc.body.style.backgroundColor = "#ffffff";
              clonedDoc.body.style.width = "1120px";
              clonedDoc.body.style.height = "792px";

              // Style the page container to be positioned perfectly inside the cloned body
              pageInClone.style.position = "relative";
              pageInClone.style.top = "0";
              pageInClone.style.left = "0";
              pageInClone.style.margin = "0";
              pageInClone.style.width = "1120px";
              pageInClone.style.height = "792px";
              pageInClone.style.boxShadow = "none";
              pageInClone.style.borderRadius = "0px";
              pageInClone.style.border = "none";

              clonedDoc.body.innerHTML = "";
              clonedDoc.body.appendChild(pageInClone);
            }
          }
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (i > 1) {
          pdf.addPage();
        }

        // Standard A4 landscape is 297mm x 210mm
        pdf.addImage(imgData, "JPEG", 0, 0, 297, 210, undefined, "FAST");
      }

      pdf.save(`Itinerary_${itinerary.packageName.replace(/\s+/g, "_")}.pdf`);
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
          Generating itinerary preview...
        </div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="max-w-xl mx-auto p-6 bg-white border border-slate-100 rounded-3xl text-center space-y-4">
        <span className="text-4xl">⚠️</span>
        <h3 className="font-heading font-black text-lg text-slate-900 uppercase">Error Loading Details</h3>
        <p className="text-xs text-slate-500">{error || "Record not found."}</p>
        <Link
          href="/admin/itineraries"
          className="inline-block bg-slate-900 text-white font-bold text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl"
        >
          Back to Itineraries
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Controls Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-xs max-w-[1120px] mx-auto select-none">
        <div className="flex gap-2">
          <Link
            href="/admin/itineraries"
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase tracking-wider font-bold rounded-xl"
          >
            ← Back
          </Link>
          <Link
            href={`/admin/itineraries/${itinerary._id}/edit`}
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 text-[10px] uppercase tracking-wider font-bold rounded-xl"
          >
            ✏️ Edit Info
          </Link>
        </div>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfGenerating}
          className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold uppercase text-[10px] tracking-wider px-6 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <span>{pdfGenerating ? "Generating PDF Brochure..." : "📥 Download Itinerary PDF"}</span>
        </button>
      </div>

      {/* Preview Pages Container */}
      <div className="w-full overflow-x-auto pb-12 space-y-8 flex flex-col items-center">
        
        {/* PAGE 1: Welcome Cover (Static) */}
        <div
          id="itinerary-page-1"
          className="w-[1120px] h-[792px] bg-white relative font-sans text-slate-800 border border-slate-100 rounded-2xl shadow-xl shrink-0 overflow-hidden"
        >
          <img
            src="/images/itinerary/1.jpeg"
            alt="Welcome Cover Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

        {/* PAGE 2: Day-Wise Itinerary & Inclusions/Exclusions (Dynamic) */}
        <div
          id="itinerary-page-2"
          className="w-[1120px] h-[792px] bg-white relative font-sans text-slate-800 border border-slate-100 rounded-2xl shadow-xl shrink-0 overflow-hidden"
        >
          <img
            src="/images/itinerary/2.jpeg"
            alt="Itinerary Details Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          
          {/* Overlaid Day Photos and Day Details Text */}
          {itinerary.days.map((day, idx) => {
            const topOffset = 179 + idx * 86;
            return (
              <div key={idx} className="z-10">
                {/* Overlaid Day Photo */}
                <img
                  src={day.image || "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600"}
                  alt={day.title}
                  crossOrigin="anonymous"
                  className="absolute w-[172px] h-[78px] rounded-lg object-cover"
                  style={{ top: `${topOffset}px`, left: "115px" }}
                />
                {/* Overlaid Day Text Content */}
                <div
                  className="absolute w-[415px] h-[78px] bg-white p-2 flex flex-col justify-between text-left select-none overflow-hidden"
                  style={{ top: `${topOffset}px`, left: "298px" }}
                >
                  <div>
                    <h4 className="text-[10px] font-extrabold uppercase text-[#040D1A] tracking-tight truncate leading-tight">
                      {day.title}
                    </h4>
                    <p className="text-[8.5px] text-slate-500 leading-snug line-clamp-2 mt-0.5 font-medium">
                      {day.description}
                    </p>
                  </div>
                  <div className="text-[8px] font-bold text-orange-500 flex items-center gap-1 leading-none">
                    <span>📍</span>
                    <span>Overnight Stay at Hotel</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Cover unused day slots if itinerary has less than 6 days to prevent exposed template text */}
          {itinerary.days.length < 6 && (
            <div
              className="absolute bg-white z-10"
              style={{
                left: "55px",
                width: "660px",
                top: `${179 + itinerary.days.length * 86}px`,
                height: `${(6 - itinerary.days.length) * 86}px`,
              }}
            />
          )}

          {/* Right Column Inclusions Overlay */}
          <div
            className="absolute w-[270px] h-[190px] bg-white overflow-hidden text-left z-10 flex flex-col p-1"
            style={{ top: "242px", right: "55px" }}
          >
            <div className="overflow-y-auto flex-1 flex flex-col gap-1.5 pr-1">
              {itinerary.inclusions.map((inc, iIdx) => (
                <div key={iIdx} className="flex gap-2 items-start text-[8px] leading-tight text-slate-600 font-bold">
                  <span className="text-emerald-500 shrink-0 text-[10px] leading-none">✔️</span>
                  <span>{inc}</span>
                </div>
              ))}
              {itinerary.inclusions.length === 0 && (
                <div className="text-[8px] text-slate-400 italic text-center mt-4">None listed</div>
              )}
            </div>
          </div>

          {/* Right Column Exclusions Overlay */}
          <div
            className="absolute w-[270px] h-[190px] bg-white overflow-hidden text-left z-10 flex flex-col p-1"
            style={{ bottom: "125px", right: "55px" }}
          >
            <div className="overflow-y-auto flex-1 flex flex-col gap-1.5 pr-1">
              {itinerary.exclusions.map((exc, eIdx) => (
                <div key={eIdx} className="flex gap-2 items-start text-[8px] leading-tight text-slate-600 font-bold">
                  <span className="text-red-500 shrink-0 text-[10px] leading-none">❌</span>
                  <span>{exc}</span>
                </div>
              ))}
              {itinerary.exclusions.length === 0 && (
                <div className="text-[8px] text-slate-400 italic text-center mt-4">None listed</div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE 3: Cost details & summaries (Dynamic) */}
        <div
          id="itinerary-page-3"
          className="w-[1120px] h-[792px] bg-white relative font-sans text-slate-800 border border-slate-100 rounded-2xl shadow-xl shrink-0 overflow-hidden"
        >
          <img
            src="/images/itinerary/3.jpeg"
            alt="Trip Cost Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />

          {/* Price Header Text */}
          <div
            className="absolute w-[300px] h-[75px] bg-[#FAF9F6] flex justify-center items-center font-black text-[#040D1A] text-[40px] tracking-tight z-10"
            style={{ top: "305px", left: "340px" }}
          >
            {itinerary.price}
          </div>

          {/* Price Suffix */}
          <div
            className="absolute w-[300px] h-[20px] bg-[#FAF9F6] flex justify-center items-center font-extrabold text-[#FF7A00] text-[9.5px] uppercase tracking-widest z-10"
            style={{ top: "377px", left: "340px" }}
          >
            {itinerary.priceSuffix}
          </div>

          {/* Duration Box Overlay */}
          <div
            className="absolute w-[185px] h-[32px] bg-[#EAE8E4] border border-slate-300/40 rounded-lg flex justify-center items-center font-black text-slate-800 text-[10px] uppercase tracking-wider z-10"
            style={{ top: "420px", left: "398px" }}
          >
            {itinerary.durationText}
          </div>

          {/* What's Included text descriptions (horizontal overlays) */}
          {[
            { text: itinerary.whatsIncluded.stay, left: "292px" },
            { text: itinerary.whatsIncluded.meals, left: "370px" },
            { text: itinerary.whatsIncluded.transfers, left: "448px" },
            { text: itinerary.whatsIncluded.tours, left: "526px" },
            { text: itinerary.whatsIncluded.entries, left: "604px" },
            { text: itinerary.whatsIncluded.support, left: "682px" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="absolute w-[72px] h-[34px] bg-white text-[7px] text-slate-500 font-bold leading-tight text-center flex flex-col justify-center items-center overflow-hidden z-10"
              style={{ bottom: "174px", left: item.left }}
            >
              <p className="line-clamp-3 font-semibold">{item.text}</p>
            </div>
          ))}

          {/* Validity Date Box */}
          <div
            className="absolute w-[180px] h-[22px] bg-[#FAF9F6] flex items-center font-black text-slate-800 text-[11.5px] z-10 text-left"
            style={{ bottom: "108px", left: "105px" }}
          >
            {itinerary.priceValidity}
          </div>

          {/* Right Column Inclusions (Page 3) */}
          <div
            className="absolute w-[270px] h-[190px] bg-white overflow-hidden text-left z-10 flex flex-col p-1"
            style={{ top: "242px", right: "55px" }}
          >
            <div className="overflow-y-auto flex-1 flex flex-col gap-1.5 pr-1">
              {itinerary.inclusions.map((inc, iIdx) => (
                <div key={iIdx} className="flex gap-2 items-start text-[8px] leading-tight text-slate-600 font-bold">
                  <span className="text-emerald-500 shrink-0 text-[10px] leading-none">✔️</span>
                  <span>{inc}</span>
                </div>
              ))}
              {itinerary.inclusions.length === 0 && (
                <div className="text-[8px] text-slate-400 italic text-center mt-4">None listed</div>
              )}
            </div>
          </div>

          {/* Right Column Exclusions (Page 3) */}
          <div
            className="absolute w-[270px] h-[190px] bg-white overflow-hidden text-left z-10 flex flex-col p-1"
            style={{ bottom: "125px", right: "55px" }}
          >
            <div className="overflow-y-auto flex-1 flex flex-col gap-1.5 pr-1">
              {itinerary.exclusions.map((exc, eIdx) => (
                <div key={eIdx} className="flex gap-2 items-start text-[8px] leading-tight text-slate-600 font-bold">
                  <span className="text-red-500 shrink-0 text-[10px] leading-none">❌</span>
                  <span>{exc}</span>
                </div>
              ))}
              {itinerary.exclusions.length === 0 && (
                <div className="text-[8px] text-slate-400 italic text-center mt-4">None listed</div>
              )}
            </div>
          </div>

          {/* Footnotes bar */}
          <div className="absolute bottom-[28px] left-[45px] w-[1030px] h-[32px] bg-[#040D1A] text-white flex items-center px-4 rounded-xl border border-slate-800 shadow-inner z-10">
            <span className="text-[9px] font-black uppercase text-orange-500 tracking-wider shrink-0 mr-2">
              ⚠️ NOTE:
            </span>
            <div className="text-[8.5px] font-bold text-slate-300 truncate w-full text-left">
              {itinerary.notes.join("   |   ") || "Rates are subject to availability at the time of booking and may change without prior notice."}
            </div>
          </div>
        </div>

        {/* PAGE 4: Thank You (Static) */}
        <div
          id="itinerary-page-4"
          className="w-[1120px] h-[792px] bg-white relative font-sans text-slate-800 border border-slate-100 rounded-2xl shadow-xl shrink-0 overflow-hidden"
        >
          <img
            src="/images/itinerary/4.jpeg"
            alt="Thank You Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </div>

      </div>
    </div>
  );
}
