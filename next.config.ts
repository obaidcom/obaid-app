import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output:"export", trailingSlash:true, images:{unoptimized:true},
  basePath:process.env.NODE_ENV==="production"?"/obaid-store":"",
  assetPrefix:process.env.NODE_ENV==="production"?"/obaid-store/":undefined
};
export default nextConfig;
