import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default 1 MB is too small for a full-res 2550×3300 magnet sheet JPEG.
      // With 6 real photos the blob easily hits 5–8 MB.
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
