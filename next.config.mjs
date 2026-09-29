/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Treat SVG imports as URL strings (same as Vite's default behaviour)
    config.module.rules.push({
      test: /\.svg$/i,
      type: 'asset/resource',
    })
    return config
  },
}

export default nextConfig
