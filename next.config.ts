import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    contentSecurityPolicy:
      "default-src 'none'; img-src 'self' https: data: blob:; style-src 'unsafe-inline'; base-uri 'none'; sandbox;",
    remotePatterns: [{ protocol: "https", hostname: "www.sanfoh.com" }],
  },
};

export default nextConfig;
