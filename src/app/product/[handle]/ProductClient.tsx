"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductCarousel from "@/components/view/ProductCarousel";
import ProductOptions from "@/components/view/ProductOptions";
import StickyCartBar from "@/components/view/StickyCartBar";
import FrequentlyBought from "@/components/view/FrequentlyBought";
import YouMayLike from "@/components/view/YouMayLike";
import APlusSection from "@/components/view/APlusSection";
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

  const handleBuyNow = () => {
    if (!selectedVariant) return;
    addItem(selectedVariant.id, quantity);
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-6">
            <ProductCarousel images={data?.product?.images?.edges as ImageEdge[]} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-5 pt-1">

            {/* Review badge */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "fill-gray-200 text-gray-200 dark:fill-[#2a2a2a] dark:text-[#2a2a2a]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">{rating}/5</span>
              <span className="text-sm text-gray-400 dark:text-[#7A6E62]">· {reviewCount} reviews</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              {data?.product?.title}
            </h1>

            {/* Pack selector */}
            <ProductOptions
              Variants={data.product.variants.edges}
              selectedOptions={selectedOptions}
              setSelectedOptions={handleSelectOptions}
              options={data?.product?.options as ProductOption[]}
            />

            {/* ── Desktop CTA (inline) — triggers sticky bar when scrolled out ── */}
            <div ref={ctaRef} className="hidden lg:block">
              {/* Price row */}
              <div className="flex items-baseline gap-3 mb-4">
                {discountPercent && (
                  <span className="text-xs font-bold text-white bg-emerald-700 dark:bg-[#C9A84C] dark:text-[#080808] px-2 py-0.5 rounded">
                    {discountPercent}% OFF
                  </span>
                )}
                {currentPrice !== null && (
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{currentPrice.toFixed(0)}
                  </span>
                )}
                {comparePrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{comparePrice.toFixed(0)}
                  </span>
                )}
                <span className="text-xs text-gray-400">Incl. all taxes</span>
              </div>

              {/* Qty + buttons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#111] h-12 overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-sm font-semibold text-gray-900 dark:text-white select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddtoCart}
                  disabled={!selectedVariant}
                  className="flex-1 h-12 rounded-lg border border-gray-300 dark:border-[#333] bg-white dark:bg-transparent text-gray-800 dark:text-[#B8A99A] hover:border-gray-500 dark:hover:border-[#555] text-sm font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant}
                  className="flex-1 h-12 rounded-lg bg-[#1a4731] dark:bg-[#C9A84C] text-white dark:text-[#080808] hover:bg-[#0f3321] dark:hover:bg-[#E8C87A] text-sm font-semibold tracking-wide active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Description — sanitised client-side with DOMParser */}
            {cleanDescHtml && (
              <div
                className="product-description"
                dangerouslySetInnerHTML={{ __html: cleanDescHtml }}
              />
            )}

            {/* Satisfaction stats */}
            {productData.offer && (
              <productData.offer
                offers={productData.offerProps}
                satisfaction={productData.satisfactionProps}
              />
            )}

          </div>
        </div>
      </div>

      {/* ── A+ Images (Hero claims + Ingredients) ─────────────── */}
      {aplusHero.length > 0 && <APlusSection images={aplusHero} />}

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
