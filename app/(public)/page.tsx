import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/public/hero-section'
import { SoftwareAppSchema } from '@/components/seo/json-ld'

// Sections below the fold — chargées après le hero pour accélérer le FCP
const HowItWorks       = dynamic(() => import('@/components/public/how-it-works').then(m => m.HowItWorks))
const FeaturesGrid     = dynamic(() => import('@/components/public/features-grid').then(m => m.FeaturesGrid))
const TestimonialsSection = dynamic(() => import('@/components/public/testimonials-section').then(m => m.TestimonialsSection))
const PricingSection   = dynamic(() => import('@/components/public/pricing-section').then(m => m.PricingSection))
const FaqPreview       = dynamic(() => import('@/components/public/faq-preview').then(m => m.FaqPreview))
const CtaBanner        = dynamic(() => import('@/components/public/cta-banner').then(m => m.CtaBanner))

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'RivallQ — Audit SEO & Reconstruction de Site par IA | Dès 9,99€',
  description:
    "Obtenez un audit SEO complet de votre site en 60 secondes grâce à l'IA. Score SEO, UX, conversion + site entièrement reconstruit et optimisé automatiquement. Dès 9,99€.",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: 'RivallQ — Audit SEO & Reconstruction de Site par IA',
    description:
      "Audit SEO complet en 60 secondes. Score SEO, UX, conversion + site reconstruit par l'IA. Dès 9,99€.",
    url: BASE,
    type: 'website',
  },
  twitter: {
    title: 'RivallQ — Audit SEO & Reconstruction IA',
    description: "Auditez et reconstruisez votre site avec l'IA Tsitsit. Dès 9,99€.",
  },
}

export default function HomePage() {
  return (
    <>
      <SoftwareAppSchema />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 z-50 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Passer au contenu principal
      </a>
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <TestimonialsSection />
      <PricingSection />
      <FaqPreview />
      <CtaBanner />
    </>
  )
}
