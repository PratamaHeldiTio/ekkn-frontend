/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL_V1: process.env.BASE_URL_V1,
    BASE_URL: process.env.BASE_URL,
  },
  pageExtensions: ["page.jsx", "page.js", "page.tsx", "page.ts"],
};

module.exports = nextConfig;
