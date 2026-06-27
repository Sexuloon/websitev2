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
import { Minus, Plus, ShieldCheck, Truck, Zap, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { dynamicComponent } from "@/lib/dynamicComponent";

const TRUST_SIGNALS = [
  { icon: Truck,       label: "Free Delivery" },
  { icon: ShieldCheck, label: "100% Natural" },
  { icon: Zap,         label: "Fast Results" },
];

const Product = () => {
  const params = useParams();
  const { addItem, cart } = useCartActions();
  const heroRef = useRef<HTMLDivElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const productData = dynamicComponent(params.handle as string);

  const { data, isLoading } = useStorefrontQuery<GetProductByHandleQuery>(
    ["product", params.handle],
    {
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: params.handle },
    }
  );

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
    // Navigate to checkout URL from cart state
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  // ── Loading skeleton ────────────────────────────────────────
  if (isLoading)
    return (
      <div className="bg-[#080808] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-3">
              <Skeleton className="h-[480px] w-full rounded-2xl bg-[#1a1a1a]" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-16 rounded-xl bg-[#1a1a1a]" />
                ))}
              </div>
            </div>
            <div className="space-y-6 pt-4">
              <Skeleton className="h-10 w-4/5 bg-[#1a1a1a]" />
              <Skeleton className="h-4 w-full bg-[#1a1a1a]" />
              <Skeleton className="h-4 w-3/4 bg-[#1a1a1a]" />
              <Skeleton className="h-8 w-32 bg-[#1a1a1a]" />
              <Skeleton className="h-40 w-full rounded-2xl bg-[#1a1a1a]" />
              <Skeleton className="h-14 w-full rounded-xl bg-[#1a1a1a]" />
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

  // A+ image split: first 2 after hero, rest after testimonials
  const aplusImages: string[] = productData.aplusImages ?? [];
  const aplusHero    = aplusImages.slice(0, 2);  // after hero / before frequently bought
  const aplusMiddle  = aplusImages.slice(2, 4);  // after testimonials / before reviews
  const aplusClosing = aplusImages.slice(4);      // after reviews / before FAQ

  return (
    <div className="bg-[#080808] min-h-screen text-[#F5F0E8]">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div ref={heroRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: Gallery */}
          <div className="lg:sticky lg:top-6">
            <ProductCarousel images={data?.product?.images?.edges as ImageEdge[]} />
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6 pt-1">

            {/* Title */}
            <div className="space-y-2.5">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                {data?.product?.title}
              </h1>
              {data?.product?.descriptionHtml && (
                <div
                  className="text-[#B8A99A] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
                />
              )}
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-2.5">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "fill-[#C9A84C] text-[#C9A84C]"
                        : "fill-[#2a2a2a] text-[#2a2a2a]"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-white font-mono-num">{rating}</span>
              <span className="text-sm text-[#7A6E62]">({reviewCount} reviews)</span>
            </div>

            {/* Price block */}
            {currentPrice !== null && (
              <div className="rounded-2xl bg-[#111111] border border-[#262626] p-4 space-y-1.5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  {discountPercent && (
                    <span className="text-xs font-bold text-[#080808] bg-[#C9A84C] px-2.5 py-1 rounded-md">
                      {discountPercent}% OFF
                    </span>
                  )}
                  <span className="text-3xl font-bold text-white font-mono-num">
                    ₹{currentPrice.toFixed(0)}
                  </span>
                  {comparePrice && (
                    <span className="text-base text-[#7A6E62] line-through font-mono-num">
                      ₹{comparePrice.toFixed(0)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#7A6E62]">Inclusive of all taxes</p>
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-[#1e1e1e]" />

            {/* Pack selector */}
            <ProductOptions
              Variants={data.product.variants.edges}
              selectedOptions={selectedOptions}
              setSelectedOptions={handleSelectOptions}
              options={data?.product?.options as ProductOption[]}
            />

            {/* Satisfaction stats (inline) */}
            {productData.offer && (
              <productData.offer
                offers={productData.offerProps}
                satisfaction={productData.satisfactionProps}
              />
            )}

            {/* Divider */}
            <div className="h-px bg-[#1e1e1e]" />

            {/* Quantity + Add to Cart + Buy Now */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-widest text-[#7A6E62] uppercase">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                {/* Quantity stepper */}
                <div className="flex items-center rounded-xl border border-[#262626] bg-[#111111] h-13 overflow-hidden shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-13 flex items-center justify-center text-[#B8A99A] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-sm font-bold text-white select-none font-mono-num">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-13 flex items-center justify-center text-[#B8A99A] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddtoCart}
                  disabled={!selectedVariant}
                  className="flex-1 h-13 rounded-xl border border-[#1a4731] text-[#1a4731] bg-transparent text-sm font-bold tracking-wide hover:bg-[#1a4731]/10 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isAdded ? "Added to Cart ✓" : "ADD TO CART"}
                </button>

                {/* Buy Now */}
                <button
                  onClick={handleBuyNow}
                  disabled={!selectedVariant}
                  className="flex-1 h-13 rounded-xl bg-[#1a4731] text-white text-sm font-bold tracking-wide hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(26,71,49,0.35)]"
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Trust signals */}
            <div className="flex items-center gap-6 pt-1 flex-wrap">
              {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#C9A84C]" />
                  <span className="text-xs text-[#7A6E62] font-medium">{label}</span>
                </div>
              ))}
            </div>
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
        heroRef={heroRef}
        productTitle={data?.product?.title}
        currentPrice={currentPrice}
      />
    </div>
  );
};

export default Product;
