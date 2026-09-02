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
  duration: string;
  isFixedDeparture: boolean;
  image: string;
  pricingTiers?: any[];
}

export default function AdminTravelItemsPage() {
  const [items, setItems] = useState<TravelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"all" | "group" | "custom">("all");

  async function fetchItems() {
    try {
      const res = await fetch("/api/travel-items");
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error("Failed to load travel items:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (itemId: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to delete the package "${itemTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/travel-items/${itemId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Travel item deleted successfully.");
        setItems((prev) => prev.filter((i) => i._id !== itemId));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete item.");
      }
    } catch (err) {
      alert("Error deleting travel item.");
    }
  };

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.duration.toLowerCase().includes(search.toLowerCase());

    const matchesType =
      filterType === "all" ||
      (filterType === "group" && item.isFixedDeparture) ||
      (filterType === "custom" && !item.isFixedDeparture);

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Travel Offerings Catalog
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage your group departures, custom vacation packages, raw prices, and itineraries.
          </p>
        </div>
        <Link
          href="/admin/travel-items/new"
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black uppercase text-xs tracking-wider px-5 py-3 rounded-xl shadow-md self-start sm:self-auto transition-all"
        >
          ➕ Add New Package
        </Link>
      </div>

      {/* Filter and Stats Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search offerings by name, title, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>

        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {[
            { id: "all", label: "All offerings" },
            { id: "group", label: "🍱 Group departures" },
            { id: "custom", label: "✈️ Custom packages" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterType === tab.id
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Offerings Table */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading offerings catalog list...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">🗺️</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Offerings Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1">
            Try adjusting your search filters or click add new package.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Travel Offering Details</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 text-right">Price Display</th>
                  <th className="py-4 px-4 text-center">Type</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-650">
                {filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 align-middle">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden relative bg-slate-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-sm">{item.name}</span>
                        <span className="text-[10px] text-slate-450 block truncate max-w-sm mt-0.5">{item.title}</span>
                        <span className="bg-slate-100 text-slate-500 text-[8px] font-black uppercase px-2 py-0.5 rounded mt-1.5 inline-block tracking-wider">
                          ⏳ {item.duration}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 uppercase text-[10px] font-black text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
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
                    </td>
                    <td className="py-4 px-4 text-center">
                      {item.isFixedDeparture ? (
                        <span className="text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                          Group Tour
                        </span>
                      ) : (
                        <span className="text-orange-700 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                          Custom Pkg.
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <Link
                          href={`/admin/travel-items/${item.id}/edit`}
                          className="bg-slate-100 hover:bg-slate-200 border border-slate-200/50 text-slate-700 font-black uppercase text-[9px] tracking-wider px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          ✏️ Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id, item.name)}
                          className="bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-600 font-black uppercase text-[9px] tracking-wider px-3 py-1.5 rounded-lg cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
