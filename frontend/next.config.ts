import type { NextConfig } from "next";

const hostname = "ik.imagekit.io";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    useCache: true,
    serverActions: {
      bodySizeLimit: "256mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: process.env.NODE_ENV === "production" ? "https" : "http",
        hostname: hostname,
      },
    ],
  },
};

export default nextConfig;
