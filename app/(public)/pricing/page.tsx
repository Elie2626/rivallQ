import type { Metadata } from 'next'
import { PricingSection } from '@/components/public/pricing-section'
import { FaqPreview } from '@/components/public/faq-preview'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'
import { PricingSchema } from '@/components/seo/json-ld'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: 'Tarifs — Audit SEO IA dès 9,99€ | RivallQ',
  description:
    "Audit SEO complet à 9,99€, site web reconstruit par IA à 79€, installation WordPress à 299€, abonnement illimité à 29€/mois. Sans engagement, remboursé sous 7 jours.",
  alternates: { canonical: `${BASE}/pricing` },
  openGraph: {
    title: 'Tarifs RivallQ — Audit SEO IA dès 9,99€',
    description:
      "Audit SEO à 9,99€, site régénéré à 79€, WordPress à 299€ ou abonnement 29€/mois. Sans engagement.",
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
