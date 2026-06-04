import type { Metadata } from 'next'
import { HowItWorks } from '@/components/public/how-it-works'
import { FeaturesGrid } from '@/components/public/features-grid'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: "Fonctionnalités — Outil Audit SEO & Analyse Référencement | RivallQ",
  description:
    "Outil d'audit SEO complet : analyse performance SEO, diagnostic référencement naturel, vérification Google, score UX & conversion. Création site web professionnel dès 500€. Résultats en 5 minutes.",
  alternates: { canonical: `${BASE}/features` },
  openGraph: {
    title: 'Fonctionnalités RivallQ — Audit SEO & Analyse Référencement',
    description: "Outil audit SEO, diagnostic référencement naturel, évaluation UX. Création site internet professionnel dès 500€.",
    url: `${BASE}/features`,
  },
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
            Un seul outil pour auditer votre site et créer votre nouveau site sur mesure.
          </p>
        </div>
      </div>
      <HowItWorks />
      <FeaturesGrid />
      <CtaBanner />
    </div>
  )
}
