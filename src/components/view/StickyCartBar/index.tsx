"use client";

import { Minus, Plus } from "lucide-react";
import { RefObject, useEffect, useState } from "react";

type StickyCartBarProps = {
  onAddToCart: () => void;
  isAdded: boolean;
  isDisabled: boolean;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  heroRef?: RefObject<HTMLDivElement>;
};

export default function StickyCartBar({
  onAddToCart,
  isAdded,
  isDisabled,
  quantity,
  onQuantityChange,
  heroRef,
}: StickyCartBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = heroRef?.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-gray-100 shadow-2xl transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-2xl mx-auto px-6 py-3 flex items-center gap-4">
        {/* Quantity */}
        <div className="flex items-center rounded-full border border-gray-200 overflow-hidden shrink-0">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-7 text-center text-sm font-semibold text-gray-900 select-none">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-10 h-11 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isDisabled}
          className="flex-1 h-11 bg-[#1a4731] text-white rounded-full text-sm font-semibold tracking-wide hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAdded ? "Added to Cart ✓" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}
