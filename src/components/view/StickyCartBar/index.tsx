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
  heroRef?: RefObject<HTMLDivElement | null>;
  productTitle?: string;
  currentPrice?: number | null;
};

export default function StickyCartBar({
  onAddToCart,
  onBuyNow,
  isAdded,
  isDisabled,
  quantity,
  onQuantityChange,
  heroRef,
  productTitle,
  currentPrice,
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
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Top info strip */}
      {(productTitle || currentPrice) && (
        <div className="bg-gray-100 dark:bg-[#0f0f0f] border-t border-gray-200 dark:border-[#262626] px-4 py-1.5 flex items-center justify-between transition-colors duration-300">
          {productTitle && (
            <p className="text-[11px] text-gray-600 dark:text-[#B8A99A] font-medium truncate max-w-[60%]">
              {productTitle}
            </p>
          )}
          {currentPrice && (
            <p className="text-sm font-bold text-gray-900 dark:text-white font-mono-num">
              ₹{currentPrice.toFixed(0)}
            </p>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="bg-white/95 dark:bg-[#080808]/95 backdrop-blur-md border-t border-gray-200 dark:border-[#262626] px-4 py-3 flex items-center gap-3 transition-colors duration-300">
        {/* Quantity stepper */}
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111111] overflow-hidden shrink-0 h-14 shadow-sm">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center text-base font-bold text-gray-900 dark:text-white select-none font-mono-num">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-[#B8A99A] dark:hover:text-white dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isDisabled}
          className="flex-1 h-14 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 hover:text-gray-900 shadow-sm dark:bg-[#1a1a1a] dark:text-[#B8A99A] dark:hover:bg-[#262626] dark:hover:text-white text-sm sm:text-base font-bold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed border border-gray-200 dark:border-[#333]"
        >
          {isAdded ? "Added ✓" : "ADD TO CART"}
        </button>

        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={isDisabled}
          className="flex-1 h-14 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 text-white hover:from-emerald-800 hover:to-emerald-900 shadow-[0_4px_14px_0_rgba(4,120,87,0.39)] dark:from-[#C9A84C] dark:to-[#B3933C] dark:text-[#080808] dark:hover:from-[#E8C87A] dark:hover:to-[#C9A84C] dark:shadow-[0_4px_14px_0_rgba(201,168,76,0.39)] text-sm sm:text-base font-bold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
