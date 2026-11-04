"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export interface CategorySlide {
  categoryName: string;
  categorySlug: string;
  tagline: string;
  imageUrl: string;
  badge: string;
}

const SLIDES: CategorySlide[] = [
  {
    categoryName: "Sports",
    categorySlug: "sports",
    tagline: "Sports Collection",
    imageUrl: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460181/msd.jpg",
    badge: "",
  },
  {
    categoryName: "God",
    categorySlug: "god",
    tagline: "Devotional & Spiritual",
    imageUrl: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793460217/Untitled_design_6.jpg",
    badge: "",
  },
  {
    categoryName: "Anime",
    categorySlug: "anime",
    tagline: "Anime Art Editions",
    imageUrl: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459551/Untitled_design.jpg",
    badge: "",
  },
  {
    categoryName: "Marvel",
    categorySlug: "marvel",
    tagline: "Marvel Universe",
    imageUrl: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793459827/Wanda_Maximoff__Scarlet_Witch_wallpaper.jpg",
    badge: "",
  },
  {
    categoryName: "Motivation",
    categorySlug: "motivation",
    tagline: "Founder & Mindset",
    imageUrl: "https://res.cloudinary.com/dv8sv8ayv/image/upload/v1793463267/Untitled_design_4.jpg",
    badge: "",
  },
];

export default function HeroCategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play interval: 2 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 40) {
      prevSlide();
    } else if (deltaX < -40) {
      nextSlide();
    }
    touchStartX.current = null;
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <div
      className="relative mx-auto max-w-md rounded border border-[#DDD7CC] bg-white p-3.5 sm:p-4 shadow-sm select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Aspect Ratio 1 : 1.3 frame mimicking framed wall poster */}
      <div className="relative aspect-[1/1.3] w-full overflow-hidden rounded border border-[#DDD7CC] bg-[#ECE7DE]">
        {/* Slides */}
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.categorySlug}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
              }`}
            >
              <Image
                src={slide.imageUrl}
                alt={`${slide.categoryName} Wall Poster Print`}
                fill
                priority={idx === 0}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
              />

              {/* Gradient Scrim for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between gap-2 text-white">
                <div>
                  <p className="text-xs font-semibold drop-shadow-sm">{slide.tagline}</p>
                  <p className="text-[11px] text-white/80 drop-shadow-sm">
                    A4 (₹39) • A3 (₹59) • 300 GSM Archival
                  </p>
                </div>

                <Link
                  href={`/shop?category=${slide.categorySlug}`}
                  className="inline-flex items-center gap-1 rounded bg-[#C8501E] hover:bg-[#B34416] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-xs transition-colors shrink-0"
                >
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur-xs text-[#1A1A1A] shadow-md border border-[#DDD7CC] hover:bg-white transition-all hover:scale-105 active:scale-95"
          aria-label="Previous category poster"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur-xs text-[#1A1A1A] shadow-md border border-[#DDD7CC] hover:bg-white transition-all hover:scale-105 active:scale-95"
          aria-label="Next category poster"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* 5 Indicator Dots / Progress Bar */}
      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.categorySlug}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex
                  ? "w-7 bg-[#C8501E]"
                  : "w-2 bg-[#DDD7CC] hover:bg-[#6B665E]"
              }`}
              aria-label={`Jump to slide ${idx + 1} (${slide.categoryName})`}
            />
          ))}
        </div>

        <span className="font-mono text-[11px] font-medium text-[#6B665E]">
          0{currentIndex + 1} / 0{totalSlides} • {currentSlide.categoryName}
        </span>
      </div>
    </div>
  );
}
