"use client";

import { useEffect, useState } from "react";

interface InvoiceFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  submitLabel: string;
  loading: boolean;
}

interface Booking {
  _id: string;
  bookingReference: string;
  bookingDate: string;
  leadTraveler: {
    name: string;
    phone: string;
    email: string;
  };
  totalTravelers: string;
  destination: string;
  travelDates: string;
  duration: string;
  inclusions: string[];
  tripDetails: {
    packageName: string;
    hotelCategory: string;
    travelers: string;
    checkIn: string;
    checkOut: string;
    packageType: string;
    travelStyle: string;
  };
  importantNotes: string[];
}

const DEFAULT_INVOICE_INCLUSIONS = [
  "Hotel Accommodation in 3★/4★ Category Deluxe Rooms",
  "Daily Breakfast & Dinner prepared by special cooks team",
  "Sightseeing tours by luxury coach / traveler as per itinerary",
  "All local transport and point-to-point transfers",
  "Dedicated Tour Manager service throughout the journey",
  "Internal Line Permits processing and visa support",
  "Overseas travel medical insurance cover where applicable"
];

const DEFAULT_INVOICE_NOTES = [
  "Please carry original ID proofs (Passport / Election Card / Aadhaar Card) for local permit clearance.",
  "Check-in time is usually 02:00 PM | Check-out time is 11:00 AM.",
  "Itinerary details are subject to adjustments in case of landslides, blockages, or weather restrictions.",
  "Pure Vegetarian, Swaminarayan, and Jain food requirements are served fresh at our private catering departures."
];

