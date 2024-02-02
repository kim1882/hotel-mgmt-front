/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://hotel-mgmt-back.vercel.app",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/hotel-management",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
