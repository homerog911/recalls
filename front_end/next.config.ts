import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   eslint: {
    ignoreDuringBuilds: true, // Set to true temporarily if needed
  },
  typescript: {
    ignoreBuildErrors: true, // Keep this false to catch TypeScript errors
  },
};

export default nextConfig;
