import type { Metadata } from 'next'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'
import { BeforeAfterShowcase } from '@/components/public/before-after-showcase'

const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://rivallq.com'

export const metadata: Metadata = {
  title: "À propos — Notre mission : démocratiser l'audit SEO par IA",
  description:
    "RivallQ aide les entreprises à obtenir plus de clients avec Google. Audit SEO en ligne, amélioration du référencement naturel, création site web professionnel sur mesure dès 500€. +2000 sites analysés.",
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: 'À propos de RivallQ — Audit SEO & IA',
    description: "Notre mission : rendre l'optimisation SEO accessible à tous grâce à l'IA.",
    url: `${BASE}/about`,
  },
}

const stats = [
  { value: '+2 000', label: 'Sites analysés' },
  { value: '4,9/5', label: 'Satisfaction client' },
  { value: '60s', label: 'Temps d\'analyse' },
  { value: '+47%', label: 'Conversions en moyenne' },
]

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="text-center py-24 px-4 relative overflow-hidden">
        <HeroBackground />
        <div className="relative z-10">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
            À propos
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-100 mb-6 max-w-3xl mx-auto leading-tight">
            On croit que chaque site mérite{' '}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              d&apos;être excellent
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
            RivallQ est né d&apos;un constat simple : trop de sites perdent des clients à cause
            de problèmes SEO et UX basiques, mais les outils pour les corriger sont
            soit trop chers, soit trop complexes. On a changé ça.
          </p>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <section className="border-y border-zinc-800 bg-zinc-900/30">
        <div className="mx-auto max-w-5xl px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-violet-400 mb-1">{value}</p>
              <p className="text-sm text-zinc-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-24">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">
            Notre mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-6">
            Démocratiser l&apos;optimisation web grâce à l&apos;IA
          </h2>
          <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
            <p>
              Les grandes entreprises ont des équipes entières dédiées au SEO, à l&apos;UX
              et à la conversion. Les petites structures, elles, naviguent à vue.
              RivallQ leur donne accès aux mêmes capacités d&apos;analyse, pour une fraction du prix.
            </p>
            <p>
              En 60 secondes et pour 4,99€, tu obtiens un rapport complet sur le SEO,
              l&apos;expérience utilisateur et le taux de conversion de ton site — avec des
              recommandations priorisées et actionnables, générées par Tsitsit.
            </p>
            <p>
              Et si tu veux aller plus loin, RivallQ peut créer ton site de A à Z —
              vitrine simple dès 500€, avec chatbot IA à 1 000€ ou premium 3D à 1 500€.
              Devis gratuit en temps réel, livraison en 24h à 3 semaines.
            </p>
          </div>
        </div>
      </section>

      {/* ── Avant / Après ────────────────────────────────── */}
      <BeforeAfterShowcase />

      {/* ── CTA ──────────────────────────────────────────── */}
      <CtaBanner />
    </div>
  )
}
