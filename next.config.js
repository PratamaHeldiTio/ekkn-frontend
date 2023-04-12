/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL_V1: process.env.BASE_URL_V1,
  },
};

module.exports = nextConfig;
