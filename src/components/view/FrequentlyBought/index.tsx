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

  const price = parseFloat(selectedVariant?.price?.amount ?? product.priceRange.minVariantPrice.amount);
  const compare = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : product.compareAtPriceRange?.minVariantPrice?.amount
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const discount = compare && compare > price
    ? Math.round(((compare - price) / compare) * 100)
    : null;

  const handleAdd = () => {
    if (!selectedVariant?.id) return;
    addItem(selectedVariant.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  // Parse pack label: "2 Packs" → "2", "1 Pack" → "1", fallback to index
  const packLabel = (title: string, i: number) => {
    const num = title.match(/^(\d+)/);
    return num ? num[1] : String(i + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4">
      {/* Rating */}
      <div className="flex items-center gap-1">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span className="text-sm font-semibold text-gray-800">4.5</span>
      </div>

      {/* Product Image */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            width={240}
            height={240}
            className="w-full h-full object-contain p-4"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-xl" />
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
        {product.title}
      </p>

      {/* Pack Selector */}
      {variants.length > 1 && (
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 mr-1">Pack</span>
          {variants.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setSelectedVariant(v)}
              className={`w-7 h-7 rounded-md text-xs font-semibold transition-all border ${
                selectedVariant?.id === v.id
                  ? "bg-[#1a4731] text-white border-[#1a4731]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {packLabel(v.title, i)}
            </button>
          ))}
        </div>
      )}

      {/* Price */}
      <div>
        <span className="text-xl font-bold text-gray-900">₹{price.toFixed(0)}</span>
        {compare && (
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-400 line-through">₹{compare.toFixed(0)}</span>
            {discount && (
              <span className="text-sm font-semibold text-[#1a4731]">{discount}% off</span>
            )}
          </div>
        )}
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={!selectedVariant?.availableForSale}
        className="w-full h-11 rounded-xl bg-[#1a4731] text-white text-sm font-semibold hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40"
      >
        {isAdded ? "Added to Cart ✓" : "Add to Cart"}
      </button>
    </div>
  );
}

export default function FrequentlyBought({
  pairedHandles,
  mainProductImage,
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
    <section className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Lifestyle / main product image */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50">
            {mainProductImage ? (
              <Image
                src={mainProductImage}
                alt="Frequently Bought Together"
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Product Image</div>
              </div>
            )}
          </div>

          {/* Right: Products */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-[#1a4731] uppercase mb-1">
                Frequently Bought
              </p>
              <h2 className="text-3xl font-bold text-gray-900">Better Together</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {products.slice(0, 2).map(({ node }) => (
                <PairedProductCard key={node.id} product={node} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
