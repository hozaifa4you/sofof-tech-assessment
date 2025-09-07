import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         new URL("https://images.unsplash.com/**"),
         new URL("http://localhost:3333/uploads/**"),
      ],
   },
};

export default nextConfig;
