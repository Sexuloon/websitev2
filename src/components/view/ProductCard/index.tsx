"use client";

import { Button } from "@/components/ui/button";
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
      className="flex flex-col gap-2 cursor-pointer w-full max-w-sm mx-auto"
    >
      
       {/* Image */}
      <div className="relative
        w-[85vw] h-[320px]                /* Default mobile */
        sm:w-[280px] sm:h-[320px]         /* Small screens */
        md:w-[300px] md:h-[340px]         /* Medium screens */
        lg:w-[320px] lg:h-[360px]         /* Large screens */
        xl:w-[350px] xl:h-[380px]         /* Extra-large screens */
        rounded-lg overflow-hidden border border-transparent -ml-6 sm:mx-auto bg-transparent mx-auto"
      >
        <Image
          src={product.featuredImage?.url ?? "/placeholder.png"}
          alt={product.featuredImage?.altText ?? "Product image"}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 768px) 280px, (max-width: 1024px) 300px, (max-width: 1280px) 320px, 350px"
          className="object-contain"
        />
      </div>


      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-900 leading-snug">
        {product.title}
      </h1>

      {/* Price */}
      <div className="text-sm text-gray-700">
        <ProductPrice priceRange={product.priceRange} />
      </div>

      {/* Button */}
      <Button className="w-full mt-1 p-2">Add to Cart</Button>
    </div>
  );
};

export default ProductCard;
