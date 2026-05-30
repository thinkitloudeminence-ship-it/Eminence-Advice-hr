/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,  // ✅ TypeScript errors ignore karo
  },
  eslint: {
    ignoreDuringBuilds: true,  // ✅ ESLint errors ignore karo
  },
}

module.exports = nextConfig