import { MetadataRoute } from 'next'
import { storeFrontClient } from '@/lib/storefront'
import { GET_ALL_PRODUCTS_QUERY } from '@/graphql/products'
import { GET_COLLECTIONS_QUERY } from '@/graphql/collections'
import { GetAllProductsQuery, GetCollectionsQuery } from '@/types/shopify-graphql'

const BASE = 'https://www.sexuloon.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: any[] = []
  try {
    const data = await storeFrontClient.request<GetAllProductsQuery>(
      GET_ALL_PRODUCTS_QUERY,
      { first: 100 }
    )
    products = data?.products?.edges || []
  } catch (error) {
    console.error('Sitemap: error fetching products', error)
  }

  let collections: any[] = []
  try {
    const data = await storeFrontClient.request<GetCollectionsQuery>(GET_COLLECTIONS_QUERY)
    collections = data?.collections?.edges || []
  } catch (error) {
    console.error('Sitemap: error fetching collections', error)
  }

  // Static pages — use decoded paths (Next.js will encode them correctly)
  // Note: lastModified uses a stable date rather than new Date() to avoid
  // invalidating all pages on every build (which wastes crawl budget)
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                           priority: 1.0, changeFrequency: 'daily',   lastModified: new Date('2025-01-01') },
    { url: `${BASE}/collections/all-products`,   priority: 0.9, changeFrequency: 'daily',   lastModified: new Date('2025-01-01') },
    { url: `${BASE}/aboutus`,                    priority: 0.7, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    { url: `${BASE}/contactus`,                  priority: 0.6, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    { url: `${BASE}/faq`,                        priority: 0.8, changeFrequency: 'weekly',  lastModified: new Date('2025-01-01') },
    { url: `${BASE}/consultancy`,                priority: 0.8, changeFrequency: 'weekly',  lastModified: new Date('2025-01-01') },
    { url: `${BASE}/joinus`,                     priority: 0.5, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    { url: `${BASE}/refundpolicy`,               priority: 0.4, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    { url: `${BASE}/ShippingPolicy`,             priority: 0.4, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    // & must be percent-encoded in XML; %26 is the correct form
    { url: `${BASE}/privacy%26policy`,           priority: 0.4, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    { url: `${BASE}/terms%26conditions`,         priority: 0.4, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
    { url: `${BASE}/Refund%26ReplacementPolicy`, priority: 0.4, changeFrequency: 'monthly', lastModified: new Date('2025-01-01') },
  ]

  const productUrls: MetadataRoute.Sitemap = products.map(({ node }) => ({
    url: `${BASE}/product/${node.handle}`,
    lastModified: new Date(node.updatedAt || '2025-01-01'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const collectionUrls: MetadataRoute.Sitemap = collections.map(({ node }) => ({
    url: `${BASE}/collections/${node.handle}`,
    lastModified: new Date('2025-01-01'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticPages, ...productUrls, ...collectionUrls]
}
