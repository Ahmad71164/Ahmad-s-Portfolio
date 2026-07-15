import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images from any hostname are allowed (add domains here if using external image URLs)
  images: {
    unoptimized: false,
  },
};

export default nextConfig;

