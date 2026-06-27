"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface APlusSectionProps {
  images: string[];
}

function APlusImage({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`w-full transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <Image
        src={src}
        alt={`Product feature ${index + 1}`}
        width={1920}
        height={800}
        className="aplus-img"
        priority={index === 0}
        sizes="100vw"
      />
    </div>
  );
}

export default function APlusSection({ images }: APlusSectionProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full overflow-hidden bg-[#080808]">
      {images.map((src, i) => (
        <APlusImage key={src} src={src} index={i} />
      ))}
    </div>
  );
}
