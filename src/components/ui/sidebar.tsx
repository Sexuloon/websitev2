"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";

const slides = [
  {
    url: "/header1.png",
    alt: "Sexuloon – Men's Sexual Wellness Products",
  },
  {
    url: "/header2.jpg",
    alt: "Natural Remedies for Men's Health – Sexuloon",
  },
  {
    url: "/header3.jpg",
    alt: "Discreet Delivery of Sexual Wellness Products",
  },
  {
    url: "/header4.jpg",
    alt: "MBBS Doctor Consultations – Sexuloon",
  },
];

const INTERVAL_MS = 3500;
const TRANSITION_MS = 500;

function SlideShow() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, TRANSITION_MS);
    },
    [transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    timerRef.current = setTimeout(next, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [next]);

  return (
    /*
     * ⬇ The aspect-ratio reserves space BEFORE images load — prevents CLS.
     * 16/9 matches header images. On mobile we use a slightly taller ratio.
     */
    <div
      className="w-full relative overflow-hidden rounded-md bg-gray-100 dark:bg-[#111111]"
      style={{ aspectRatio: "16/9" }}
      aria-label="Product slideshow"
      aria-roledescription="carousel"
    >
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${slides.length}`}
            aria-hidden={!isActive}
            /* 'inert' removes ALL focus from hidden slides — fixes ARIA violation */
            {...(!isActive ? { inert: "" } : {})}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: isActive ? (transitioning ? 0 : 1) : 0,
              transitionDuration: `${TRANSITION_MS}ms`,
              zIndex: isActive ? 1 : 0,
            }}
          >
            <Link
              href="/collections/all-products"
              className="relative block w-full h-full"
              tabIndex={isActive ? 0 : -1}
              aria-label={slide.alt}
            >
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                /* Only the first slide is priority (LCP element) — rest are lazy */
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </Link>
          </div>
        );
      })}

      {/* Prev / Next arrows */}
      <button
        onClick={(e) => { e.preventDefault(); prev(); }}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        onClick={(e) => { e.preventDefault(); next(); }}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full w-9 h-9 flex items-center justify-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5" role="tablist" aria-label="Slide indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "bg-white w-5 h-1.5"
                : "bg-white/50 w-1.5 h-1.5 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
