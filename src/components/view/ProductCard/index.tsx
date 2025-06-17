"use client";

import { Product } from "@/types/shopify-graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductPrice from "./ProductPrice";

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  return (
    <div
      role="button"
      onClick={() => router.push(`/product/${product.handle}`)}
      className="flex flex-col gap-2 cursor-pointer w-full max-w-md   mx-auto p-3"
    >
      <div
        key={product.id}
        className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative h-96 overflow-hidden">
          <Image
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText ?? "Product image"}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-0 right-0 bg-blue-600 text-white font-medium px-3 py-1 rounded-bl-lg">
           {Math.floor(Math.random()*100)}% OFF
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg text-gray-900">
              <ProductPrice priceRange={product.priceRange} />
            </span>
            <span className="text-gray-500 line-through text-sm">
              <ProductPrice priceRange={product.priceRange} />
            </span>
          </div>
          <h3 className="font-medium text-xl mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

          <div className="flex gap-3">
            <button className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
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
              Add to Cart
            </button>
            <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center shadow-sm">
              Buy Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
