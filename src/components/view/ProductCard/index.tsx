"use client";
import { useState } from "react";
import { Product } from "@/types/shopify-graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartActions } from "@/lib/atoms/cart";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { addItem } = useCartActions();
  const [isAdded, setIsAdded] = useState(false);
  const discountPercentage = Math.floor(Math.random() * 30) + 10;

  // console.log("p1", product.variants.edges[2].node.id)

  const discountPercent = (min: number, original: number) => {
    const amount = Math.floor((min - original) / 100);
    return amount;
  };

  const handleAddtoCart = () => {
    if (product.variants.edges[0].node.id) {
      addItem(product.variants.edges[2].node.id, 1);
      setIsAdded(true);
    }
    if (!product.variants.edges[0].node.id) {
      window.location.reload();
      return;
    }
    const id = setTimeout(() => {
      setIsAdded(false);
    }, 1000);
    return () => clearTimeout(id);
  };

  return (
    <div className="group cursor-pointer w-full">
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        <div
          onClick={() => router.push(`/product/${product.handle}`)}
          className="relative aspect-square overflow-hidden"
        >
          <Image
            src={product.featuredImage?.url || "/placeholder.png"}
            alt={product.featuredImage?.altText ?? product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />

          {/* Discount Badge */}
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            {discountPercent(
              product.priceRange.maxVariantPrice.amount,
              product.priceRange.minVariantPrice.amount
            )}
            % OFF
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-4">
          {/* Title */}
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {product.title}
          </h3>

          {/* Description - Only show on larger screens */}
          {product.description && (
            <p className="hidden sm:block text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          {/* Price Section */}
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-sm sm:text-lg text-gray-900">
              ₹ {product.priceRange.minVariantPrice.amount}
            </span>
            {/* Original Price (calculated) - Only show if there's a meaningful difference */}
            <span className="text-gray-500 line-through text-xs sm:text-sm">
              ₹
              {(
                (parseFloat(product.priceRange.minVariantPrice.amount) *
                  (100 + discountPercentage)) /
                100
              ).toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              disabled={!product.variants.edges[0].node.id}
              onClick={handleAddtoCart}
              className="flex-1 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {isAdded ? "Adding to cart... " : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
