import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/view/Navbar";
import Providers from "@/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const InfiniteScrollingText = () => {
  const texts = [
    "Trusted by Over 1 Lakh Men",
    "Free, Fast & Discreet Delivery",
    "India’s Most Trusted Sexual Wellness Brand",
    "Up to 95% Success Rate",
    "Cash on Delivery Available",
  ];

  return (
    <div className="w-full bg-black text-white py-2 overflow-hidden whitespace-nowrap border-b border-gray-700">
      <div className="animate-marquee flex gap-12 text-sm sm:text-base md:text-lg lg:text-xl font-semibold tracking-wide uppercase">
        {texts.concat(texts).map((text, index) => (
          <span key={index} className="px-4 opacity-90 hover:opacity-100 transition-opacity">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Sexuloon",
  description: "India’s Most Trusted Sexual Wellness Brand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto max-w-8xl`}
        >
          <InfiniteScrollingText />
          <Navbar />
          <Toaster />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
