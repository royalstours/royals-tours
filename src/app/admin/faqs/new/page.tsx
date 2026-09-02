"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewFAQPage() {
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("general");
  const [order, setOrder] = useState("0");
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
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/faqs");
        router.refresh();
      } else {
        setError(data.error || "Failed to save FAQ.");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

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
          Create FAQ
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Add a Frequently Asked Question to the knowledge base.
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
            {saving ? "Creating FAQ..." : "➕ Create FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
}
