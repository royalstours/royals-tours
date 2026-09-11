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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.royalstours.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Royals Tours | Luxury Travel, Pure Veg Group Tours & Holiday Packages",
    template: "%s | Royals Tours Ahmedabad",
  },
  description:
    "Royals Tours Ahmedabad is Gujarat's premier travel agency specializing in domestic pure veg & Jain group tours with private Maharaj kitchen cooks, customized international holiday packages, flight bookings, tourist visas, and cruises.",
  keywords: [
    "Royals Tours",
    "Royals Tours Ahmedabad",
    "Royals Tours CG Road",
    "Royals Tours Navrangpura",
    "Royals Tours Gujarat",
    "Pure Veg Tour Packages",
    "Jain Tour Packages Ahmedabad",
    "Swaminarayan Food Tour Packages",
    "Tour with Maharaj Kitchen Gujarat",
    "Pure Veg Group Departures India",
    "Jain Friendly International Holidays",
    "Pure Vegetarian Holiday Tours",
    "Veg Kitchen Tour Operator Ahmedabad",
    "Kashmir Tour Packages from Ahmedabad",
    "Leh Ladakh Group Tour",
    "Kerala Tour Package Pure Veg",
    "Chardham Yatra Pure Veg Ahmedabad",
    "Himachal Tour Packages",
    "Sikkim Darjeeling Gangtok Tour",
    "Andaman Tour Packages",
    "Golden Triangle Tour India",
    "Goa Holiday Packages",
    "Uttarakhand Tour Packages",
    "Rajasthan Heritage Tours",
    "Dubai Tour Packages from Ahmedabad",
    "Bali Tour Packages Pure Veg",
    "Vietnam Holiday Packages",
    "Thailand Tour Packages from Ahmedabad",
    "Europe Group Tour Pure Veg",
    "Singapore Malaysia Cruise Tour",
    "Maldives Honeymoon Packages",
    "Baku Azerbaijan Tour Packages",
    "Almaty Kazakhstan Tours",
    "Switzerland Paris Tour Packages",
    "Travel Agency in Ahmedabad",
    "Best Tour Operator in Ahmedabad",
    "Tour and Travel Agent CG Road",
    "Customized Holiday Packages",
    "Fixed Departure Group Tours",
    "Flight Ticket Booking Ahmedabad",
    "Tourist Visa Assistance Ahmedabad",
    "Cruise Booking Agent Ahmedabad",
    "Corporate Travel Packages Gujarat",
    "Family Vacation Packages",
  ],
  authors: [{ name: "Royals Tours", url: siteUrl }],
  creator: "Royals Tours",
  publisher: "Royals Tours",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Royals Tours",
    title: "Royals Tours | Pure Veg Group Tours & Customized Holiday Packages",
    description:
      "Crafting majestic travel memories. Ahmedabad's trusted tour operator specializing in domestic pure veg group departures with private cooks & international holidays.",
    images: [
      {
        url: "/website-logo.webp",
        width: 1200,
        height: 630,
        alt: "Royals Tours - Majestic Journeys & Memories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Royals Tours | Pure Veg & Jain Tour Packages Ahmedabad",
    description:
      "Domestic pure veg group tours with private kitchen Maharaj cooks and customized international holiday packages.",
    images: ["/website-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${siteUrl}/#agency`,
      "name": "Royals Tours",
      "image": `${siteUrl}/website-logo.webp`,
      "logo": `${siteUrl}/website-logo.webp`,
      "url": siteUrl,
      "telephone": "+919723820277",
      "email": "royalstours.amd@gmail.com",
      "priceRange": "₹₹₹",
      "currenciesAccepted": "INR, USD, EUR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer, UPI",
      "address": {
        "@type": "PostalAddress",
        "streetAddress":
          "Office No. 456, M/7, Second Floor, Chandan Complex, Above Mirch Masala, Opp. Femina Town, Swastik Cross Road, C.G. Road, Navrangpura",
        "addressLocality": "Ahmedabad",
        "addressRegion": "Gujarat",
        "postalCode": "380009",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 23.0368,
        "longitude": 72.5615,
      },
      "hasMap": "https://maps.app.goo.gl/j6B38M5stnRt5kae7",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          "opens": "10:00",
          "closes": "19:30",
        },
      ],
      "sameAs": ["https://maps.app.goo.gl/j6B38M5stnRt5kae7"],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Gujarat" },
        { "@type": "Country", "name": "India" },
      ],
      "knowsAbout": [
        "Pure Veg Domestic Group Tours with Private Kitchen Cooks",
        "Jain Tour Packages",
        "Customized International Holidays",
        "Flight Booking",
        "Visa Assistance",
        "Cruise Booking",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": "Royals Tours",
      "description":
        "Luxury Travel, Pure Veg Group Tours & Customized International Holidays",
      "publisher": { "@id": `${siteUrl}/#agency` },
    },
  ],
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#f97316" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen text-slate-800 bg-slate-50 font-sans">
        {children}
      </body>
    </html>
  );
}
