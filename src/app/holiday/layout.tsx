import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holiday Packages & Veg Group Tours | Royals Tours",
  description:
    "Discover curated holiday packages with Royals Tours Ahmedabad. Specializing in pure vegetarian domestic journeys with private kitchen cooks and international holiday escapes.",
  keywords: [
    "Holiday Packages",
    "Holiday Tours Ahmedabad",
    "Veg Group Tours",
    "Pure Veg Holidays",
    "Domestic Holiday Packages",
    "International Holidays",
    "Ahmedabad Travel Agency",
  ],
  alternates: {
    canonical: "/holiday",
  },
  openGraph: {
    title: "Holiday Packages & Veg Group Tours | Royals Tours",
    description:
      "Curated holiday getaways and pure vegetarian group departures with private cooks across top destinations worldwide.",
    url: "/holiday",
  },
};

export default function HolidayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
