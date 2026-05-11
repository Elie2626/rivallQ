import type { Metadata } from 'next'
import { HowItWorks } from '@/components/public/how-it-works'
import { FeaturesGrid } from '@/components/public/features-grid'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'

export const metadata: Metadata = {
  title: 'Fonctionnalités — RivallQ',
  description: 'Découvrez toutes les fonctionnalités d\'RivallQ : audit SEO, analyse UX, reconstruction IA, export WordPress et bien plus.',
}

export default function FeaturesPage() {
  return (
    <div className="pt-20">
      <div className="text-center py-20 px-4 relative overflow-hidden">
        <HeroBackground />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">Fonctionnalités</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">
            Tout ce qu&apos;RivallQ fait pour vous
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Un seul outil pour auditer, optimiser et reconstruire votre site web avec l&apos;IA.
          </p>
        </div>
      </div>
      <HowItWorks />
      <FeaturesGrid />
      <CtaBanner />
    </div>
  )
}
