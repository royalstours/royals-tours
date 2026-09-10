import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Travel Services | Flights, Visas, Cruises & Custom Holidays",
  description:
    "Comprehensive end-to-end travel services by Royals Tours Ahmedabad: flight booking, tourist visa assistance, pure veg domestic group tours, luxury cruise bookings, and customized itineraries.",
  keywords: [
    "Travel Services Ahmedabad",
    "Flight Ticket Booking Ahmedabad",
    "Tourist Visa Assistance Ahmedabad",
    "Cruise Booking Agent Gujarat",
    "Custom Tour Planning Ahmedabad",
    "Hotel Booking Assistance",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Travel Services | Flights, Visas & Tours | Royals Tours",
    description:
      "From ticketing and visas to kitchen-supported group departures, discover end-to-end travel assistance by Royals Tours.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
