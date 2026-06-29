/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@descend/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
