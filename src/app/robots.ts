import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/auth/',        // Clerk auth pages — no indexing
          '/api/',         // API routes
          '/_next/',       // Next.js internals
        ],
      },
    ],
    sitemap: 'https://www.sexuloon.com/sitemap.xml',
    host: 'https://www.sexuloon.com',
  }
}
