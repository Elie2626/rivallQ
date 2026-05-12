import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'
import { SessionRefresher } from '@/components/auth/session-refresher'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/json-ld'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFFDF8',
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'RivallQ — Audit SEO & Reconstruction de Site par IA',
    template: '%s | RivallQ',
  },
  description:
    "Auditez votre site web en 60 secondes avec l'IA. Score SEO, UX, conversion, et site entièrement reconstruit automatiquement par Claude AI dès 9,99€.",
  keywords: [
    'audit SEO',
    'audit site web IA',
    'optimisation SEO',
    'reconstruction site web IA',
    'analyse SEO automatique',
    'améliorer SEO site web',
    'audit SEO pas cher',
    'outil SEO IA',
    'optimisation conversion site web',
    'refonte site web IA',
  ],
  authors: [{ name: 'RivallQ', url: BASE }],
  creator: 'RivallQ',
  publisher: 'RivallQ',
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'RivallQ',
    url: BASE,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rivallq',
    creator: '@rivallq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    google: 'kPbIUnErLl7dJQ4BDNDbGKtT7FFSaifUwCVxQgOqxvE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${geist.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-zinc-950 text-zinc-200 antialiased font-sans selection:bg-violet-600/20 selection:text-violet-700">
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
        >
          Passer au contenu principal
        </a>

        <OrganizationSchema />
        <WebSiteSchema />
        <SessionRefresher />
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
