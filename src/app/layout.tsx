import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, Caveat } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Royals Tours | Luxury Travel & Pure Veg Group Departures",
  description: "Crafting majestic travel memories. Pure Veg & Jain catering kitchen departures, customized holiday packages, flights, visas, and cruise bookings worldwide.",
  icons: {
    icon: "/royal_tours_icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${outfit.variable} ${caveat.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen text-slate-800 bg-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
