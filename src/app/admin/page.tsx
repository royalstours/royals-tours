"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TravelItem {
  _id: string;
  id: string;
  name: string;
  title: string;
  category: string;
  rawPrice: number;
  price: string;
  duration: string;
  isFixedDeparture: boolean;
  image: string;
}

interface PackageCategory {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
}

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone: string;
  destination?: string;
  subject?: string;
  message: string;
  status: "pending" | "contacted" | "booked" | "cancelled";
  notes?: string;
  createdAt: string;
}

export default function AdminDashboardOverview() {
  const [items, setItems] = useState<TravelItem[]>([]);
  const [categories, setCategories] = useState<PackageCategory[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{
    seededItemsCount: number;
    adminUser: { email: string };
  } | null>(null);

  async function fetchDashboardData() {
    try {
      const [itemRes, catRes, inqRes, bookingsRes, invoicesRes] = await Promise.all([
        fetch("/api/travel-items"),
        fetch("/api/package-categories"),
        fetch("/api/admin/inquiries"),
        fetch("/api/booking-confirmations"),
        fetch("/api/invoices"),
      ]);

      if (itemRes.ok) {
        const itemData = await itemRes.json();
        setItems(itemData);
      }

      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }

      if (inqRes.ok) {
        const inqData = await inqRes.json();
        setInquiries(inqData);
      }

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
      }

      if (invoicesRes.ok) {
        const invoicesData = await invoicesRes.json();
        setInvoices(invoicesData);
      }
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSeed = async () => {
    if (!confirm("Are you sure you want to seed the database? This will sync all default static travel catalog data and categories into MongoDB.")) {
      return;
    }
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/admin/seed", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        setSeedResult(data);
        alert(`Successfully seeded database with ${data.seededItemsCount} items and ${data.seededCategoriesCount || 6} categories!`);
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to seed database.");
      }
    } catch (err) {
      alert("Error seeding database.");
    } finally {
      setSeeding(false);
    }
  };

  const destinationsCount = items.filter((item) => item.isFixedDeparture).length;
  const holidayPackagesCount = items.filter((item) => !item.isFixedDeparture).length;
  const pendingInquiriesCount = inquiries.filter((inq) => inq.status === "pending").length;

  // Bookings & Invoices calculations
  const bookingsCount = bookings.length;
  const invoicesCount = invoices.length;
  const totalInvoiced = invoices.reduce((sum, inv) => sum + (inv.priceSummary?.totalAmount || 0), 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.priceSummary?.balanceDue || 0), 0);

  const recentItems = items.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse flex items-center gap-2">
          <span>🔄 Loading Dashboard Statistics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 select-none">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow">
            Overview
          </span>
          <h2 className="font-heading font-black text-3xl md:text-4xl uppercase tracking-tight mt-4">
            Catalog, Bookings &amp; Billing
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mt-1 font-semibold">
            Manage your holiday tour packages, dynamic categories, group departures, client leads, bookings, invoices, and itineraries.
          </p>
        </div>
        <div className="absolute right-[-40px] top-[-40px] text-white/5 font-black text-[150px] pointer-events-none select-none">
          TRAVEL
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Catalog */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Holiday Packages &amp; Tours
            </span>
            <span className="text-xl">🧳</span>
          </div>
          <div className="mt-4">
            <span className="font-heading font-black text-3xl text-slate-900">
              {items.length}
            </span>
            <span className="block text-[10px] font-bold text-slate-400 mt-1">
              Across {categories.length} dynamic categories
            </span>
          </div>
        </div>

        {/* Categories Count */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Package Categories
            </span>
            <span className="text-xl">🏷️</span>
          </div>
          <div className="mt-4">
            <span className="font-heading font-black text-3xl text-orange-600">
              {categories.length}
            </span>
            <span className="block text-[10px] font-bold text-slate-400 mt-1">
              Active category filters
            </span>
          </div>
        </div>

        {/* Pending Leads */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Pending Leads
            </span>
            <span className="text-xl">📧</span>
          </div>
          <div className="mt-4">
            <span className="font-heading font-black text-3xl text-rose-500">
              {pendingInquiriesCount}
            </span>
            <span className="block text-[10px] font-bold text-slate-400 mt-1">
              Out of {inquiries.length} total leads
            </span>
          </div>
        </div>

        {/* Invoiced revenue & outstanding balance */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Financial Status
            </span>
            <span className="text-xl">💰</span>
          </div>
          <div className="mt-4">
            <span className="font-heading font-black text-2xl text-slate-900 block truncate">
              ₹ {totalInvoiced.toLocaleString("en-IN")}
            </span>
            <span className="block text-[10px] font-bold text-rose-500 mt-1">
              Outstanding: ₹ {totalOutstanding.toLocaleString("en-IN")} ({invoicesCount} invoices)
            </span>
          </div>
        </div>
      </div>

      {/* Database sync controller & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sync Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs lg:col-span-2 space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800">
              Database Seeding &amp; Synced Status
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Initialize MongoDB with the default travel catalog, holiday packages, and categories (<code className="bg-slate-100 px-1 py-0.5 rounded">travelData.ts</code>).
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">Seed Status:</span>
              {items.length > 0 ? (
                <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase text-[10px]">
                  Database Seeded ({items.length} Tours, {categories.length} Categories)
                </span>
              ) : (
                <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full uppercase text-[10px]">
                  Needs Initial Seed
                </span>
              )}
            </div>
            {seedResult && (
              <div className="text-[10px] font-bold text-slate-600 border-t border-slate-200/60 pt-2 space-y-1">
                <div>✓ Successfully seeded: <strong>{seedResult.seededItemsCount}</strong> items.</div>
                <div>✓ Admin Credentials registered: <strong>{seedResult.adminUser.email}</strong>.</div>
              </div>
            )}
          </div>

          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {seeding ? "⚙ Seeding database..." : "⚡ Seed Database from Static Code"}
          </button>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800">
            Quick Actions
          </h3>
          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/travel-items/new?type=holiday"
              className="w-full text-center bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold uppercase text-[10px] tracking-wider py-3.5 rounded-xl shadow-md transition-all"
            >
              ➕ Add Holiday Package
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/admin/categories"
                className="text-center bg-slate-900 hover:bg-slate-850 text-white font-bold uppercase text-[9px] tracking-wider py-3.5 rounded-xl transition-all"
              >
                🏷️ Categories ({categories.length})
              </Link>
              <Link
                href="/admin/destinations"
                className="text-center bg-slate-900 hover:bg-slate-850 text-white font-bold uppercase text-[9px] tracking-wider py-3.5 rounded-xl transition-all"
              >
                ✈️ Group Tours
              </Link>
            </div>
            <Link
              href="/admin/inquiries"
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold uppercase text-[10px] tracking-wider py-3.5 rounded-xl transition-all"
            >
              📧 Review Customer Inquiries ({pendingInquiriesCount})
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/admin/invoices"
                className="text-center bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 font-bold uppercase text-[9px] tracking-wider py-3.5 rounded-xl transition-all"
              >
                🧾 Invoices
              </Link>
              <Link
                href="/admin/bookings"
                className="text-center bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 font-bold uppercase text-[9px] tracking-wider py-3.5 rounded-xl transition-all"
              >
                🎟️ Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Items Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800">
            Recently Added/Synced Items
          </h3>
        </div>
        {recentItems.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 font-bold uppercase">
            No travel items registered yet. Use the Seed database action above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Travel Item</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 text-right">Price</th>
                  <th className="py-4 px-4 text-center">Type</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {recentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden relative bg-slate-100 shrink-0">
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
                    <td className="py-4 px-4 uppercase text-[10px]">
                      <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded font-bold border border-orange-200/80">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-slate-900">{item.price}</td>
                    <td className="py-4 px-4 text-center">
                      {item.isFixedDeparture ? (
                        <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                          Group Tour
                        </span>
                      ) : (
                        <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded text-[9px] font-black uppercase">
                          Holiday Pkg.
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        href={`/admin/travel-items/${item.id}/edit`}
                        className="text-amber-600 hover:text-amber-550 font-bold"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
