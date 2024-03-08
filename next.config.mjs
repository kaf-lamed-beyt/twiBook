/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: "/api/tweet",
        destination: "https://api.twitter.com",
      },
    ];
  },
};

export default nextConfig;
