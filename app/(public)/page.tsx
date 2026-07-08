import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/public/hero-section'
import { SoftwareAppSchema } from '@/components/seo/json-ld'
import { ConversionTracker } from '@/components/app/conversion-tracker'

const HowItWorks       = dynamic(() => import('@/components/public/how-it-works').then(m => m.HowItWorks))
const ValueComparison  = dynamic(() => import('@/components/public/value-comparison').then(m => m.ValueComparison))
const FeaturesGrid     = dynamic(() => import('@/components/public/features-grid').then(m => m.FeaturesGrid))
const TestimonialsSection = dynamic(() => import('@/components/public/testimonials-section').then(m => m.TestimonialsSection))
const PricingSection   = dynamic(() => import('@/components/public/pricing-section').then(m => m.PricingSection))
const FaqPreview       = dynamic(() => import('@/components/public/faq-preview').then(m => m.FaqPreview))
const CtaBanner        = dynamic(() => import('@/components/public/cta-banner').then(m => m.CtaBanner))

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'Création Site Web Lyon — RivallQ | Sites Vitrine dès 500€',
  description:
    "Création de site web professionnel à Lyon et Villeurbanne. Site vitrine sur mesure livré en 1 semaine dès 500€. Audit SEO inclus. Devis gratuit en 5 minutes.",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: 'Création Site Web Lyon — RivallQ | Sites Vitrine dès 500€',
    description:
      "Création site internet professionnel à Lyon. Site vitrine sur mesure, optimisé SEO, livré en 1 semaine dès 500€. Devis gratuit en temps réel.",
    url: BASE,
    type: 'website',
  },
  twitter: {
    title: 'Création Site Web Lyon — RivallQ',
    description: "Site vitrine professionnel à Lyon dès 500€. Livraison en 1 semaine. Devis gratuit.",
  },
  keywords: [
    'création site web Lyon',
    'création site internet Lyon',
    'agence web Lyon',
    'site vitrine Lyon',
    'création site web Villeurbanne',
    'site web artisan Lyon',
    'audit SEO Lyon',
    'création site web pas cher Lyon',
  ],
}

export default function HomePage() {
  return (
    <>
      <SoftwareAppSchema />
      {/* Google Ads — "Page vue / Présentation" conversion */}
      <ConversionTracker sendTo="AW-18222517793/WWkxCJz48bscEKGclvFD" />
      <HeroSection />
      <HowItWorks />
      <ValueComparison />
      <FeaturesGrid />
      <TestimonialsSection />
      <PricingSection />
      <FaqPreview />
      <CtaBanner />
    </>
  )
}
