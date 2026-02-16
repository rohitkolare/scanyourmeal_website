import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
