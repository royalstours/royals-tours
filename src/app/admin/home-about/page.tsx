"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminHomeAboutPage() {
  const router = useRouter();

  const [welcomeTag, setWelcomeTag] = useState("");
  const [heading, setHeading] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");

  const [stat1Value, setStat1Value] = useState("");
  const [stat1Label, setStat1Label] = useState("");
  const [stat2Value, setStat2Value] = useState("");
  const [stat2Label, setStat2Label] = useState("");
  const [stat3Value, setStat3Value] = useState("");
  const [stat3Label, setStat3Label] = useState("");

  const [image, setImage] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/home-about");
        if (res.ok) {
          const data = await res.json();
          setWelcomeTag(data.welcomeTag || "");
          setHeading(data.heading || "");
          setParagraph1(data.paragraph1 || "");
          setParagraph2(data.paragraph2 || "");

          setStat1Value(data.stat1Value || "");
          setStat1Label(data.stat1Label || "");
          setStat2Value(data.stat2Value || "");
          setStat2Label(data.stat2Label || "");
          setStat3Value(data.stat3Value || "");
          setStat3Label(data.stat3Label || "");

          setImage(data.image || "");
          setImageAlt(data.imageAlt || "");
        } else {
          setError("Failed to fetch settings from server.");
        }
      } catch (err) {
        setError("Error loading settings.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setSuccess("");

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
        setSuccess("Image uploaded successfully!");
      } else {
        setError(data.error || "Failed to upload image. Verify Cloudinary credentials.");
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
    setSuccess("");
    setSaving(true);

    const payload = {
      welcomeTag,
      heading,
      paragraph1,
      paragraph2,
      stat1Value,
      stat1Label,
      stat2Value,
      stat2Label,
      stat3Value,
      stat3Label,
      image,
      imageAlt,
    };

    try {
      const res = await fetch("/api/home-about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("About section saved successfully!");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save settings.");
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
          Loading about section specs...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Manage Homepage About Us Copy
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Customize the welcome tag, headings, paragraphs, and statistics shown in the quick highlight block.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
          ✅ {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Basic Headings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Welcome Tag / Category Title
            </label>
            <input
              type="text"
              placeholder="e.g. WELCOME TO ROYALS TOURS"
              value={welcomeTag}
              onChange={(e) => setWelcomeTag(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Main Section Heading
            </label>
            <input
              type="text"
              placeholder="e.g. We Craft Travel Experiences That Bring People Together"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            />
          </div>
        </div>

        {/* Paragraphs */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Paragraph 1 Copy
          </label>
          <textarea
            placeholder="Introduce the company core beliefs and trip concepts..."
            value={paragraph1}
            onChange={(e) => setParagraph1(e.target.value)}
            rows={3}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Paragraph 2 Copy
          </label>
          <textarea
            placeholder="Elaborate on details like travel captains, group tours, treks, etc..."
            value={paragraph2}
            onChange={(e) => setParagraph2(e.target.value)}
            rows={3}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
          />
        </div>

        <hr className="border-slate-100" />

        {/* Counter Stats Section */}
        <div>
          <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-700 mb-4">
            📊 Stat Counters
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stat 1 */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Stat 1 Value</label>
                <input
                  type="text"
                  placeholder="e.g. 5000+"
                  value={stat1Value}
                  onChange={(e) => setStat1Value(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Stat 1 Label</label>
                <input
                  type="text"
                  placeholder="e.g. Happy Travelers"
                  value={stat1Label}
                  onChange={(e) => setStat1Label(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
                />
              </div>
            </div>

            {/* Stat 2 */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Stat 2 Value</label>
                <input
                  type="text"
                  placeholder="e.g. 40+"
                  value={stat2Value}
                  onChange={(e) => setStat2Value(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Stat 2 Label</label>
                <input
                  type="text"
                  placeholder="e.g. Global Destinations"
                  value={stat2Label}
                  onChange={(e) => setStat2Label(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
                />
              </div>
            </div>

            {/* Stat 3 */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/60">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Stat 3 Value</label>
                <input
                  type="text"
                  placeholder="e.g. 99%"
                  value={stat3Value}
                  onChange={(e) => setStat3Value(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Stat 3 Label</label>
                <input
                  type="text"
                  placeholder="e.g. Satisfaction Rate"
                  value={stat3Label}
                  onChange={(e) => setStat3Label(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
                />
              </div>
            </div>

          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Media Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Upload New Photo
            </label>
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
            <input
              type="text"
              placeholder="Or paste photo URL directly"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Image Alt Tag / Accessibility Label
              </label>
              <input
                type="text"
                placeholder="e.g. Hiker overlooking scenic valley at sunset"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              />
            </div>

            {/* Preview */}
            {image && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Preview:</span>
                <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-200 relative shrink-0">
                  <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving || uploading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving settings..." : "💾 Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
