"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductCarousel from "@/components/view/ProductCarousel";
import ProductOptions from "@/components/view/ProductOptions";
import StickyCartBar from "@/components/view/StickyCartBar";
import FrequentlyBought from "@/components/view/FrequentlyBought";
import YouMayLike from "@/components/view/YouMayLike";
import { GET_PRODUCT_BY_HANDLE_QUERY } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { useCartActions } from "@/lib/atoms/cart";
import {
  GetProductByHandleQuery,
  ImageEdge,
  ProductOption,
  ProductVariant,
} from "@/types/shopify-graphql";
import { Minus, Plus, Shield, Star, Truck, Zap } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { dynamicComponent } from "@/lib/dynamicComponent";

const TRUST_SIGNALS = [
  { icon: Truck, label: "Free Delivery" },
  { icon: Shield, label: "100% Natural" },
  { icon: Zap, label: "Fast Results" },
];

const Product = () => {
  const params = useParams();
  const { addItem } = useCartActions();
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

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-3">
            <Skeleton className="h-[520px] w-full rounded-3xl" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 w-20 rounded-xl" />)}
            </div>
          </div>
          <div className="space-y-6 pt-4">
            <Skeleton className="h-10 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-full" />
          </div>
        </div>
      </div>
    );

  // Pricing
  const activeVariant = selectedVariant ?? data?.product?.variants?.edges?.[0]?.node;
  const currentPrice = activeVariant?.price?.amount ? parseFloat(activeVariant.price.amount) : null;
  const comparePrice = activeVariant?.compareAtPrice?.amount ? parseFloat(activeVariant.compareAtPrice.amount) : null;
  const discountPercent = currentPrice && comparePrice && comparePrice > currentPrice
    ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
    : null;

  const rating = 4.6;
  const reviewCount = 191;

  return (
    <div className="bg-white min-h-screen">

      {/* ─── HERO ─── */}
      <div ref={heroRef} className="max-w-6xl mx-auto px-6 lg:px-8 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Left: Gallery ── */}
          <div className="lg:sticky lg:top-6">
            <ProductCarousel images={data?.product?.images?.edges as ImageEdge[]} />
          </div>

          {/* ── Right: Product Info ── */}
          <div className="flex flex-col gap-6 pt-2">

            {/* Title + Description */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {data?.product?.title}
              </h1>
              {data?.product?.descriptionHtml && (
                <div
                  className="text-gray-500 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.product.descriptionHtml }}
                />
              )}
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">{rating}</span>
              <span className="text-sm text-gray-400">({reviewCount} reviews)</span>
            </div>

            {/* Price */}
            {currentPrice !== null && (
              <div className="space-y-1">
                <div className="flex items-baseline gap-3 flex-wrap">
                  {discountPercent && (
                    <span className="text-sm font-bold text-white bg-[#1a4731] px-2.5 py-1 rounded-md">
                      {discountPercent}% OFF
                    </span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{currentPrice.toFixed(0)}
                  </span>
                  {comparePrice && (
                    <span className="text-base text-gray-400 line-through">₹{comparePrice.toFixed(0)}</span>
                  )}
                </div>
                <p className="text-xs text-gray-400">Inclusive of all taxes</p>
              </div>
            )}

            <div className="h-px bg-gray-100" />

            {/* Pack Selector */}
            <ProductOptions
              Variants={data.product.variants.edges}
              selectedOptions={selectedOptions}
              setSelectedOptions={handleSelectOptions}
              options={data?.product?.options as ProductOption[]}
            />

            {/* Quantity + Add to Cart */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold tracking-widest text-gray-400 uppercase">
                Quantity
              </p>
              <div className="flex items-center gap-3">
                {/* Quantity pill */}
                <div className="flex items-center rounded-full border border-gray-200 h-12">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-gray-900 select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-11 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddtoCart}
                  disabled={!selectedVariant}
                  className="flex-1 h-12 rounded-full bg-[#1a4731] text-white text-sm font-semibold tracking-wide hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-[#1a4731]/20"
                >
                  {isAdded ? "Added to Cart ✓" : "ADD TO CART"}
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center gap-6 pt-1">
              {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#1a4731]" />
                  <span className="text-xs text-gray-500 font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* Satisfaction Stats */}
            {productData.offer && (
              <productData.offer
                offers={productData.offerProps}
                satisfaction={productData.satisfactionProps}
              />
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bar */}
      <StickyCartBar
        onAddToCart={handleAddtoCart}
        isAdded={isAdded}
        isDisabled={!selectedVariant}
        quantity={quantity}
        onQuantityChange={setQuantity}
        heroRef={heroRef}
      />

      {/* ─── FREQUENTLY BOUGHT TOGETHER ─── */}
      {productData.pairedHandles?.length > 0 && (
        <FrequentlyBought
          pairedHandles={productData.pairedHandles}
          mainProductImage={data?.product?.images?.edges?.[0]?.node?.url}
        />
      )}

      {/* ─── BANNER IMAGE ─── */}
      {productData.bannerImg && (
        <div className="w-full">
          <Image
            src={productData.bannerImg}
            alt="Product Banner"
            layout="responsive"
            width={1920}
            height={1080}
            className="object-contain"
            priority
          />
        </div>
      )}

      {/* ─── TESTIMONIALS ─── */}
      {productData.successStories && (
        <div className="border-t border-gray-100">
          <productData.successStories testimonials={productData.successStoriesProps} />
        </div>
      )}

      {/* ─── CUSTOMER REVIEWS ─── */}
      {productData.customerReview && (
        <div className="border-t border-gray-100">
          <productData.customerReview
            reviews={productData.reviewProps}
            allReviews={productData.allReviewProps}
          />
        </div>
      )}

      {/* ─── YOU MAY ALSO LIKE ─── */}
      <YouMayLike currentHandle={params.handle as string} />

      {/* ─── FAQ ─── */}
      {productData.faq && (
        <div className="border-t border-gray-100">
          <productData.faq faqs={productData.faqProps} />
        </div>
      )}

      {/* ─── FEATURE IMAGE ─── */}
      {productData.featureImg && (
        <div className="w-full">
          <Image
            src={productData.featureImg}
            alt="Product Features"
            layout="responsive"
            width={1920}
            height={1080}
            className="object-contain"
          />
        </div>
      )}

      {/* ─── OUR PROMISE ─── */}
      {productData.cta && (
        <div className="border-t border-gray-100">
          <productData.cta promises={productData.ctaProps} />
        </div>
      )}
    </div>
  );
};

export default Product;
