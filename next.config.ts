import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Performance
  compress: true,
  poweredByHeader: false,

  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Security headers
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
