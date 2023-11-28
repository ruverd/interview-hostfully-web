/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/bookings',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['unsplash.com','images.unsplash.com'],
  },
};

module.exports = nextConfig;
