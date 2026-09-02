"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditTestimonialPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [trip, setTrip] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("5");
  const [avatar, setAvatar] = useState("");
  const [order, setOrder] = useState("0");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTestimonial() {
      try {
        const res = await fetch(`/api/testimonials/${id}`);
        if (res.ok) {
          const data = await res.json();
          setName(data.name || "");
          setRole(data.role || "");
          setTrip(data.trip || "");
          setComment(data.comment || "");
          setRating(String(data.rating || 5));
          setAvatar(data.avatar || "");
          setOrder(String(data.order || 0));
        } else {
          setError("Failed to fetch testimonial details.");
        }
      } catch (err) {
        setError("Error loading testimonial details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setAvatar(data.url);
      } else {
        setError(data.error || "Failed to upload avatar image.");
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

    if (!name.trim()) {
      setError("Traveler name is required.");
      return;
    }
    if (!trip.trim()) {
      setError("Trip details are required.");
      return;
    }
    if (!comment.trim()) {
      setError("Review comment is required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      role: role.trim(),
      trip: trip.trim(),
      comment: comment.trim(),
      rating: isNaN(Number(rating)) ? 5 : Number(rating),
      avatar: avatar.trim(),
      order: isNaN(Number(order)) ? 0 : Number(order),
    };

    try {
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        setError(data.error || "Failed to save testimonial updates.");
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
        Fetching testimonial spec...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/admin/testimonials"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-1"
        >
          ← Back to Testimonials
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Edit Testimonial
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Modify traveler testimonial details.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Traveler Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Rohan & Priyal Mehta"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            required
          />
        </div>

        {/* Role & Display Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Role */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Traveler Role / Type (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Solo Traveler, Couple Travelers"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            />
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

        {/* Trip Info & Rating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Trip Info */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Trip Details <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Thailand Group Departure"
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              required
            />
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Star Rating <span className="text-rose-500">*</span>
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-bold text-slate-800 bg-white"
            >
              <option value="5">★★★★★ (5 Stars)</option>
              <option value="4">★★★★☆ (4 Stars)</option>
              <option value="3">★★★☆☆ (3 Stars)</option>
              <option value="2">★★☆☆☆ (2 Stars)</option>
              <option value="1">★☆☆☆☆ (1 Star)</option>
            </select>
          </div>
        </div>

        {/* Avatar Uploader */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Traveler Photo / Avatar
          </label>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50">
                <span className="text-xl">📷</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                  {uploading ? "Uploading image..." : "Browse Photo"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {/* Preview */}
            <div className="w-16 h-16 rounded-full border border-slate-200 overflow-hidden relative shrink-0 bg-slate-50 flex items-center justify-center">
              {avatar ? (
                <img src={avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-slate-400 font-bold font-heading">Empty</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <input
              type="text"
              placeholder="Or paste image URL directly"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
            />
          </div>
        </div>

        {/* Comment Textarea */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Review Comment <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Write the traveler review content here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 resize-none"
            required
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
