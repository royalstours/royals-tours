"use client";

import { useEffect, useState } from "react";
import Link from "next/navigation";
import NextLink from "next/link";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  createdAt: string;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteQuestion, setDeleteQuestion] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "departures", label: "✈️ Group Departures" },
    { id: "visas", label: "🛂 Visas & Passports" },
    { id: "payments", label: "💳 Payments & Refunds" },
    { id: "solo", label: "🎒 Solo Travel & Sharing" },
    { id: "treks", label: "🏔️ Weekend Treks" },
    { id: "general", label: "❓ General" },
  ];

  async function fetchFaqs() {
    try {
      const res = await fetch("/api/faqs");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data);
      }
    } catch (err) {
      console.error("Failed to load FAQs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/faqs/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFaqs((prev) => prev.filter((item) => item._id !== deleteId));
        setDeleteId(null);
        setDeleteQuestion(null);
      } else {
        alert("Failed to delete FAQ.");
      }
    } catch (err) {
      alert("Error deleting FAQ.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = faqs.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage the dynamic FAQ catalog displayed across the frontend help/knowledge base and contact pages.
          </p>
        </div>
        <NextLink
          href="/admin/faqs/new"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Add New FAQ</span>
        </NextLink>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search FAQs by question, answer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-48 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
          <span>Total FAQs: <strong className="text-slate-800">{filtered.length}</strong></span>
        </div>
      </div>

      {/* FAQs Listing */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading FAQ index...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">❓</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No FAQs Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Add FAQs to make your help page dynamic and helpful for travelers.
          </p>
          <NextLink
            href="/admin/faqs/new"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create First FAQ
          </NextLink>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6 w-1/4">Category</th>
                  <th className="py-4 px-6 w-1/3">Question</th>
                  <th className="py-4 px-6">Answer</th>
                  <th className="py-4 px-4 text-center">Order</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6">
                      <span className="bg-slate-100 text-slate-700 text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200">
                        {categories.find((c) => c.id === item.category)?.label || item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {item.question}
                    </td>
                    <td className="py-4 px-6 max-w-md">
                      <p className="line-clamp-2 text-slate-500 font-medium">
                        {item.answer}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-center font-mono font-bold text-slate-800">
                      {item.order}
                    </td>
                    <td className="py-4 px-6 text-center space-x-3 whitespace-nowrap">
                      <NextLink
                        href={`/admin/faqs/${item._id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </NextLink>
                      <button
                        onClick={() => {
                          setDeleteId(item._id);
                          setDeleteQuestion(item.question);
                        }}
                        className="text-rose-500 hover:text-rose-400 font-bold cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white border border-slate-100 rounded-3xl max-w-sm w-full p-6 shadow-xl animate-dialog">
            <h3 className="font-heading font-black text-lg text-slate-950 uppercase">Confirm Deletion</h3>
            <p className="text-xs font-semibold text-slate-500 mt-2 leading-relaxed">
              Are you sure you want to remove the FAQ: <strong className="text-slate-800">"{deleteQuestion}"</strong>? This action is permanent.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setDeleteId(null);
                  setDeleteQuestion(null);
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase py-3 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
              >
                {deleting ? "Deleting..." : "🗑️ Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
