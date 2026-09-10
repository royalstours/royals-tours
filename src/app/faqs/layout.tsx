import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Travel FAQs & Booking Info",
  description:
    "Find answers to frequently asked questions about Royals Tours booking policies, pure veg & Jain catering, visa requirements, tour inclusions, and payment options.",
  keywords: [
    "Royals Tours FAQs",
    "Travel FAQs",
    "Veg Tour Kitchen FAQs",
    "Booking Cancellation Policy",
    "Tour Questions Ahmedabad",
  ],
  alternates: {
    canonical: "/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions | Royals Tours",
    description:
      "Everything you need to know about our pure veg catering, customized packages, and booking policies.",
    url: "/faqs",
  },
};

export default function FaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
