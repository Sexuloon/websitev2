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
      <div className="my-10 flex flex-col gap-y-6">
        <Skeleton className="h-[50px] w-full" />
        <div className="grid grid-cols-3 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-col gap-y-6 p-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">          
        {data?.collection?.products?.edges?.map((product) => (
          <ProductCard
            key={product?.node?.id}
            product={product.node as Product}
          />
        ))}
      </div>
    </div>
  );
};

export default BestPerformingPage;
