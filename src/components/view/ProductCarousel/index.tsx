"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageEdge } from "@/types/shopify-graphql";

export default function ProductCarousel({ images }: { images: ImageEdge[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const [mainCarouselRef, mainEmblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [thumbCarouselRef, thumbEmblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
    axis: "x",
  });

  const scrollPrev = useCallback(() => {
    if (mainEmblaApi) mainEmblaApi.scrollPrev();
  }, [mainEmblaApi]);

  const scrollNext = useCallback(() => {
    if (mainEmblaApi) mainEmblaApi.scrollNext();
  }, [mainEmblaApi]);

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
    setCanScrollPrev(mainEmblaApi.canScrollPrev());
    setCanScrollNext(mainEmblaApi.canScrollNext());

    if (thumbEmblaApi) {
      thumbEmblaApi.scrollTo(newIndex);
    }
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
      {/* Main Image */}
      <div className="relative w-full overflow-hidden rounded-xl bg-gray-50">
        <div className="overflow-hidden" ref={mainCarouselRef}>
          <div className="grid auto-cols-[100%] grid-flow-col">
            {images.map((image, index) => (
              <div className="relative min-w-0" key={index}>
                <Image
                  width={1000}
                  height={800}
                  src={image.node.url.toString()}
                  alt={image.node.altText ?? ""}
                  className="w-full max-h-[520px] object-contain"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 border border-gray-200 shadow hover:bg-white transition disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4 text-gray-700" />
        </button>
        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/80 border border-gray-200 shadow hover:bg-white transition disabled:opacity-30"
        >
          <ChevronRight className="h-4 w-4 text-gray-700" />
        </button>
      </div>

      {/* Horizontal Thumbnail Strip */}
      <div className="overflow-hidden" ref={thumbCarouselRef}>
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all",
                selectedIndex === index
                  ? "border-gray-800 opacity-100"
                  : "border-gray-200 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                width={80}
                height={80}
                src={image.node.url}
                alt={image.node.altText ?? ""}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
