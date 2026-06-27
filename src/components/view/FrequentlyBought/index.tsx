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
    setTimeout(() => setIsAdded(false), 1500);
  };

  const packLabel = (title: string, i: number) => {
    const num = title.match(/^(\d+)/);
    return num ? num[1] : String(i + 1);
  };

  return (
    <div className="bg-[#111111] rounded-2xl border border-[#262626] p-5 flex flex-col gap-4 hover:border-[#C9A84C]/30 transition-all duration-300">
      {/* Rating */}
      <div className="flex items-center gap-1.5">
        <Star className="w-3.5 h-3.5 fill-[#C9A84C] text-[#C9A84C]" />
        <span className="text-sm font-bold text-[#C9A84C] font-mono-num">4.8</span>
      </div>

      {/* Product Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#1e1e1e] flex items-center justify-center">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            width={240}
            height={240}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full bg-[#1e1e1e]" />
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-[#F5F0E8] leading-snug line-clamp-2">
        {product.title}
      </p>

      {/* Pack selector */}
      {variants.length > 1 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#7A6E62] mr-1">Pack</span>
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-all border ${
                selectedVariant?.id === v.id
                  ? "bg-[#1a4731] text-white border-[#1a4731]"
                  : "bg-[#1a1a1a] text-[#B8A99A] border-[#262626] hover:border-[#C9A84C]/40"
              }`}
            >
              {packLabel(v.title, i)}
            </button>
          ))}
        </div>
      )}

      {/* Price */}
      <div>
        <span className="text-xl font-bold text-white font-mono-num">₹{price.toFixed(0)}</span>
        {compare && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-[#7A6E62] line-through font-mono-num">
              ₹{compare.toFixed(0)}
            </span>
            {discount && (
              <span className="text-xs font-bold text-[#C9A84C]">{discount}% off</span>
            )}
          </div>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={!selectedVariant?.availableForSale}
        className="w-full h-11 rounded-xl bg-[#1a4731] text-white text-sm font-bold hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40"
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
    <section className="bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase mb-3">
            Frequently Bought
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
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
