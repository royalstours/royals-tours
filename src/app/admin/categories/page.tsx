"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PackageCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  createdAt: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<PackageCategory[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal states for Create / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PackageCategory | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🧳");
  const [order, setOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Delete modal state
  const [deleteCategory, setDeleteCategory] = useState<PackageCategory | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function fetchData() {
    try {
      const [catRes, pkgRes] = await Promise.all([
        fetch("/api/package-categories"),
        fetch("/api/travel-items"),
      ]);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
      if (pkgRes.ok) {
        const pkgData = await pkgRes.json();
        setPackages(pkgData);
      }
    } catch (err) {
      console.error("Failed to load categories:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setName("");
    setSlug("");
    setDescription("");
    setIcon("🧳");
    setOrder(categories.length);
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (cat: PackageCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setIcon(cat.icon || "🧳");
    setOrder(cat.order || 0);
    setError("");
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      if (editingCategory) {
        // Update
        const res = await fetch(`/api/package-categories/${editingCategory._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, slug, description, icon, order }),
        });
        const data = await res.json();
        if (res.ok) {
          setModalOpen(false);
          fetchData();
        } else {
          setError(data.error || "Failed to update category.");
        }
      } else {
        // Create
        const res = await fetch("/api/package-categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, slug, description, icon, order }),
        });
        const data = await res.json();
        if (res.ok) {
          setModalOpen(false);
          fetchData();
        } else {
          setError(data.error || "Failed to create category.");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/package-categories/${deleteCategory._id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c._id !== deleteCategory._id));
        setDeleteCategory(null);
      } else {
        alert("Failed to delete category.");
      }
    } catch (err) {
      alert("Error deleting category.");
    } finally {
      setDeleting(false);
    }
  };

  const getPackageCountForCategory = (catSlug: string, catName: string) => {
    const slugLower = catSlug.toLowerCase();
    const nameLower = catName.toLowerCase();
    return packages.filter(
      (p) =>
        p.category?.toLowerCase() === slugLower ||
        p.category?.toLowerCase() === nameLower
    ).length;
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/admin/packages"
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              ← Back to Packages
            </Link>
          </div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            Package Categories
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-0.5">
            Create, manage, and order tour categories for holiday packages and group departures.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-md transition-all self-start md:self-auto flex items-center gap-2 cursor-pointer"
        >
          <span>➕ Add Category</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Total Categories
            </span>
            <span className="font-heading font-black text-2xl text-slate-900 mt-1 block">
              {categories.length}
            </span>
          </div>
          <span className="text-3xl">🏷️</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Total Packages Catalog
            </span>
            <span className="font-heading font-black text-2xl text-orange-600 mt-1 block">
              {packages.length}
            </span>
          </div>
          <span className="text-3xl">🧳</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
              Dynamic Filters Active
            </span>
            <span className="font-heading font-black text-2xl text-emerald-600 mt-1 block">
              Live
            </span>
          </div>
          <span className="text-3xl">⚡</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search categories by name, slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 placeholder:text-slate-400"
          />
          <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
        </div>
        <div className="text-xs font-bold text-slate-500">
          Showing <strong className="text-slate-800">{filteredCategories.length}</strong> of {categories.length} categories
        </div>
      </div>

      {/* Categories Table */}
      {loading ? (
        <div className="p-12 text-center text-xs font-bold text-slate-400 animate-pulse uppercase">
          Loading tour categories...
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <span className="text-4xl block mb-2">🏷️</span>
          <h3 className="font-heading font-black text-lg text-slate-950 uppercase">No Categories Found</h3>
          <p className="text-xs font-semibold text-slate-400 mt-1 mb-4">
            Create your first custom category to organize holiday tour packages.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-[10px] tracking-wider uppercase px-5 py-2.5 rounded-xl shadow cursor-pointer"
          >
            Create Category
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-4">Slug (System ID)</th>
                  <th className="py-4 px-4">Description</th>
                  <th className="py-4 px-4 text-center">Packages</th>
                  <th className="py-4 px-4 text-center">Order</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-600">
                {filteredCategories.map((cat) => {
                  const count = getPackageCountForCategory(cat.slug, cat.name);
                  return (
                    <tr key={cat._id} className="hover:bg-slate-50/50">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <span className="text-2xl w-8 h-8 flex items-center justify-center bg-slate-100 rounded-lg">
                          {cat.icon || "🧳"}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 block text-sm">{cat.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <code className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="py-4 px-4 text-slate-500 max-w-xs truncate">
                        {cat.description || <span className="italic text-slate-400">No description</span>}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="bg-orange-50 text-orange-700 font-bold px-2.5 py-1 rounded-full text-[10px] border border-orange-200">
                          {count} tour{count === 1 ? "" : "s"}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center font-mono text-slate-500">
                        {cat.order}
                      </td>
                      <td className="py-4 px-6 text-center space-x-3">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="text-amber-600 hover:text-amber-500 font-bold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteCategory(cat)}
                          className="text-rose-600 hover:text-rose-500 font-bold cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-100 shadow-2xl animate-dialog">
            <h3 className="font-heading font-black text-lg text-slate-900 uppercase">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Define the category name, system slug, and display icon.
            </p>

            {error && (
              <div className="p-3 mt-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Honeymoon Specials, Pilgrimage Yatra"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    Slug (System ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. honeymoon-specials"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    Icon / Emoji
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 💍, ✈️, 🛕, 🏔️"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of packages in this category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-100 shadow-2xl animate-dialog">
            <span className="text-3xl block mb-2 text-rose-500">⚠️</span>
            <h3 className="font-heading font-black text-lg text-slate-900 uppercase">
              Delete Category?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete category <strong>{deleteCategory.name}</strong>? Packages categorized under this slug will remain in the catalog.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setDeleteCategory(null)}
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
                {deleting ? "Deleting..." : "Delete Category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
