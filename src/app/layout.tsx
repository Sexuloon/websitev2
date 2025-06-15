import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";

import "./globals.css";

import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/view/Navbar";
import Providers from "@/providers";

// Load Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site Metadata
export const metadata: Metadata = {
  title: "Sexuloon",
  description: "India’s Most Trusted Sexual Wellness Brand",
};

// Scrolling Banner Component
const InfiniteScrollingText = () => {
  const texts = [
    "trusted by over 1 lakh men",
    "free, fast & discreet delivery",
    "india's most trusted sexual wellness brand",
    "up to 95% success rate",
    "cash on delivery available",
  ];

  const formatText = (text: string) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const duplicatedTexts = [...texts, ...texts].flatMap((text, index, array) => {
    const elements = [
      <span
        key={`text-${index}`}
        className="px-2 opacity-90 hover:opacity-100 transition-opacity"
      >
        {formatText(text)}
      </span>,
    ];
    if (index !== array.length - 1) {
      elements.push(
        <span key={`star-${index}`} className="text-white text-sm">
          ✦
        </span>
      );
    }
    return elements;
  });

  return (
    <div className="w-full bg-black text-white py-1 overflow-hidden whitespace-nowrap border-b border-gray-700">
      <div className="animate-marquee flex gap-2 text-[10px] sm:text-xs md:text-sm font-sans font-medium tracking-normal">
        {duplicatedTexts}
      </div>
    </div>
  );
};

// Root Layout Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
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
