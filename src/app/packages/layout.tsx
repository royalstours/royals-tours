import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Packages Catalog | Domestic & International Holidays",
  description:
    "Explore customizable domestic and international holiday tour packages by Royals Tours Ahmedabad. Pure veg group departures, honeymoon specials, and family holiday tours.",
  keywords: [
    "Tour Packages",
    "Holiday Packages Ahmedabad",
    "Domestic Tour Packages",
    "International Holiday Packages",
    "Pure Veg Tour Packages",
    "Jain Group Departures",
    "Ahmedabad Tour Operator",
    "Customized Itineraries",
  ],
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Tour Packages Catalog | Royals Tours Ahmedabad",
    description:
      "Handpicked customizable international getaways and special domestic journeys with pure veg catering.",
    url: "/packages",
  },
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
