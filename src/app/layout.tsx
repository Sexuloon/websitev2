import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/view/Navbar";
import InfiniteScrollingText from "@/components/view/SlidingText";
import Providers from "@/providers";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { PostHogProvider } from "@/posthog/posthog-provider";

// ✅ Site Metadata for Next.js (used for SSG/SSR)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.sexuloon.com"),
  title: {
    default: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
    template: "%s | Sexuloon",
  },
  description: "India's Most Trusted Sexual Wellness Brand. Natural remedies for men's sexual health, premature ejaculation, erectile dysfunction, and more.",
  keywords: ["sexual wellness", "men's health", "natural remedies", "India", "Sexuloon", "premature ejaculation", "erectile dysfunction", "stamina"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://www.sexuloon.com",
  },
  icons: {
    icon: "/Web_Icon-removebg-preview.ico",
    shortcut: "/Web_Icon-removebg-preview.ico",
    apple: "/Web_Icon-removebg-preview.ico",
  },
  openGraph: {
    title: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
    description: "Natural remedies for men's sexual health, premature ejaculation, erectile dysfunction, and more.",
    url: "https://www.sexuloon.com",
    siteName: "Sexuloon",
    type: "website",
    images: [
      {
        url: "/seo-banner.png",
        width: 1200,
        height: 630,
        alt: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
    description: "Natural remedies for men's sexual health.",
    images: ["/seo-banner.png"],
  },
};

// ✅ Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          {/* Basic Meta */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* robots and canonical are handled by the metadata export above */}

          {/* JSON-LD Organization Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Sexuloon",
                url: "https://www.sexuloon.com",
                logo: "https://www.sexuloon.com/Web_Icon-removebg-preview.png",
                sameAs: [
                  "https://www.instagram.com/sexuloon",
                  "https://www.facebook.com/sexuloon"
                ],
              }),
            }}
          />

          {/* Favicon */}
          <link rel="icon" href="/Web_Icon-removebg-preview.ico" />
          <link rel="shortcut icon" href="/Web_Icon-removebg-preview.ico" />
          <link rel="apple-touch-icon" href="/Web_Icon-removebg-preview.ico" />

          {/* Open Graph Meta (static fallback for crawlers that skip JS) */}
          <meta property="og:title" content="Sexuloon – India's Most Trusted Sexual Wellness Brand" />
          <meta property="og:description" content="India's Most Trusted Sexual Wellness Brand" />
          <meta property="og:image" content="https://www.sexuloon.com/seo-banner.png" />
          <meta property="og:url" content="https://www.sexuloon.com" />
          <meta property="og:type" content="website" />

          {/* Twitter Cards */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Sexuloon" />
          <meta name="twitter:description" content="India's Most Trusted Sexual Wellness Brand" />
          <meta name="twitter:image" content="https://www.sexuloon.com/seo-banner.png" />
        </head>
        <body className="antialiased bg-gray-50 text-gray-900 dark:bg-[#080808] dark:text-[#F5F0E8] transition-colors duration-300">
          <PostHogProvider>
            <Providers>
              <InfiniteScrollingText />
              <Navbar />
              <Toaster />
              {children}
              <Footer />
            </Providers>
          </PostHogProvider>
          {/* Google Analytics */}
          <GoogleAnalytics gaId="G-NP9WZN9MK4" />
        </body>
      </html>
    </ClerkProvider>
  );
}
