"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GET_COLLECTIONS_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionsQuery } from "@/types/shopify-graphql";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const AllCollections = () => {
  const router = useRouter();
  const { data, isLoading } = useStorefrontQuery<GetCollectionsQuery>(
    ["collections"],
    {
      query: GET_COLLECTIONS_QUERY,
    }
  );

  if (isLoading) {
    return (
      <div className="w-full py-6">
        <div className="flex gap-4 overflow-x-auto px-4 scrollbar-hide">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <Skeleton className="w-16 h-16 rounded-full mb-2 mx-auto" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 flex flex-col items-center justify-center">
      <div className="flex gap-10 overflow-x-hidden px-4">
        {data?.collections.edges.map((collection) => (
          <button
            onClick={() => router.push(`/collections/${collection.node.handle}`)}
            key={collection.node.id}
            className="flex-shrink-0 text-center group transition-transform duration-200"
          >
            <div className="relative w-16 h-16 mx-auto mb-2">
              <div className="w-full h-full  overflow-hidden bg-white shadow-lg rounded-full">
                <Image
                  src={collection.node.image?.url ?? ""}
                  alt={collection.node.image?.altText ?? collection.node.title}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-black text-sm font-semibold">
              {collection.node.title}
            </h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllCollections;