"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ItineraryForm from "@/components/admin/ItineraryForm";

export default function CreateItineraryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: any) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/itineraries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/itineraries");
        router.refresh();
      } else {
        setError(data.error || "Failed to create itinerary.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div>
        <Link
          href="/admin/itineraries"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-1"
        >
          ← Back to Itineraries
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Create Itinerary
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Manually build traveler itineraries, select inclusions from presets, upload day wise photos, and output beautiful dynamic PDFs.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      <ItineraryForm
        onSubmit={handleSubmit}
        submitLabel="Create Tour Itinerary"
        loading={loading}
      />
    </div>
  );
}
