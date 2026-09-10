import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Gallery & Travel Memories | Royals Tours",
  description:
    "Browse photo and video memories from our delighted travelers on domestic pure veg group departures and international holidays with Royals Tours.",
  keywords: [
    "Royals Tours Gallery",
    "Tour Photos",
    "Travel Memories",
    "Pure Veg Tour Photos",
    "Travel Visuals Ahmedabad",
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Tour Gallery & Travel Memories | Royals Tours",
    description:
      "Captured moments of joy, scenic beauty, and authentic vegetarian hospitality from our tours.",
    url: "/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
