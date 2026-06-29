"use client";

import { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  name: string;
  fullText: string;
  rating: number;
};

const TestimonialCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.children[0]?.clientWidth ?? 300;
    const gap = 16;
    const delta = (cardWidth + gap) * (dir === "left" ? -1 : 1);
    scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
    setActiveIdx((prev) =>
      dir === "left"
        ? Math.max(0, prev - 1)
        : Math.min(testimonials.length - 1, prev + 1)
    );
  };

  return (
    <section className="bg-white dark:bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Subtle glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-700/5 dark:bg-[#C9A84C]/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-[#C9A84C] uppercase mb-2">
              Real Results
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              What Our Men Say
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 dark:border-[#262626] dark:bg-[#111111] flex items-center justify-center hover:border-emerald-300 hover:text-emerald-700 text-gray-500 dark:hover:border-[#C9A84C]/50 dark:hover:text-[#C9A84C] dark:text-[#7A6E62] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-gray-200 bg-gray-50 dark:border-[#262626] dark:bg-[#111111] flex items-center justify-center hover:border-emerald-300 hover:text-emerald-700 text-gray-500 dark:hover:border-[#C9A84C]/50 dark:hover:text-[#C9A84C] dark:text-[#7A6E62] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
        >
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 sm:w-80 flex flex-col gap-4 p-6 rounded-2xl border border-gray-200 bg-gray-50 dark:border-[#262626] dark:bg-[#111111] hover:border-emerald-300 dark:hover:border-[#C9A84C]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Quote mark */}
              <span className="absolute top-4 right-5 text-6xl leading-none text-emerald-700/10 dark:text-[#C9A84C]/15 font-display font-bold select-none">
                "
              </span>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-yellow-400 text-yellow-400 dark:fill-[#C9A84C] dark:text-[#C9A84C]" : "fill-gray-200 text-gray-200 dark:fill-[#2a2a2a] dark:text-[#2a2a2a]"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 dark:text-[#B8A99A] text-sm leading-relaxed flex-1 relative z-10">
                "{t.fullText}"
              </p>

              {/* Name + badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-200 dark:border-[#1e1e1e]">
                <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 dark:bg-[#1a4731]/30 dark:border-[#1a4731]/50 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-green-700 dark:text-[#1a4731]">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</span>
                  <span className="ml-2 text-[10px] text-emerald-700 border border-emerald-200 dark:text-[#C9A84C]/70 dark:border-[#C9A84C]/20 px-1.5 py-0.5 rounded-sm">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-1.5 mt-6">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-5 h-1.5 bg-emerald-700 dark:bg-[#C9A84C]" : "w-1.5 h-1.5 bg-gray-200 dark:bg-[#262626]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
