"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

export default function TermsAndConditionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenInquiry={() => setIsModalOpen(true)} />

      {/* Page Header */}
      <section className="relative pt-32 pb-16 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-heading font-bold text-amber-400 tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block mb-4">
            LEGAL TRANSPARENCY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Terms &amp; <span className="text-amber-500">Conditions</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 font-sans">
            Last Updated: July 2026 • Please read these terms carefully before booking your trip with Explore and Unite.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              1. Acceptance of Terms &amp; Contract Formation
            </h2>
            <p>
              By paying a deposit or full payment for any tour package, international group departure, custom itinerary, or weekend trek organized by <strong>Explore and Unite</strong>, you agree to be bound by these Terms and Conditions. The contract becomes binding once we issue a booking confirmation voucher.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              2. Booking &amp; Payment Schedule
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Initial Deposit:</strong> A minimum 30% advance deposit per person is required to confirm your booking for international group departures and custom packages.</li>
              <li><strong>Balance Payment:</strong> The remaining 70% balance must be cleared at least 15 days prior to the date of departure.</li>
              <li><strong>Late Payments:</strong> Failure to clear final payments within the specified timeframe may result in cancellation of your booking without refund.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              3. Cancellation &amp; Refund Policy
            </h2>
            <p>
              Cancellation requests must be submitted in writing via email to <code>royalstours.amd@gmail.com</code>. The refund schedule is structured as follows:
            </p>

            <div className="overflow-x-auto my-4">
              <table className="w-full text-left border-collapse border border-slate-200 text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-heading">
                    <th className="p-3 border border-slate-700">Cancellation Timeframe</th>
                    <th className="p-3 border border-slate-700">Refund Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="p-3 font-semibold">30 days or more before departure</td>
                    <td className="p-3 text-emerald-600 font-bold">80% refund (or 100% credit voucher)</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-3 font-semibold">15 to 29 days before departure</td>
                    <td className="p-3 text-amber-600 font-bold">50% refund</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <td className="p-3 font-semibold">0 to 14 days before departure / No Show</td>
                    <td className="p-3 text-rose-600 font-bold">Non-refundable (0% refund)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              4. Passports, Visas &amp; Health Regulations
            </h2>
            <p>
              It is the sole responsibility of the traveler to ensure their passport possesses at least 6 months validity from the date of return. Royals Tours provides administrative visa guidance, but final visa issuance rests strictly with embassy authorities. Royals Tours is not liable for visa rejections by immigration authorities.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              5. Travel Insurance &amp; Liability Disclaimers
            </h2>
            <p>
              Comprehensive travel insurance covering medical expenses, baggage loss, flight delays, and emergency evacuation is strongly recommended for all international journeys. Royals Tours will not be held responsible for unforeseen disruptions caused by natural disasters, strikes, political instability, or airline schedule changes (Force Majeure).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              6. Group Code of Conduct &amp; Safety
            </h2>
            <p>
              Travelers are expected to maintain respectful behavior toward fellow trip members, local communities, and trip leaders. Royals Tours reserves the right to terminate participation of any traveler engaging in disruptive or illegal behavior without refund.
            </p>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center space-y-2 mt-8">
            <h3 className="font-bold text-base font-heading text-amber-400">Questions Regarding Terms?</h3>
            <p className="text-xs text-slate-300">
              For any clarification regarding our booking contract or policies, write to us at <code>royalstours.amd@gmail.com</code> or call +91 97238 20277.
            </p>
          </div>

        </div>
      </section>

      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </div>
  );
}
