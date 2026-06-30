import CollectionPage from "@/components/view/CollectionPage/collectionPage";
import { Metadata } from "next";
import { storeFrontClient } from "@/lib/storefront";
import { GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY } from "@/graphql/collections";

type Props = {
  params: Promise<{ handle: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  
  let collection;
  try {
    const data = await storeFrontClient.request<any>(
      GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY,
      { handle, first: 1 }
    );
    collection = data?.collection;
  } catch (error) {
    console.error("Error fetching collection metadata:", error);
  }

  if (!collection) return {};

  const title = collection.title;
  const description = collection.description || collection.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.sexuloon.in/collections/${handle}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://www.sexuloon.in/collections/${handle}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { handle } = await params;
  
  let collection;
  try {
    const data = await storeFrontClient.request<any>(
      GET_COLLECTION_BY_HANDLE_WITH_PAGINATION_QUERY,
      { handle, first: 1 }
    );
    collection = data?.collection;
  } catch (error) {
    console.error("Error fetching collection for JSON-LD:", error);
  }

  const jsonLd = collection ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description || collection.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160),
    url: `https://www.sexuloon.in/collections/${handle}`,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CollectionPage handle={handle} />
    </>
  );
}
