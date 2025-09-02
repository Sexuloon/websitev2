"use client";

import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/view/ProductCard";
import { GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionByHandleQuery, Product } from "@/types/shopify-graphql";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";

const CollectionPage = ({ handle }: { handle: string }) => {
  // Pagination
  const [currentCursor, setCurrentCursor] = useState<string | null>(null);
  const [previousCursors, setPreviousCursors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProduct] = useState([]);

  const { data, isLoading } = useStorefrontQuery<GetCollectionByHandleQuery>(
    ["collections", currentCursor],
    {
      query: GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY,
      variables: {
        handle: handle,
        first: 12,
        after: currentCursor,
      },
    }
  );
  

  useEffect(() => {
    if (data?.collection?.products?.edges.length > 0) {
      // window.sessionStorage.setItem(
      //   "data",
      //   JSON.stringify(data.collection.products.edges)
      // );
      setProduct(data.collection.products.edges);
    }
    // if (!data) {
    //   const cacheData = window.sessionStorage.getItem("data");
    //   if (!cacheData) return;
    //   setProduct(JSON.parse(cacheData));
    // }
  }, [handle]);

  const handleNextPage = () => {
    if (currentCursor) {
      setPreviousCursors([...previousCursors, currentCursor]);
    }
    setCurrentCursor(data?.collection?.products?.pageInfo?.endCursor ?? null);
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    const previousCursor = previousCursors[previousCursors.length - 1];
    const newPreviousCursors = previousCursors.slice(0, -1);
    setPreviousCursors(newPreviousCursors);
    setCurrentCursor(previousCursor);
    setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
          {/* Header skeleton */}
          <div className="mb-6 sm:mb-8">
            <Skeleton className="h-8 sm:h-10 lg:h-12 w-48 sm:w-64 mb-2" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>

          {/* Product grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="h-48 sm:h-56 lg:h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
          </div>

          {/* Pagination skeleton */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }

  // Check if collection has products
  const hasProducts = products.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        {/* Collection Header */}

        {/* Products Grid */}
        {hasProducts ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {products?.map((product) => (
                <div
                  key={product?.node?.id}
                  className="group transition-transform duration-200 hover:scale-[1.02]"
                >
                  <ProductCard product={product.node as Product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center">
              <Pagination>
                <PaginationContent className="flex items-center gap-2">
                  {/* Previous Button */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={`
                        ${
                          !data?.collection?.products?.pageInfo
                            ?.hasPreviousPage || currentPage === 1
                            ? "pointer-events-none opacity-40 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                        }
                        px-3 py-2 text-sm font-medium transition-colors duration-200
                      `}
                    />
                  </PaginationItem>

                  {/* Page indicator */}
                  <PaginationItem>
                    <div className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
                      Page {currentPage}
                    </div>
                  </PaginationItem>

                  {/* Next Button */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={`
                        ${
                          !data?.collection?.products?.pageInfo?.hasNextPage
                            ? "pointer-events-none opacity-40 cursor-not-allowed"
                            : "cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                        }
                        px-3 py-2 text-sm font-medium transition-colors duration-200
                      `}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                This collection doesn&apos;t have any products yet. Check back
                later!
              </p>
            </div>
          </div>
        )}

        {/* Back to top button for mobile */}
        <div className="fixed bottom-4 right-4 sm:hidden">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
            aria-label="Back to top"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
