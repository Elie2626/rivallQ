import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
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
    default: 'RivallQ — Audit SEO & Création Site Web Professionnel',
    template: '%s | RivallQ',
  },
  description:
    "Audit SEO en ligne — analysez le référencement de votre site en 5 minutes. Score SEO, UX & conversion. Création site internet professionnel dès 500€. Devis gratuit, livraison rapide.",
  keywords: [
    // Audit SEO — principaux
    'audit SEO',
    'audit SEO en ligne',
    'analyse SEO site web',
    'diagnostic SEO',
    'test SEO gratuit',
    'vérification référencement Google',
    'audit référencement naturel',
    'outil audit SEO',
    'analyse performance SEO',
    'évaluation SEO site internet',
    // Audit SEO — longue traîne
    'audit SEO automatique',
    'analyser le SEO de mon site',
    'comment savoir si mon site est bien référencé',
    'vérifier le référencement d\'un site web',
    // Création de site — principaux
    'création site internet',
    'création site web professionnel',
    'agence web',
    'développeur web freelance',
    'création site vitrine',
    'création site web sur mesure',
    'concepteur de site internet',
    'refonte site web',
    // Création de site — longue traîne
    'devis création site internet',
    'prix création site web professionnel',
    'créer un site internet pour entreprise',
    // Business
    'obtenir plus de clients avec Google',
    'améliorer son référencement Google',
    'augmenter le trafic de son site',
    'créer un site web qui convertit',
    'générer des leads avec son site internet',
    'améliorer sa visibilité en ligne',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://firebaseapp.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://identitytoolkit.googleapis.com" />
      </head>
      <body className="min-h-full bg-zinc-950 text-zinc-200 antialiased font-sans selection:bg-violet-600/20 selection:text-violet-700">
        <OrganizationSchema />
        <WebSiteSchema />
        <SessionRefresher />
        {children}
        <ToastProvider />
        <Script
          src="https://www.botexpress.fr/widget.js"
          data-chatbot-id="59072eac-39dd-458c-811c-4044fae9a0c0"
          data-api-url="https://agentai-23tt.onrender.com"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
