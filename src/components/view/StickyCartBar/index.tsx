"use client";

import { Minus, Plus } from "lucide-react";
import { RefObject, useEffect, useState } from "react";

type StickyCartBarProps = {
  onAddToCart: () => void;
  onBuyNow: () => void;
  isAdded: boolean;
  isDisabled: boolean;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  /** Ref pointing to the desktop inline CTA block. When it leaves the viewport the bar slides in. */
  triggerRef?: RefObject<HTMLDivElement | null>;
};

export default function StickyCartBar({
  onAddToCart,
  onBuyNow,
  isAdded,
  isDisabled,
  quantity,
  onQuantityChange,
  triggerRef,
}: StickyCartBarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);

  // Detect mobile on mount and on resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: observe the inline CTA block; show sticky when it leaves viewport
  useEffect(() => {
    const target = triggerRef?.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolledPast(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerRef]);

  // Mobile → always visible. Desktop → only after inline CTA scrolls out.
  const visible = isMobile || scrolledPast;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 dark:bg-[#080808]/95 backdrop-blur-xl border-t border-gray-100 dark:border-[#1e1e1e] px-3 sm:px-5 py-2.5 flex items-center gap-2">
        {/* Quantity stepper */}
        <div className="flex items-center rounded-lg border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111111] overflow-hidden shrink-0 h-11">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-9 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-[#7A6E62] dark:hover:text-white dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-7 text-center text-sm font-semibold text-gray-900 dark:text-white select-none">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-9 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:text-[#7A6E62] dark:hover:text-white dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isDisabled}
          className="flex-1 h-11 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-transparent text-gray-800 dark:text-[#B8A99A] hover:border-gray-500 dark:hover:border-[#555] text-sm font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAdded ? "Added ✓" : "Add to Cart"}
        </button>

        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={isDisabled}
          className="flex-1 h-11 rounded-lg bg-[#1a4731] dark:bg-[#C9A84C] text-white dark:text-[#080808] hover:bg-[#0f3321] dark:hover:bg-[#E8C87A] text-sm font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
