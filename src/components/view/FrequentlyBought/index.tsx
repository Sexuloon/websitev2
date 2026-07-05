"use client";

import { GET_PRODUCTS_BY_HANDLES } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { useCartActions } from "@/lib/atoms/cart";
import { Star } from "lucide-react";
import Image from "next/image";
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
  const [selectedVariant] = useState<Variant>(variants[0]);
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
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-[#262626] p-5 flex flex-col gap-4 hover:border-emerald-300 dark:hover:border-[#C9A84C]/30 transition-all duration-300 shadow-sm dark:shadow-none">
      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
        <span className="text-sm font-bold text-gray-900 dark:text-[#C9A84C] font-mono-num">4.8</span>
      </div>

      {/* Product Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#1e1e1e] flex items-center justify-center">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            width={240}
            height={240}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-[#1e1e1e]" />
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-gray-900 dark:text-[#F5F0E8] leading-snug line-clamp-2">
        {product.title}
      </p>


      {/* Price */}
      <div>
        <span className="text-xl font-bold text-gray-900 dark:text-white font-mono-num">₹{price.toFixed(0)}</span>
        {compare && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-500 dark:text-[#7A6E62] line-through font-mono-num">
              ₹{compare.toFixed(0)}
            </span>
            {discount && (
              <span className="text-xs font-bold text-emerald-700 dark:text-[#C9A84C]">{discount}% off</span>
            )}
          </div>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={!selectedVariant?.availableForSale}
        className="w-full h-11 rounded-xl bg-[#1a4731] text-white hover:bg-[#0f3321] dark:bg-[#1a4731] dark:hover:bg-[#143828] text-sm font-bold active:scale-[0.98] transition-all disabled:opacity-40"
      >
        {isAdded ? "Added ✓" : "Add to Cart"}
      </button>
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
    <section className="bg-gray-50 dark:bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-[#1e1e1e] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-[#C9A84C] uppercase mb-3">
            Frequently Bought
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Better Together
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.slice(0, 3).map(({ node }) => (
            <PairedProductCard key={node.id} product={node} />
          ))}
        </div>
      </div>
    </section>
  );
}
