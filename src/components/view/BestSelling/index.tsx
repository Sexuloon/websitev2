import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/view/ProductCard";
import { GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionByHandleQuery, Product } from "@/types/shopify-graphql";
export const dynamic = 'force-dynamic';

const CollectionPage = () => {
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
        <Skeleton className="h-[50px] w-full" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <Skeleton key={index} className="h-[250px] sm:h-[300px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-col gap-y-6 px-4 sm:px-6 lg:px-10">
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600">
            This collection doesn&apos;t have any products yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;