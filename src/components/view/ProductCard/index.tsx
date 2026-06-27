"use client";
import { useState } from "react";
import { Product } from "@/types/shopify-graphql";
import Image from "next/image";
import { useCartActions } from "@/lib/atoms/cart";
import Link from "next/link";
import { Star } from "lucide-react";

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCartActions();
  const [isAdded, setIsAdded] = useState(false);

  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const comparePrice = product.variants?.edges?.[0]?.node?.compareAtPrice?.amount
    ? parseFloat(product.variants.edges[0].node.compareAtPrice.amount)
    : null;

  const discount = comparePrice && comparePrice > minPrice
    ? Math.round(((comparePrice - minPrice) / comparePrice) * 100)
    : maxPrice > minPrice
    ? Math.round(((maxPrice - minPrice) / maxPrice) * 100)
    : null;

  const handleAddtoCart = () => {
    const variantId = product.variants?.edges?.[0]?.node?.id;
    if (!variantId) return;
    addItem(variantId, 1);
    setIsAdded(true);
    const id = setTimeout(() => setIsAdded(false), 1200);
    return () => clearTimeout(id);
  };

  return (
    <div className="group w-full">
      <div className="border border-gray-200 dark:border-[#262626] rounded-2xl overflow-hidden bg-white dark:bg-[#111111] shadow-sm dark:shadow-none hover:border-[#C9A84C]/50 dark:hover:border-[#C9A84C]/30 hover:shadow-[0_4px_24px_rgba(201,168,76,0.12)] dark:hover:shadow-[0_0_24px_rgba(201,168,76,0.08)] transition-all duration-300">
        <Link prefetch href={`/product/${product.handle}`}>
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-[#1a1a1a]">
            <Image
              src={product.featuredImage?.url || "/placeholder.png"}
              alt={product.featuredImage?.altText ?? product.title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
            />
            {/* Discount Badge */}
            {discount && discount > 0 && (
              <div className="absolute top-2.5 right-2.5 bg-[#1a4731] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-4">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 5 ? "fill-[#C9A84C] text-[#C9A84C]" : "fill-gray-200 text-gray-200 dark:fill-[#2a2a2a] dark:text-[#2a2a2a]"}`} />
              ))}
              <span className="text-[11px] text-gray-500 dark:text-[#7A6E62] ml-1">4.8</span>
            </div>

            <h3 className="font-semibold text-sm text-gray-900 dark:text-[#F5F0E8] mb-2 line-clamp-2 group-hover:text-[#C9A84C] dark:group-hover:text-[#E8C87A] transition-colors duration-200">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-base text-gray-900 dark:text-white font-mono-num">
                ₹{minPrice.toFixed(0)}
              </span>
              {comparePrice && comparePrice > minPrice && (
                <span className="text-gray-500 dark:text-[#7A6E62] line-through text-xs font-mono-num">
                  ₹{comparePrice.toFixed(0)}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Add to Cart */}
        <div className="px-4 pb-4">
          <button
            disabled={!product.variants?.edges?.[0]?.node?.id}
            onClick={handleAddtoCart}
            className="w-full py-2.5 bg-[#1a4731] text-white rounded-xl text-sm font-bold hover:bg-[#143828] active:scale-[0.98] transition-all disabled:opacity-40"
          >
            {isAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
