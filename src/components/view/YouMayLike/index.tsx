"use client";

import { GET_ALL_PRODUCTS_QUERY } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { useCartActions } from "@/lib/atoms/cart";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: { amount: string };
  compareAtPrice?: { amount: string };
};

type RelatedProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: { url: string; altText?: string };
  priceRange: { minVariantPrice: { amount: string } };
  compareAtPriceRange?: { minVariantPrice: { amount: string } };
  variants: { edges: { node: Variant }[] };
};

function ProductCard({ product }: { product: RelatedProduct }) {
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
    compare && compare > price ? Math.round(((compare - price) / compare) * 100) : null;

  const packLabel = (title: string, i: number) => {
    const num = title?.match?.(/^(\d+)/);
    return num ? num[1] : String(i + 1);
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!selectedVariant?.id) return;
    addItem(selectedVariant.id, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group flex flex-col bg-[#111111] rounded-2xl border border-[#262626] overflow-hidden hover:border-[#C9A84C]/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)] transition-all duration-300">
      {/* Image */}
      <Link href={`/product/${product.handle}`} className="block relative">
        {/* Rating badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#080808]/80 backdrop-blur-sm rounded-full px-2.5 py-1 border border-[#262626]">
          <Star className="w-3 h-3 fill-[#C9A84C] text-[#C9A84C]" />
          <span className="text-xs font-bold text-white font-mono-num">4.8</span>
        </div>

        {/* Discount badge */}
        {discount && (
          <div className="absolute top-3 right-3 z-10 bg-[#1a4731] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {discount}% off
          </div>
        )}

        <div className="aspect-square bg-[#1a1a1a] overflow-hidden">
          {product.featuredImage?.url ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              width={400}
              height={400}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#1e1e1e]" />
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <Link href={`/product/${product.handle}`}>
          <h3 className="text-sm font-semibold text-[#F5F0E8] leading-snug line-clamp-2 group-hover:text-[#E8C87A] transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Pack selector */}
        {variants.length > 1 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-[#7A6E62]">Pack</span>
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
        <div className="mt-auto">
          <p className="text-lg font-bold text-white font-mono-num">₹{price.toFixed(0)}</p>
          {compare && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#7A6E62] line-through font-mono-num">
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
    </div>
  );
}

export default function YouMayLike({ currentHandle }: { currentHandle: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useStorefrontQuery<{
    products: { edges: { node: RelatedProduct }[] };
  }>(["you-may-like", currentHandle], {
    query: GET_ALL_PRODUCTS_QUERY,
    variables: { first: 12 },
  });

  const products = (data?.products?.edges ?? [])
    .map((e) => e.node)
    .filter((p) => p.handle !== currentHandle)
    .slice(0, 6);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  if (isLoading || products.length === 0) return null;

  return (
    <section className="py-16 bg-[#080808] border-t border-[#1e1e1e]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#C9A84C] uppercase mb-2">
              Explore More
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              You May Also Like
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#262626] bg-[#111111] flex items-center justify-center hover:border-[#C9A84C]/50 text-[#7A6E62] hover:text-[#C9A84C] transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#262626] bg-[#111111] flex items-center justify-center hover:border-[#C9A84C]/50 text-[#7A6E62] hover:text-[#C9A84C] transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable grid */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 no-scrollbar scroll-smooth"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-56 sm:w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
