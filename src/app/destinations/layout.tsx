import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixed Departures & Top Travel Destinations | Royals Tours",
  description:
    "Browse scheduled pure veg group departures and top domestic and international destinations from Ahmedabad. Leh Ladakh, Kashmir, Chardham, Kerala, Bali, Dubai, and more.",
  keywords: [
    "Fixed Departures Ahmedabad",
    "Pure Veg Group Departures",
    "Kashmir Fixed Departure",
    "Leh Ladakh Group Tour",
    "Kerala Veg Tour",
    "Chardham Yatra Ahmedabad",
    "Special Departures",
  ],
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Fixed Departures & Destinations | Royals Tours",
    description:
      "Join scheduled pure veg departures with dedicated private kitchen cooks preparing Gujarati, Swaminarayan, and Jain meals.",
    url: "/destinations",
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
