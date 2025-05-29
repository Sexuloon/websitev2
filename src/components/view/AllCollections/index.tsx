"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GET_COLLECTIONS_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionsQuery } from "@/types/shopify-graphql";
import Image from "next/image";
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
        <div className="flex gap-4 items-center justify-center overflow-x-auto px-4 scrollbar-hide">
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
  <div className="w-full py-4">
    <div
      className="
        flex
        gap-4
        justify-center sm:justify-center
        overflow-x-auto
        px-4
        scrollbar-hide
      "
    >
      {data?.collections.edges.map((collection) => (
        <button
          key={collection.node.id}
          onClick={() => router.push(`/collections/${collection.node.handle}`)}
          className="
            flex-shrink-0
            w-[64px]
            text-center
            group
            transition-transform
            duration-200
            hover:scale-105
          "
        >
          <div className="relative w-12 h-12 mx-auto mb-1">
            <div className="w-full h-full overflow-hidden bg-white shadow-sm rounded-full border border-gray-200">
              <Image
                src={collection.node.image?.url ?? ""}
                alt={collection.node.image?.altText ?? collection.node.title}
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
          <h3 className="text-black text-[11px] font-medium leading-tight truncate">
            {collection.node.title}
          </h3>
        </button>
      ))}
    </div>
  </div>
);

};

export default AllCollections;