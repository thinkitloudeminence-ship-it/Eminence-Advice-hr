// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production',
//   },
//   reactStrictMode: true,
//   poweredByHeader: false,
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   transpilePackages: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
// }

// export default nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ui-avatars.com'],
  },
  transpilePackages: ['@mui/material', '@mui/icons-material'],
}

export default nextConfig