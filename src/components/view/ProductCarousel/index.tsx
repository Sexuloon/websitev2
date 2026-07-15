"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageEdge } from "@/types/shopify-graphql";

export default function ProductCarousel({ images }: { images: ImageEdge[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainCarouselRef, mainEmblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [thumbCarouselRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
    axis: "x",
  });

  const scrollPrev = useCallback(() => mainEmblaApi?.scrollPrev(), [mainEmblaApi]);
  const scrollNext = useCallback(() => mainEmblaApi?.scrollNext(), [mainEmblaApi]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainEmblaApi || !thumbEmblaApi) return;
      mainEmblaApi.scrollTo(index);
      setSelectedIndex(index);
    },
    [mainEmblaApi, thumbEmblaApi]
  );

  const onSelect = useCallback(() => {
    if (!mainEmblaApi) return;
    const newIndex = mainEmblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    thumbEmblaApi?.scrollTo(newIndex);
  }, [mainEmblaApi, thumbEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) return;
    onSelect();
    mainEmblaApi.on("select", onSelect);
    mainEmblaApi.on("reInit", onSelect);
    return () => {
      mainEmblaApi.off("select", onSelect);
      mainEmblaApi.off("reInit", onSelect);
    };
  }, [mainEmblaApi, onSelect]);

  if (!images) return null;

  return (
    <div className="flex flex-col w-full gap-2 sm:gap-3">
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#111111] border border-[#262626]">
        <div className="overflow-hidden" ref={mainCarouselRef}>
          <div className="grid auto-cols-[100%] grid-flow-col">
            {images.map((image, index) => (
              <div className="relative min-w-0" key={index}>
                <Image
                  width={800}
                  height={800}
                  src={image.node.url.toString()}
                  alt={image.node.altText ?? ""}
                  // Tighter on mobile (320px), full on desktop
                  className="w-full max-h-[320px] sm:max-h-[480px] lg:max-h-[540px] object-contain p-3 sm:p-4"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nav arrows — hidden on mobile, shown sm+ */}
        <button
          onClick={scrollPrev}
          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 items-center justify-center rounded-full bg-[#1a1a1a]/80 border border-[#C9A84C]/30 backdrop-blur-sm hover:border-[#C9A84C]/70 hover:bg-[#1a1a1a] transition-all duration-200"
        >
          <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A84C]" />
        </button>
        <button
          onClick={scrollNext}
          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 items-center justify-center rounded-full bg-[#1a1a1a]/80 border border-[#C9A84C]/30 backdrop-blur-sm hover:border-[#C9A84C]/70 hover:bg-[#1a1a1a] transition-all duration-200"
        >
          <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#C9A84C]" />
        </button>

        {/* Dot indicators — always visible, larger tap targets on mobile */}
        <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              // min 44px tap area via padding trick
              className="p-1 -m-1"
            >
              <span className={cn(
                "block rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-4 sm:w-5 h-1.5 bg-[#C9A84C]"
                  : "w-1.5 h-1.5 bg-white/40"
              )} />
            </button>
          ))}
        </div>
      </div>

      {/* Thumbnail strip — smaller on mobile */}
      <div className="overflow-hidden" ref={thumbCarouselRef}>
        <div className="flex gap-1.5 sm:gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={cn(
                "relative flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-[#111111]",
                selectedIndex === index
                  ? "border-[#C9A84C] opacity-100 shadow-[0_0_8px_rgba(201,168,76,0.4)]"
                  : "border-[#262626] opacity-50 hover:opacity-80 hover:border-[#C9A84C]/40"
              )}
            >
              <Image
                width={80}
                height={80}
                src={image.node.url}
                alt={image.node.altText ?? ""}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
