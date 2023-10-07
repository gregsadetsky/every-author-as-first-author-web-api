/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/authors",
        destination: "/api/authors",
      },
    ];
  },
};

module.exports = nextConfig;
