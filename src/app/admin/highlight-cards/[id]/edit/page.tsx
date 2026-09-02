"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditHighlightCardPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { id } = resolvedParams;

  const [type, setType] = useState<"image" | "video">("image");
  const [src, setSrc] = useState("");
  const [mobileSrc, setMobileSrc] = useState("");
  const [poster, setPoster] = useState("");
  const [mobilePoster, setMobilePoster] = useState("");
  const [alt, setAlt] = useState("");
  const [order, setOrder] = useState("0");
  const [badge, setBadge] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [ctaLink, setCtaLink] = useState("");

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [mobileUploading, setMobileUploading] = useState(false);
  const [posterUploading, setPosterUploading] = useState(false);
  const [mobilePosterUploading, setMobilePosterUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    src?: string;
    mobileSrc?: string;
    poster?: string;
    mobilePoster?: string;
  }>({});

  useEffect(() => {
    async function fetchCard() {
      try {
        const res = await fetch(`/api/highlight-cards/${id}`);
        if (res.ok) {
          const data = await res.json();
          setType(data.type);
          setSrc(data.src);
          setMobileSrc(data.mobileSrc || "");
          setPoster(data.poster || "");
          setMobilePoster(data.mobilePoster || "");
          setAlt(data.alt || "");
          setOrder(String(data.order || 0));
          setBadge(data.badge || "");
          setTitle(data.title || "");
          setSubtitle(data.subtitle || "");
          setCtaText(data.ctaText || "");
          setCtaLink(data.ctaLink || "");
        } else {
          setError("Failed to fetch card details.");
        }
      } catch (err) {
        setError("Error loading card details.");
      } finally {
        setLoading(false);
      }
    }
    if (id) {
      fetchCard();
    }
  }, [id]);

  const handleMediaUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "src" | "mobileSrc" | "poster" | "mobilePoster"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === "src") setUploading(true);
    else if (field === "mobileSrc") setMobileUploading(true);
    else if (field === "poster") setPosterUploading(true);
    else if (field === "mobilePoster") setMobilePosterUploading(true);
    
    setError("");
    setFieldErrors(prev => ({ ...prev, [field]: undefined }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errorMsg = "Failed to upload file.";
        if (res.status === 413) {
          errorMsg = "File is too large (Vercel/server limit is 4.5MB). Please upload a smaller file or paste a URL directly.";
        } else {
          try {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              const data = await res.json();
              errorMsg = data.error || errorMsg;
            } else {
              const text = await res.text();
              errorMsg = text || `Upload failed with status ${res.status}`;
            }
          } catch {
            errorMsg = `Upload failed with status ${res.status}`;
          }
        }
        setFieldErrors(prev => ({ ...prev, [field]: errorMsg }));
        setError(`Failed to upload media: ${errorMsg}`);
        return;
      }

      const data = await res.json();
      if (data.url) {
        if (field === "src") setSrc(data.url);
        else if (field === "mobileSrc") setMobileSrc(data.url);
        else if (field === "poster") setPoster(data.url);
        else if (field === "mobilePoster") setMobilePoster(data.url);
      } else {
        const errorMsg = "Upload succeeded but no URL was returned.";
        setFieldErrors(prev => ({ ...prev, [field]: errorMsg }));
        setError(errorMsg);
      }
    } catch (err) {
      const errorMsg = "An error occurred during file upload.";
      setFieldErrors(prev => ({ ...prev, [field]: errorMsg }));
      setError(errorMsg);
    } finally {
      e.target.value = "";
      if (field === "src") setUploading(false);
      else if (field === "mobileSrc") setMobileUploading(false);
      else if (field === "poster") setPosterUploading(false);
      else if (field === "mobilePoster") setMobilePosterUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!src.trim()) {
      setError("Media source URL is required.");
      return;
    }
    if (!alt.trim()) {
      setError("Alt text / Accessibility Label is required.");
      return;
    }

    setSaving(true);

    const payload = {
      type,
      src: src.trim(),
      mobileSrc: mobileSrc.trim(),
      poster: type === "video" ? poster.trim() : "",
      mobilePoster: type === "video" ? mobilePoster.trim() : "",
      alt: alt.trim(),
      order: isNaN(Number(order)) ? 0 : Number(order),
      badge: badge.trim(),
      title: title.trim(),
      subtitle: subtitle.trim(),
      ctaText: ctaText.trim(),
      ctaLink: ctaLink.trim(),
    };

    try {
      const res = await fetch(`/api/highlight-cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/highlight-cards");
        router.refresh();
      } else {
        setError(data.error || "Failed to save card changes.");
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
          Loading card specs...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6 select-none animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div>
        <Link
          href="/admin/highlight-cards"
          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1 mb-1"
        >
          ← Back to Highlight Cards
        </Link>
        <h2 className="font-heading font-black text-2xl md:text-3xl uppercase tracking-tight text-slate-900">
          Modify Media Slide
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Editing parameters for slide ID: <strong className="text-slate-600 font-mono">{id}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
          ⚠️ {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        
        {/* Slide Type Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Card Media Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType("image")}
              className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all cursor-pointer ${
                type === "image"
                  ? "bg-amber-500 border-amber-500 text-slate-950 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              🖼️ Image Slide
            </button>
            <button
              type="button"
              onClick={() => setType("video")}
              className={`py-3 px-4 rounded-xl border font-bold text-xs uppercase transition-all cursor-pointer ${
                type === "video"
                  ? "bg-amber-500 border-amber-500 text-slate-950 shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              📹 Video Slide
            </button>
          </div>
        </div>

        {/* Media File Uploader (Desktop) */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Upload Desktop {type} (Recommended: 16:9 / 21:9 Widescreen) <span className="text-rose-500">*</span>
          </label>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50 ${
                fieldErrors.src ? "border-rose-300 hover:border-rose-400 bg-rose-50/10" : "border-slate-200 hover:border-amber-500"
              }`}>
                <span className="text-xl">{type === "video" ? "📹" : "📷"}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                  {uploading ? "Uploading file..." : `Change desktop ${type} file`}
                </span>
                <input
                  type="file"
                  accept={type === "video" ? "video/*" : "image/*"}
                  onChange={(e) => handleMediaUpload(e, "src")}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
              {fieldErrors.src && (
                <p className="text-rose-600 text-[10px] font-bold mt-1.5 flex items-center gap-1 select-text">
                  <span>⚠️</span> {fieldErrors.src}
                </p>
              )}
            </div>

            {/* Preview */}
            {src && (
              <div className="w-20 h-16 rounded border border-slate-200 overflow-hidden relative shrink-0 bg-slate-50">
                {type === "video" ? (
                  <video src={src} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <input
              type="text"
              placeholder={`Or paste desktop ${type} URL directly`}
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
            />
            <p className="text-[10px] font-bold text-slate-400 mt-1 select-text">
              💡 Recommended ratios: <strong>16:9</strong> (1920x1080) [Default], <strong>21:9</strong> (2560x1080) [Ultrawide], <strong>16:10</strong> (1920x1200), or <strong>3:2</strong> (1800x1200). Media will cover the screen height, so choose the best fit to prevent important details from cropping.
            </p>
          </div>
        </div>

        {/* Video Poster Image - Desktop */}
        {type === "video" && (
          <div className="flex flex-col gap-2 animate-fadeIn">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Desktop Video Poster / Fallback Image
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50 ${
                  fieldErrors.poster ? "border-rose-300 hover:border-rose-400 bg-rose-50/10" : "border-slate-200 hover:border-amber-500"
                }`}>
                  <span className="text-xl">📷</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                    {posterUploading ? "Uploading file..." : "Change Desktop Poster Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, "poster")}
                    disabled={posterUploading}
                    className="hidden"
                  />
                </label>
                {fieldErrors.poster && (
                  <p className="text-rose-600 text-[10px] font-bold mt-1.5 flex items-center gap-1 select-text">
                    <span>⚠️</span> {fieldErrors.poster}
                  </p>
                )}
              </div>
              {poster && (
                <div className="w-20 h-16 rounded border border-slate-200 overflow-hidden relative shrink-0">
                  <img src={poster} alt="Poster Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Or paste desktop poster image URL directly"
              value={poster}
              onChange={(e) => setPoster(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono mt-1"
            />
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Media File Uploader (Mobile) */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Upload Mobile {type} (Recommended: 9:16 Portrait) <span className="text-slate-400">(Optional)</span>
          </label>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50 ${
                fieldErrors.mobileSrc ? "border-rose-300 hover:border-rose-400 bg-rose-50/10" : "border-slate-200 hover:border-amber-500"
              }`}>
                <span className="text-xl">{type === "video" ? "📹" : "📷"}</span>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                  {mobileUploading ? "Uploading file..." : `Change mobile ${type} file`}
                </span>
                <input
                  type="file"
                  accept={type === "video" ? "video/*" : "image/*"}
                  onChange={(e) => handleMediaUpload(e, "mobileSrc")}
                  disabled={mobileUploading}
                  className="hidden"
                />
              </label>
              {fieldErrors.mobileSrc && (
                <p className="text-rose-600 text-[10px] font-bold mt-1.5 flex items-center gap-1 select-text">
                  <span>⚠️</span> {fieldErrors.mobileSrc}
                </p>
              )}
            </div>

            {/* Preview */}
            {mobileSrc && (
              <div className="w-20 h-16 rounded border border-slate-200 overflow-hidden relative shrink-0 bg-slate-50">
                {type === "video" ? (
                  <video src={mobileSrc} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={mobileSrc} alt="Preview" className="w-full h-full object-cover" />
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <input
              type="text"
              placeholder={`Or paste mobile ${type} URL directly`}
              value={mobileSrc}
              onChange={(e) => setMobileSrc(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono"
            />
            <p className="text-[10px] font-bold text-slate-400 mt-1 select-text">
              💡 Recommended ratios: <strong>9:16</strong> (1080x1920) [Default Tall], <strong>4:5</strong> (1080x1350) [Instagram Portrait], <strong>2:3</strong> (1000x1500), <strong>3:4</strong> (960x1280) [Wide Portrait], or <strong>1:1</strong> (1080x1080) [Square].
            </p>
          </div>
        </div>

        {/* Video Poster Image - Mobile */}
        {type === "video" && (
          <div className="flex flex-col gap-2 animate-fadeIn">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Mobile Video Poster / Fallback Image (Optional)
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 cursor-pointer transition-all bg-slate-50/50 ${
                  fieldErrors.mobilePoster ? "border-rose-300 hover:border-rose-400 bg-rose-50/10" : "border-slate-200 hover:border-amber-500"
                }`}>
                  <span className="text-xl">📷</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 mt-1">
                    {mobilePosterUploading ? "Uploading file..." : "Change Mobile Poster Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleMediaUpload(e, "mobilePoster")}
                    disabled={mobilePosterUploading}
                    className="hidden"
                  />
                </label>
                {fieldErrors.mobilePoster && (
                  <p className="text-rose-600 text-[10px] font-bold mt-1.5 flex items-center gap-1 select-text">
                    <span>⚠️</span> {fieldErrors.mobilePoster}
                  </p>
                )}
              </div>
              {mobilePoster && (
                <div className="w-20 h-16 rounded border border-slate-200 overflow-hidden relative shrink-0">
                  <img src={mobilePoster} alt="Mobile Poster Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            <input
              type="text"
              placeholder="Or paste mobile poster image URL directly"
              value={mobilePoster}
              onChange={(e) => setMobilePoster(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 font-mono mt-1"
            />
          </div>
        )}

        <hr className="border-slate-100" />

        {/* Accessibility Alt Tag */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Alt Text / Accessibility Label <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Kayaking in transparent river water, Sunrise mountain peak view"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
            required
          />
          <p className="text-[10px] font-bold text-slate-400">
            Helps search engine crawls, optimization, and indexing.
          </p>
        </div>

        <hr className="border-slate-100" />
        
        <div>
          <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-700 mb-4">
            📢 Advertisement / Promotion Overlay (Optional)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Badge */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Ad Badge / Tag
              </label>
              <input
                type="text"
                placeholder="e.g. FESTIVAL OFFER, 15% OFF"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              />
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Ad Headline / Title
              </label>
              <input
                type="text"
                placeholder="e.g. Monsoon Treks Special Discount"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Ad Description / Subtext
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Book any trek in the Western Ghats and get flat 15% discount. Valid this week only!"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {/* CTA Text */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Button Label (CTA Text)
              </label>
              <input
                type="text"
                placeholder="e.g. Claim Offer, Explore Deals"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              />
            </div>

            {/* CTA Link */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                Button Link URL (CTA Link)
              </label>
              <input
                type="text"
                placeholder="e.g. /packages or https://..."
                value={ctaLink}
                onChange={(e) => setCtaLink(e.target.value)}
                className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Display Order */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Display Order
          </label>
          <input
            type="number"
            placeholder="e.g., 0, 1, 2"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving || uploading || mobileUploading || posterUploading || mobilePosterUploading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "💾 Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
