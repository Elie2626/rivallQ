import type { Metadata } from 'next'
import { HeroSection } from '@/components/public/hero-section'
import { HowItWorks } from '@/components/public/how-it-works'
import { FeaturesGrid } from '@/components/public/features-grid'
import { PricingSection } from '@/components/public/pricing-section'
import { TestimonialsSection } from '@/components/public/testimonials-section'
import { FaqPreview } from '@/components/public/faq-preview'
import { CtaBanner } from '@/components/public/cta-banner'
import { SoftwareAppSchema } from '@/components/seo/json-ld'

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
    description: "Auditez et reconstruisez votre site avec l'IA Claude. Dès 9,99€.",
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
