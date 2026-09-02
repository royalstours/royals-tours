"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditFAQPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("general");
  const [order, setOrder] = useState("0");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    { id: "departures", label: "✈️ Group Departures" },
    { id: "visas", label: "🛂 Visas & Passports" },
    { id: "payments", label: "💳 Payments & Refunds" },
    { id: "solo", label: "🎒 Solo Travel & Sharing" },
    { id: "treks", label: "🏔️ Weekend Treks" },
    { id: "general", label: "❓ General" },
  ];

  useEffect(() => {
    async function fetchFaq() {
      try {
        const res = await fetch(`/api/faqs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setQuestion(data.question || "");
          setAnswer(data.answer || "");
          setCategory(data.category || "general");
          setOrder(String(data.order || 0));
        } else {
          setError("Failed to fetch FAQ details.");
        }
      } catch (err) {
        setError("Error loading FAQ details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchFaq();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!question.trim()) {
      setError("Question is required.");
      return;
    }
    if (!answer.trim()) {
      setError("Answer is required.");
      return;
    }

    setSaving(true);

    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      category: category,
      order: isNaN(Number(order)) ? 0 : Number(order),
    };

    try {
      const res = await fetch(`/api/faqs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/faqs");
        router.refresh();
      } else {
        setError(data.error || "Failed to save FAQ updates.");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
        Fetching FAQ spec...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/admin/faqs"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-1"
        >
          ← Back to FAQs
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Edit FAQ
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Modify Frequently Asked Question details.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Question Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            FAQ Question <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Do I need a visa for Bhutan?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            required
          />
        </div>

        {/* Category & Display Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-bold text-slate-800 bg-white cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Display Order */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Display Order
            </label>
            <input
              type="number"
              placeholder="e.g. 0"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Answer Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            FAQ Answer <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={6}
            placeholder="Write the detailed answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 resize-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
