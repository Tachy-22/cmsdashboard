/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // other properties...
  images: {
    domains: ["files.edgestore.dev"],
  },
};

module.exports = nextConfig;
