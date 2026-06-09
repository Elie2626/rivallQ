import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance
  compress: true,
  poweredByHeader: false,

  // Tree-shaking heavy packages
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three'],
  },

  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Security + cache headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Static assets — cache 1 year (Next.js hashes filenames)
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      // Vidéo demo — cache 7 jours
      {
        source: '/demo-v2.mp4',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
      // Favicon & icons
      {
        source: '/(favicon.ico|icon.svg|apple-icon.png)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      // Stripe webhook needs raw body
      {
        source: '/api/webhooks/(.*)',
        headers: [{ key: 'Cache-Control', value: 'no-store' }],
      },
    ]
  },

  // Turbopack (Next.js 16 default bundler)
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
