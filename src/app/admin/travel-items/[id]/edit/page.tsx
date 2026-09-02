"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TravelItemForm from "@/components/admin/TravelItemForm";

interface TravelItem {
  _id: string;
  id: string;
  name: string;
  title: string;
  slogan: string;
  category: "international" | "domestic" | "trek";
  duration: string;
  badge: string;
  price: string;
  rawPrice: number;
  image: string;
  highlights: string[];
  description: string;
  location: string;
  bestTimeToVisit: string;
  groupSize: string;
  included: string[];
  excluded: string[];
  pricingTiers: any[];
  itinerary: any[];
  gallery: string[];
  faqs: any[];
  isFixedDeparture: boolean;
}

function EditTravelItemContent({ id }: { id: string }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState<TravelItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        const res = await fetch(`/api/travel-items/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        } else {
          setError("Failed to fetch tour package specs.");
        }
      } catch (err) {
        setError("Error loading tour specifications.");
      } finally {
        setLoading(false);
      }
    }
    loadItem();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/travel-items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/destinations");
        router.refresh();
      } else {
        setError(data.error || "Failed to update travel offering.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
          Loading Package Details...
        </div>
      </div>
    );
  }

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
          Edit Travel Offering
        </h2>
        <p className="text-xs text-slate-450 mt-0.5">
          Modify the specifications, pricing structures, and detailed timeline of: <strong className="text-slate-800 uppercase">{initialData?.name}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Shared Form Component */}
      {initialData && (
        <TravelItemForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          loading={saving}
        />
      )}
    </div>
  );
}

export default function EditTravelItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
          Loading Edit Wizard...
        </div>
      </div>
    }>
      <EditTravelItemContent id={id} />
    </Suspense>
  );
}
