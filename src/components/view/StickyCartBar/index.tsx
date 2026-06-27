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
        <div className="bg-[#0f0f0f] border-t border-[#262626] px-4 py-1.5 flex items-center justify-between">
          {productTitle && (
            <p className="text-[11px] text-[#B8A99A] font-medium truncate max-w-[60%]">
              {productTitle}
            </p>
          )}
          {currentPrice && (
            <p className="text-sm font-bold text-white font-mono-num">
              ₹{currentPrice.toFixed(0)}
            </p>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="bg-[#080808]/95 backdrop-blur-md border-t border-[#262626] px-4 py-3 flex items-center gap-3">
        {/* Quantity stepper */}
        <div className="flex items-center rounded-xl border border-[#262626] bg-[#111111] overflow-hidden shrink-0 h-12">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-11 h-full flex items-center justify-center text-[#B8A99A] hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-white select-none font-mono-num">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-11 h-full flex items-center justify-center text-[#B8A99A] hover:text-white hover:bg-[#1a1a1a] transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={onAddToCart}
          disabled={isDisabled}
          className="flex-1 h-12 rounded-xl border border-[#1a4731] text-[#1a4731] bg-transparent text-sm font-bold tracking-wide hover:bg-[#1a4731]/10 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isAdded ? "Added ✓" : "ADD TO CART"}
        </button>

        {/* Buy Now */}
        <button
          onClick={onBuyNow}
          disabled={isDisabled}
          className="flex-1 h-12 rounded-xl bg-[#1a4731] text-white text-sm font-bold tracking-wide hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_16px_rgba(26,71,49,0.4)]"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
