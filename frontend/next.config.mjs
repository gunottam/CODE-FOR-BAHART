/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/chat',
        destination: 'http://localhost:3001/chat',
      },
      {
        source: '/reset',
        destination: 'http://localhost:3001/reset',
      },
    ]
  },
}

export default nextConfig
