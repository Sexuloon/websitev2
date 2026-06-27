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
    <section className="bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle gold glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#C9A84C]/5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase mb-2">
              Real Results
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
              What Our Men Say
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#262626] bg-[#111111] flex items-center justify-center hover:border-[#C9A84C]/50 hover:text-[#C9A84C] text-[#7A6E62] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#262626] bg-[#111111] flex items-center justify-center hover:border-[#C9A84C]/50 hover:text-[#C9A84C] text-[#7A6E62] transition-all"
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
              className="flex-shrink-0 w-72 sm:w-80 flex flex-col gap-4 p-6 rounded-2xl border border-[#262626] bg-[#111111] hover:border-[#C9A84C]/30 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gold quote mark */}
              <span className="absolute top-4 right-5 text-6xl leading-none text-[#C9A84C]/15 font-display font-bold select-none">
                "
              </span>

              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < t.rating ? "fill-[#C9A84C] text-[#C9A84C]" : "fill-[#2a2a2a] text-[#2a2a2a]"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#B8A99A] text-sm leading-relaxed flex-1 relative z-10">
                "{t.fullText}"
              </p>

              {/* Name + badge */}
              <div className="flex items-center gap-2 pt-2 border-t border-[#1e1e1e]">
                <div className="w-7 h-7 rounded-full bg-[#1a4731]/30 border border-[#1a4731]/50 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-[#1a4731]">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                  <span className="ml-2 text-[10px] text-[#C9A84C]/70 border border-[#C9A84C]/20 px-1.5 py-0.5 rounded-sm">
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
                i === activeIdx ? "w-5 h-1.5 bg-[#C9A84C]" : "w-1.5 h-1.5 bg-[#262626]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
