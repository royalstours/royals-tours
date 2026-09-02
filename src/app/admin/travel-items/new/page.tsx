"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TravelItemForm from "@/components/admin/TravelItemForm";

function CreateTravelItemContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: any) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/travel-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/destinations");
        router.refresh();
      } else {
        setError(data.error || "Failed to create travel offering.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div>
        <Link
          href="/admin/destinations"
          className="text-xs font-bold text-slate-400 hover:text-slate-655 flex items-center gap-1 mb-1"
        >
          ← Back to Catalog
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Add New Travel Item
        </h2>
        <p className="text-xs text-slate-450 mt-0.5">
          Populate the travel specs, highlights, pricing tiers, itineraries, and media gallery.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Shared Form Component */}
      <TravelItemForm
        onSubmit={handleSubmit}
        submitLabel="Create Travel Offering"
        loading={loading}
      />
    </div>
  );
}

export default function CreateTravelItemPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
          Loading Form Wizard...
        </div>
      </div>
    }>
      <CreateTravelItemContent />
    </Suspense>
  );
}
