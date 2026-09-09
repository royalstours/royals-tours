"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TravelItem {
  _id: string;
  id: string;
  name: string;
  title: string;
  category: string;
  price: string;
  rawPrice: number;
  duration: string;
  badge?: string;
  image: string;
  pricingTiers?: any[];
}

interface PackageCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<TravelItem[]>([]);
  const [categories, setCategories] = useState<PackageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchPackagesAndCategories() {
    try {
      const [pkgRes, catRes] = await Promise.all([
        fetch("/api/travel-items?isFixedDeparture=false"),
        fetch("/api/package-categories"),
      ]);
      if (pkgRes.ok) {
        const data = await pkgRes.json();
        setPackages(data);
      }
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (err) {
      console.error("Failed to load packages:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPackagesAndCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/travel-items/${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPackages((prev) => prev.filter((item) => item.id !== deleteId));
        setDeleteId(null);
      } else {
        alert("Failed to delete package.");
      }
    } catch (err) {
      alert("Error deleting package.");
    } finally {
      setDeleting(false);
    }
  };

  const filtered = packages.filter((item) => {
    // 1. Filter by category
    if (selectedCategory !== "all") {
      if (item.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // 2. Filter by search
    if (search.trim() !== "") {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Holiday Tour Packages
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage your custom holiday tours across all domestic, international, and special categories.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/categories"
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>🏷️ Manage Categories ({categories.length})</span>
          </Link>
          <Link
            href="/admin/travel-items/new?type=holiday"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>➕ Add Holiday Package</span>
          </Link>
        </div>
      </div>

      {/* Filter Bar with Category Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col gap-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search packages by name, title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
            <span>Showing: <strong className="text-slate-800">{filtered.length}</strong> of {packages.length}</span>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🌐 All ({packages.length})
          </button>
          {categories.map((cat) => {
            const count = packages.filter(
              (p) =>
                p.category?.toLowerCase() === cat.slug.toLowerCase() ||
                p.category?.toLowerCase() === cat.name.toLowerCase()
            ).length;
            return (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? "bg-orange-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{cat.icon || "🧳"}</span>
                <span>{cat.name}</span>
                <span className="opacity-70 text-[9px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Packages Listing */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading package catalog...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">🧳</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Tour Packages Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Try adjusting your search query, selecting another category, or creating a new holiday package.
          </p>
          <Link
            href="/admin/travel-items/new?type=holiday"
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create Holiday Package
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Holiday Tour Package</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 text-right">Price</th>
                  <th className="py-4 px-4 text-center">Badge</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden relative bg-slate-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                        <span className="text-[10px] text-slate-400">{item.duration}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-orange-50 text-orange-700 border border-orange-200/80 uppercase text-[9px] font-black px-2.5 py-1 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-slate-900">
                      <div>
                        {(() => {
                          const formatPrice = (priceStr: string) => {
                            if (!priceStr) return "";
                            let clean = priceStr.replace(/^₹\s*/, "").replace(/\s*PP\s*$/i, "").trim();
                            return clean ? `₹${clean}` : "";
                          };
                          const rawPrice = item.pricingTiers && item.pricingTiers.length > 0
                            ? item.pricingTiers[0].price || item.price
                            : item.price;
                          return formatPrice(rawPrice);
                        })()}
                      </div>
                      <div className="text-[10px] text-slate-400">Raw: {item.rawPrice}</div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.badge ? (
                        <span className="bg-slate-100 text-slate-700 border border-slate-200/50 px-2 py-0.5 rounded text-[9px] font-bold">
                          {item.badge}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic text-[10px]">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center space-x-3">
                      <Link
                        href={`/admin/travel-items/${item.id}/edit`}
                        className="text-amber-600 hover:text-amber-500 font-bold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="text-rose-600 hover:text-rose-500 font-bold cursor-pointer"
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

      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-100 shadow-2xl animate-dialog">
            <span className="text-3xl block mb-2 text-rose-500">⚠️</span>
            <h3 className="font-heading font-black text-lg text-slate-900 uppercase">
              Delete Tour Package?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete the holiday package <strong>{deleteId}</strong>? This action will remove the catalog item and its itinerary details from MongoDB permanently.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
