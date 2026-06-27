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
    <div className="flex flex-col w-full gap-3">
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-[#111111] border border-[#262626]">
        <div className="overflow-hidden" ref={mainCarouselRef}>
          <div className="grid auto-cols-[100%] grid-flow-col">
            {images.map((image, index) => (
              <div className="relative min-w-0" key={index}>
                <Image
                  width={800}
                  height={800}
                  src={image.node.url.toString()}
                  alt={image.node.altText ?? ""}
                  className="w-full max-h-[480px] sm:max-h-[540px] object-contain p-4"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a]/80 border border-[#C9A84C]/30 backdrop-blur-sm hover:border-[#C9A84C]/70 hover:bg-[#1a1a1a] transition-all duration-200"
        >
          <ChevronLeft className="h-4 w-4 text-[#C9A84C]" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[#1a1a1a]/80 border border-[#C9A84C]/30 backdrop-blur-sm hover:border-[#C9A84C]/70 hover:bg-[#1a1a1a] transition-all duration-200"
        >
          <ChevronRight className="h-4 w-4 text-[#C9A84C]" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => onThumbClick(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-5 h-1.5 bg-[#C9A84C]"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="overflow-hidden" ref={thumbCarouselRef}>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-[#111111]",
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
