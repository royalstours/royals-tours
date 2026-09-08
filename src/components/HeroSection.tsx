"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

export interface HeroMediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
}

function HeroVideoItem({
  src,
  poster,
  isActive,
}: {
  src: string;
  poster?: string;
  isActive: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce DOM property muted = true to satisfy browser Autoplay policies
    video.muted = true;

    if (isActive && video.offsetParent !== null) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay prevented by browser policy/low power mode
        });
      }
    } else {
      video.pause();
    }
  }, [isActive, src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 w-full h-full object-cover"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export const DEFAULT_HERO_MEDIA: HeroMediaItem[] = [
  {
    id: "hero-4",
    type: "video",
    src: "/hero-video-1.mp4",
    poster: "https://images.unsplash.com/photo-1552083875-02448c24722e?q=80&w=2070",
    alt: "Ocean Horizon & Coastal Wonders",
    badge: "Coastal Escapes",
    title: "Turquoise Waters & Sunset Cruises",
    subtitle: "Immerse yourself in tropical paradises around the globe",
  },
  {
    id: "hero-2",
    type: "image",
    src: "/hero-2.jpg",
    alt: "Explore and Unite Travel Experience",
    badge: "Explore The World",
    title: "Unforgettable Group Journeys",
    subtitle: "Handcrafted travel experiences for passionate adventurers",
  },
  {
    id: "hero-5",
    type: "video",
    src: "https://vjs.zencdn.net/v/oceans.mp4",
    poster: "https://images.unsplash.com/photo-1552083875-02448c24722e?q=80&w=2070",
    alt: "Ocean Horizon & Coastal Wonders",
    badge: "Coastal Escapes",
    title: "Turquoise Waters & Sunset Cruises",
    subtitle: "Immerse yourself in tropical paradises around the globe",
  },
  {
    id: "hero-3",
    type: "image",
    src: "/hero-3.jpg",
    alt: "Explore and Unite Travel Experience",
    badge: "Explore The World",
    title: "Unforgettable Group Journeys",
    subtitle: "Handcrafted travel experiences for passionate adventurers",
  },
  {
    id: "hero-1",
    type: "image",
    src: "/hero-1.jpeg",
    alt: "Explore and Unite Travel Experience",
    badge: "Explore The World",
    title: "Unforgettable Group Journeys",
    subtitle: "Handcrafted travel experiences for passionate adventurers",
  },
];

interface HeroSectionProps {
  mediaItems?: HeroMediaItem[];
  openInquiryModal?: (destination?: string) => void;
  autoSwipeInterval?: number; // default 5000ms
}

