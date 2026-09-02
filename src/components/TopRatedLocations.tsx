"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface LocationItem {
  name: string;
  image: string;
  link?: string;
  inquiryName?: string;
}

interface TopRatedLocationsProps {
  onOpenInquiry: (destination?: string) => void;
}

export default function TopRatedLocations({ onOpenInquiry }: TopRatedLocationsProps) {
  const fallbackLocations: LocationItem[] = [
    {
      name: "Kashmir",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788345706/royal_tours/gqxmvyfov40ophksdkps.jpg",
      link: "/destinations/6a92c2c54532c1a150d79d07",
    },
    {
      name: "Bali, Indonesia",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346941/royal_tours/c1s0arfevzlz4u0wjmku.jpg",
      link: "/destinations/6a92c2c64532c1a150d79d16",
    },
    {
      name: "Chardham Yatra",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346058/royal_tours/xfujwsgtlhld5jpoax8l.jpg",
      link: "/destinations/6a92c2c54532c1a150d79d0c",
    },
    {
      name: "Vietnam Wonders",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346549/royal_tours/qrus47f3346wx95d8sq3.jpg",
      link: "/destinations/6a92c2c64532c1a150d79d1f",
    },
    {
      name: "Leh Ladakh",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788345911/royal_tours/ylhnizryd3epq123nrfi.jpg",
      link: "/destinations/6a92c2c54532c1a150d79d09",
    },
    {
      name: "Goa Getaway",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346449/royal_tours/iqptdowfqffgyn3lthnb.jpg",
      link: "/destinations/6a92c2c64532c1a150d79d0f",
    },
    {
      name: "Royals Kerala",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788344708/royal_tours/jh1v9vcr4xje8nfdyohq.jpg",
      link: "/destinations/6a92c2c54532c1a150d79d02",
    },
    {
      name: "Singapore & Cruise",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346326/royal_tours/ukvhibhfzfvhc5id0qoj.jpg",
      link: "/destinations/6a92c2c64532c1a150d79d1d",
    },
    {
      name: "Bhutan Himalayan",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346630/royal_tours/d504lq0shjnolodtpe9e.jpg",
      link: "/destinations/6a92c2c64532c1a150d79d10",
    },
    {
      name: "Assam & Meghalaya",
      image: "https://res.cloudinary.com/dgb6durda/image/upload/v1788346732/royal_tours/rhfn5lkqm2astvotchkr.jpg",
      link: "/destinations/6a92c2c64532c1a150d79d11",
    },
  ];

  const [locations, setLocations] = useState<LocationItem[]>(fallbackLocations);

  useEffect(() => {
    async function loadLocations() {
      try {
        const res = await fetch("/api/top-locations");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setLocations(data);
          }
        }
      } catch (err) {
        console.error("Failed to load top rated locations, using fallback.", err);
      }
    }
    loadLocations();
  }, []);

  // We arrange the list such that in a grid-flow-col container:
  // Column 1: Meghalaya, Azerbaijan
  // Column 2: Uttar Pradesh, Bhutan
  // Column 3: Rajasthan, Cambodia
  // Column 4: Leh-Ladakh, Dubai
  // Column 5: Karnataka, Indonesia
  // The locations array above is already defined in this sequence!

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Best Top Rated Locations
          </h2>
          <div className="w-12 h-1 bg-amber-500 rounded mt-2.5"></div>
        </div>

        {/* Circular Grid Container */}
        <div className="relative">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-x-2 sm:gap-x-6 gap-y-6 justify-center justify-items-center pb-4 pt-2">
            {locations.map((loc, index) => {
              const content = (
                <div className="flex flex-col items-center group cursor-pointer">
                  {/* Circular Image wrapper with micro-animations */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-slate-200/80 shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:border-amber-500 group-hover:shadow-md">
                    <Image
                      src={loc.image}
                      alt={loc.name}
                      fill
                      sizes="(max-width: 640px) 80px, 96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Dark gradient overlay on hover */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Label */}
                  <span className="mt-3 text-center text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors leading-tight font-heading px-1">
                    {loc.name}
                  </span>
                </div>
              );

              if (loc.link) {
                return (
                  <Link href={loc.link} key={index} className="no-underline">
                    {content}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={() => onOpenInquiry(loc.inquiryName || loc.name)}
                  className="bg-transparent border-0 p-0 m-0 focus:outline-none w-full text-center flex justify-center font-normal"
                >
                  {content}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
