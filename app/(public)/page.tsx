import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/public/hero-section'
import { SoftwareAppSchema } from '@/components/seo/json-ld'
import { ConversionTracker } from '@/components/app/conversion-tracker'

const HowItWorks       = dynamic(() => import('@/components/public/how-it-works').then(m => m.HowItWorks))
const DemoSection      = dynamic(() => import('@/components/public/demo-section').then(m => m.DemoSection))
const ValueComparison  = dynamic(() => import('@/components/public/value-comparison').then(m => m.ValueComparison))
const FeaturesGrid     = dynamic(() => import('@/components/public/features-grid').then(m => m.FeaturesGrid))
const TestimonialsSection = dynamic(() => import('@/components/public/testimonials-section').then(m => m.TestimonialsSection))
const PricingSection   = dynamic(() => import('@/components/public/pricing-section').then(m => m.PricingSection))
const FaqPreview       = dynamic(() => import('@/components/public/faq-preview').then(m => m.FaqPreview))
const CtaBanner        = dynamic(() => import('@/components/public/cta-banner').then(m => m.CtaBanner))

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'RivallQ — Audit SEO en Ligne & Création Site Web | Dès 4,99€',
  description:
    "Audit SEO en ligne : analysez le référencement de votre site en 5 minutes. Diagnostic SEO complet, score UX & conversion. Création site vitrine professionnel dès 500€. Améliorez votre visibilité Google.",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: 'RivallQ — Audit SEO & Création Site Web Professionnel',
    description:
      "Analysez le SEO de votre site en 5 minutes. Obtenez plus de clients sur Google. Création site internet dès 500€, devis gratuit en temps réel.",
    url: BASE,
    type: 'website',
  },
  twitter: {
    title: 'RivallQ — Audit SEO & Création Site Web',
    description: "Diagnostic SEO en 5 min + création site internet professionnel dès 500€. Devis gratuit.",
  },
}

export default function HomePage() {
  return (
    <>
      <SoftwareAppSchema />
      {/* Google Ads — "Page vue / Présentation" conversion */}
      <ConversionTracker sendTo="AW-18222517793/WWkxCJz48bscEKGclvFD" />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 z-50 bg-violet-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Passer au contenu principal
      </a>
      <HeroSection />
      <HowItWorks />
      <DemoSection />
      <ValueComparison />
      <FeaturesGrid />
      <TestimonialsSection />
      <PricingSection />
      <FaqPreview />
      <CtaBanner />
    </>
  )
}
