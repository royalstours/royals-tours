"use client";

import { useEffect, useState } from "react";

interface ItineraryFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  submitLabel: string;
  loading: boolean;
}

const DEFAULT_INCLUSIONS = [
  "Accommodation on twin sharing basis as per itinerary",
  "Daily Breakfast at the hotel",
  "All transfers & sightseeing by private AC vehicle",
  "All tours & activities as per itinerary",
  "Entry fees to all attractions mentioned in the itinerary",
  "Assistance during the trip 24/7 support",
  "All applicable taxes except TCS"
];

const DEFAULT_EXCLUSIONS = [
  "Airfare / Train fare",
  "Visa fees & Travel insurance",
  "Lunch & Dinner unless specified",
  "Personal expenses (shopping, tips, laundry, calls, etc.)",
  "Any optional activities not mentioned in the inclusions",
  "Anything not mentioned in the inclusions"
];

const DEFAULT_WHATS_INCLUDED = {
  stay: "Comfortable accommodation on twin sharing basis as per itinerary",
  meals: "Daily breakfast at the hotel",
  transfers: "All transfers & sightseeing by private AC vehicle",
  tours: "All tours & activities as per itinerary",
  entries: "Entry fees to all attractions mentioned in the itinerary",
  support: "Assistance during the trip 24/7 support"
};

const DEFAULT_NOTES = [
  "Rates are subject to availability at the time of booking and may change without prior notice.",
  "Check-in time is typically 02:00 PM and check-out is 11:00 AM.",
  "Standard child policies apply based on hotel rules."
];

