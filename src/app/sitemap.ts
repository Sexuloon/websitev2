import { MetadataRoute } from 'next'
import { storeFrontClient } from '@/lib/storefront'
import { GET_ALL_PRODUCTS_QUERY } from '@/graphql/products'
import { GET_COLLECTIONS_QUERY } from '@/graphql/collections'
import { GetAllProductsQuery, GetCollectionsQuery } from '@/types/shopify-graphql'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sexuloon.com'

  let products: any[] = []
  try {
    const productsData = await storeFrontClient.request<GetAllProductsQuery>(
      GET_ALL_PRODUCTS_QUERY,
      { first: 100 }
    )
    products = productsData?.products?.edges || []
  } catch (error) {
    console.error("Error fetching products for sitemap:", error)
  }

  let collections: any[] = []
  try {
    const collectionsData = await storeFrontClient.request<GetCollectionsQuery>(
      GET_COLLECTIONS_QUERY
    )
    collections = collectionsData?.collections?.edges || []
  } catch (error) {
    console.error("Error fetching collections for sitemap:", error)
  }

  const productUrls: MetadataRoute.Sitemap = products.map((edge) => ({
    url: `${baseUrl}/product/${edge.node.handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  const collectionUrls: MetadataRoute.Sitemap = collections.map((edge) => ({
    url: `${baseUrl}/collections/${edge.node.handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    '',
    '/aboutus',
    '/contactus',
    '/faq',
    '/privacy%26policy',
    '/refundpolicy',
    '/terms%26conditions'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.6,
  }))

  return [...staticPages, ...productUrls, ...collectionUrls]
}
