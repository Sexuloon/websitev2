"use client";

import { GET_PRODUCTS_BY_HANDLES } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { useCartActions } from "@/lib/atoms/cart";
import { Star, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string };
};

type PairedProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string } };
  variants: { edges: { node: Variant }[] };
};

function PairedProductCard({ product }: { product: PairedProduct }) {
  const { addItem } = useCartActions();
  const variants = product.variants.edges.map((e) => e.node);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);
  const [isAdded, setIsAdded] = useState(false);

  const price = parseFloat(
    selectedVariant?.price?.amount ?? product.priceRange.minVariantPrice.amount
  );
  const compare = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : product.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const discount =
    compare && compare > price
      ? Math.round(((compare - price) / compare) * 100)
      : null;

  const handleAdd = () => {
    if (!selectedVariant?.id) return;
    addItem(selectedVariant.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#1e1e1e] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      {/* Large Product Image */}
      <Link href={`/product/${product.handle}`} className="block">
        <div className="relative w-full aspect-square bg-gray-50 dark:bg-[#1a1a1a] overflow-hidden">
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-[#1e1e1e]" />
          )}
          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
            <span className="text-xs font-bold text-gray-800 dark:text-[#C9A84C]">4.8</span>
          </div>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <Link href={`/product/${product.handle}`}>
          <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F0E8] leading-snug line-clamp-2 hover:text-[#8b1a30] dark:hover:text-[#C9A84C] transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Pack Selector */}
        {variants.length > 1 && (
          <div className="flex gap-1.5 flex-wrap">
            {variants.slice(0, 3).map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                  selectedVariant.id === v.id
                    ? "bg-[#1a4731] dark:bg-[#C9A84C] text-white dark:text-[#080808] border-transparent shadow-sm"
                    : "border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-[#7A6E62] hover:border-gray-400 dark:hover:border-[#444] bg-white dark:bg-transparent"
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ₹{price.toFixed(0)}
          </span>
          {compare && (
            <span className="text-xs text-gray-400 line-through">
              ₹{compare.toFixed(0)}
            </span>
          )}
          {discount && (
            <span className="text-xs font-bold text-emerald-700 dark:text-[#C9A84C]">
              {discount}% off
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          disabled={!selectedVariant?.availableForSale}
          className={`w-full h-11 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-[#1a4731] hover:bg-[#0f3321] dark:bg-[#1a4731] dark:hover:bg-[#0f3321] text-white"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}

export default function FrequentlyBought({
  pairedHandles,
}: {
  pairedHandles: string[];
  mainProductImage?: string;
}) {
  const queryString = pairedHandles.map((h) => `handle:${h}`).join(" OR ");
  const { data, isLoading } = useStorefrontQuery<{
    products: { edges: { node: PairedProduct }[] };
  }>(["paired-products", ...pairedHandles], {
    query: GET_PRODUCTS_BY_HANDLES,
    variables: { query: queryString, first: 4 },
    enabled: pairedHandles.length > 0,
  });

  const products = data?.products?.edges ?? [];
  if (isLoading || products.length === 0) return null;

  return (
    <section className="w-full bg-white dark:bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-100 dark:border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#8b1a30] dark:text-[#C9A84C] uppercase mb-2">
            Frequently Bought
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Better Together
          </h2>
        </div>

        {/* Product grid — Bold Care style: 2 cols on mobile, up to 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {products.slice(0, 3).map(({ node }) => (
            <PairedProductCard key={node.id} product={node} />
          ))}
        </div>
      </div>
    </section>
  );
}
