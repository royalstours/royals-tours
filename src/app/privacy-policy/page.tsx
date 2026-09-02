"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InquiryModal from "@/components/InquiryModal";

export default function PrivacyPolicyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800">
      <Navbar onOpenInquiry={() => setIsModalOpen(true)} />

      {/* Page Header */}
      <section className="relative pt-32 pb-16 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-heading font-bold text-amber-400 tracking-widest bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full inline-block mb-4">
            DATA PROTECTION
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight">
            Privacy <span className="text-amber-500">Policy</span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-slate-300 font-sans">
            Last Updated: July 2026 • Your privacy and personal data security are paramount at Explore and Unite.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-slate-700 text-sm leading-relaxed">
          
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              1. Introduction
            </h2>
            <p>
              This Privacy Policy explains how <strong>Explore and Unite</strong> collects, uses, protects, and discloses personal information obtained from travelers when visiting our website, submitting booking inquiry forms, or communicating with our travel counselors.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              2. Information We Collect
            </h2>
            <p>We may collect the following personal information when you interact with us:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> Full name, email address, phone number, and WhatsApp contact details.</li>
              <li><strong>Travel Details:</strong> Destination preferences, preferred dates, dietary restrictions, emergency contact details.</li>
              <li><strong>Documentation (For Bookings):</strong> Passport copies, flight tickets, and visa application data required for international group arrangements.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information gathered via website cookies for performance optimization.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              3. How We Use Your Information
            </h2>
            <p>We utilize your personal information strictly for legitimate travel operational purposes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Processing and confirming your tour package or group departure reservations.</li>
              <li>Coordinating hotel reservations, flight ticketing, local transfers, and visa processing.</li>
              <li>Sending itinerary updates, trip captain contact details, and emergency notifications.</li>
              <li>Sending optional newsletter updates regarding upcoming group departure discounts (you can unsubscribe anytime).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              4. Data Sharing &amp; Third-Party Partners
            </h2>
            <p>
              We do <strong>NOT</strong> sell, rent, or trade your personal information to third-party marketing companies. We only share necessary data with trusted travel partners (airline carriers, hotel providers, government visa embassies, and local transport operators) solely required to fulfill your travel itinerary.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              5. Data Security &amp; Retention
            </h2>
            <p>
              We employ SSL encryption, secure data servers, and restricted internal administrative access to safeguard your personal data from unauthorized access or disclosure. We retain personal booking data only for as long as necessary to comply with tax and legal requirements.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold font-heading text-slate-900 border-b border-amber-500/30 pb-2">
              6. Your Privacy Rights
            </h2>
            <p>
              You have the right to request access to the personal data we hold about you, request corrections, or ask for deletion of your personal contact data from our marketing communications at any time.
            </p>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center space-y-2 mt-8">
            <h3 className="font-bold text-base font-heading text-amber-400">Privacy Inquiries</h3>
            <p className="text-xs text-slate-300">
              If you have any questions or data requests concerning our Privacy Policy, please contact our Data Privacy officer at <code>royalstours.amd@gmail.com</code>.
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
