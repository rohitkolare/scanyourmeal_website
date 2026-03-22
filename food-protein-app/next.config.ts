import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "scanyourmeal.app" }],
        destination: "https://www.scanyourmeal.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
