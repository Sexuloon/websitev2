import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/view/Navbar";
import InfiniteScrollingText from "@/components/view/SlidingText";
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
