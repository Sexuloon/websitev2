import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/view/ProductCard";
import { GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionByHandleQuery, Product } from "@/types/shopify-graphql";

const BestPerformingPage = () => {
  const { data, isLoading } = useStorefrontQuery<GetCollectionByHandleQuery>(
    ["collections", null],
    {
      query: GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY,
      variables: {
        handle: "best-sellers",
        first: 12,
        after: null,
      },
    }
  );

  if (isLoading) {
    return (
      <div className="my-10 flex flex-col gap-y-6 px-4 sm:px-6 lg:px-10">
        {/* Header Skeleton */}
        <div className="text-center space-y-3">
          <Skeleton className="h-8 sm:h-10 lg:h-12 w-3/4 mx-auto" />
          <Skeleton className="h-4 sm:h-5 w-1/2 mx-auto" />
        </div>
        
        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-col gap-y-6 px-4 sm:px-6 lg:px-10">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Best Performing Products
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Discover our top-rated and most popular products loved by customers
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {data?.collection?.products?.edges?.map((product) => (
          <ProductCard
            key={product?.node?.id}
            product={product.node as Product}
          />
        ))}
      </div>

      {/* Empty State */}
      {data?.collection?.products?.edges?.length === 0 && (
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H9a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No best performing products found
          </h3>
          <p className="text-gray-600">
            We&apos;re working on curating our best products. Check back soon!
          </p>
        </div>
      )}

      {/* Performance Metrics Section - Optional Enhancement */}
      {data?.collection?.products?.edges && data.collection.products.edges.length > 0 && (
        <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              Why These Products Perform Best
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">High Quality</p>
                <p className="text-xs text-gray-600">Premium materials & craftsmanship</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Top Rated</p>
                <p className="text-xs text-gray-600">Loved by our customers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-900">Best Selling</p>
                <p className="text-xs text-gray-600">Most popular choices</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestPerformingPage;