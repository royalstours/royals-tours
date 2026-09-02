"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InvoiceForm from "@/components/admin/InvoiceForm";

export default function CreateInvoicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData: any) => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/invoices");
        router.refresh();
      } else {
        setError(data.error || "Failed to create client invoice.");
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
          href="/admin/invoices"
          className="text-xs font-bold text-slate-400 hover:text-slate-655 flex items-center gap-1 mb-1"
        >
          ← Back to Invoices
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Create Client Invoice
        </h2>
        <p className="text-xs text-slate-450 mt-0.5">
          Generate professional trip billing worksheets with automatic calculations &amp; line items.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      <InvoiceForm
        onSubmit={handleSubmit}
        submitLabel="Create Client Invoice"
        loading={loading}
      />
    </div>
  );
}
