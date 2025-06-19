import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // ✅ added for Pexels image support
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ added for Cloudinary image support
      },
    ],
  },
};

export default nextConfig;
