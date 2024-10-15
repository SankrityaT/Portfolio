/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        domains: [
          'cdn-icons-png.flaticon.com', // Add the domains where your images are hosted
          'th.bing.com',
          'pluspng.com',
          'robohash.org',
        ],
      },

      eslint: {
        ignoreDuringBuilds: true,
      }
};

export default nextConfig;
