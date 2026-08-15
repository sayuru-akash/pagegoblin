import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.DOCKER_BUILD === "1" ? "standalone" : undefined,
  devIndicators: false,
  images: {
    qualities: [58, 65, 75],
  },
};

export default nextConfig;
