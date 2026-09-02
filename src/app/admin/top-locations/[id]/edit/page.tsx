"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditTopLocationPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [actionMode, setActionMode] = useState<"inquiry" | "link">("inquiry");
  const [link, setLink] = useState("");
  const [inquiryName, setInquiryName] = useState("");
  const [order, setOrder] = useState("0");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLocation() {
      try {
        const res = await fetch(`/api/top-locations/${id}`);
        if (res.ok) {
          const data = await res.json();
          setName(data.name);
          setImage(data.image);
          setOrder(String(data.order || 0));
          if (data.link) {
            setActionMode("link");
            setLink(data.link);
          } else {
            setActionMode("inquiry");
            setInquiryName(data.inquiryName || "");
          }
        } else {
          setError("Failed to fetch location details.");
        }
      } catch (err) {
        setError("Error loading location details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchLocation();
    }
  }, [id]);

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
        setError(data.error || "Failed to upload image. Verify Cloudinary configuration.");
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
      setError("Location name is required.");
      return;
    }
    if (!image.trim()) {
      setError("Location image is required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      image: image.trim(),
      link: actionMode === "link" ? link.trim() : "",
      inquiryName: actionMode === "inquiry" ? (inquiryName.trim() || `${name.trim()} Tour`) : "",
      order: isNaN(Number(order)) ? 0 : Number(order),
    };

    try {
      const res = await fetch(`/api/top-locations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/top-locations");
        router.refresh();
      } else {
        setError(data.error || "Failed to save top location.");
      }
    } catch (err) {
      setError("An unexpected error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse">
          Loading location specs...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/admin/top-locations"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-1"
        >
          ← Back to Top Locations
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Modify Top Location
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Editing parameters for location ID: <strong className="text-slate-600 font-mono">{id}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Location Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Meghalaya, Switzerland"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            placeholder="e.g., 5"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
          />
          <p className="text-[10px] font-bold text-slate-400">
            Higher numbers show up later in the list. Ordered ascending (0, 1, 2...).
          </p>
        </div>

        {/* Image File Uploader */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Upload Location Image <span className="text-rose-500">*</span>
          </label>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50">
                <span className="text-xl">📷</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                  {uploading ? "Uploading file..." : "Change Image file"}
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
              <div className="w-20 h-20 rounded-full border border-slate-200 overflow-hidden relative shrink-0">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <input
              type="text"
              placeholder="Or paste an image URL directly"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
            />
          </div>
        </div>

        {/* Action Type Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Action Trigger
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setActionMode("inquiry")}
              className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all cursor-pointer ${
                actionMode === "inquiry"
                  ? "bg-amber-500 border-amber-500 text-slate-950 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              💬 Open Inquiry Popup
            </button>
            <button
              type="button"
              onClick={() => setActionMode("link")}
              className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all cursor-pointer ${
                actionMode === "link"
                  ? "bg-amber-500 border-amber-500 text-slate-950 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              🔗 Link to URL
            </button>
          </div>
        </div>

        {/* Action Parameters Conditional */}
        {actionMode === "inquiry" ? (
          <div className="flex flex-col gap-2 animate-fadeIn">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Inquiry Tour Name
            </label>
            <input
              type="text"
              placeholder={`e.g., ${name ? `${name} Tour` : "Meghalaya Tour"}`}
              value={inquiryName}
              onChange={(e) => setInquiryName(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            />
            <p className="text-[10px] font-bold text-slate-400">
              This name will be prefilled in the inquiry modal form. If left blank, it defaults to &quot;[Location Name] Tour&quot;.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 animate-fadeIn">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Target Destination Link
            </label>
            <input
              type="text"
              placeholder="e.g., /destinations/fd-bhutan or /packages/pkg-rajasthan"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            />
            <p className="text-[10px] font-bold text-slate-400">
              The internal route or external website link where the user will be redirected on click.
            </p>
          </div>
        )}

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
