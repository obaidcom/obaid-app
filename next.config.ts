import type { NextConfig } from "next";

const isCapacitorBuild = process.env.CAPACITOR_BUILD === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isCapacitorBuild ? "" : process.env.NODE_ENV === "production" ? "/obaid-store" : ""
};

export default nextConfig;
