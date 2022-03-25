/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.igdb.com", "s.gravatar.com"],
  },
};

module.exports = nextConfig;
