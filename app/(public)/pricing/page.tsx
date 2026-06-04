import type { Metadata } from 'next'
import { PricingSection } from '@/components/public/pricing-section'
import { FaqPreview } from '@/components/public/faq-preview'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'
import { PricingSchema } from '@/components/seo/json-ld'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'Prix Création Site Web & Audit SEO — Devis Gratuit | RivallQ',
  description:
    "Prix création site web professionnel : site vitrine à partir de 500€, avec chatbot IA à 1 000€, site premium 3D à 1 500€. Audit SEO à 9,99€. Devis création site internet gratuit et sans engagement.",
  alternates: { canonical: `${BASE}/pricing` },
  openGraph: {
    title: 'Prix Création Site Web & Audit SEO — RivallQ',
    description:
      "Prix création site internet : vitrine dès 500€, complet avec chatbot 1 000€, premium 3D 1 500€. Audit SEO 9,99€. Devis gratuit.",
    url: `${BASE}/pricing`,
  },
}

export default function PricingPage() {
  return (
    <div className="pt-20">
      <PricingSchema />
      <div className="text-center py-20 px-4 relative overflow-hidden">
        <HeroBackground />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">Tarifs</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Commencez par un audit. Débloquez le reste seulement si vous êtes convaincu.
          </p>
        </div>
      </div>
      <PricingSection />
      <FaqPreview />
      <CtaBanner />
    </div>
  )
}
