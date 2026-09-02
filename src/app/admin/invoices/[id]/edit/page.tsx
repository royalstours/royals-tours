"use client";

import { useState, useEffect, use, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InvoiceForm from "@/components/admin/InvoiceForm";

function EditInvoiceContent({ id }: { id: string }) {
  const router = useRouter();
  const [initialData, setInitialData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvoice() {
      try {
        const res = await fetch(`/api/invoices/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInitialData(data);
        } else {
          setError("Failed to fetch client invoice details.");
        }
      } catch (err) {
        setError("Error loading invoice details.");
      } finally {
        setLoading(false);
      }
    }
    loadInvoice();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/invoices");
        router.refresh();
      } else {
        setError(data.error || "Failed to update client invoice.");
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
          Loading Invoice Details...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div>
        <Link
          href="/admin/invoices"
          className="text-xs font-bold text-slate-400 hover:text-slate-655 flex items-center gap-1 mb-1"
        >
          ← Back to Invoices
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Edit Client Invoice
        </h2>
        <p className="text-xs text-slate-450 mt-0.5">
          Modify details of invoice number: <strong className="text-slate-800 font-mono">{initialData?.invoiceNumber}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {initialData && (
        <InvoiceForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Save Invoice Changes"
          loading={saving}
        />
      )}
    </div>
  );
}

export default function EditInvoicePage({
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
      <EditInvoiceContent id={id} />
    </Suspense>
  );
}
