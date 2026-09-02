"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewGalleryPhotoPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("international");
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [order, setOrder] = useState("0");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
      } else {
        setError(data.error || "Failed to upload file. Verify Cloudinary credentials.");
      }
    } catch (err) {
      setError("An error occurred during file upload.");
    } finally {
      e.target.value = "";
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim() || !location.trim() || !image.trim() || !caption.trim()) {
      setError("All fields except display order are required.");
      return;
    }

    setSaving(true);

    const payload = {
      title: title.trim(),
      location: location.trim(),
      category,
      image: image.trim(),
      caption: caption.trim(),
      order: isNaN(Number(order)) ? 0 : Number(order),
    };

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/gallery");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save photo.");
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
          href="/admin/gallery"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-1"
        >
          ← Back to Photo Gallery
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Upload Gallery Photo
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Add a new photo to the customer facing travel gallery index.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Photo Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Tiger's Nest Monastery Hike"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            required
          />
        </div>

        {/* Location & Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Location <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Paro, Bhutan"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
              required
            >
              <option value="international">✈️ International Trips</option>
              <option value="trek">🏔️ Mountain Treks</option>
              <option value="community">🤝 Group Bonding</option>
            </select>
          </div>
        </div>

        {/* Image File Uploader */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Upload Photograph <span className="text-rose-500">*</span>
          </label>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50">
                <span className="text-xl">📷</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                  {uploading ? "Uploading file..." : "Browse image file"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            {image && (
              <div className="w-20 h-16 rounded border border-slate-200 overflow-hidden relative shrink-0 bg-slate-50">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <input
              type="text"
              placeholder="Or paste photo URL directly"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Caption Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            placeholder="e.g. Our group departure reaching the legendary Cliffside Monastery in Bhutan."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            required
          />
        </div>

        {/* Display Order */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Display Order
          </label>
          <input
            type="number"
            placeholder="e.g. 0, 1, 2"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving Photo..." : "➕ Create Photo"}
          </button>
        </div>
      </form>
    </div>
  );
}
