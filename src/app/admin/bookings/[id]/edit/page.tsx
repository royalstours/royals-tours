"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BookingForm from "@/components/admin/BookingForm";

function EditBookingContent({ id }: { id: string }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooking() {
      try {
        const res = await fetch(`/api/booking-confirmations/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        } else {
          setError("Failed to fetch booking confirmation details.");
        }
      } catch (err) {
        setError("Error loading booking details.");
      } finally {
        setLoading(false);
      }
    }
    loadBooking();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/booking-confirmations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/bookings");
        router.refresh();
      } else {
        setError(data.error || "Failed to update booking confirmation.");
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
          Loading Booking Details...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div>
        <Link
          href="/admin/bookings"
          className="text-xs font-bold text-slate-400 hover:text-slate-655 flex items-center gap-1 mb-1"
        >
          ← Back to Bookings
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Edit Booking Confirmation
        </h2>
        <p className="text-xs text-slate-450 mt-0.5">
          Modify details of booking reference: <strong className="text-slate-800 font-mono">{initialData?.bookingReference}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {initialData && (
        <BookingForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Booking Confirmation Changes"
          loading={saving}
        />
      )}
    </div>
  );
}

export default function EditBookingPage({
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
      <EditBookingContent id={id} />
    </Suspense>
  );
}
