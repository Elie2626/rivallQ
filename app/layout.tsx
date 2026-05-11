import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'
import { SessionRefresher } from '@/components/auth/session-refresher'

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  title: {
    default: 'RivallQ — Audit SEO & Reconstruction IA',
    template: '%s — RivallQ',
  },
  description: 'Auditez votre site web avec l\'IA. Score SEO, UX, conversion, et site régénéré automatiquement.',
  keywords: ['audit SEO', 'optimisation site web', 'intelligence artificielle', 'SEO', 'UX', 'conversion'],
  authors: [{ name: 'RivallQ' }],
  creator: 'RivallQ',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'RivallQ',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@rivallq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
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

        <SessionRefresher />
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
