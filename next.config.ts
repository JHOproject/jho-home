import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jho-home",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