export default function HeroSection({
  mediaItems = DEFAULT_HERO_MEDIA,
  openInquiryModal,
  autoSwipeInterval = 7000,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch Swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = mediaItems.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-swipe functionality
  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const intervalId = setInterval(nextSlide, autoSwipeInterval);
    return () => clearInterval(intervalId);
  }, [nextSlide, isPaused, autoSwipeInterval, totalSlides]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum swipe distance

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentMedia = mediaItems[currentIndex] || mediaItems[0];

  return (
    /* ==========================================
        MEDIA CAROUSEL SLIDER (Horizontal Track)
        ========================================== */
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-20 select-none overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {mediaItems.map((item, idx) => (
            <div
              key={item.id || idx}
              className="relative min-w-full w-full h-full flex-shrink-0"
            >
              {item.type === "video" ? (
                <>
                  {item.mobileSrc ? (
                    <>
                      {/* Desktop Video */}
                      <div className="hidden sm:block w-full h-full absolute inset-0">
                        <HeroVideoItem
                          src={item.src}
                          poster={item.poster}
                          isActive={idx === currentIndex}
                        />
                      </div>
                      {/* Mobile Video */}
                      <div className="block sm:hidden w-full h-full absolute inset-0">
                        <HeroVideoItem
                          src={item.mobileSrc}
                          poster={item.mobilePoster || item.poster}
                          isActive={idx === currentIndex}
                        />
                      </div>
                    </>
                  ) : (
                    <HeroVideoItem
                      src={item.src}
                      poster={item.poster}
                      isActive={idx === currentIndex}
                    />
                  )}
                </>
              ) : (
                <>
                  {item.mobileSrc ? (
                    <>
                      {/* Desktop Image */}
                      <div className="hidden sm:block w-full h-full absolute inset-0">
                        <Image
                          src={item.src}
                          alt={item.alt || "Hero background media"}
                          fill
                          priority={idx === 0}
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                      {/* Mobile Image */}
                      <div className="block sm:hidden w-full h-full absolute inset-0">
                        <Image
                          src={item.mobileSrc}
                          alt={item.alt || "Hero background media"}
                          fill
                          priority={idx === 0}
                          className="object-cover"
                          sizes="100vw"
                        />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt || "Hero background media"}
                      fill
                      priority={idx === 0}
                      className="object-cover"
                      sizes="100vw"
                    />
                  )}
                </>
              )}

              {/* Ambient Overlay Gradient for High Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/30 z-10" />
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          LEFT & RIGHT NAVIGATION ARROWS
          ========================================== */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center bg-white/20 hover:bg-orange-500 text-white backdrop-blur-md border border-white/30 hover:border-orange-400 transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer group"
          >
            <svg
              className="w-6 h-6 transform group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center bg-white/20 hover:bg-orange-500 text-white backdrop-blur-md border border-white/30 hover:border-orange-400 transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer group"
          >
            <svg
              className="w-6 h-6 transform group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* ==========================================
          HERO MAIN CONTENT
          ========================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white flex flex-col items-center">

        {/* Optional Media Badge */}
        {currentMedia && currentMedia.badge && (
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/30 border border-orange-400/60 text-orange-200 text-xs sm:text-sm font-heading font-semibold tracking-wider uppercase backdrop-blur-md animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
            {currentMedia.badge}
          </div>
        )}

        {/* HEADLINE: Dynamic Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none max-w-5xl text-center uppercase text-white font-heading font-black">
          {currentMedia && currentMedia.title ? (
            currentMedia.title
          ) : (
            <>
              <span className="gradient-text font-script text-5xl sm:text-7xl lg:text-8xl lowercase block mb-2 font-normal normal-case">royals tours</span>
              MAJESTIC JOURNEYS
            </>
          )}
        </h1>

        {/* Subtitle / Dynamic Description */}
        <p className="mt-6 text-sm sm:text-base text-slate-100 max-w-2xl font-semibold leading-relaxed drop-shadow-sm">
          {currentMedia && currentMedia.subtitle ? currentMedia.subtitle : "Curated domestic pure veg departures & custom international holiday escapes."}
        </p>

        {/* CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center w-full max-w-md">
          <a
            href="#featured-packages"
            className="gradient-btn px-8 py-4 rounded-full font-heading font-semibold text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg w-full sm:w-auto text-white"
          >
            Explore Packages
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <button
            onClick={() => openInquiryModal?.("")}
            className="gradient-btn-outline px-8 py-4 rounded-full font-heading font-semibold text-center border-2 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto bg-white/15 text-white backdrop-blur-md hover:bg-orange-500/30 transition-colors shadow-md"
          >
            Enquire Now
            <svg
              className="w-5 h-5 transform rotate-45"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 00.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ==========================================
          PAGINATION DOTS (INSIDE HERO SLIDER)
          ========================================== */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 z-20 left-0 right-0 flex justify-center items-center gap-2 sm:gap-3">
          {mediaItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id || idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.alt}`}
                className={`group relative h-2.5 sm:h-3 rounded-full transition-all duration-500 cursor-pointer overflow-hidden ${
                  isActive
                    ? "w-8 sm:w-10 bg-amber-400 ring-2 ring-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                    : "w-2.5 sm:w-3 bg-white/40 hover:bg-white/80"
                }`}
              >
                {/* Active Progress Bar Timer */}
                {isActive && !isPaused && (
                  <span
                    key={`timer-${currentIndex}`}
                    className="absolute inset-0 bg-amber-200/40 origin-left animate-progress"
                    style={{
                      animationDuration: `${autoSwipeInterval}ms`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
