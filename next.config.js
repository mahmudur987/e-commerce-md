/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  //output: 'export',
  images: {
    domains: ['api.dottech.com.bd'],
  },
}

module.exports = nextConfig