export default function InvoiceForm({
  initialData,
  onSubmit,
  submitLabel,
  loading,
}: InvoiceFormProps) {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  // Billed To
  const [billedName, setBilledName] = useState("");
  const [billedPhone, setBilledPhone] = useState("");
  const [billedEmail, setBilledEmail] = useState("");

  const [bookingReference, setBookingReference] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<"Confirmed" | "Pending" | "Paid" | "Partially Paid">("Confirmed");

  // Trip Details
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [duration, setDuration] = useState("");
  const [travelers, setTravelers] = useState("2 Adults");
  const [packageName, setPackageName] = useState("");
  const [hotelCategory, setHotelCategory] = useState("3 Star Comfort");

  // Items Table
  const [items, setItems] = useState<any[]>([
    { description: "Kashmir Group Tour Package (Twin Sharing)", qty: 2, unitPrice: 32500, amount: 65000 },
    { description: "Srinagar Shikara Ride &amp; Local Guides Charges", qty: 2, unitPrice: 1500, amount: 3000 }
  ]);

  // Summaries
  const [subtotal, setSubtotal] = useState(68000);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(68000);
  const [amountPaid, setAmountPaid] = useState(30000);
  const [balanceDue, setBalanceDue] = useState(38000);

  // Arrays
  const [inclusions, setInclusions] = useState<string[]>(DEFAULT_INVOICE_INCLUSIONS);
  const [newInclusion, setNewInclusion] = useState("");

  const [importantNotes, setImportantNotes] = useState<string[]>(DEFAULT_INVOICE_NOTES);
  const [newNote, setNewNote] = useState("");

  const [thankYouNote, setThankYouNote] = useState("Thank you for choosing Royals Tours. We look forward to traveling with you!");

  // Contact Info
  const [contactPhone, setContactPhone] = useState("+91 97238 20277");
  const [contactEmail, setContactEmail] = useState("royalstours.amd@gmail.com");
  const [contactWebsite, setContactWebsite] = useState("royaltoursahmedabad.com");
  const [contactInstagram, setContactInstagram] = useState("@royaltours_amd");

  // Bookings list for autofill
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState("");

  // Load Bookings for Autocomplete
  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetch("/api/booking-confirmations");
        if (res.ok) {
          const data = await res.json();
          setBookingsList(data);
        }
      } catch (err) {
        console.error("Failed to load bookings list for autofill:", err);
      }
    }
    loadBookings();
  }, []);

  // Autofill from Booking Confirmation Selection
  const handleAutofillSelect = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    if (!bookingId) return;

    const booking = bookingsList.find((b) => b._id === bookingId);
    if (booking) {
      setBilledName(booking.leadTraveler?.name || "");
      setBilledPhone(booking.leadTraveler?.phone || "");
      setBilledEmail(booking.leadTraveler?.email || "");
      setBookingReference(booking.bookingReference || "");
      
      setDestination(booking.destination || "");
      setTravelDates(booking.travelDates || "");
      setDuration(booking.duration || "");
      setTravelers(booking.totalTravelers || "2 Adults");

      if (booking.tripDetails) {
        setPackageName(booking.tripDetails.packageName || "");
        setHotelCategory(booking.tripDetails.hotelCategory || "");
      }

      if (booking.inclusions && booking.inclusions.length > 0) {
        setInclusions(booking.inclusions);
      }
      
      // Smart default invoice items
      const pkgName = booking.tripDetails?.packageName || "Tour Package";
      const totalPax = parseInt(booking.totalTravelers) || 2;

      setItems([
        {
          description: `${pkgName} Tour Package (${booking.duration || "Trip"})`,
          qty: totalPax,
          unitPrice: 32500,
          amount: totalPax * 32500,
        }
      ]);
    }
  };

  useEffect(() => {
    if (initialData) {
      setInvoiceNumber(initialData.invoiceNumber || "");
      if (initialData.invoiceDate) {
        const d = new Date(initialData.invoiceDate);
        setInvoiceDate(d.toISOString().split("T")[0]);
      }
      if (initialData.dueDate) {
        const d = new Date(initialData.dueDate);
        setDueDate(d.toISOString().split("T")[0]);
      }
      if (initialData.billedTo) {
        setBilledName(initialData.billedTo.name || "");
        setBilledPhone(initialData.billedTo.phone || "");
        setBilledEmail(initialData.billedTo.email || "");
      }
      setBookingReference(initialData.bookingReference || "");
      setPaymentStatus(initialData.paymentStatus || "Confirmed");

      if (initialData.tripDetails) {
        setDestination(initialData.tripDetails.destination || "");
        setTravelDates(initialData.tripDetails.travelDates || "");
        setDuration(initialData.tripDetails.duration || "");
        setTravelers(initialData.tripDetails.travelers || "");
        setPackageName(initialData.tripDetails.packageName || "");
        setHotelCategory(initialData.tripDetails.hotelCategory || "");
      }

      if (initialData.items) setItems(initialData.items);
      
      if (initialData.priceSummary) {
        setDiscount(initialData.priceSummary.discount || 0);
        setAmountPaid(initialData.priceSummary.amountPaid || 0);
      }

      if (initialData.inclusions) setInclusions(initialData.inclusions);
      if (initialData.importantNotes) setImportantNotes(initialData.importantNotes);
      setThankYouNote(initialData.thankYouNote || "Thank you for choosing Royals Tours. We look forward to traveling with you!");

      if (initialData.contactInfo) {
        setContactPhone(initialData.contactInfo.phone || "+91 97238 20277");
        setContactEmail(initialData.contactInfo.email || "royalstours.amd@gmail.com");
        setContactWebsite(initialData.contactInfo.website || "royaltoursahmedabad.com");
        setContactInstagram(initialData.contactInfo.instagram || "@royaltours_amd");
      }
    } else {
      setInvoiceDate(new Date().toISOString().split("T")[0]);
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
      setDueDate(thirtyDaysLater.toISOString().split("T")[0]);
    }
  }, [initialData]);

  // Handle items calculation
  useEffect(() => {
    const calcSubtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
    const calcTotalAmount = Math.max(0, calcSubtotal - Number(discount));
    const calcBalanceDue = Math.max(0, calcTotalAmount - Number(amountPaid));

    setSubtotal(calcSubtotal);
    setTotalAmount(calcTotalAmount);
    setBalanceDue(calcBalanceDue);
  }, [items, discount, amountPaid]);

  const handleItemChange = (idx: number, field: string, value: any) => {
    const updated = [...items];
    const row = { ...updated[idx] };

    if (field === "description") {
      row.description = value;
    } else if (field === "qty") {
      row.qty = Math.max(1, parseInt(value) || 0);
      row.amount = row.qty * (row.unitPrice || 0);
    } else if (field === "unitPrice") {
      row.unitPrice = Math.max(0, parseFloat(value) || 0);
      row.amount = (row.qty || 1) * row.unitPrice;
    }

    updated[idx] = row;
    setItems(updated);
  };

  const handleAddItemRow = () => {
    setItems([...items, { description: "", qty: 1, unitPrice: 0, amount: 0 }]);
  };

  const handleRemoveItemRow = (idx: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== idx));
    } else {
      alert("At least one line item is required.");
    }
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
      invoiceNumber: invoiceNumber.trim() || undefined,
      invoiceDate: invoiceDate ? new Date(invoiceDate) : new Date(),
      dueDate: dueDate ? new Date(dueDate) : new Date(),
      billedTo: {
        name: billedName.trim(),
        phone: billedPhone.trim(),
        email: billedEmail.trim(),
      },
      bookingReference: bookingReference.trim(),
      paymentStatus,
      tripDetails: {
        destination: destination.trim(),
        travelDates: travelDates.trim(),
        duration: duration.trim(),
        travelers: travelers.trim(),
        packageName: packageName.trim(),
        hotelCategory: hotelCategory.trim(),
      },
      items,
      priceSummary: {
        subtotal,
        discount: Number(discount),
        totalAmount,
        amountPaid: Number(amountPaid),
        balanceDue,
      },
      inclusions,
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
      
      {/* Autofill helper */}
      {!initialData && bookingsList.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl shadow-xs space-y-3">
          <h3 className="font-heading font-black text-xs uppercase text-amber-900 flex items-center gap-1.5">
            <span>⚡</span> Quick Autofill from Booking Confirmation
          </h3>
          <p className="text-[10px] text-amber-700">
            Select an existing customer booking to automatically load customer details, travel destinations, tour packages, durations, inclusions, and important notes.
          </p>
          <div className="max-w-md">
            <select
              value={selectedBookingId}
              onChange={(e) => handleAutofillSelect(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-amber-300 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="">-- Select Booking Confirmation --</option>
              {bookingsList.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.bookingReference} - {b.leadTraveler?.name} ({b.destination})
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Block 1: Invoice metadata */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Invoice Identification &amp; Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Invoice Number (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. INV/2026/0001 (Blank = Auto)"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Invoice Date *
            </label>
            <input
              type="date"
              required
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 bg-white text-xs font-semibold text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Payment Due Date *
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Payment Status *
            </label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white font-semibold text-xs font-semibold text-slate-800 cursor-pointer"
            >
              <option value="Confirmed">Confirmed (Paid / Approved)</option>
              <option value="Pending">Pending Payment</option>
              <option value="Paid">Paid Full</option>
              <option value="Partially Paid">Partially Paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Block 2: Billed To & Reference */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Billed To &amp; Booking Connection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Client Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Patel"
              value={billedName}
              onChange={(e) => setBilledName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Client Phone *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. +91 97238 20277"
              value={billedPhone}
              onChange={(e) => setBilledPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Client Email *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. ramesh@example.com"
              value={billedEmail}
              onChange={(e) => setBilledEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Booking Reference *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. RT/2026/0001"
              value={bookingReference}
              onChange={(e) => setBookingReference(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Block 3: Trip Details */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
          Trip Details Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Travelers *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 2 Adults"
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div>
            <label className="block text-slate-500 uppercase tracking-wider text-[10px] mb-1">
              Hotel Category *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 3 Star Comfort"
              value={hotelCategory}
              onChange={(e) => setHotelCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Block 4: Items Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="font-heading font-black text-sm uppercase text-slate-900">
            Invoice Line Items
          </h3>
          <button
            type="button"
            onClick={handleAddItemRow}
            className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-3 py-1.5 rounded-xl uppercase text-[9px] tracking-wider cursor-pointer"
          >
            ➕ Add Line Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-wider text-left border-b border-slate-100">
                <th className="py-2.5 px-3 w-12 text-center">#</th>
                <th className="py-2.5 px-3">Description *</th>
                <th className="py-2.5 px-3 w-20 text-center">Qty *</th>
                <th className="py-2.5 px-3 w-32 text-right">Unit Price (₹) *</th>
                <th className="py-2.5 px-3 w-32 text-right">Amount (₹)</th>
                <th className="py-2.5 px-3 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/40">
                  <td className="py-3 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kashmir Group Tour Package (Twin Sharing)"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none bg-white text-xs font-semibold text-slate-800"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      required
                      min={1}
                      value={item.qty}
                      onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-center bg-white text-xs font-semibold text-slate-800"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="number"
                      required
                      min={0}
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none text-right font-mono bg-white text-xs font-semibold text-slate-800"
                    />
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-800 text-xs font-bold">
                    ₹ {Number(item.amount || 0).toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveItemRow(idx)}
                      className="text-rose-650 hover:text-rose-550 font-bold cursor-pointer text-sm"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pricing calculations summary */}
        <div className="border-t border-slate-100 pt-4 flex flex-col md:items-end gap-3 font-semibold text-xs text-slate-600">
          <div className="flex justify-between md:justify-start gap-12 w-full md:w-80">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">SUBTOTAL</span>
            <span className="font-mono text-slate-900 font-bold ml-auto">
              ₹ {subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between md:justify-start items-center gap-12 w-full md:w-80">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">DISCOUNT (₹)</span>
            <input
              type="number"
              min={0}
              value={discount}
              onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-32 px-3 py-1 rounded-lg border border-slate-200 text-right font-mono font-bold focus:outline-none ml-auto bg-white text-xs font-semibold text-slate-800"
            />
          </div>
          <div className="flex justify-between md:justify-start gap-12 w-full md:w-80 border-t border-slate-100 pt-2 text-orange-600 font-black">
            <span className="text-[10px] font-black uppercase tracking-wider">TOTAL AMOUNT</span>
            <span className="font-mono text-lg ml-auto">
              ₹ {totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between md:justify-start items-center gap-12 w-full md:w-80">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">AMOUNT PAID (₹)</span>
            <input
              type="number"
              min={0}
              value={amountPaid}
              onChange={(e) => setAmountPaid(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-32 px-3 py-1 rounded-lg border border-slate-200 text-right font-mono font-bold focus:outline-none ml-auto bg-white text-xs font-semibold text-slate-800"
            />
          </div>
          <div className="flex justify-between md:justify-start gap-12 w-full md:w-80 border-t border-slate-100 pt-2 text-slate-900 font-black">
            <span className="text-[10px] font-black uppercase tracking-wider">BALANCE DUE</span>
            <span className="font-mono ml-auto">
              ₹ {balanceDue.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Block 5: Inclusions & Important Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inclusions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-heading font-black text-sm uppercase text-slate-900 border-b border-slate-100 pb-2">
            Package Inclusions
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add an inclusion..."
              value={newInclusion}
              onChange={(e) => setNewInclusion(e.target.value)}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs font-semibold text-slate-800 bg-white"
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
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs font-semibold text-slate-800 bg-white"
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

      {/* Block 6: Thank you & Contact Info Override */}
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
            className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none text-xs font-semibold text-slate-800 bg-white"
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
