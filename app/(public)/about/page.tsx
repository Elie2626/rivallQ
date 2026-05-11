import type { Metadata } from 'next'
import { CtaBanner } from '@/components/public/cta-banner'
import { HeroBackground } from '@/components/ui/hero-background'
import { Zap, Target, Users, TrendingUp, Shield, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos — RivallQ',
  description: 'RivallQ est un outil d\'audit SEO et de reconstruction de site web propulsé par l\'IA. Découvrez notre mission et notre équipe.',
}

const values = [
  {
    icon: Target,
    title: 'Résultats concrets',
    description: 'Pas de jargon, pas de rapports inutiles. RivallQ te donne des recommandations actionnables et génère directement une version améliorée de ton site.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Zap,
    title: 'IA de pointe',
    description: 'Propulsé par Claude d\'Anthropic, l\'un des modèles les plus avancés du marché. Chaque audit bénéficie d\'une analyse profonde et nuancée.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: Shield,
    title: 'Simple & accessible',
    description: 'Tu n\'as pas besoin d\'être développeur. Colle ton URL, paye 9,99€ et reçois ton rapport complet en moins de 5 minutes.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Impact mesurable',
    description: 'Nos clients observent en moyenne +47% de taux de conversion après avoir appliqué les recommandations RivallQ.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
  },
  {
    icon: Users,
    title: 'Pour tous les créateurs',
    description: 'Freelances, agences, startups, PME — RivallQ s\'adapte à tous les profils et tous les budgets.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: Heart,
    title: 'Fait avec soin',
    description: 'Chaque fonctionnalité est pensée pour te faire gagner du temps et de l\'argent, pas pour t\'impressionner avec des métriques creuses.',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/20',
  },
]

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
              En 60 secondes et pour 9,99€, tu obtiens un rapport complet sur le SEO,
              l&apos;expérience utilisateur et le taux de conversion de ton site — avec des
              recommandations priorisées et actionnables, générées par Claude AI.
            </p>
            <p>
              Et si tu veux aller plus loin, RivallQ peut carrément reconstruire ta page
              d&apos;accueil avec un copywriting optimisé, des balises méta réécrites et un
              design amélioré. Tout ça automatiquement.
            </p>
          </div>
        </div>
      </section>

      {/* ── Valeurs ──────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-24">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
            Ce qui nous guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100">
            Nos valeurs
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className={`rounded-2xl border p-6 ${bg} transition-all hover:-translate-y-0.5`}
            >
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <CtaBanner />
    </div>
  )
}
