import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Royals Tours | Heritage of Trusted Travel Organization",
  description:
    "Learn about Royals Tours Ahmedabad, our story, values, and signature domestic pure veg & Jain group departures accompanied by our private kitchen staff.",
  keywords: [
    "About Royals Tours",
    "Royals Tours Ahmedabad",
    "Pure Veg Tour Operator Gujarat",
    "Jain Catering Tour Company",
    "Ahmedabad Tour Organizers",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Royals Tours | Heritage of Trusted Travel Organization",
    description:
      "Crafting majestic travel memories. Pure veg group departures with private cooks, personalized service, and curated itineraries.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
