/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'images.ctfassets.net'],
  },
  // Ensure we run on port 5000 in development
  serverRuntimeConfig: {
    port: 5000,
  },
}

module.exports = nextConfig