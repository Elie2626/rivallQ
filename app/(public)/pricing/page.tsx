import type { Metadata } from 'next'
import { PricingSection } from '@/components/public/pricing-section'
import { FaqPreview } from '@/components/public/faq-preview'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'

export const metadata: Metadata = {
  title: 'Tarifs — RivallQ',
  description: 'Audit SEO à 9,99€, site régénéré à 79€, installation WordPress à 299€ ou abonnement mensuel à 29€/mois.',
}

export default function PricingPage() {
  return (
    <div className="pt-20">
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
