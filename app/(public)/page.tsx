import type { Metadata } from 'next'
import { HeroSection } from '@/components/public/hero-section'
import { HowItWorks } from '@/components/public/how-it-works'
import { FeaturesGrid } from '@/components/public/features-grid'
import { PricingSection } from '@/components/public/pricing-section'
import { TestimonialsSection } from '@/components/public/testimonials-section'
import { FaqPreview } from '@/components/public/faq-preview'
import { CtaBanner } from '@/components/public/cta-banner'

export const metadata: Metadata = {
  title: 'RivallQ — Auditez et reconstruisez votre site avec l\'IA',
  description: 'Entrez votre URL et obtenez en quelques minutes un audit SEO complet, un score de conversion, et une version optimisée de votre site générée par l\'IA.',
  openGraph: {
    title: 'RivallQ — Audit SEO & Reconstruction IA',
    description: 'Auditez, optimisez et reconstruisez votre site web avec l\'IA.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 z-50 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
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
