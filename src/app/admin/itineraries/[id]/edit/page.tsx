"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ItineraryForm from "@/components/admin/ItineraryForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditItineraryPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const router = useRouter();
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (formData: any) => {
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/itineraries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/itineraries");
        router.refresh();
      } else {
        setError(data.error || "Failed to update itinerary.");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
          Loading itinerary editor data...
        </div>
      </div>
    );
  }

  if (error && !itinerary) {
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
          Edit Itinerary
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Modify itinerary parameters, swap day cover images, adjust starting pricing, or select inclusions/exclusions.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      <ItineraryForm
        initialData={itinerary}
        onSubmit={handleSubmit}
        submitLabel="Save Changes & Update"
        loading={saving}
      />
    </div>
  );
}
