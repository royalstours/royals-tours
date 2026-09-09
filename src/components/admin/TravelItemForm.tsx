"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals?: string;
  stay?: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface PricingTier {
  name: string;
  price: string;
  rawPrice: number;
  details?: string;
}

interface TravelItemFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  submitLabel: string;
  loading: boolean;
}

export default function TravelItemForm({
  initialData,
  onSubmit,
  submitLabel,
  loading,
}: TravelItemFormProps) {
  // --- FORM STATES ---
  const [isFixedDeparture, setIsFixedDeparture] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(""); // Custom Slug/ID
  const [title, setTitle] = useState("");
  const [slogan, setSlogan] = useState("");
  const [category, setCategory] = useState<string>("domestic");
  const [availableCategories, setAvailableCategories] = useState<{ _id: string; name: string; slug: string; icon?: string }[]>([]);
  const [quickCatModal, setQuickCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatIcon, setNewCatIcon] = useState("🧳");
  const [creatingCat, setCreatingCat] = useState(false);
  const [catError, setCatError] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/package-categories");
        if (res.ok) {
          const data = await res.json();
          setAvailableCategories(data);
        }
      } catch (err) {
        console.error("Failed to load categories in form:", err);
      }
    }
    loadCategories();
  }, []);

  const handleQuickCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      setCatError("Category name is required.");
      return;
    }
    setCreatingCat(true);
    setCatError("");
    try {
      const slug = newCatSlug.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const res = await fetch("/api/package-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim(), slug, icon: newCatIcon || "🧳" }),
      });
      const data = await res.json();
      if (res.ok) {
        setAvailableCategories((prev) => [...prev, data]);
        setCategory(data.slug);
        setQuickCatModal(false);
        setNewCatName("");
        setNewCatSlug("");
        setNewCatIcon("🧳");
      } else {
        setCatError(data.error || "Failed to create category.");
      }
    } catch (err) {
      setCatError("An error occurred while creating category.");
    } finally {
      setCreatingCat(false);
    }
  };
  const [duration, setDuration] = useState("5N / 6D");
  const [badge, setBadge] = useState("");
  const [price, setPrice] = useState("");
  const [rawPrice, setRawPrice] = useState<number | "">("");
  const [image, setImage] = useState("");
  const [pdfItineraryUrl, setPdfItineraryUrl] = useState("");
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [bestTimeToVisit, setBestTimeToVisit] = useState("");
  const [groupSize, setGroupSize] = useState("");

  // Lists
  const [highlights, setHighlights] = useState<string[]>([]);
  const [highlightInput, setHighlightInput] = useState("");

  const [included, setIncluded] = useState<string[]>([]);
  const [includedInput, setIncludedInput] = useState("");

  const [excluded, setExcluded] = useState<string[]>([]);
  const [excludedInput, setExcludedInput] = useState("");

  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryInput, setGalleryInput] = useState("");

  // Pricing Tiers
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [newTier, setNewTier] = useState<PricingTier>({ name: "", price: "", rawPrice: 0, details: "" });

  // Itinerary
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [newDay, setNewDay] = useState<ItineraryDay>({
    day: 1,
    title: "",
    description: "",
    meals: "",
    stay: "",
  });

  // FAQs
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [newFaq, setNewFaq] = useState<Faq>({ question: "", answer: "" });

  const [activeTab, setActiveTab] = useState<"basic" | "logistics" | "highlights" | "itinerary" | "gallery" | "pricing">("basic");
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  // --- POPULATE INITIAL DATA (FOR EDIT) ---
  useEffect(() => {
    if (initialData) {
      setIsFixedDeparture(!!initialData.isFixedDeparture);
      setName(initialData.name || "");
      setId(initialData.id || "");
      setTitle(initialData.title || "");
      setSlogan(initialData.slogan || "");
      setCategory(initialData.category || "international");
      setDuration(initialData.duration || "");
      setBadge(initialData.badge || "");
      setPrice(initialData.price || "");
      setRawPrice(initialData.rawPrice ?? "");
      setImage(initialData.image || "");
      setDescription(initialData.description || "");
      setLocation(initialData.location || "");
      setBestTimeToVisit(initialData.bestTimeToVisit || "");
      setGroupSize(initialData.groupSize || "");
      setHighlights(initialData.highlights || []);
      setIncluded(initialData.included || []);
      setExcluded(initialData.excluded || []);
      setGallery(initialData.gallery || []);
      setPricingTiers(initialData.pricingTiers || []);
      setItinerary(initialData.itinerary || []);
      setFaqs(initialData.faqs || []);
      setPdfItineraryUrl(initialData.pdfItineraryUrl || "");
    }
  }, [initialData]);

  // --- LIST HELPERS ---
  const addHighlight = () => {
    if (highlightInput.trim()) {
      setHighlights((prev) => [...prev, highlightInput.trim()]);
      setHighlightInput("");
    }
  };

  const removeHighlight = (idx: number) => {
    setHighlights((prev) => prev.filter((_, i) => i !== idx));
  };

  const addIncluded = () => {
    if (includedInput.trim()) {
      setIncluded((prev) => [...prev, includedInput.trim()]);
      setIncludedInput("");
    }
  };

  const removeIncluded = (idx: number) => {
    setIncluded((prev) => prev.filter((_, i) => i !== idx));
  };

  const addExcluded = () => {
    if (excludedInput.trim()) {
      setExcluded((prev) => [...prev, excludedInput.trim()]);
      setExcludedInput("");
    }
  };

  const removeExcluded = (idx: number) => {
    setExcluded((prev) => prev.filter((_, i) => i !== idx));
  };

  const addGallery = () => {
    if (galleryInput.trim()) {
      setGallery((prev) => [...prev, galleryInput.trim()]);
      setGalleryInput("");
    }
  };

  const removeGallery = (idx: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== idx));
  };

  // --- PRICING TIERS HELPERS ---
  const addPricingTier = () => {
    if (newTier.name.trim() && newTier.price.trim()) {
      const sanitizedPrice = newTier.price.replace(/^₹\s*/, "").trim();
      setPricingTiers((prev) => [...prev, { ...newTier, price: sanitizedPrice }]);
      setNewTier({ name: "", price: "", rawPrice: 0, details: "" });
    }
  };

  const removePricingTier = (idx: number) => {
    setPricingTiers((prev) => prev.filter((_, i) => i !== idx));
  };

  // --- ITINERARY HELPERS ---
  const addItineraryDay = () => {
    if (newDay.title.trim() && newDay.description.trim()) {
      const nextDayNum = itinerary.length + 1;
      setItinerary((prev) => [...prev, { ...newDay, day: nextDayNum }]);
      setNewDay({
        day: nextDayNum + 1,
        title: "",
        description: "",
        meals: "",
        stay: "",
      });
    }
  };

  const removeItineraryDay = (idx: number) => {
    const updated = itinerary
      .filter((_, i) => i !== idx)
      .map((item, i) => ({ ...item, day: i + 1 })); // Recalculate day numbers
    setItinerary(updated);
    setNewDay((prev) => ({ ...prev, day: updated.length + 1 }));
  };

  // --- FAQ HELPERS ---
  const addFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      setFaqs((prev) => [...prev, newFaq]);
      setNewFaq({ question: "", answer: "" });
    }
  };

  const removeFaq = (idx: number) => {
    setFaqs((prev) => prev.filter((_, i) => i !== idx));
  };

  // --- IMAGE UPLOAD HELPER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "main" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "main") setUploadingMain(true);
    else setUploadingGallery(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        if (type === "main") {
          setImage(data.url);
        } else {
          setGallery((prev) => [...prev, data.url]);
        }
      } else {
        alert(data.error || "Failed to upload image. Please verify Cloudinary credentials.");
      }
    } catch (err) {
      alert("Error uploading image file.");
    } finally {
      e.target.value = "";
      if (type === "main") setUploadingMain(false);
      else setUploadingGallery(false);
    }
  };

  // --- PDF UPLOAD HELPER ---
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setPdfItineraryUrl(data.url);
      } else {
        alert(data.error || "Failed to upload PDF. Please verify Cloudinary credentials.");
      }
    } catch (err) {
      alert("Error uploading PDF file.");
    } finally {
      e.target.value = "";
      setUploadingPdf(false);
    }
  };

  // --- SUBMIT HANDLING ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !title || !duration || !price || rawPrice === "" || !image || !description || !location) {
      alert("Please fill in all required fields (marked with *).");
      return;
    }

    const formData = {
      isFixedDeparture,
      name: name.trim(),
      title: title.trim(),
      slogan: slogan.trim(),
      category,
      duration: duration.trim(),
      badge: badge.trim(),
      price: price.trim(),
      rawPrice: Number(rawPrice),
      image: image.trim(),
      description: description.trim(),
      location: location.trim(),
      bestTimeToVisit: bestTimeToVisit.trim(),
      groupSize: groupSize.trim(),
      highlights,
      included,
      excluded,
      gallery,
      pricingTiers,
      itinerary,
      faqs,
      pdfItineraryUrl: pdfItineraryUrl.trim(),
    };

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tabs Menu */}
      <div className="flex border-b border-slate-200 overflow-x-auto select-none gap-2 pb-1 scrollbar-none">
        {[
          { id: "basic", label: "Basic Info *", icon: "📋" },
          { id: "logistics", label: "Logistics *", icon: "📍" },
          { id: "pricing", label: "Occupancy Pricing", icon: "💰" },
          { id: "highlights", label: "Highlights & Inclusions", icon: "✨" },
          { id: "itinerary", label: "Itinerary Builder", icon: "📅" },
          { id: "gallery", label: "Gallery & FAQs", icon: "🖼️" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-3xl shadow-xs">
        {/* --- 1. BASIC INFO TAB --- */}
        {activeTab === "basic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-100/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">Group Departure Destination?</span>
                <span className="text-[10px] text-slate-400">If toggled, this is marked as a group-departure destination, otherwise a custom package.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isFixedDeparture}
                  onChange={(e) => setIsFixedDeparture(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-505 peer-checked:bg-amber-500"></div>
              </label>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Location Name * (e.g. Bali, Kashmir, Vietnam)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bali"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>



            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Display Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Bali Cost Saver Deluxe Summer Special"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Country/Trip Slogan
              </label>
              <input
                type="text"
                value={slogan}
                onChange={(e) => setSlogan(e.target.value)}
                placeholder="e.g. Pure Veg Departure with cooks prepared meals, hotel check-ins &amp; travel insurance"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Trip Description *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed trip overview..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
              />
            </div>
          </div>
        )}

        {/* --- 2. LOGISTICS TAB --- */}
        {activeTab === "logistics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Category *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCatError("");
                    setNewCatName("");
                    setNewCatSlug("");
                    setQuickCatModal(true);
                  }}
                  className="text-[10px] font-bold text-orange-600 hover:text-orange-500 uppercase tracking-wider cursor-pointer"
                >
                  + Add New Category
                </button>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
              >
                {availableCategories.length > 0 ? (
                  availableCategories.map((cat) => (
                    <option key={cat._id} value={cat.slug}>
                      {cat.icon || "🧳"} {cat.name} ({cat.slug})
                    </option>
                  ))
                ) : (
                  <>
                    <option value="domestic">🍱 Domestic Tours (domestic)</option>
                    <option value="international">✈️ International Tours (international)</option>
                    <option value="honeymoon">💍 Honeymoon Specials (honeymoon)</option>
                    <option value="pilgrimage">🛕 Pilgrimage &amp; Yatra (pilgrimage)</option>
                    <option value="trek">🏔️ Treks &amp; Adventure (trek)</option>
                    <option value="weekend">🌴 Weekend Getaways (weekend)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Duration * (e.g. 5N / 6D)
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5N / 6D"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Specific Location Coverages *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Srinagar, Gulmarg, Pahalgam &amp; Sonamarg"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Trip Badge (e.g. Pure Veg Departure, Best Seller)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Pure Veg Departure"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Display Starting Price * (e.g. ₹ 32,500 PP)
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₹ 32,500 PP"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Raw Number Price * (e.g. 32500)
              </label>
              <input
                type="number"
                required
                value={rawPrice}
                onChange={(e) => setRawPrice(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 32500"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Best Time to Visit
              </label>
              <input
                type="text"
                value={bestTimeToVisit}
                onChange={(e) => setBestTimeToVisit(e.target.value)}
                placeholder="e.g. April to August"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Group Size Limits
              </label>
              <input
                type="text"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                placeholder="e.g. 20 - 30 Guests"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Main Banner Image URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
                <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider px-4 py-3 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 cursor-pointer select-none">
                  {uploadingMain ? "Uploading..." : "Upload File"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "main")}
                    className="hidden"
                    disabled={uploadingMain}
                  />
                </label>
              </div>
              {image && (
                <div className="mt-3 w-40 h-24 rounded-lg overflow-hidden border border-slate-200 relative bg-slate-50">
                  <img src={image} className="w-full h-full object-cover" alt="Banner preview" />
                </div>
              )}
            </div>

            {/* Itinerary PDF Upload */}
            <div className="md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Itinerary PDF File (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pdfItineraryUrl}
                  onChange={(e) => setPdfItineraryUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
                <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider px-4 py-3 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 cursor-pointer select-none">
                  {uploadingPdf ? "Uploading..." : "Upload PDF"}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                    disabled={uploadingPdf}
                  />
                </label>
              </div>
              {pdfItineraryUrl && (
                <p className="mt-2 text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  ✓ PDF Uploaded: <a href={pdfItineraryUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-700">View PDF File</a>
                </p>
              )}
            </div>

          </div>
        )}

        {/* --- 3. OCCUPANCY PRICING TAB --- */}
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2 flex flex-col gap-1">
              <span>Occupancy Options &amp; Pricing Tiers</span>
              <span className="text-[10px] text-amber-600 font-bold tracking-normal normal-case">
                ℹ️ Note: The Display Price of the first tier (e.g. 4 Persons Sharing price) will be automatically displayed on the catalog/home page tour cards as the starting price.
              </span>
            </h3>

            {pricingTiers.length === 0 ? (
              <div className="bg-slate-55 p-6 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-bold uppercase">
                No pricing tiers registered yet. Create occupancy details below.
              </div>
            ) : (
              <div className="space-y-3">
                {/* Header row for grid */}
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-4 gap-4 px-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  <div>Tier Name</div>
                  <div>Display Price</div>
                  <div>Raw Price Number</div>
                  <div>Occupancy Details / Notes</div>
                </div>

                <div className="divide-y divide-slate-100 space-y-3 sm:space-y-2.5">
                  {pricingTiers.map((tier, idx) => (
                    <div key={idx} className="pt-3 sm:pt-0 sm:py-2 grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                      <div>
                        <label className="sm:hidden block text-[9px] font-black uppercase text-slate-400 mb-1">Tier Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => {
                            const updated = [...pricingTiers];
                            updated[idx] = { ...updated[idx], name: e.target.value };
                            setPricingTiers(updated);
                          }}
                          placeholder="e.g. 4 Persons Sharing"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="sm:hidden block text-[9px] font-black uppercase text-slate-400 mb-1">Display Price</label>
                        <input
                          type="text"
                          value={tier.price ? tier.price.replace(/^₹\s*/, "") : ""}
                          onChange={(e) => {
                            const updated = [...pricingTiers];
                            updated[idx] = { ...updated[idx], price: e.target.value.replace(/^₹\s*/, "") };
                            setPricingTiers(updated);
                          }}
                          placeholder="e.g. 28,999"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="sm:hidden block text-[9px] font-black uppercase text-slate-400 mb-1">Raw Price</label>
                        <input
                          type="number"
                          value={tier.rawPrice}
                          onChange={(e) => {
                            const updated = [...pricingTiers];
                            updated[idx] = { ...updated[idx], rawPrice: Number(e.target.value) };
                            setPricingTiers(updated);
                          }}
                          placeholder="e.g. 28999"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="sm:hidden block text-[9px] font-black uppercase text-slate-400 mb-1">Details</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tier.details || ""}
                            onChange={(e) => {
                              const updated = [...pricingTiers];
                              updated[idx] = { ...updated[idx], details: e.target.value };
                              setPricingTiers(updated);
                            }}
                            placeholder="Optional occupancy notes"
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => removePricingTier(idx)}
                            className="text-rose-500 hover:text-rose-700 font-bold p-2 hover:scale-125 hover:rotate-90 transition-all duration-200 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing tier form */}
            <div className="bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-4">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                Add New Pricing Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Tier Name (e.g. Twin Sharing, Single Occupancy)
                  </label>
                  <input
                    type="text"
                    value={newTier.name}
                    onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
                    placeholder="e.g. Twin Sharing"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Display Price (e.g. 32,500)
                  </label>
                  <input
                    type="text"
                    value={newTier.price}
                    onChange={(e) => setNewTier({ ...newTier, price: e.target.value.replace(/^₹\s*/, "") })}
                    placeholder="e.g. 32,500"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Raw Price Number (e.g. 32500)
                  </label>
                  <input
                    type="number"
                    value={newTier.rawPrice || ""}
                    onChange={(e) => setNewTier({ ...newTier, rawPrice: Number(e.target.value) || 0 })}
                    placeholder="e.g. 32500"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Occupancy Details
                  </label>
                  <input
                    type="text"
                    value={newTier.details || ""}
                    onChange={(e) => setNewTier({ ...newTier, details: e.target.value })}
                    placeholder="e.g. Per Adult on twin sharing room"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={addPricingTier}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
              >
                ＋ Add Pricing Tier
              </button>
            </div>
          </div>
        )}

        {/* --- 4. HIGHLIGHTS & INCLUSIONS TAB --- */}
        {activeTab === "highlights" && (
          <div className="space-y-8">
            {/* Highlights List */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Key Trip Highlights
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  placeholder="e.g. Stay in luxury houseboat, backwaters cruise"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-2 pt-2">
                {highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-semibold"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => removeHighlight(idx)}
                      className="text-rose-500 hover:text-rose-700 font-bold cursor-pointer hover:scale-125 hover:rotate-90 transition-all duration-200"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Inclusions List */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-405">
                What is Included
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={includedInput}
                  onChange={(e) => setIncludedInput(e.target.value)}
                  placeholder="e.g. 3★/4★ Hotels, Pure Veg Meals prepared by cooks"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addIncluded())}
                />
                <button
                  type="button"
                  onClick={addIncluded}
                  className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 pt-1.5">
                {included.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-emerald-50/50 border border-emerald-100 text-emerald-800 text-xs px-3 py-2 rounded-xl flex items-center justify-between font-semibold"
                  >
                    <span>✓ {item}</span>
                    <button
                      type="button"
                      onClick={() => removeIncluded(idx)}
                      className="text-rose-500 hover:text-rose-700 font-bold ml-2 cursor-pointer hover:scale-125 hover:rotate-90 transition-all duration-200"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions List */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-405">
                What is Excluded
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={excludedInput}
                  onChange={(e) => setExcludedInput(e.target.value)}
                  placeholder="e.g. Train/Flight tickets, personal expenses"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExcluded())}
                />
                <button
                  type="button"
                  onClick={addExcluded}
                  className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1.5 pt-1.5">
                {excluded.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-rose-50/50 border border-rose-100 text-rose-800 text-xs px-3 py-2 rounded-xl flex items-center justify-between font-semibold"
                  >
                    <span>✗ {item}</span>
                    <button
                      type="button"
                      onClick={() => removeExcluded(idx)}
                      className="text-rose-500 hover:text-rose-700 font-bold ml-2 cursor-pointer hover:scale-125 hover:rotate-90 transition-all duration-200"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* --- 5. ITINERARY BUILDER TAB --- */}
        {activeTab === "itinerary" && (
          <div className="space-y-6">
            <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800 mb-2">
              Day-by-Day Itinerary Builder
            </h3>

            {itinerary.length === 0 ? (
              <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center text-xs text-slate-400 font-bold uppercase">
                No itinerary days registered yet. Add day cards below.
              </div>
            ) : (
              <div className="space-y-4">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 border border-slate-100 rounded-2xl relative">
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(idx)}
                      className="absolute top-4 right-4 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200/50 px-2 py-1 rounded text-xs cursor-pointer font-bold hover:scale-105 transition-all duration-200"
                    >
                      ✕ Remove Day
                    </button>
                    <span className="inline-block bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-full mb-2">
                      Day {day.day}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs uppercase">{day.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1">{day.description}</p>
                    <div className="flex gap-4 mt-2 text-[10px] font-bold text-slate-450 uppercase">
                      {day.meals && <span>🍽️ Meals: {day.meals}</span>}
                      {day.stay && <span>🏨 Stay: {day.stay}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border border-slate-200/60 p-5 rounded-2xl space-y-4 bg-slate-50/20">
              <span className="font-bold text-slate-800 text-xs uppercase tracking-wider block">
                Compile Day {newDay.day} details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Day Title
                  </label>
                  <input
                    type="text"
                    value={newDay.title}
                    onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
                    placeholder="e.g. Arrival at Srinagar &amp; Shikara Ride"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Day Activity Description
                  </label>
                  <textarea
                    rows={3}
                    value={newDay.description}
                    onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
                    placeholder="Detailed activity details..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Meals
                  </label>
                  <input
                    type="text"
                    value={newDay.meals || ""}
                    onChange={(e) => setNewDay({ ...newDay, meals: e.target.value })}
                    placeholder="e.g. Breakfast, Dinner"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Accommodation Stay
                  </label>
                  <input
                    type="text"
                    value={newDay.stay || ""}
                    onChange={(e) => setNewDay({ ...newDay, stay: e.target.value })}
                    placeholder="e.g. Hotel / Deluxe Houseboat Srinagar"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={addItineraryDay}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
              >
                ＋ Append Day to Itinerary
              </button>
            </div>
          </div>
        )}

        {/* --- 6. GALLERY & FAQS TAB --- */}
        {activeTab === "gallery" && (
          <div className="space-y-8">
            {/* Gallery Section */}
            <div className="space-y-3">
              <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">
                Gallery Images URLs
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGallery())}
                />
                <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold uppercase tracking-wider px-4 py-3 rounded-xl flex items-center justify-center shrink-0 border border-slate-200 cursor-pointer select-none">
                  {uploadingGallery ? "..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "gallery")}
                    className="hidden"
                    disabled={uploadingGallery}
                  />
                </label>
                <button
                  type="button"
                  onClick={addGallery}
                  className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-5 rounded-xl cursor-pointer"
                >
                  Add
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {gallery.map((imgUrl, idx) => (
                  <div key={idx} className="w-full h-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 relative group">
                    <img src={imgUrl} className="w-full h-full object-cover" alt="Gallery item" />
                    <button
                      type="button"
                      onClick={() => removeGallery(idx)}
                      className="absolute top-1 right-1 bg-rose-600 hover:bg-rose-500 text-white p-1 rounded-md text-[9px] font-bold cursor-pointer hover:scale-110 hover:rotate-90 transition-all duration-200"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Builder */}
            <div className="space-y-4 border-t border-slate-100 pt-6">
              <h3 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800">
                Frequently Asked Questions (FAQs)
              </h3>

              {faqs.length > 0 && (
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="bg-slate-55 p-4 border border-slate-100 rounded-2xl relative">
                      <button
                        type="button"
                        onClick={() => removeFaq(idx)}
                        className="absolute top-4 right-4 text-rose-500 hover:text-rose-700 text-xs font-bold cursor-pointer hover:scale-105 transition-all duration-200"
                      >
                        ✕ Remove
                      </button>
                      <h4 className="font-bold text-slate-900 text-xs">Q: {faq.question}</h4>
                      <p className="text-[11px] text-slate-500 mt-1">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-slate-50/20 border border-slate-200/60 p-4 rounded-2xl space-y-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Question
                  </label>
                  <input
                    type="text"
                    value={newFaq.question}
                    onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                    placeholder="e.g. Are laundry services available at the hotels?"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Answer
                  </label>
                  <textarea
                    rows={2}
                    value={newFaq.answer}
                    onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                    placeholder="Provide details..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={addFaq}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  ＋ Add FAQ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer Buttons */}
      <div className="flex justify-end gap-3 select-none">
        <Link
          href="/admin/destinations"
          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl transition-all"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black uppercase text-[10px] tracking-wider px-6 py-3.5 rounded-xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Saving Travel Item..." : submitLabel}
        </button>
      </div>
      {/* Quick Category Modal */}
      {quickCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-100 shadow-2xl animate-dialog">
            <h3 className="font-heading font-black text-lg text-slate-900 uppercase">
              Add New Category
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Create a new category on the fly to tag this package.
            </p>

            {catError && (
              <div className="p-3 mt-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
                ⚠️ {catError}
              </div>
            )}

            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Honeymoon Specials"
                  value={newCatName}
                  onChange={(e) => {
                    setNewCatName(e.target.value);
                    setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. honeymoon"
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-slate-600 mb-1">
                    Icon
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 💍"
                    value={newCatIcon}
                    onChange={(e) => setNewCatIcon(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setQuickCatModal(false)}
                  disabled={creatingCat}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleQuickCreateCategory}
                  disabled={creatingCat}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold uppercase text-[10px] tracking-wider py-3 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
                >
                  {creatingCat ? "Adding..." : "Add Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
