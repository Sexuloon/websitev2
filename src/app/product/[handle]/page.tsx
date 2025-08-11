"use client";

import { Button } from "@/components/ui/button";
import CustomerReview from "@/components/ui/customerreview";
import OffersAndSatisfaction from "@/components/ui/offer";
import OurPromise from "@/components/ui/OurPromise";
import ProductFaq from "@/components/ui/productfaq";
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
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const Product = () => {
  const params = useParams();
  const { addItem } = useCartActions();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>();
  const [isAdded, setIsAdded] = useState(false);

  const handleSelectOptions = (options: Record<string, string>) => {
    const variant = data?.product?.variants?.edges.find((variant) =>
      Object.keys(options).every((key) =>
        variant.node.selectedOptions.some(
          (option) => option.name === key && option.value === options[key]
        )
      )
    );
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
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <Skeleton className="h-[300px] sm:h-[400px] lg:h-[500px] w-full rounded-lg" />
          </div>
          <div className="space-y-3">
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
    } else {
      window.location.reload();
      return;
    }
    const id = setTimeout(() => {
      setIsAdded(false);
    }, 1000);
    return () => clearTimeout(id);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-1">
          <div className="sticky top-4">
            <ProductCarousel images={data?.product?.images?.edges as ImageEdge[]} />
          </div>
        </div>

        <div className="order-2">
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {data?.product?.title}
            </h1>

            {data?.product?.descriptionHtml && (
              <div dangerouslySetInnerHTML={{ __html: data?.product?.descriptionHtml }} />
            )}

            <ProductOptions
              Variants={data.product.variants.edges}
              selectedOptions={selectedOptions}
              setSelectedOptions={handleSelectOptions}
              options={data?.product?.options as ProductOption[]}
            />

            <Button
              disabled={!selectedVariant}
              onClick={handleAddtoCart}
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {isAdded ? "Added in the Cart...." : "Add to Cart"}
            </Button>

            <OffersAndSatisfaction />
          </div>
        </div>
      </div>

      {/* No extra gap between image and above content */}
      <div className="w-full relative mt-6" style={{ minHeight: "50px" }}>
        <Image
          src="/Sexuloon Ejacure web design 2.jpg"
          alt="Responsive Image"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-contain"
          priority
        />
      </div>

      {/* Tight spacing between sections */}
      <div className="mt-6"><TestimonialCarousel /></div>
      <div className="mt-6"><ProductFaq /></div>
      <div className="mt-6"><CustomerReview /></div>

      <div className="w-full relative mt-6" style={{ minHeight: "300px" }}>
        <Image
          src="/Sexuloon Ejacure web design.jpg"
          alt="Responsive Image"
          layout="responsive"
          width={1920}
          height={1080}
          className="object-contain"
          priority
        />
      </div>

      <div className="mt-6"><OurPromise /></div>
    </div>
  );
};

export default Product;
