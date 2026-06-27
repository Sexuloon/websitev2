"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GET_COLLECTIONS_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionsQuery } from "@/types/shopify-graphql";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";

const AllCollections = () => {
  const { data, isLoading } = useStorefrontQuery<GetCollectionsQuery>(
    ["collections"],
    { query: GET_COLLECTIONS_QUERY }
  );

  if (isLoading) {
    return (
      <div className="w-full py-5 px-4 border-b border-[#1e1e1e]">
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-shrink-0">
              <Skeleton className="w-14 h-14 rounded-full bg-[#1a1a1a]" />
              <Skeleton className="h-3 w-12 bg-[#1a1a1a]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 px-4 sm:px-6 border-b border-[#1e1e1e] bg-[#0d0d0d]">
      <div className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar justify-start sm:justify-center">
        {data?.collections.edges.map((collection) => (
          <Link
            prefetch
            key={collection.node.id}
            href={`/collections/${collection.node.handle}`}
            className="flex flex-col items-center gap-2 flex-shrink-0 group"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#262626] group-hover:border-[#C9A84C]/60 transition-all duration-200 bg-[#1a1a1a]">
                <Image
                  src={collection.node.image?.url ?? "/placeholder.png"}
                  alt={collection.node.image?.altText ?? collection.node.title}
                  fill
                  className="object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                  sizes="56px"
                />
              </div>
            </div>
            <span className="text-[11px] text-[#7A6E62] text-center font-medium leading-tight w-16 line-clamp-2 group-hover:text-[#C9A84C] transition-colors duration-200">
              {collection.node.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCollections;
