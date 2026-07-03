"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  cartDrawerOpenAtom,
  cartDrawerLoadingAtom,
  useCartActions,
} from "@/lib/atoms/cart";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GET_ALL_PRODUCTS_QUERY } from "@/graphql/products";

// ─── Constants ───────────────────────────────────────────────────────────────
const FREE_SHIPPING_THRESHOLD = 499;

// ─── Types ───────────────────────────────────────────────────────────────────
type PackVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
};

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function CartSkeleton() {
  return (
    <div className="px-4 pt-4 space-y-3">
      {[1].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#1e1e1e] p-3"
        >
          <div className="flex gap-3">
            <div className="w-[68px] h-[68px] rounded-xl bg-gray-100 dark:bg-[#1e1e1e] animate-pulse shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-gray-100 dark:bg-[#1e1e1e] rounded-full animate-pulse w-3/4" />
              <div className="h-2.5 bg-gray-100 dark:bg-[#1e1e1e] rounded-full animate-pulse w-1/3" />
              <div className="h-3 bg-gray-100 dark:bg-[#1e1e1e] rounded-full animate-pulse w-1/2 mt-3" />
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1f1f1f]">
            <div className="h-2 bg-gray-100 dark:bg-[#1e1e1e] rounded-full animate-pulse w-1/4 mb-2" />
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  className="h-[68px] rounded-xl bg-gray-100 dark:bg-[#1e1e1e] animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── PackUpgrader ─────────────────────────────────────────────────────────────
function PackUpgrader({
  variants,
  currentVariantId,
  onSwap,
}: {
  variants: PackVariant[];
  currentVariantId: string;
  onSwap: (newVariantId: string) => Promise<void>;
}) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (variants.length <= 1) return null;

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-[#1f1f1f]">
      <p className="text-[9px] font-bold tracking-[0.12em] text-gray-400 dark:text-[#5a5a5a] uppercase mb-2.5">
        Upgrade Pack &amp; Save More
      </p>
      <div className="grid grid-cols-3 gap-1.5">
        {variants.map((v) => {
          const isSelected = v.id === currentVariantId;
          const isLoading = loadingId === v.id;
          const price = parseFloat(v.price.amount);
          const compareAt = v.compareAtPrice
            ? parseFloat(v.compareAtPrice.amount)
            : null;
          const savingsAmt =
            compareAt && compareAt > price ? compareAt - price : 0;

          return (
            <button
              key={v.id}
              disabled={loadingId !== null || !v.availableForSale}
              onClick={async () => {
                if (isSelected || loadingId) return;
                setLoadingId(v.id);
                try {
                  await onSwap(v.id);
                } finally {
                  setLoadingId(null);
                }
              }}
              className={[
                "relative flex flex-col items-center gap-0.5 rounded-xl p-2 pt-3.5 border",
                "text-center transition-all duration-200 min-h-[68px] justify-center",
                "disabled:cursor-not-allowed",
                isSelected
                  ? "border-[#1a4731] bg-[#1a4731]/[0.08] dark:border-[#C9A84C] dark:bg-[#C9A84C]/[0.08]"
                  : "border-gray-200 dark:border-[#252525] bg-white dark:bg-[#181818] hover:border-[#1a4731]/50 dark:hover:border-[#C9A84C]/40",
                !v.availableForSale && !isSelected ? "opacity-40" : "",
              ].join(" ")}
            >
              {savingsAmt > 0 && !isSelected && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#1a4731] dark:bg-[#C9A84C] text-white dark:text-[#080808] text-[8px] font-bold px-1.5 py-[2px] rounded-full whitespace-nowrap leading-none">
                  Save ₹{savingsAmt.toFixed(0)}
                </span>
              )}

              {isLoading ? (
                <span className="w-4 h-4 rounded-full border-2 border-[#1a4731] dark:border-[#C9A84C] border-t-transparent animate-spin" />
              ) : (
                <>
                  <span
                    className={[
                      "text-[10px] font-bold leading-tight",
                      isSelected
                        ? "text-[#1a4731] dark:text-[#C9A84C]"
                        : "text-gray-500 dark:text-[#888]",
                    ].join(" ")}
                  >
                    {v.title}
                  </span>
                  <span
                    className={[
                      "text-[11px] font-bold",
                      isSelected
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-[#ccc]",
                    ].join(" ")}
                  >
                    ₹{price.toFixed(0)}
                  </span>
                  {isSelected ? (
                    <span className="text-[8px] text-[#1a4731] dark:text-[#C9A84C] font-semibold mt-0.5">
                      ✓ In Cart
                    </span>
                  ) : !v.availableForSale ? (
                    <span className="text-[8px] text-red-400 mt-0.5">
                      Out of stock
                    </span>
                  ) : null}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── YouMayAlsoLike ───────────────────────────────────────────────────────────
type RelatedProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string };
  priceRange: { minVariantPrice: { amount: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string } };
  variants: { edges: { node: { id: string; availableForSale: boolean } }[] };
};

function YouMayAlsoLike({
  excludeHandles,
  onAdd,
}: {
  excludeHandles: string[];
  onAdd: (variantId: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const { data, isLoading } = useStorefrontQuery<{
    products: { edges: { node: RelatedProduct }[] };
  }>(["cart-upsell-strip"], {
    query: GET_ALL_PRODUCTS_QUERY,
    variables: { first: 12 },
  });

  const products = (data?.products?.edges ?? [])
    .map((e) => e.node)
    .filter((p) => !excludeHandles.includes(p.handle))
    .slice(0, 5);

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -160 : 160,
      behavior: "smooth",
    });

  if (isLoading || products.length === 0) return null;

  const handleAdd = (product: RelatedProduct) => {
    const variant = product.variants?.edges?.[0]?.node;
    if (!variant?.id || !variant.availableForSale) return;
    onAdd(variant.id);
    setAddedIds((prev) => new Set(prev).add(variant.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(variant.id);
        return next;
      });
    }, 1800);
  };

  return (
    <div className="border-t border-gray-100 dark:border-[#1a1a1a] py-4">
      <div className="flex items-center justify-between px-4 mb-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#1a4731] dark:text-[#C9A84C]" />
          <p className="text-[11px] font-bold text-gray-800 dark:text-[#E0D5C5] tracking-tight uppercase">
            You May Also Like
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="w-6 h-6 rounded-full border border-gray-200 dark:border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] transition-all"
          >
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-6 h-6 rounded-full border border-gray-200 dark:border-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] transition-all"
          >
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto no-scrollbar scroll-smooth px-4 pb-1"
      >
        {products.map((product) => {
          const variant = product.variants?.edges?.[0]?.node;
          const price = parseFloat(
            product.priceRange?.minVariantPrice?.amount ?? "0"
          );
          const compare = parseFloat(
            product.compareAtPriceRange?.minVariantPrice?.amount ?? "0"
          );
          const discount =
            compare > price
              ? Math.round(((compare - price) / compare) * 100)
              : 0;
          const isAdded = variant && addedIds.has(variant.id);

          return (
            <div
              key={product.id}
              className="flex-shrink-0 w-[120px] flex flex-col bg-white dark:bg-[#141414] rounded-xl border border-gray-100 dark:border-[#222] overflow-hidden shadow-sm"
            >
              <Link
                href={`/product/${product.handle}`}
                className="relative block"
              >
                {discount > 0 && (
                  <span className="absolute top-1.5 left-1.5 bg-[#1a4731] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full z-10 leading-none">
                    {discount}% off
                  </span>
                )}
                <div className="aspect-square bg-gray-50 dark:bg-[#1e1e1e]">
                  {product.featuredImage?.url ? (
                    <Image
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText ?? product.title}
                      width={120}
                      height={120}
                      className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-[#252525]" />
                  )}
                </div>
              </Link>
              <div className="p-2 flex flex-col gap-1.5 flex-1">
                <p className="text-[10px] font-semibold text-gray-800 dark:text-[#E0D5C5] leading-tight line-clamp-2">
                  {product.title}
                </p>
                <p className="text-[11px] font-bold text-gray-900 dark:text-white">
                  ₹{price.toFixed(0)}
                </p>
                <button
                  onClick={() => handleAdd(product)}
                  disabled={!variant?.availableForSale}
                  className={[
                    "mt-auto w-full h-7 rounded-lg text-[10px] font-bold transition-all duration-200",
                    isAdded
                      ? "bg-green-600 text-white"
                      : "bg-[#1a4731] hover:bg-[#143828] text-white",
                    "disabled:opacity-40 disabled:cursor-not-allowed",
                  ].join(" ")}
                >
                  {isAdded ? "Added ✓" : "+ Add"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── CartItem ─────────────────────────────────────────────────────────────────
function CartItem({
  item,
  onUpdate,
  onRemove,
  onSwap,
}: {
  item: ReturnType<typeof useCartActions>["cart"]["lines"]["edges"][number];
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onSwap: (oldId: string, newId: string) => Promise<void>;
}) {
  const product = item.node.merchandise.product;
  const variant = item.node.merchandise;
  const quantity = item.node.quantity;
  const imageUrl = product.images.edges[0]?.node?.url;
  const lineTotal = item.node.cost?.totalAmount?.amount
    ? parseFloat(item.node.cost.totalAmount.amount)
    : parseFloat(variant.price.amount) * quantity;

  const allVariants =
    (product.variants?.edges?.map(
      (e: { node: PackVariant }) => e.node
    ) as PackVariant[]) ?? [];

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-100 dark:border-[#1e1e1e] p-3 shadow-[0_1px_8px_rgba(0,0,0,0.04)] dark:shadow-none"
    >
      <div className="flex gap-3">
        {/* Product image */}
        <Link
          href={`/product/${product.handle}`}
          className="flex-shrink-0 w-[68px] h-[68px] rounded-xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] block"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.title}
              width={68}
              height={68}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          )}
        </Link>

        {/* Info column */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900 dark:text-[#F5F0E8] leading-snug line-clamp-2">
                {product.title}
              </h4>
              <p className="text-[10px] text-gray-400 dark:text-[#5a5a5a] mt-0.5">
                {variant.title}
              </p>
            </div>
            <button
              onClick={() => onRemove(variant.id)}
              aria-label="Remove item"
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-gray-300 dark:text-[#3a3a3a] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all mt-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>

          {/* Price + qty row */}
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ₹{lineTotal.toFixed(0)}
            </span>
            {/* Qty stepper */}
            <div className="flex items-center gap-1 border border-gray-200 dark:border-[#2a2a2a] rounded-full bg-white dark:bg-[#0d0d0d] px-1 py-0.5">
              <button
                onClick={() => onUpdate(variant.id, quantity - 1)}
                aria-label="Decrease quantity"
                className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] transition-all"
              >
                <Minus className="w-2.5 h-2.5" />
              </button>
              <motion.span
                key={quantity}
                initial={{ scale: 1.3, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-5 text-center text-xs font-bold text-gray-900 dark:text-white tabular-nums"
              >
                {quantity}
              </motion.span>
              <button
                onClick={() => onUpdate(variant.id, quantity + 1)}
                aria-label="Increase quantity"
                className="w-5 h-5 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] transition-all"
              >
                <Plus className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pack upgrader */}
      {allVariants.length > 1 && (
        <PackUpgrader
          variants={allVariants}
          currentVariantId={variant.id}
          onSwap={(newId) => onSwap(variant.id, newId)}
        />
      )}
    </motion.div>
  );
}

// ─── CartView (main export) ───────────────────────────────────────────────────
function CartView() {
  const [isOpen, setIsOpen] = useAtom(cartDrawerOpenAtom);
  const [cartIsLoading] = useAtom(cartDrawerLoadingAtom);
  const { cart, initializeCart, updateItem, removeItem, swapVariant, addItem } =
    useCartActions();

  // Close drawer whenever the route changes
  const pathname = usePathname();
  useEffect(() => {
    setIsOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Initialize cart once on mount (Navbar also calls this; guard is inside initializeCart)
  useEffect(() => {
    if (!cart?.id) initializeCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const cartItems = cart?.lines?.edges ?? [];
  const totalQuantity = cart?.totalQuantity ?? 0;
  const subtotal = parseFloat(cart?.cost?.subtotalAmount?.amount ?? "0");

  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );
  const freeShippingRemaining = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0
  );

  const cartProductHandles = cartItems.map(
    (item) => item.node.merchandise.product.handle
  );

  const handleCheckout = () => {
    if (cart?.checkoutUrl) {
      const url = cart.checkoutUrl.replace(
        "sexuloon.com",
        "rj1ghp-kr.myshopify.com"
      );
      window.open(url, "_blank");
    }
  };

  // Footer is shown when items are present AND not in first-load state
  const showFooter = cartItems.length > 0 && !cartIsLoading;

  return (
    <>
      {/* ── Navbar Cart Icon ── */}
      <button
        id="cart-nav-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open cart"
        className="relative p-2 text-gray-700 dark:text-[#B8A99A] hover:text-black dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
      >
        <ShoppingBag className="w-6 h-6" />
        <AnimatePresence>
          {totalQuantity > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1a4731] dark:bg-[#C9A84C] text-white dark:text-[#080808] text-[9px] font-bold flex items-center justify-center leading-none"
            >
              {totalQuantity}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="cart-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-[2px]"
            />

            {/* Drawer panel — h-screen guarantees full viewport height */}
            <motion.div
              key="cart-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 260,
                mass: 0.9,
              }}
              className="fixed top-0 right-0 z-[201] h-screen w-full sm:w-[420px] flex flex-col bg-[#fafafa] dark:bg-[#0d0d0d] overflow-hidden"
              style={{ boxShadow: "-8px 0 48px rgba(0,0,0,0.18)" }}
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 py-4 bg-white dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-[#1a1a1a] flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-[18px] h-[18px] text-[#1a4731] dark:text-[#C9A84C]" />
                  <h2 className="font-bold text-sm tracking-[0.08em] text-gray-900 dark:text-white uppercase">
                    Your Cart
                  </h2>
                  {totalQuantity > 0 && (
                    <span className="text-[11px] text-gray-400 dark:text-[#5a5a5a] font-medium">
                      ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* ── Free Shipping Bar ── */}
              {(cartItems.length > 0 || cartIsLoading) && (
                <div className="px-5 py-3 bg-white dark:bg-[#0d0d0d] border-b border-gray-100 dark:border-[#1a1a1a] flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-3.5 h-3.5 text-[#1a4731] dark:text-[#C9A84C] shrink-0" />
                    {cartIsLoading ? (
                      <div className="h-3 bg-gray-100 dark:bg-[#1e1e1e] rounded-full animate-pulse w-48" />
                    ) : freeShippingRemaining > 0 ? (
                      <p className="text-[11px] text-gray-500 dark:text-[#888]">
                        Add{" "}
                        <span className="font-bold text-gray-800 dark:text-[#E0D5C5]">
                          ₹{freeShippingRemaining.toFixed(0)}
                        </span>{" "}
                        more to unlock{" "}
                        <span className="font-bold text-[#1a4731] dark:text-[#C9A84C]">
                          Free Shipping
                        </span>
                      </p>
                    ) : (
                      <p className="text-[11px] font-bold text-[#1a4731] dark:text-[#C9A84C]">
                        🎉 Free Shipping unlocked!
                      </p>
                    )}
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-[#1e1e1e] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: cartIsLoading
                          ? "30%"
                          : `${freeShippingProgress}%`,
                      }}
                      transition={{ duration: 0.55, ease: [0.34, 1.26, 0.64, 1] }}
                      className={[
                        "h-full rounded-full",
                        cartIsLoading
                          ? "bg-gray-200 dark:bg-[#2a2a2a] animate-pulse"
                          : "bg-gradient-to-r from-[#1a4731] to-[#2d7a56] dark:from-[#C9A84C] dark:to-[#E8C87A]",
                      ].join(" ")}
                    />
                  </div>
                </div>
              )}

              {/* ── Scrollable body — flex-1 + min-h-0 is critical for proper overflow ── */}
              <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
                {cartIsLoading ? (
                  /* Loading skeleton while first item adds */
                  <CartSkeleton />
                ) : cartItems.length === 0 ? (
                  /* Empty state */
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex flex-col items-center justify-center h-full px-8 text-center gap-5"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-24 h-24 rounded-full bg-gray-100 dark:bg-[#181818] flex items-center justify-center"
                    >
                      <ShoppingBag className="w-10 h-10 text-gray-300 dark:text-[#333]" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">
                        Your cart is empty
                      </h3>
                      <p className="text-sm text-gray-400 dark:text-[#5a5a5a]">
                        Add products to get started
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="h-11 px-8 rounded-full bg-[#1a4731] hover:bg-[#143828] text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-[#1a4731]/25"
                    >
                      Shop Now
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Cart items */}
                    <div className="px-4 pt-4 pb-2 space-y-3">
                      <AnimatePresence initial={false}>
                        {cartItems.map((item) => (
                          <CartItem
                            key={item.node.id}
                            item={item}
                            onUpdate={updateItem}
                            onRemove={removeItem}
                            onSwap={swapVariant}
                          />
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* You May Also Like */}
                    <YouMayAlsoLike
                      excludeHandles={cartProductHandles}
                      onAdd={(variantId) => addItem(variantId, 1)}
                    />
                  </>
                )}
              </div>

              {/* ── Sticky footer ── */}
              {showFooter && (
                <div className="flex-shrink-0 bg-white dark:bg-[#0d0d0d] border-t border-gray-100 dark:border-[#1a1a1a] px-5 pt-4 pb-5 space-y-3">
                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-5 text-[10px] text-gray-400 dark:text-[#5a5a5a]">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Secure Checkout
                    </span>
                    <span className="w-px h-3 bg-gray-200 dark:bg-[#2a2a2a]" />
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      Fast Delivery
                    </span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-[#888] font-medium">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white tabular-nums">
                      ₹{subtotal.toFixed(0)}
                    </span>
                  </div>

                  <p className="text-[10px] text-center text-gray-400 dark:text-[#4a4a4a] -mt-1">
                    Taxes &amp; discounts calculated at checkout
                  </p>

                  {/* CTA */}
                  <motion.button
                    id="cart-checkout-btn"
                    onClick={handleCheckout}
                    disabled={!cart?.checkoutUrl}
                    whileTap={{ scale: 0.975 }}
                    className="relative w-full h-14 rounded-2xl bg-[#1a4731] hover:bg-[#143828] text-white font-bold text-sm tracking-wide transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group"
                    style={{
                      boxShadow:
                        "0 4px 24px rgba(26,71,49,0.35), 0 1px 4px rgba(26,71,49,0.2)",
                    }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <span className="relative flex items-center justify-center gap-2">
                      CHECKOUT
                      <span className="opacity-70">·</span>
                      ₹{subtotal.toFixed(0)}
                    </span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default CartView;
