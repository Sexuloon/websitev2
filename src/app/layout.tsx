import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/view/Navbar";
import InfiniteScrollingText from "@/components/view/SlidingText";
import Providers from "@/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";

// Load Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Site Metadata for Next.js (used for SSG/SSR)
export const metadata: Metadata = {
  title: "Sexuloon",
  description: "India’s Most Trusted Sexual Wellness Brand",
  icons: {
    icon: "/Web_Icon-removebg-preview.ico",
    shortcut: "/Web_Icon-removebg-preview.ico",
    apple: "/Web_Icon-removebg-preview.ico",
  },
  openGraph: {
    title: "Sexuloon",
    description: "India’s Most Trusted Sexual Wellness Brand",
    url: "https://www.sexuloon.in", // ✅ Replace with actual URL
    siteName: "Sexuloon",
    type: "website",
    images: [
      {
        url: "/seo-banner.png", // ✅ Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Sexuloon – India’s Most Trusted Sexual Wellness Brand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sexuloon",
    description: "India’s Most Trusted Sexual Wellness Brand",
    images: ["/seo-banner.png"], // ✅ Update with your OG image
  },
};

// ✅ Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Basic Meta */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />

        {/* Canonical (Optional but Good) */}
        <link rel="canonical" href="https://www.sexuloon.in" />

        {/* Favicon */}
        <link rel="icon" href="/Web_Icon-removebg-preview.ico" />
        <link rel="shortcut icon" href="/Web_Icon-removebg-preview.ico" />
        <link rel="apple-touch-icon" href="/Web_Icon-removebg-preview.ico" />

        {/* Open Graph Meta (Redundant here but safe fallback) */}
        <meta property="og:title" content="Sexuloon" />
        <meta property="og:description" content="India’s Most Trusted Sexual Wellness Brand" />
        <meta property="og:image" content="/seo-banner.png" />
        <meta property="og:url" content="https://www.sexuloon.in" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sexuloon" />
        <meta name="twitter:description" content="India’s Most Trusted Sexual Wellness Brand" />
        <meta name="twitter:image" content="/seo-banner.png" />
      </head>
      <body className="antialiased mx-auto max-w-8xl">
        <Providers>
          <InfiniteScrollingText />
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
