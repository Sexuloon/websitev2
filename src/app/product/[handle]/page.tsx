"use client";

import { Button } from "@/components/ui/button";
import OffersAndSatisfaction from "@/components/ui/offer";
import { Skeleton } from "@/components/ui/skeleton";
import TestimonialCarousel from '@/components/ui/testimonials';
import ProductCarousel from "@/components/view/ProductCarousel";
import ProductOptions from "@/components/view/ProductOptions";
import { GET_PRODUCT_BY_HANDLE_QUERY } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { useCartActions } from "@/lib/atoms/cart";
import {
  GetProductByHandleQuery,
  ImageEdge,
  ProductOption,
  ProductVariant,
} from "@/types/shopify-graphql";
import { useParams } from "next/navigation";
import { useState } from "react";

const Product = () => {
  const params = useParams();
  const { addItem } = useCartActions();

  // States
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [isAdded, setIsAdded] = useState(false);

  const handleSelectOptions = (options: Record<string, string>) => {
    const variant = data?.product?.variants?.edges.find((variant) => {
      return Object.keys(options).every((key) => {
        return variant.node.selectedOptions.some(
          (option) => option.name === key && option.value === options[key]
        );
      });
    });
    setSelectedVariant(variant?.node as ProductVariant);
    setSelectedOptions(options);
  };

  const { data, isLoading } = useStorefrontQuery<GetProductByHandleQuery>(
    ["product", params.handle],
    {
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: params.handle },
    }
  );

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        {/* Mobile: Stack vertically, Tablet+: Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Image skeleton */}
          <div className="w-full">
            <Skeleton className="h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-lg" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );

  const handleAddtoCart = () => {
    if (selectedVariant) {
      addItem(selectedVariant.id, 1);
      setIsAdded(true);
    }
    if (!selectedVariant) {
      window.location.reload();
      return;
    }
    const id = setTimeout(() => {
      setIsAdded(false);
    }, 1000);
    return () => clearTimeout(id);
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
      {/* Responsive grid: Stack on mobile, side-by-side on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 xl:gap-12">
        {/* Product Images */}
        <div className="order-1 lg:order-1">
          <div className="sticky top-4">
            <ProductCarousel
              images={data?.product?.images?.edges as ImageEdge[]}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="order-2 lg:order-2">
          <div className="space-y-4 sm:space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {data?.product?.title}
              </h1>
            </div>

            {/* Description */}
            {data?.product?.descriptionHtml && (
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.product?.descriptionHtml,
                  }}
                ></p>
              </div>
            )}

            {/* Product Options */}
            <div>
              <ProductOptions
                Variants={data.product.variants.edges}
                selectedOptions={selectedOptions}
                setSelectedOptions={handleSelectOptions}
                options={data?.product?.options as ProductOption[]}
              />
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <Button
                disabled={!selectedVariant}
                onClick={handleAddtoCart}
                className="w-full  h-12 text-base font-medium"
                size="lg"
              >
                {isAdded ? "Added in the Cart...." : "Add to Cart"}
              </Button>
            </div>

            {/* Offer details */}
            <div>
              <OffersAndSatisfaction />
            </div>

            
          </div>
        </div>
      </div>
      <div><TestimonialCarousel /></div>
    </div>
  );
};

export default Product;
