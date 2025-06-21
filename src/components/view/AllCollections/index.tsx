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
        {/* Mobile: Horizontal scroll */}
        <div className="sm:hidden overflow-x-auto">
          <div className="flex gap-4 items-center justify-center px-4 pb-2" style={{ minWidth: 'max-content' }}>
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center flex-shrink-0">
                <Skeleton className="w-16 h-16 rounded-full mb-2" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Tablet: 4 columns */}
        <div className="hidden sm:grid md:hidden grid-cols-4 gap-6 px-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton className="w-18 h-18 rounded-full mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        
        {/* Desktop: Horizontal scroll */}
        <div className="hidden md:flex gap-6 justify-center px-4 overflow-x-auto">
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className="flex-shrink-0 text-center">
              <Skeleton className="w-20 h-20 rounded-full mb-2 mx-auto" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 scroll-smooth ">
      {/* Mobile: Horizontal scrollable */}
      <div className="sm:hidden overflow-x-auto">
        <div className="flex items-center justify-center gap-7 px-4 pb-2" style={{ minWidth: 'max-content' }}>
          {data?.collections.edges.map((collection) => (
            <button
              key={collection.node.id}
              onClick={() =>
                router.push(`/collections/${collection.node.handle}`)
              }
              className="flex flex-col items-center group flex-shrink-0"
            >
              <div className="relative w-10 h-10 mb-2">
                <div className="w-full h-full overflow-hidden bg-white shadow-sm rounded-full border border-gray-200 group-hover:shadow-md transition-shadow duration-200">
                  <Image
                    src={collection.node.image?.url ?? "/placeholder.png"}
                    alt={collection.node.image?.altText ?? collection.node.title}
                    fill
                    className="object-cover rounded-full group-hover:scale-105 transition-transform duration-200"
                    sizes="64px"
                  />
                </div>
              </div>
              <h3 className="text-black text-center font-medium leading-tight text-xs w-16 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                {collection.node.title}
              </h3>
            </button>
          ))}
        </div>
      </div>

      {/* Tablet: 4 columns grid */}
      <div className="hidden sm:grid md:hidden grid-cols-4 gap-6 px-4">
        {data?.collections.edges.slice(0, 8).map((collection) => (
          <button
            key={collection.node.id}
            onClick={() =>
              router.push(`/collections/${collection.node.handle}`)
            }
            className="flex flex-col items-center group"
          >
            <div className="relative w-18 h-18 mb-2">
              <div className="w-full h-full overflow-hidden bg-white shadow-sm rounded-full border border-gray-200 group-hover:shadow-md transition-shadow duration-200">
                <Image
                  src={collection.node.image?.url ?? "/placeholder.png"}
                  alt={collection.node.image?.altText ?? collection.node.title}
                  fill
                  className="object-cover rounded-full group-hover:scale-105 transition-transform duration-200"
                  sizes="72px"
                />
              </div>
            </div>
            <h3 className="text-black text-center font-medium leading-tight text-sm line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
              {collection.node.title}
            </h3>
          </button>
        ))}
      </div>

      {/* Desktop: Horizontal scrollable or centered flex */}
      <div className="hidden md:block">
        {data?.collections.edges && data.collections.edges.length <= 6 ? (
          // If 6 or fewer collections, center them
          <div className="flex justify-center items-center gap-8 px-4">
            {data.collections.edges.map((collection) => (
              <button
                key={collection.node.id}
                onClick={() =>
                  router.push(`/collections/${collection.node.handle}`)
                }
                className="flex flex-col items-center group min-w-0"
              >
                <div className="relative w-20 h-20 mb-3">
                  <div className="w-full h-full overflow-hidden bg-white shadow-sm rounded-full border border-gray-200 group-hover:shadow-lg transition-shadow duration-300">
                    <Image
                      src={collection.node.image?.url ?? "/placeholder.png"}
                      alt={collection.node.image?.altText ?? collection.node.title}
                      fill
                      className="object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                      sizes="80px"
                    />
                  </div>
                </div>
                <h3 className="text-black text-center font-medium leading-tight text-sm max-w-20 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {collection.node.title}
                </h3>
              </button>
            ))}
          </div>
        ) : (
          // If more than 6 collections, make it scrollable
          <div className="overflow-x-auto">
            <div className="flex gap-8 px-4 pb-2" style={{ minWidth: 'max-content' }}>
              {data.collections.edges.map((collection) => (
                <button
                  key={collection.node.id}
                  onClick={() =>
                    router.push(`/collections/${collection.node.handle}`)
                  }
                  className="flex flex-col items-center group flex-shrink-0"
                >
                  <div className="relative w-20 h-20 mb-3">
                    <div className="w-full h-full overflow-hidden bg-white shadow-sm rounded-full border border-gray-200 group-hover:shadow-lg transition-shadow duration-300">
                      <Image
                        src={collection.node.image?.url ?? "/placeholder.png"}
                        alt={collection.node.image?.altText ?? collection.node.title}
                        fill
                        className="object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
                        sizes="80px"
                      />
                    </div>
                  </div>
                  <h3 className="text-black text-center font-medium leading-tight text-sm w-20 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {collection.node.title}
                  </h3>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Show all collections link removed since mobile now shows all */}
    </div>
  );
};

export default AllCollections;