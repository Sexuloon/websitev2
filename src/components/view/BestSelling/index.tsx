"use client";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/view/ProductCard";
import { GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionByHandleQuery, Product } from "@/types/shopify-graphql";
import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";

const CollectionPage = ({ category }: { category: string }) => {
  const { data, isLoading } = useStorefrontQuery<GetCollectionByHandleQuery>(
    ["collections", null],
    {
      query: GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY,
      variables: {
        handle: "all-products",
        first: 12,
        after: null,
      },
    }
  );

  const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  const filterKeys = {
    bettererections: ["erectossure", "staminor"],
    lastlonger: ["ejacure", "staminor"],
    lowtestostrone: ["testofix", "staminor"],
    allproduct: [],
  };

  const handleFilter = () => {
    const info = data?.collection?.products?.edges ?? [];
    if (info.length > 0) {
      const filtered = info
        .map((f) => f.node as Product)
        .filter((product) => filterKeys[category]?.includes(product.handle));
      setFilterProducts(filtered);
    }
  };

  useEffect(() => {
    if (data) handleFilter();
  }, [data, category]);

  if (isLoading) {
    return (
      <div className="my-10 flex flex-col gap-y-6 px-4 sm:px-6 lg:px-10">
        <Skeleton className="h-[50px] w-full bg-[#1a1a1a]" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-[250px] sm:h-[300px] w-full bg-[#1a1a1a] rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }



  return (
    <div className="my-10 flex flex-col gap-y-6 px-4 sm:px-6 lg:px-10">
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {(filterProducts.length > 0
          ? filterProducts
          : data?.collection?.products?.edges?.map((p) => p.node as Product)
        )?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {data?.collection?.products?.edges?.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[#7A6E62] text-sm">No products found in this collection.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
