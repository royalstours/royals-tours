"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

function HighlightVideoItem({
  src,
  poster,
  isActive,
  className,
}: {
  src: string;
  poster?: string;
  isActive: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    if (isActive && video.offsetParent !== null) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
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
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}

export interface HighlightCardItem {
  _id?: string;
  id?: string;
  type: "image" | "video";
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  alt: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface TrustHighlightsSliderProps {
  highlightCards?: HighlightCardItem[];
  autoSwipeInterval?: number; // default 6000ms
}

const FALLBACK_SLIDES: HighlightCardItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    alt: "Majestic mountain peaks represent exploration",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    alt: "Tropical sandy shore represent group leisure beach trip",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1920&q=80",
    alt: "Ancient historic structure represent global cultural site tour",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1920&q=80",
    alt: "Group camping bonfire night represent community connection",
  },
];

export default function TrustHighlightsSlider({
  highlightCards = [],
  autoSwipeInterval = 6000,
}: TrustHighlightsSliderProps) {
  const activeSlides = highlightCards.length > 0 ? highlightCards : FALLBACK_SLIDES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe gesture state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const totalSlides = activeSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const intervalId = setInterval(nextSlide, autoSwipeInterval);
    return () => clearInterval(intervalId);
  }, [nextSlide, isPaused, autoSwipeInterval, totalSlides]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-16 select-none">
      <section
        className="relative w-full aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] select-none overflow-hidden bg-slate-900 border border-slate-200/80 rounded-3xl sm:rounded-[36px] shadow-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Media Slides Track */}
        <div className="absolute inset-0 z-0">
          {activeSlides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id || slide._id || idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                {slide.type === "video" ? (
                  <>
                    {slide.mobileSrc ? (
                      <>
                        {/* Desktop Video */}
                        <HighlightVideoItem
                          src={slide.src}
                          poster={slide.poster}
                          isActive={isActive}
                          className="hidden sm:block w-full h-full object-cover"
                        />
                        {/* Mobile Video */}
                        <HighlightVideoItem
                          src={slide.mobileSrc}
                          poster={slide.mobilePoster || slide.poster}
                          isActive={isActive}
                          className="block sm:hidden w-full h-full object-cover"
                        />
                      </>
                    ) : (
                      <HighlightVideoItem
                        src={slide.src}
                        poster={slide.poster}
                        isActive={isActive}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </>
                ) : (
                  <div className="relative w-full h-full">
                    {slide.mobileSrc ? (
                      <>
                        {/* Desktop Image */}
                        <img
                          src={slide.src}
                          alt={slide.alt || "Highlights media banner slide"}
                          className="hidden sm:block w-full h-full object-cover"
                          loading={idx === 0 ? "eager" : "lazy"}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";
                          }}
                        />
                        {/* Mobile Image */}
                        <img
                          src={slide.mobileSrc}
                          alt={slide.alt || "Highlights media banner slide"}
                          className="block sm:hidden w-full h-full object-cover"
                          loading={idx === 0 ? "eager" : "lazy"}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";
                          }}
                        />
                      </>
                    ) : (
                      <img
                        src={slide.src}
                        alt={slide.alt || "Highlights media banner slide"}
                        className="w-full h-full object-cover"
                        loading={idx === 0 ? "eager" : "lazy"}
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80";
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Soft gradient overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

                {/* Glassmorphic Ad Copy Card */}
                {(slide.title || slide.badge || slide.subtitle) && (
                  <div className="absolute left-4 right-4 bottom-4 sm:left-12 sm:bottom-16 sm:right-auto sm:max-w-md bg-white/95 border border-white/80 backdrop-blur-xl p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl text-slate-900 select-text pointer-events-auto select-none">
                    {slide.badge && (
                      <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest leading-none mb-2 sm:mb-3 shadow-sm">
                        {slide.badge}
                      </span>
                    )}
                    {slide.title && (
                      <h3 className="font-heading font-black text-lg sm:text-2xl lg:text-3xl uppercase tracking-tight leading-tight mb-2 text-slate-900">
                        {slide.title}
                      </h3>
                    )}
                    {slide.subtitle && (
                      <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-4 sm:mb-5">
                        {slide.subtitle}
                      </p>
                    )}
                    {slide.ctaText && slide.ctaLink && (
                      <Link
                        href={slide.ctaLink}
                        className="gradient-btn px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 hover:scale-105 transition-transform duration-300 shadow-md pointer-events-auto text-white"
                      >
                        {slide.ctaText}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white/85 hover:bg-orange-500 text-slate-800 hover:text-white backdrop-blur-md border border-white/50 transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer animate-none"
            >
              <svg
                className="w-5 h-5"
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
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-white/85 hover:bg-orange-500 text-slate-800 hover:text-white backdrop-blur-md border border-white/50 transition-all duration-300 transform hover:scale-110 shadow-lg cursor-pointer animate-none"
            >
              <svg
                className="w-5 h-5"
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

        {/* Pagination dots */}
        {totalSlides > 1 && (
          <div className="absolute bottom-6 z-20 left-0 right-0 flex justify-center items-center gap-2">
            {activeSlides.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 cursor-pointer overflow-hidden ${
                    isActive
                      ? "w-6 bg-orange-500 ring-2 ring-orange-400/30"
                      : "w-2 bg-white/60 hover:bg-white"
                  }`}
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
