import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three"],
};
module.exports = {
  allowedDevOrigins: ['192.168.0.106'],
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);
