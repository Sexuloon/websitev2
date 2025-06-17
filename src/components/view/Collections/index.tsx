"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GET_COLLECTIONS_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionsQuery } from "@/types/shopify-graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Collections = () => {
  const router = useRouter();
  const { data, isLoading } = useStorefrontQuery<GetCollectionsQuery>(
    ["collections"],
    {
      query: GET_COLLECTIONS_QUERY,
    }
  );

  if (isLoading) {
    return (
      <div className="w-full py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <Skeleton className="w-full h-56 bg-gray-200" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4 bg-gray-200" />
                  <Skeleton className="h-4 w-1/2 bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Shop Collections
        </h2>
        <p className="text-gray-600 text-center">
          Discover our curated selection of products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {data?.collections.edges.map((collection) => (
          <div
            key={collection.node.id}
            onClick={() =>
              router.push(`/collections/${collection.node.handle}`)
            }
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            <div className="bg-white rounded-xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative w-full  max-w-lg h-80 overflow-hidden">
                <Image
                  src={collection.node.image?.url ?? "/placeholder.png"}
                  alt={collection.node.image?.altText ?? collection.node.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {collection.node.title}
                </h3>

                {collection.node.description && (
                  <p className="text-sm text-gray-600 text-center mt-2 line-clamp-2">
                    {collection.node.description}
                  </p>
                )}

                <div className="mt-3 flex justify-center">
                  <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                    Explore Collection
                    <svg
                      className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {data?.collections.edges.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No collections found
          </h3>
          <p className="text-gray-600">Check back later for new collections.</p>
        </div>
      )}
    </div>
  );
};

export default Collections;
