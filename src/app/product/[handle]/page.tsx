import ProductClient from "./ProductClient";
import { Metadata } from "next";
import { storeFrontClient } from "@/lib/storefront";
import { GET_PRODUCT_BY_HANDLE_QUERY } from "@/graphql/products";
import { GetProductByHandleQuery } from "@/types/shopify-graphql";

type Props = {
  params: Promise<{ handle: string }>
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  
  let product;
  try {
    const data = await storeFrontClient.request<GetProductByHandleQuery>(
      GET_PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );
    product = data?.product;
  } catch (error) {
    console.error("Error fetching product metadata:", error);
  }

  if (!product) return {};

  const title = product.seo?.title || product.title;
  const description = product.seo?.description || product.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160);
  const ogImage = product.images?.edges?.[0]?.node?.url;

  return {
    title,
    description,
    keywords: [product.title, "Sexuloon", "sexual wellness", "men's health", "natural remedy"],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 800, height: 800, alt: title }] : [],
      url: `https://www.sexuloon.com/product/${handle}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `https://www.sexuloon.com/product/${handle}`,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  
  let product;
  try {
    const data = await storeFrontClient.request<GetProductByHandleQuery>(
      GET_PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );
    product = data?.product;
  } catch (error) {
    console.error("Error fetching product for JSON-LD:", error);
  }

  const jsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images?.edges?.map((e: any) => e.node.url) || [],
    description: product.seo?.description || product.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160),
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Sexuloon"
    },
    offers: {
      "@type": "Offer",
      url: `https://www.sexuloon.com/product/${handle}`,
      priceCurrency: "INR",
      price: product.priceRange?.minVariantPrice?.amount || "0",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock"
    }
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductClient />
    </>
  );
}
