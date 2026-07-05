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
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,                           priority: 1.0, changeFrequency: 'daily'  },
    { url: `${BASE}/aboutus`,                    priority: 0.7, changeFrequency: 'monthly' },
    { url: `${BASE}/contactus`,                  priority: 0.6, changeFrequency: 'monthly' },
    { url: `${BASE}/faq`,                        priority: 0.7, changeFrequency: 'weekly'  },
    { url: `${BASE}/consultancy`,                priority: 0.8, changeFrequency: 'weekly'  },
    { url: `${BASE}/refundpolicy`,               priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/ShippingPolicy`,             priority: 0.5, changeFrequency: 'monthly' },
    // Note: special-char routes use their actual folder names
    { url: `${BASE}/privacy&policy`,             priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/terms&conditions`,           priority: 0.5, changeFrequency: 'monthly' },
    { url: `${BASE}/Refund&ReplacementPolicy`,   priority: 0.5, changeFrequency: 'monthly' },
  ].map(page => ({
    ...page,
    lastModified: new Date(),
  }))

  const productUrls: MetadataRoute.Sitemap = products.map(({ node }) => ({
    url: `${BASE}/product/${node.handle}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  const collectionUrls: MetadataRoute.Sitemap = collections.map(({ node }) => ({
    url: `${BASE}/collections/${node.handle}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...productUrls, ...collectionUrls]
}
