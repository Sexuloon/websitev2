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
import { Playfair_Display, DM_Sans, DM_Mono } from "next/font/google";

// ✅ Zero-blocking font loading via next/font (self-hosted at build time)
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// ✅ Site Metadata for Next.js (used for SSG/SSR)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.sexuloon.com"),
  title: {
    default: "Sexuloon – India's Most Trusted Sexual Wellness Brand",
    template: "%s | Sexuloon",
  },
  description: "India's Most Trusted Sexual Wellness Brand. Natural remedies for men's sexual health, premature ejaculation, erectile dysfunction, and more.",
  keywords: ["sexual wellness", "men's health", "natural remedies", "India", "Sexuloon", "premature ejaculation", "erectile dysfunction", "stamina", "Unani", "Ayurveda"],
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
    locale: "en_IN",
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

// ✅ Structured Data: Full @graph with WebSite+SearchAction (Sitelinks trigger) + enriched Organization
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.sexuloon.com/#organization",
      name: "Sexuloon",
      legalName: "Figgus78 Innovation Private Limited",
      url: "https://www.sexuloon.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.sexuloon.com/Web_Icon-removebg-preview.png",
        width: 512,
        height: 512,
      },
      foundingDate: "2023",
      description: "India's most trusted men's sexual wellness brand. Natural Ayurveda & Unani remedies combined with MBBS-certified doctor consultations for premature ejaculation, erectile dysfunction, and low testosterone.",
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@sexuloon.com",
        availableLanguage: ["English", "Hindi"],
        areaServed: "IN",
      },
      sameAs: [
        "https://www.instagram.com/sexuloon",
        "https://www.facebook.com/sexuloon",
        "https://www.linkedin.com/company/sexuloon",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.sexuloon.com/#website",
      url: "https://www.sexuloon.com",
      name: "Sexuloon",
      description: "India's Most Trusted Sexual Wellness Brand",
      publisher: {
        "@id": "https://www.sexuloon.com/#organization",
      },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.sexuloon.com/collections/all-products?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ✅ Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${playfairDisplay.variable} ${dmSans.variable} ${dmMono.variable}`}
      >
        <head>
          {/* Basic Meta */}
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {/* JSON-LD: Organization + WebSite + SearchAction (triggers Google Sitelinks) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
          <meta property="og:locale" content="en_IN" />

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
