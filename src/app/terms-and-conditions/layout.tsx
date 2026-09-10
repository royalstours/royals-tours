import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Royals Tours",
  description:
    "Booking terms, payment schedules, and cancellation policies of Royals Tours Ahmedabad.",
  alternates: {
    canonical: "/terms-and-conditions",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
