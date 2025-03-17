import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/sitemap.xml", destination: "/api/sitemap" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",  // Remove the "https://growthmeetscapital.com" part
        destination: "https://www.growthmeetscapital.com/:path*", // Include the full URL in the destination
        permanent: true,
      },
    ];
  },
};

export default nextConfig;