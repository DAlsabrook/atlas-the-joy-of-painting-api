import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.twoinchbrush.com', 'www.youtube.com'], // Add other domains as needed
  },
};

export default nextConfig;
