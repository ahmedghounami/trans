import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  matcher: ["/"],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com", // Replace with your image host
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
