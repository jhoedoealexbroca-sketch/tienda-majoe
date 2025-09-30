/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      }
    ],
  },
  // Configuración para producción
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  },
  // Optimizar para producción
  swcMinify: true,
  // Configuración de compilación
  typescript: {
    // Ignorar errores de TypeScript durante el build en producción si es necesario
    ignoreBuildErrors: false,
  },
  eslint: {
    // Ignorar errores de ESLint durante el build en producción si es necesario
    ignoreDuringBuilds: false,
  },
  // Variables de entorno públicas (opcional)
  // env: {
  //   CUSTOM_KEY: process.env.CUSTOM_KEY,
  // },
}

module.exports = nextConfig