export default function ItineraryForm({
  initialData,
  onSubmit,
  submitLabel,
  loading,
}: ItineraryFormProps) {
  const [itineraryNumber, setItineraryNumber] = useState("");
  const [packageName, setPackageName] = useState("");
  const [subtitle, setSubtitle] = useState("Your Journey, Your Way");
  const [durationText, setDurationText] = useState("6 DAYS | 5 NIGHTS");
  const [price, setPrice] = useState("₹ 49,999");
  const [priceSuffix, setPriceSuffix] = useState("PER PERSON");
  const [priceValidity, setPriceValidity] = useState("");

  // What's Included Card Summaries
  const [stay, setStay] = useState(DEFAULT_WHATS_INCLUDED.stay);
  const [meals, setMeals] = useState(DEFAULT_WHATS_INCLUDED.meals);
  const [transfers, setTransfers] = useState(DEFAULT_WHATS_INCLUDED.transfers);
  const [tours, setTours] = useState(DEFAULT_WHATS_INCLUDED.tours);
  const [entries, setEntries] = useState(DEFAULT_WHATS_INCLUDED.entries);
  const [support, setSupport] = useState(DEFAULT_WHATS_INCLUDED.support);

  // Day wise itinerary (Up to 6 days)
  const [days, setDays] = useState<any[]>([
    { dayNum: 1, title: "ARRIVAL - WELCOME TO YOUR DESTINATION", description: "Arrival at the airport. Meet & greet and private transfer to your hotel. Check-in and relax. Evening free for leisure or local exploration.", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600" }
  ]);

  // Inclusions & Exclusions arrays
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);

  // Notes
  const [notes, setNotes] = useState<string[]>(DEFAULT_NOTES);
  const [newNote, setNewNote] = useState("");

  // Upload state trackers for each day to show loading spinners
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      setItineraryNumber(initialData.itineraryNumber || "");
      setPackageName(initialData.packageName || "");
      setSubtitle(initialData.subtitle || "Your Journey, Your Way");
      setDurationText(initialData.durationText || "6 DAYS | 5 NIGHTS");
      setPrice(initialData.price || "₹ 49,999");
      setPriceSuffix(initialData.priceSuffix || "PER PERSON");
      setPriceValidity(initialData.priceValidity || "");

      if (initialData.whatsIncluded) {
        setStay(initialData.whatsIncluded.stay || "");
        setMeals(initialData.whatsIncluded.meals || "");
        setTransfers(initialData.whatsIncluded.transfers || "");
        setTours(initialData.whatsIncluded.tours || "");
        setEntries(initialData.whatsIncluded.entries || "");
        setSupport(initialData.whatsIncluded.support || "");
      }

      if (initialData.days && initialData.days.length > 0) {
        setDays(initialData.days);
      }
      
      setInclusions(initialData.inclusions || []);
      setExclusions(initialData.exclusions || []);
      setNotes(initialData.notes || DEFAULT_NOTES);
    } else {
      // Prepopulate default inclusions/exclusions on new itinerary
      setInclusions([...DEFAULT_INCLUSIONS]);
      setExclusions([...DEFAULT_EXCLUSIONS]);
      
      // Default to 6 days
      setDays([
        { dayNum: 1, title: "ARRIVAL - WELCOME TO YOUR DESTINATION", description: "Arrival at the airport. Meet & greet and private transfer to your hotel. Check-in and relax. Evening free for leisure or local exploration.", image: "https://images.unsplash.com/photo-1616091093714-c64882e9ab55?q=80&w=600" },
        { dayNum: 2, title: "CITY TOUR & LOCAL ATTRACTIONS", description: "After breakfast, enjoy a guided city tour covering the top attractions, local culture, and scenic spots. Evening free for shopping or leisure.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600" },
        { dayNum: 3, title: "ISLAND TOUR & WATER ACTIVITIES", description: "Enjoy a full-day island tour with breathtaking views, beaches, and exciting water activities. Lunch included during the tour.", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600" },
        { dayNum: 4, title: "NATURE & CULTURAL EXPERIENCE", description: "Visit beautiful natural and cultural sites. Experience the local traditions, temples, and viewpoints. Evening at leisure.", image: "https://images.unsplash.com/photo-1544811096-89a14f806d55?q=80&w=600" },
        { dayNum: 5, title: "LEISURE DAY", description: "Day free for you to relax, explore on your own, or enjoy optional activities.", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600" },
        { dayNum: 6, title: "DEPARTURE", description: "After breakfast, check-out from the hotel. Private transfer to the airport for your return journey with wonderful memories.", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600" }
      ]);
    }
  }, [initialData]);

  // Image Upload helper
  const handleImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIndex(idx);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.url) {
        const updated = [...days];
        updated[idx].image = data.url;
        setDays(updated);
      } else {
        alert(data.error || "Image upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      e.target.value = "";
      setUploadingIndex(null);
    }
  };

  // Day handlers
  const handleDayChange = (idx: number, field: string, val: any) => {
    const updated = [...days];
    updated[idx][field] = val;
    setDays(updated);
  };

  const addDay = () => {
    if (days.length >= 6) {
      alert("Itinerary is designed for a maximum of 6 days.");
      return;
    }
    setDays([...days, {
      dayNum: days.length + 1,
      title: `DAY ${days.length + 1} TITLE`,
      description: "Day activities details...",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=600"
    }]);
  };

  const removeDay = (idx: number) => {
    if (days.length === 1) return;
    const filtered = days.filter((_, i) => i !== idx).map((day, i) => ({
      ...day,
      dayNum: i + 1
    }));
    setDays(filtered);
  };

  // Inclusion List handlers
  const handleInclusionChange = (idx: number, value: string) => {
    const updated = [...inclusions];
    updated[idx] = value;
    setInclusions(updated);
  };

  const addInclusionField = () => {
    setInclusions([...inclusions, DEFAULT_INCLUSIONS[inclusions.length % DEFAULT_INCLUSIONS.length]]);
  };

  const removeInclusionField = (idx: number) => {
    setInclusions(inclusions.filter((_, i) => i !== idx));
  };

  // Exclusion List handlers
  const handleExclusionChange = (idx: number, value: string) => {
    const updated = [...exclusions];
    updated[idx] = value;
    setExclusions(updated);
  };

  const addExclusionField = () => {
    setExclusions([...exclusions, DEFAULT_EXCLUSIONS[exclusions.length % DEFAULT_EXCLUSIONS.length]]);
  };

  const removeExclusionField = (idx: number) => {
    setExclusions(exclusions.filter((_, i) => i !== idx));
  };

  // Note handlers
  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([...notes, newNote.trim()]);
    setNewNote("");
  };

  const removeNote = (idx: number) => {
    setNotes(notes.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!packageName || !durationText || !price || !priceValidity) {
      alert("Please fill in all general itinerary details.");
      return;
    }
    
    onSubmit({
      itineraryNumber,
      packageName,
      subtitle,
      durationText,
      price,
      priceSuffix,
      priceValidity,
      days,
      whatsIncluded: {
        stay,
        meals,
        transfers,
        tours,
        entries,
        support
      },
      inclusions,
      exclusions,
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      {/* Block 1: General Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100">
          General Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Reference Code (Leave empty for Auto)
            </label>
            <input
              type="text"
              value={itineraryNumber}
              onChange={(e) => setItineraryNumber(e.target.value)}
              placeholder="e.g. ITN/2026/0001"
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Package / Destination Name *
            </label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="e.g. Azerbaijan Tour"
              required
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Subtitle Banner
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Your Journey, Your Way"
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Duration Text *
            </label>
            <input
              type="text"
              value={durationText}
              onChange={(e) => setDurationText(e.target.value)}
              placeholder="e.g. 6 DAYS | 5 NIGHTS"
              required
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Starting Price *
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. ₹ 49,999"
              required
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Price Suffix
            </label>
            <input
              type="text"
              value={priceSuffix}
              onChange={(e) => setPriceSuffix(e.target.value)}
              placeholder="e.g. PER PERSON"
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Price Valid Till Date *
            </label>
            <input
              type="text"
              value={priceValidity}
              onChange={(e) => setPriceValidity(e.target.value)}
              placeholder="e.g. 31st Oct 2026"
              required
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 font-bold focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Block 2: Day-Wise Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400">
            Day-Wise Itinerary (Max 6 Days)
          </h3>
          <button
            type="button"
            onClick={addDay}
            disabled={days.length >= 6}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
          >
            ＋ Add Day
          </button>
        </div>

        <div className="space-y-6">
          {days.map((day, idx) => (
            <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-heading font-extrabold text-xs text-amber-600 uppercase">
                  Day 0{day.dayNum} Card Content
                </span>
                {days.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDay(idx)}
                    className="text-red-500 hover:text-red-700 font-bold text-[10px] uppercase tracking-wider"
                  >
                    Remove Day
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                      Day Title
                    </label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => handleDayChange(idx, "title", e.target.value)}
                      placeholder="e.g. CITY TOUR & attractions"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                      Day Description
                    </label>
                    <textarea
                      rows={3}
                      value={day.description}
                      onChange={(e) => handleDayChange(idx, "description", e.target.value)}
                      placeholder="Enter day wise travel activities..."
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                    Day Cover Image (Will replace image in template)
                  </label>
                  <div className="space-y-2">
                    {day.image && (
                      <div className="relative w-full h-24 rounded-lg overflow-hidden border border-slate-200">
                        <img
                          src={day.image}
                          alt={`Day ${day.dayNum}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        id={`day-img-input-${idx}`}
                        onChange={(e) => handleImageUpload(idx, e)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`day-img-input-${idx}`}
                        className="w-full cursor-pointer flex justify-center items-center py-2 border border-dashed border-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:bg-white hover:text-amber-600 transition-colors"
                      >
                        {uploadingIndex === idx ? "⏳ Uploading..." : "📷 Upload Photo"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Block 3: What's Included */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100">
          What's Included Cards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Stay Summary
            </label>
            <input
              type="text"
              value={stay}
              onChange={(e) => setStay(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Meals Summary
            </label>
            <input
              type="text"
              value={meals}
              onChange={(e) => setMeals(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Transfers Summary
            </label>
            <input
              type="text"
              value={transfers}
              onChange={(e) => setTransfers(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Tours Summary
            </label>
            <input
              type="text"
              value={tours}
              onChange={(e) => setTours(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Entries Summary
            </label>
            <input
              type="text"
              value={entries}
              onChange={(e) => setEntries(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
              Support Summary
            </label>
            <input
              type="text"
              value={support}
              onChange={(e) => setSupport(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Block 4: Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400">
              Inclusions List
            </h3>
            <button
              type="button"
              onClick={addInclusionField}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
            >
              ＋ Add Inclusion
            </button>
          </div>
          <div className="space-y-3">
            {inclusions.map((inc, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-[10px] font-bold text-slate-400 w-6">#{idx + 1}</span>
                <div className="flex-1 flex gap-2">
                  <select
                    value={DEFAULT_INCLUSIONS.includes(inc) ? inc : "custom"}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        handleInclusionChange(idx, "");
                      } else {
                        handleInclusionChange(idx, e.target.value);
                      }
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none max-w-[200px]"
                  >
                    <option value="custom">✏️ Custom Text...</option>
                    {DEFAULT_INCLUSIONS.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt.substring(0, 30)}...
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={inc}
                    onChange={(e) => handleInclusionChange(idx, e.target.value)}
                    placeholder="Enter inclusion details..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeInclusionField(idx)}
                  className="text-red-500 hover:text-red-700 font-extrabold text-sm px-1.5"
                >
                  ✕
                </button>
              </div>
            ))}
            {inclusions.length === 0 && (
              <p className="text-[11px] text-slate-400 italic">No inclusions added yet.</p>
            )}
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400">
              Exclusions List
            </h3>
            <button
              type="button"
              onClick={addExclusionField}
              className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-[10px] uppercase tracking-wider rounded-xl transition-all"
            >
              ＋ Add Exclusion
            </button>
          </div>
          <div className="space-y-3">
            {exclusions.map((exc, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-[10px] font-bold text-slate-400 w-6">#{idx + 1}</span>
                <div className="flex-1 flex gap-2">
                  <select
                    value={DEFAULT_EXCLUSIONS.includes(exc) ? exc : "custom"}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        handleExclusionChange(idx, "");
                      } else {
                        handleExclusionChange(idx, e.target.value);
                      }
                    }}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-semibold focus:outline-none max-w-[200px]"
                  >
                    <option value="custom">✏️ Custom Text...</option>
                    {DEFAULT_EXCLUSIONS.map((opt, oIdx) => (
                      <option key={oIdx} value={opt}>
                        {opt.substring(0, 30)}...
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={exc}
                    onChange={(e) => handleExclusionChange(idx, e.target.value)}
                    placeholder="Enter exclusion details..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold focus:bg-white focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeExclusionField(idx)}
                  className="text-red-500 hover:text-red-700 font-extrabold text-sm px-1.5"
                >
                  ✕
                </button>
              </div>
            ))}
            {exclusions.length === 0 && (
              <p className="text-[11px] text-slate-400 italic">No exclusions added yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Block 5: Footnotes */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="font-heading font-black text-xs uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100">
          Footnotes / Important Notes
        </h3>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add important warning note..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:bg-white focus:border-amber-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={addNote}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
            >
              Add Note
            </button>
          </div>

          <div className="space-y-2">
            {notes.map((note, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-150">
                <span className="text-xs text-slate-600 font-semibold">{note}</span>
                <button
                  type="button"
                  onClick={() => removeNote(idx)}
                  className="text-red-500 hover:text-red-700 text-xs font-bold uppercase"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-extrabold uppercase text-xs tracking-wider py-4 rounded-xl shadow-md transition-all cursor-pointer"
        >
          {loading ? "Saving Itinerary..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
