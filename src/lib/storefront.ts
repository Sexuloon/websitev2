import { GraphQLClient } from "graphql-request";

if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error("Missing Shopify environment variables");
}

export const storeFrontClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL}`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      "Content-Type": "application/json",
    },
  }
);
