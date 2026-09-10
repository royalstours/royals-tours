import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Plan Your Journey with Royals Tours",
  description:
    "Get in touch with Royals Tours Ahmedabad. Visit our CG Road office or contact our helpline for booking assistance, custom holiday quotes, and group departures.",
  keywords: [
    "Contact Royals Tours",
    "Royals Tours CG Road Address",
    "Royals Tours Contact Number",
    "Ahmedabad Travel Agency Phone",
    "Tour Inquiry Ahmedabad",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Royals Tours | Office & Helplines",
    description:
      "Connect with our travel specialists in Ahmedabad to plan your next family vacation or group holiday.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
