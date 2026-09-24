import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { ToastProvider } from '@/components/ui/toast'
import { OrganizationSchema, WebSiteSchema } from '@/components/seo/json-ld'
import { MotionProvider } from '@/components/providers/motion-provider'
import { CookieConsent } from '@/components/public/cookie-consent'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'RivallQ — Sites web, applications, SaaS et logiciels sur mesure',
    template: '%s | RivallQ',
  },
  description:
    "Studio de développement sur mesure : sites web, applications mobiles, SaaS et logiciels métier. Conception, design, développement et lancement par une seule équipe.",
  keywords: [
    'création site web sur mesure',
    'agence développement web',
    'création application mobile',
    'développement SaaS',
    'logiciel sur mesure',
    'développeur freelance',
    'création site vitrine',
    'application web sur mesure',
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
      <head>
        {/* Preconnects critiques */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebaseapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
      </head>
      <body className="min-h-full bg-black text-[#f5f5f7] antialiased font-sans selection:bg-white selection:text-black">
        <OrganizationSchema />
        <WebSiteSchema />
        <MotionProvider>
          {children}
        </MotionProvider>
        <ToastProvider />
        <CookieConsent />
      </body>
    </html>
  )
}
