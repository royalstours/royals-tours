"use client";

import { useEffect, useState } from "react";

interface BookingFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  submitLabel: string;
  loading: boolean;
}

const DEFAULT_INCLUSIONS = [
  "Hotel Accommodation in 3★/4★ Category Deluxe Rooms",
  "Daily Breakfast & Dinner prepared by special cooks team",
  "Sightseeing tours by luxury coach / traveler as per itinerary",
  "All local transport and point-to-point transfers",
  "Dedicated Tour Manager service throughout the journey",
  "Internal Line Permits processing and visa support",
  "Overseas travel medical insurance cover where applicable"
];

const DEFAULT_NOTES = [
  "Please carry original ID proofs (Passport / Election Card / Aadhaar Card) for local permit clearance.",
  "Check-in time is usually 02:00 PM | Check-out time is 11:00 AM.",
  "Itinerary details are subject to adjustments in case of landslides, blockages, or weather restrictions.",
  "Acclimatization day is mandatory at high altitudes (Ladakh/Leh). Avoid strenuous physical activities.",
  "Pure Vegetarian, Swaminarayan, and Jain food requirements are served fresh at our private catering departures."
];

export default function BookingForm({
  initialData,
  onSubmit,
  submitLabel,
  loading,
}: BookingFormProps) {
  const [bookingReference, setBookingReference] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  
  // Lead Traveler
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadEmail, setLeadEmail] = useState("");

  const [totalTravelers, setTotalTravelers] = useState("2 Adults");
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [duration, setDuration] = useState("");

  // Trip Details
  const [packageName, setPackageName] = useState("");
  const [hotelCategory, setHotelCategory] = useState("3 Star Comfort");
  const [tripTravelers, setTripTravelers] = useState("2 Adults");
  const [checkIn, setCheckIn] = useState("02:00 PM");
  const [checkOut, setCheckOut] = useState("11:00 AM");
  const [packageType, setPackageType] = useState("Domestic Veg Tour");
  const [travelStyle, setTravelStyle] = useState("Leisure / Group Departure");

  // Arrays
  const [inclusions, setInclusions] = useState<string[]>(DEFAULT_INCLUSIONS);
  const [newInclusion, setNewInclusion] = useState("");

  const [importantNotes, setImportantNotes] = useState<string[]>(DEFAULT_NOTES);
  const [newNote, setNewNote] = useState("");

  const [thankYouNote, setThankYouNote] = useState(
    "Your journey is confirmed with Royals Tours. Get ready to experience travel like royalty!"
  );

  // Contact Info overrides
  const [contactPhone, setContactPhone] = useState("+91 97238 20277");
  const [contactEmail, setContactEmail] = useState("royalstours.amd@gmail.com");
  const [contactWebsite, setContactWebsite] = useState("royaltoursahmedabad.com");
  const [contactInstagram, setContactInstagram] = useState("@royaltours_amd");

  useEffect(() => {
    if (initialData) {
      setBookingReference(initialData.bookingReference || "");
      if (initialData.bookingDate) {
        const d = new Date(initialData.bookingDate);
        setBookingDate(d.toISOString().split("T")[0]);
      }
      if (initialData.leadTraveler) {
        setLeadName(initialData.leadTraveler.name || "");
        setLeadPhone(initialData.leadTraveler.phone || "");
        setLeadEmail(initialData.leadTraveler.email || "");
      }
      setTotalTravelers(initialData.totalTravelers || "");
      setDestination(initialData.destination || "");
      setTravelDates(initialData.travelDates || "");
      setDuration(initialData.duration || "");

      if (initialData.tripDetails) {
        setPackageName(initialData.tripDetails.packageName || "");
        setHotelCategory(initialData.tripDetails.hotelCategory || "");
        setTripTravelers(initialData.tripDetails.travelers || "");
        setCheckIn(initialData.tripDetails.checkIn || "02:00 PM");
        setCheckOut(initialData.tripDetails.checkOut || "11:00 AM");
        setPackageType(initialData.tripDetails.packageType || "Domestic Veg Tour");
        setTravelStyle(initialData.tripDetails.travelStyle || "Leisure / Group Departure");
      }

      if (initialData.inclusions) setInclusions(initialData.inclusions);
      if (initialData.importantNotes) setImportantNotes(initialData.importantNotes);
      setThankYouNote(
        initialData.thankYouNote ||
          "Your journey is confirmed with Royals Tours. Get ready to experience travel like royalty!"
      );

      if (initialData.contactInfo) {
        setContactPhone(initialData.contactInfo.phone || "+91 97238 20277");
        setContactEmail(initialData.contactInfo.email || "royalstours.amd@gmail.com");
        setContactWebsite(initialData.contactInfo.website || "royaltoursahmedabad.com");
        setContactInstagram(initialData.contactInfo.instagram || "@royaltours_amd");
      }
    } else {
      // Default booking date to today
      setBookingDate(new Date().toISOString().split("T")[0]);
    }
  }, [initialData]);

  // Sync Travelers helper
  const handleLeadTravelersChange = (val: string) => {
    setTotalTravelers(val);
    setTripTravelers(val);
  };

  const handleAddInclusion = () => {
    if (newInclusion.trim()) {
      setInclusions([...inclusions, newInclusion.trim()]);
      setNewInclusion("");
    }
  };

  const handleRemoveInclusion = (idx: number) => {
    setInclusions(inclusions.filter((_, i) => i !== idx));
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setImportantNotes([...importantNotes, newNote.trim()]);
      setNewNote("");
    }
  };

  const handleRemoveNote = (idx: number) => {
    setImportantNotes(importantNotes.filter((_, i) => i !== idx));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      bookingReference: bookingReference.trim() || undefined,
      bookingDate: bookingDate ? new Date(bookingDate) : new Date(),
      leadTraveler: {
        name: leadName.trim(),
        phone: leadPhone.trim(),
        email: leadEmail.trim(),
      },
      totalTravelers: totalTravelers.trim(),
      destination: destination.trim(),
      travelDates: travelDates.trim(),
      duration: duration.trim(),
      inclusions,
      tripDetails: {
        packageName: packageName.trim(),
        hotelCategory: hotelCategory.trim(),
        travelers: tripTravelers.trim(),
        checkIn: checkIn.trim(),
        checkOut: checkOut.trim(),
        packageType: packageType.trim(),
        travelStyle: travelStyle.trim(),
      },
      importantNotes,
      thankYouNote: thankYouNote.trim(),
      contactInfo: {
        phone: contactPhone.trim(),
        email: contactEmail.trim(),
        website: contactWebsite.trim(),
        instagram: contactInstagram.trim(),
      },
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6 text-xs font-semibold text-slate-700">
      {/* Block 1: Booking Ref & Date */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Basic Booking Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Booking Reference (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. RT/2026/0001 (Leave blank to auto-generate)"
              value={bookingReference}
              onChange={(e) => setBookingReference(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Booking Date *
            </label>
            <input
              type="date"
              required
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Block 2: Lead Traveler */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Lead Traveler Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Traveler Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Patel"
              value={leadName}
              onChange={(e) => setLeadName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Contact Phone *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. +91 97238 20277"
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. ramesh@example.com"
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Block 3: Trip Details & Specs */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Trip Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Destination *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Srinagar, Gulmarg &amp; Pahalgam, Kashmir"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Travel Dates Range *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 15 May 2026 – 22 May 2026"
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Duration *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 7 Nights / 8 Days"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Total Travelers Text *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 2 Adults, 1 Child"
              value={totalTravelers}
              onChange={(e) => handleLeadTravelersChange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
            />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-2 space-y-4">
          <h4 className="font-heading font-bold text-xs uppercase text-slate-800">
            Trip Specifications Grid
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Package Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Royal Kashmir pure Veg Special Group Departure"
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Hotel Category *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 3 Star deluxe Comfort"
                value={hotelCategory}
                onChange={(e) => setHotelCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Trip Details Travelers *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2 Adults, 1 Child"
                value={tripTravelers}
                onChange={(e) => setTripTravelers(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Check-in Time *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 02:00 PM"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Check-out Time *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 11:00 AM"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Package Type *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Domestic Veg Tour"
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Travel Style *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Leisure / Group Departure"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 placeholder:text-slate-400 bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Block 4: Inclusions & Important Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
            Inclusions
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add an inclusion..."
              value={newInclusion}
              onChange={(e) => setNewInclusion(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddInclusion())}
            />
            <button
              type="button"
              onClick={handleAddInclusion}
              className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-4 rounded-xl cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {inclusions.map((inc, i) => (
              <li key={i} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-800">{inc}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveInclusion(i)}
                  className="text-rose-500 hover:text-rose-700 font-bold px-1.5 cursor-pointer text-sm"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Notes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
            Important Notes
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add an important note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddNote())}
            />
            <button
              type="button"
              onClick={handleAddNote}
              className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-4 rounded-xl cursor-pointer"
            >
              Add
            </button>
          </div>
          <ul className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
            {importantNotes.map((note, i) => (
              <li key={i} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[11px] text-slate-800">{note}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveNote(i)}
                  className="text-rose-500 hover:text-rose-700 font-bold px-1.5 cursor-pointer text-sm"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Block 5: Thank you & Contact Info Override */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Closing Details
        </h3>
        <div>
          <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
            Thank You Note (Cursive block text)
          </label>
          <textarea
            rows={2}
            value={thankYouNote}
            onChange={(e) => setThankYouNote(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 text-xs font-semibold text-slate-800 bg-white"
          />
        </div>

        <div className="border-t border-slate-100 pt-4 mt-2">
          <h4 className="font-heading font-bold text-xs uppercase text-slate-800 mb-2">
            Company Contact Info Override (Shown on PDF footer)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Footer Phone
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Footer Email
              </label>
              <input
                type="text"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Footer Website
              </label>
              <input
                type="text"
                value={contactWebsite}
                onChange={(e) => setContactWebsite(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                Footer Instagram
              </label>
              <input
                type="text"
                value={contactInstagram}
                onChange={(e) => setContactInstagram(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-850 text-white font-bold uppercase text-[10px] tracking-wider px-8 py-3.5 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Processing..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
