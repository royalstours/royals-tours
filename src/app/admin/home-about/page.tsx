"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHomeAboutPage() {
  const router = useRouter();

  // Banner
  const [bannerTag, setBannerTag] = useState("");
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerSubtitle, setBannerSubtitle] = useState("");

  // Story Intro
  const [welcomeTag, setWelcomeTag] = useState("");
  const [heading, setHeading] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");

  // Media
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaPoster, setMediaPoster] = useState("");
  const [imageAlt, setImageAlt] = useState("");

  // Values / Pillars
  const [valuesTag, setValuesTag] = useState("");
  const [valuesHeading, setValuesHeading] = useState("");
  const [pillar1Title, setPillar1Title] = useState("");
  const [pillar1Desc, setPillar1Desc] = useState("");
  const [pillar2Title, setPillar2Title] = useState("");
  const [pillar2Desc, setPillar2Desc] = useState("");
  const [pillar3Title, setPillar3Title] = useState("");
  const [pillar3Desc, setPillar3Desc] = useState("");

  // Stats
  const [stat1Value, setStat1Value] = useState("");
  const [stat1Label, setStat1Label] = useState("");
  const [stat1Sub, setStat1Sub] = useState("");
  const [stat2Value, setStat2Value] = useState("");
  const [stat2Label, setStat2Label] = useState("");
  const [stat2Sub, setStat2Sub] = useState("");
  const [stat3Value, setStat3Value] = useState("");
  const [stat3Label, setStat3Label] = useState("");
  const [stat3Sub, setStat3Sub] = useState("");

  const [activeTab, setActiveTab] = useState<"story" | "media" | "values" | "stats">("story");
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
          setBannerTag(data.bannerTag || "Our Story");
          setBannerTitle(data.bannerTitle || "About Royals Tours");
          setBannerSubtitle(data.bannerSubtitle || "Crafting majestic travel memories and pure vegetarian group holiday experiences.");

          setWelcomeTag(data.welcomeTag || "Experience the Difference");
          setHeading(data.heading || "A Heritage of Trusted Travel Organization");
          setParagraph1(data.paragraph1 || "");
          setParagraph2(data.paragraph2 || "");

          const isVid = data.mediaType === "video" || /\.(mp4|webm|mov|m4v|mkv|avi)($|\?)/i.test(data.mediaUrl || data.image || "");
          setMediaType(isVid ? "video" : "image");
          setMediaUrl(data.mediaUrl || data.image || "");
          setMediaPoster(data.mediaPoster || "");
          setImageAlt(data.imageAlt || "About Royals Tours");

          setValuesTag(data.valuesTag || "Our Values");
          setValuesHeading(data.valuesHeading || "Our Core Guiding Principles");
          setPillar1Title(data.pillar1Title || "Vegetarian Gastronomy");
          setPillar1Desc(data.pillar1Desc || "");
          setPillar2Title(data.pillar2Title || "Curated Itineraries");
          setPillar2Desc(data.pillar2Desc || "");
          setPillar3Title(data.pillar3Title || "Absolute Hospitality");
          setPillar3Desc(data.pillar3Desc || "");

          setStat1Value(data.stat1Value || "8000+");
          setStat1Label(data.stat1Label || "Delighted Travelers");
          setStat1Sub(data.stat1Sub || "Joined our group and private holiday packages");

          setStat2Value(data.stat2Value || "50+");
          setStat2Label(data.stat2Label || "Top Global Locations");
          setStat2Sub(data.stat2Sub || "Domestic wonders and exotic international getaways");

          setStat3Value(data.stat3Value || "100%");
          setStat3Label(data.stat3Label || "Pure Veg / Jain Support");
          setStat3Sub(data.stat3Sub || "Private kitchen staff traveling on domestic group tours");
        } else {
          setError("Failed to fetch About Us settings from server.");
        }
      } catch (err) {
        setError("Error loading About Us settings.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);

    const isVid = file.type.startsWith("video/") || /\.(mp4|webm|mov|m4v|mkv|avi)$/i.test(file.name);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setMediaUrl(data.url);
        setMediaType(isVid ? "video" : "image");
        setSuccess(`${isVid ? "Video" : "Image"} uploaded successfully!`);
      } else {
        setError(data.error || "Failed to upload media. Please verify Cloudinary credentials or file size.");
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

    const isVid = mediaType === "video" || /\.(mp4|webm|mov|m4v|mkv|avi)($|\?)/i.test(mediaUrl);

    const payload = {
      bannerTag,
      bannerTitle,
      bannerSubtitle,
      welcomeTag,
      heading,
      paragraph1,
      paragraph2,
      mediaType: isVid ? "video" : "image",
      mediaUrl,
      mediaPoster,
      image: mediaUrl,
      imageAlt,
      valuesTag,
      valuesHeading,
      pillar1Title,
      pillar1Desc,
      pillar2Title,
      pillar2Desc,
      pillar3Title,
      pillar3Desc,
      stat1Value,
      stat1Label,
      stat1Sub,
      stat2Value,
      stat2Label,
      stat2Sub,
      stat3Value,
      stat3Label,
      stat3Sub,
    };

    try {
      const res = await fetch("/api/home-about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("About Us details saved and synced successfully!");
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

  const isVideoFile =
    mediaType === "video" ||
    Boolean(mediaUrl && /\.(mp4|webm|mov|m4v|mkv|avi)($|\?)/i.test(mediaUrl)) ||
    Boolean(mediaUrl && mediaUrl.includes("/video/upload/"));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-800 font-bold text-xs uppercase tracking-wider animate-pulse flex items-center gap-2">
          <span>🔄 Loading About Us settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
            About Us Page Management
          </h2>
          <p className="text-xs font-bold text-slate-400 mt-1">
            Manage your brand story, intro headings, photos/videos, values, and stats for the client About Us page.
          </p>
        </div>
        <Link
          href="/about"
          target="_blank"
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-5 py-3 rounded-xl shadow-md transition-all self-start sm:self-auto flex items-center gap-1.5"
        >
          <span>Live About Page</span>
          <span>↗</span>
        </Link>
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

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: "story", label: "📖 Brand Story & Intro" },
          { id: "media", label: "🎬 Photos & Videos" },
          { id: "values", label: "💎 Core Values & Pillars" },
          { id: "stats", label: "📊 Statistics Counters" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl font-heading font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-8">
        
        {/* TAB 1: BRAND STORY & INTRO */}
        {activeTab === "story" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-800">
                Top Hero Banner
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Appears at the top of the About Us page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Banner Badge Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Our Story"
                  value={bannerTag}
                  onChange={(e) => setBannerTag(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Banner Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. About Royals Tours"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Banner Subtitle / Slogan
                </label>
                <input
                  type="text"
                  placeholder="e.g. Crafting majestic travel memories and pure vegetarian group holiday experiences."
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="border-b border-slate-100 pb-4 pt-4">
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-800">
                Main Story Section
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                The main narrative block displayed beside the photo/video box.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Intro Tag / Pill
                </label>
                <input
                  type="text"
                  placeholder="e.g. Experience the Difference"
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
                  placeholder="e.g. A Heritage of Trusted Travel Organization"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Story Paragraph 1
                </label>
                <textarea
                  rows={3}
                  placeholder="Based in the heart of Ahmedabad, Royals Tours was founded..."
                  value={paragraph1}
                  onChange={(e) => setParagraph1(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Story Paragraph 2
                </label>
                <textarea
                  rows={3}
                  placeholder="Our unique domestic group tours travel with their own catering staff..."
                  value={paragraph2}
                  onChange={(e) => setParagraph2(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PHOTOS & VIDEOS */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-800">
                Media Asset (Photos &amp; Video Clips)
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Upload image or video files (MP4, WEBM, MOV, JPG, PNG, WEBP) or paste Cloudinary / direct links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Media Type Selection */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Media Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMediaType("image")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      mediaType === "image"
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>📷 Photo / Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMediaType("video")}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all flex items-center justify-center gap-2 ${
                      mediaType === "video"
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <span>🎬 Video Clip</span>
                  </button>
                </div>
              </div>

              {/* Alt tag */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Media Alt / Accessibility Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Royals Tours travelers in the Himalayas"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>

              {/* Uploader Box */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Upload Photo or Video File
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 hover:border-amber-500 rounded-2xl p-6 cursor-pointer transition-all bg-slate-50/50 group">
                  <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
                    {uploading ? "⏳" : mediaType === "video" ? "🎬" : "📷"}
                  </span>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {uploading ? "Uploading media file..." : `Click to browse ${mediaType === "video" ? "video file (MP4, WEBM, MOV)" : "image file (JPG, PNG, WEBP)"}`}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Accepts all image and video formats. Automatically uploaded to Cloudinary CDN / storage.
                  </span>
                  <input
                    type="file"
                    accept={mediaType === "video" ? "video/*" : "image/*,video/*"}
                    onChange={handleMediaUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* URL input */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Media Direct URL or Cloudinary Link
                </label>
                <input
                  type="text"
                  placeholder="e.g. https://res.cloudinary.com/... or /api/files/... or direct video URL"
                  value={mediaUrl}
                  onChange={(e) => {
                    setMediaUrl(e.target.value);
                    if (/\.(mp4|webm|mov|m4v|mkv|avi)($|\?)/i.test(e.target.value) || e.target.value.includes("/video/upload/")) {
                      setMediaType("video");
                    }
                  }}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
                />
              </div>

              {/* Optional Poster for videos */}
              {mediaType === "video" && (
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Video Poster Thumbnail URL (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://images.unsplash.com/... or poster image URL"
                    value={mediaPoster}
                    onChange={(e) => setMediaPoster(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
                  />
                </div>
              )}

              {/* Media Preview Box */}
              {mediaUrl && (
                <div className="md:col-span-2 space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      Live Preview ({isVideoFile ? "Video Player" : "Photo"}):
                    </span>
                    <span className="text-[10px] font-bold text-orange-600 uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {isVideoFile ? "🎬 Video" : "📷 Image"}
                    </span>
                  </div>
                  <div className="h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 relative flex items-center justify-center shadow-md">
                    {isVideoFile ? (
                      <video
                        src={mediaUrl}
                        poster={mediaPoster || undefined}
                        controls
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={mediaUrl}
                        alt={imageAlt || "Preview"}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: CORE VALUES & PILLARS */}
        {activeTab === "values" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-800">
                Core Guiding Principles (3 Pillars)
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                The 3 foundational value boxes displayed in the middle of the About Us page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Values Section Tag
                </label>
                <input
                  type="text"
                  placeholder="e.g. Our Values"
                  value={valuesTag}
                  onChange={(e) => setValuesTag(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Values Section Heading
                </label>
                <input
                  type="text"
                  placeholder="e.g. Our Core Guiding Principles"
                  value={valuesHeading}
                  onChange={(e) => setValuesHeading(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Pillar 1 */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 block">
                  🥗 Pillar 1 (Dining / Pure Veg)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian Gastronomy"
                    value={pillar1Title}
                    onChange={(e) => setPillar1Title(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Description</label>
                  <textarea
                    rows={4}
                    placeholder="We believe good food is essential to a happy holiday..."
                    value={pillar1Desc}
                    onChange={(e) => setPillar1Desc(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 block">
                  🗺️ Pillar 2 (Itineraries)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Curated Itineraries"
                    value={pillar2Title}
                    onChange={(e) => setPillar2Title(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Our tour paths are balanced and researched..."
                    value={pillar2Desc}
                    onChange={(e) => setPillar2Desc(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">
                  🤝 Pillar 3 (Hospitality)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Absolute Hospitality"
                    value={pillar3Title}
                    onChange={(e) => setPillar3Title(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Description</label>
                  <textarea
                    rows={4}
                    placeholder="We treat every traveler as a member of the Royals Tours family..."
                    value={pillar3Desc}
                    onChange={(e) => setPillar3Desc(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATISTICS COUNTERS */}
        {activeTab === "stats" && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-800">
                Performance &amp; Trust Statistics (3 Counters)
              </h3>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Numbers displayed in the bottom highlight ribbon on the About Us page and home section.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stat 1 */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 block">
                  Stat 1 (Travelers)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Counter Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 8000+"
                    value={stat1Value}
                    onChange={(e) => setStat1Value(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Delighted Travelers"
                    value={stat1Label}
                    onChange={(e) => setStat1Label(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Subtitle / Caption</label>
                  <input
                    type="text"
                    placeholder="e.g. Joined our group and private holiday packages"
                    value={stat1Sub}
                    onChange={(e) => setStat1Sub(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 block">
                  Stat 2 (Locations)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Counter Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 50+"
                    value={stat2Value}
                    onChange={(e) => setStat2Value(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Top Global Locations"
                    value={stat2Label}
                    onChange={(e) => setStat2Label(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Subtitle / Caption</label>
                  <input
                    type="text"
                    placeholder="e.g. Domestic wonders and exotic international getaways"
                    value={stat2Sub}
                    onChange={(e) => setStat2Sub(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 block">
                  Stat 3 (Kitchens / Support)
                </span>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Counter Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 100%"
                    value={stat3Value}
                    onChange={(e) => setStat3Value(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Label</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Veg / Jain Support"
                    value={stat3Label}
                    onChange={(e) => setStat3Label(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-wider text-slate-400">Subtitle / Caption</label>
                  <input
                    type="text"
                    placeholder="e.g. Private kitchen staff traveling on domestic group tours"
                    value={stat3Sub}
                    onChange={(e) => setStat3Sub(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/about"
            target="_blank"
            className="text-xs font-bold text-slate-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
          >
            <span>Preview Client Page</span>
            <span>↗</span>
          </Link>

          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-8 py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving changes..." : "💾 Save & Sync About Us Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
