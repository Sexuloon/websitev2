"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductCarousel from "@/components/view/ProductCarousel";
import ProductOptions from "@/components/view/ProductOptions";
import StickyCartBar from "@/components/view/StickyCartBar";
import FrequentlyBought from "@/components/view/FrequentlyBought";
import YouMayLike from "@/components/view/YouMayLike";
import APlusSection from "@/components/view/APlusSection";
import ProductAtGlance from "@/components/view/ProductAtGlance";
import ProductIngredients from "@/components/view/ProductIngredients";
import ProductHowToUse from "@/components/view/ProductHowToUse";
import { GET_PRODUCT_BY_HANDLE_QUERY } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { useCartActions } from "@/lib/atoms/cart";
import {
  GetProductByHandleQuery,
  ImageEdge,
  ProductOption,
  ProductVariant,
} from "@/types/shopify-graphql";
import { Minus, Plus, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { dynamicComponent } from "@/lib/dynamicComponent";


const Product = () => {
  const params = useParams();
  const { addItem, cart } = useCartActions();

  // ctaRef → the desktop inline buy-button section.
  // When it scrolls out of viewport the StickyCartBar slides in.
  const ctaRef = useRef<HTMLDivElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  // Description HTML cleaned client-side with DOMParser (handles nested Shopify HTML)
  const [cleanDesc, setCleanDesc] = useState('');
  const productData = dynamicComponent(params.handle as string);

  const { data, isLoading } = useStorefrontQuery<GetProductByHandleQuery>(
    ["product", params.handle],
    {
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: params.handle },
    }
  );

  // DOMParser-based sanitization: runs client-side after hydration.
  // Starts as '' so SSR renders nothing for description (no hydration mismatch).
  useEffect(() => {
    const raw = data?.product?.descriptionHtml;
    if (!raw) { setCleanDesc(''); return; }
    try {
      const doc = new DOMParser().parseFromString(`<div>${raw}</div>`, 'text/html');
      const root = doc.body.firstElementChild as HTMLElement;
      if (!root) { setCleanDesc(raw); return; }

      const JUNK = [
        /₹/, /MRP/i, /[Ii]nclusive/, /[Rr]eview/,
        /\d+%\s*[Oo]ff/, /[★☆⭐]/, /\d+\.\d+\s*\(/,
      ];
      const isJunk = (t: string) => JUNK.some(p => p.test(t));

      // Pass 1: iteratively remove leaf nodes that are junk, prune empty parents
      let changed = true;
      while (changed) {
        changed = false;
        root.querySelectorAll('*').forEach(el => {
          if (el.children.length === 0) {
            const text = el.textContent?.trim() ?? '';
            if (isJunk(text)) {
              const parent = el.parentElement;
              el.remove();
              if (parent && parent !== root && !(parent.textContent?.trim())) {
                parent.remove();
              }
              changed = true;
            }
          }
        });
      }

      // Pass 2: remove any remaining direct children that are empty or still contain junk
      Array.from(root.children).forEach(child => {
        const text = child.textContent?.trim() ?? '';
        if (!text || isJunk(text)) child.remove();
      });

      setCleanDesc(root.innerHTML);
    } catch {
      setCleanDesc(data?.product?.descriptionHtml ?? '');
    }
  }, [data?.product?.descriptionHtml]);

  // Auto-select first available variant
  useEffect(() => {
    if (!data?.product?.variants?.edges?.length) return;
    const firstVariant = data.product.variants.edges[0]?.node;
    if (!firstVariant) return;
    setSelectedVariant(firstVariant as ProductVariant);
    const initialOptions: Record<string, string> = {};
    firstVariant.selectedOptions.forEach((opt) => {
      initialOptions[opt.name] = opt.value;
    });
    setSelectedOptions(initialOptions);
  }, [data]);

  // KwikPass Page View Event tracking
  useEffect(() => {
    if (data?.product) {
      const activeVariant = data.product.variants.edges?.[0]?.node;
      const event = new CustomEvent("page_view_kp", {
        detail: {
          type: "product",
          data: {
            cart_id: cart?.id || "",
            product_id: data.product.id,
            variant_id: activeVariant?.id || "",
            image_url: data.product.images?.edges?.[0]?.node?.url || "",
            name: data.product.title,
            price: activeVariant?.price?.amount ? parseFloat(activeVariant.price.amount) : 0,
            handle: params.handle,
          },
        },
      });
      window.dispatchEvent(event);
    }
  }, [data?.product?.id]);

  const handleSelectOptions = (options: Record<string, string>) => {
    const variant = data?.product?.variants?.edges.find((variant) =>
      Object.keys(options).every((key) =>
        variant.node.selectedOptions.some(
          (option) => option.name === key && option.value === options[key]
        )
      )
    );
    setSelectedVariant(variant?.node as ProductVariant);
    setSelectedOptions(options);
  };

  const handleAddtoCart = () => {
    if (!selectedVariant) return;
    addItem(selectedVariant.id, quantity);
    setIsAdded(true);
    const id = setTimeout(() => setIsAdded(false), 1500);
    return () => clearTimeout(id);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    addItem(selectedVariant.id, quantity);

    // Small delay to let the cart atom update with the new item
    await new Promise((r) => setTimeout(r, 300));

    try {
      const cartId = cart?.id;
      if (!cartId) {
        // Fallback if cart not ready yet
        if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
        return;
      }
      // Associate cart with logged-in customer before redirecting
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } catch {
      if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
    }
  };

  // ── Loading skeleton ────────────────────────────────────────
  if (isLoading)
    return (
      <div className="bg-white dark:bg-[#080808] min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-3">
              <Skeleton className="h-[480px] w-full rounded-2xl bg-gray-200 dark:bg-[#1a1a1a]" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-16 rounded-xl bg-gray-200 dark:bg-[#1a1a1a]" />
                ))}
              </div>
            </div>
            <div className="space-y-6 pt-4">
              <Skeleton className="h-10 w-4/5 bg-gray-200 dark:bg-[#1a1a1a]" />
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#1a1a1a]" />
              <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-[#1a1a1a]" />
              <Skeleton className="h-8 w-32 bg-gray-200 dark:bg-[#1a1a1a]" />
              <Skeleton className="h-40 w-full rounded-2xl bg-gray-200 dark:bg-[#1a1a1a]" />
              <Skeleton className="h-14 w-full rounded-xl bg-gray-200 dark:bg-[#1a1a1a]" />
            </div>
          </div>
        </div>
      </div>
    );

  // ── Pricing ─────────────────────────────────────────────────
  const activeVariant =
    selectedVariant ?? data?.product?.variants?.edges?.[0]?.node;
  const currentPrice = activeVariant?.price?.amount
    ? parseFloat(activeVariant.price.amount)
    : null;
  const comparePrice = activeVariant?.compareAtPrice?.amount
    ? parseFloat(activeVariant.compareAtPrice.amount)
    : null;
  const discountPercent =
    currentPrice && comparePrice && comparePrice > currentPrice
      ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
      : null;

  const rating = 4.8;
  const reviewCount = 191;

  const cleanDescHtml = cleanDesc;

  // A+ image split
  const aplusImages: string[] = productData.aplusImages ?? [];
  const aplusHero    = aplusImages.slice(0, 2);
  const aplusMiddle  = aplusImages.slice(2, 4);
  const aplusClosing = aplusImages.slice(4);

  return (
    <div className="bg-white dark:bg-[#080808] min-h-screen text-gray-900 dark:text-[#F5F0E8] transition-colors duration-300 pb-24 lg:pb-16">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-6 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 lg:gap-16 items-start">

          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-6">
            <ProductCarousel images={data?.product?.images?.edges as ImageEdge[]} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-4 pt-1">

            {/* Review badge */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                      i < Math.floor(rating)
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "fill-gray-200 text-gray-200 dark:fill-[#2a2a2a] dark:text-[#2a2a2a]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">{rating}/5</span>
              <span className="text-xs sm:text-sm text-gray-400 dark:text-[#7A6E62]">· {reviewCount} reviews</span>
            </div>

            {/* Title — name + one-line subhead only */}
            <div className="space-y-1.5">
              {productData?.customHero?.ayushCertified && (
                <div className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800/30 w-fit">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                  AYUSH Certified
                </div>
              )}
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                {productData?.customHero?.headline || data?.product?.title}
              </h1>
              {productData?.customHero?.subhead && (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {productData.customHero.subhead}
                </p>
              )}
            </div>

            {/* Pack selector */}
            <ProductOptions
              Variants={data.product.variants.edges}
              selectedOptions={selectedOptions}
              setSelectedOptions={handleSelectOptions}
              options={data?.product?.options as ProductOption[]}
            />

            {/* At a Glance — compact info table */}
            {productData?.atGlance && (
              <ProductAtGlance items={productData.atGlance} />
            )}

            {/* ── Price + CTA — visible on mobile too, triggers sticky bar on desktop ── */}
            <div ref={ctaRef}>
              {/* Price row */}
              <div className="flex items-baseline gap-2 sm:gap-3 mb-3">
                {discountPercent && (
                  <span className="text-[11px] sm:text-xs font-bold text-white bg-emerald-700 dark:bg-[#C9A84C] dark:text-[#080808] px-1.5 py-0.5 rounded">
                    {discountPercent}% OFF
                  </span>
                )}
                {currentPrice !== null && (
                  <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{currentPrice.toFixed(0)}
                  </span>
                )}
                {comparePrice && (
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ₹{comparePrice.toFixed(0)}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs text-gray-400">Incl. all taxes</span>
              </div>

              {/* Qty + buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center rounded-lg border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111] h-11 sm:h-12 overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 sm:w-10 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                  <span className="w-8 sm:w-9 text-center text-sm font-semibold text-gray-900 dark:text-white select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 sm:w-10 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddtoCart}
                  disabled={!selectedVariant}
                  className="flex-1 h-11 sm:h-12 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-transparent text-gray-800 dark:text-[#B8A99A] hover:border-gray-500 dark:hover:border-[#555] text-xs sm:text-sm font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isAdded ? "Added ✓" : "Add to Cart"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant}
                  className="flex-1 h-11 sm:h-12 rounded-lg bg-[#1a4731] dark:bg-[#C9A84C] text-white dark:text-[#080808] hover:bg-[#0f3321] dark:hover:bg-[#E8C87A] text-xs sm:text-sm font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── KEY BENEFITS (below fold) ──────────────────────────── */}
      {productData?.keyBenefits && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14 border-t border-gray-100 dark:border-[#1e1e1e]">
          <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest text-gray-500 dark:text-[#7A6E62] uppercase mb-4 sm:mb-5 text-center">
            Key Benefits
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {productData.keyBenefits.map((benefit: { icon: string, text: string }, idx: number) => {
              const icons: Record<string, JSX.Element> = {
                Clock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
                Leaf: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>,
                Pill: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path><path d="m8.5 8.5 7 7"></path></svg>,
                Stethoscope: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>,
                Lock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
                CheckCircle: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              };
              return (
                <div key={idx} className="flex flex-col items-center text-center gap-2 p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-[#111111] border border-gray-100 dark:border-[#1e1e1e]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#8b1a30]/10 dark:bg-[#C9A84C]/10 flex items-center justify-center text-[#8b1a30] dark:text-[#C9A84C]">
                    {icons[benefit.icon] || icons.CheckCircle}
                  </div>
                  <span className="text-[11px] sm:text-[13px] text-gray-700 dark:text-gray-300 leading-snug font-medium">
                    {benefit.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── OFFERS & SATISFACTION (below fold) ─────────────────── */}
      {productData.offer && (
        <productData.offer
          offers={productData.offerProps}
          satisfaction={productData.satisfactionProps}
        />
      )}

      {/* ── A+ Images (Hero claims + Ingredients) ─────────────── */}
      {aplusHero.length > 0 && <APlusSection images={aplusHero} />}

      {/* ── INGREDIENTS TABLE ──────────────────────────────────── */}
      {productData.ingredients && (
        <ProductIngredients ingredients={productData.ingredients} />
      )}

      {/* ── HOW TO USE ─────────────────────────────────────────── */}
      {productData.howToUse && (
        <ProductHowToUse
          steps={productData.howToUse.steps}
          whoItsFor={productData.whoItsFor}
        />
      )}

      {/* ── FREQUENTLY BOUGHT ─────────────────────────────────── */}
      {productData.pairedHandles?.length > 0 && (
        <FrequentlyBought
          pairedHandles={productData.pairedHandles}
          mainProductImage={data?.product?.images?.edges?.[0]?.node?.url}
        />
      )}


      {/* ── TESTIMONIALS ──────────────────────────────────────── */}
      {productData.successStories && (
        <productData.successStories testimonials={productData.successStoriesProps} />
      )}

      {/* ── A+ Images (Why Choose + Comparison) ───────────────── */}
      {aplusMiddle.length > 0 && <APlusSection images={aplusMiddle} />}

      {/* ── CUSTOMER REVIEWS ──────────────────────────────────── */}
      {productData.customerReview && (
        <productData.customerReview
          reviews={productData.reviewProps}
          allReviews={productData.allReviewProps}
        />
      )}

      {/* ── A+ Images (How to Use) ─────────────────────────────── */}
      {aplusClosing.length > 0 && <APlusSection images={aplusClosing} />}

      {/* ── YOU MAY ALSO LIKE ─────────────────────────────────── */}
      <YouMayLike currentHandle={params.handle as string} />

      {/* ── FAQ ───────────────────────────────────────────────── */}
      {productData.faq && (
        <productData.faq faqs={productData.faqProps} />
      )}

      {/* ── OUR PROMISE ───────────────────────────────────────── */}
      {productData.cta && (
        <productData.cta promises={productData.ctaProps} />
      )}

      {/* ── STICKY CART BAR ───────────────────────────────────── */}
      <StickyCartBar
        onAddToCart={handleAddtoCart}
        onBuyNow={handleBuyNow}
        isAdded={isAdded}
        isDisabled={!selectedVariant}
        quantity={quantity}
        onQuantityChange={setQuantity}
        triggerRef={ctaRef}
      />
    </div>
  );
};

export default Product;
