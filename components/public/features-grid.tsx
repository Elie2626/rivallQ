'use client'

import { m } from 'framer-motion'
import {
  Search, BarChart3, Wand2, FileDown, Globe, RefreshCw,
  Shield, Zap, Eye, Target, TrendingUp, Code2,
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Audit SEO complet',
    description: 'Analyse title, meta, headings, contenu, vitesse, structured data, Open Graph — tout est couvert.',
    badge: 'SEO',
  },
  {
    icon: BarChart3,
    title: 'Score de conversion',
    description: 'Détecte les CTA manquants, copywriting faible, manque de preuves sociales et obstacles à l\'achat.',
    badge: 'Conversion',
  },
  {
    icon: Eye,
    title: 'Analyse UX',
    description: 'Évalue la hiérarchie visuelle, la lisibilité, la navigation et l\'expérience mobile.',
    badge: 'UX',
  },
  {
    icon: Target,
    title: 'Mots-clés & concurrents',
    description: 'Identifie vos mots-clés actuels, les opportunités manquées et les stratégies de vos concurrents.',
    badge: 'Keywords',
  },
  {
    icon: Wand2,
    title: 'Création de site sur mesure',
    description: 'À partir de 500€ : site vitrine, chatbot IA, design 3D. Devis gratuit en temps réel selon vos besoins.',
    badge: 'Création',
    highlighted: true,
  },
  {
    icon: FileDown,
    title: 'Devis instantané',
    description: 'Répondez à 5 questions et obtenez un prix personnalisé immédiatement — sans engagement.',
    badge: 'Devis',
  },
  {
    icon: Globe,
    title: 'Livraison rapide',
    description: 'Site vitrine simple livré en 24h à 1 semaine. Complet en 1-2 semaines. Premium en 2-3 semaines.',
    badge: 'Rapide',
  },
  {
    icon: RefreshCw,
    title: 'Maintenance mensuelle',
    description: 'Mises à jour, sauvegardes, sécurité et support prioritaire inclus pour 50€/mois.',
    badge: 'Maintenance',
  },
  {
    icon: Zap,
    title: 'Résultats en 5 minutes',
    description: 'Analyse IA ultra-rapide. Pas d\'attente de 24h — vos résultats sont là en moins d\'une minute.',
    badge: 'Rapide',
  },
  {
    icon: Shield,
    title: 'Sécurité & RGPD',
    description: 'Vos données sont chiffrées et jamais revendues. Hébergement européen, conforme RGPD.',
    badge: 'Sécurisé',
  },
  {
    icon: TrendingUp,
    title: 'Rapport actionnable',
    description: 'Pas juste des chiffres. Chaque problème vient avec une recommandation concrète à appliquer.',
    badge: 'Rapport',
  },
  {
    icon: Code2,
    title: 'Sans code requis',
    description: 'Accessible à tous. Que vous soyez développeur ou non, RivallQ s\'adapte à votre niveau.',
    badge: 'No-code',
  },
]

export function FeaturesGrid() {
  return (
    <section className="py-20 lg:py-28 bg-zinc-950/50 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Fonctionnalités
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4"
          >
            Tout ce dont votre site a besoin
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-xl mx-auto"
          >
            Un seul outil remplace SEMrush, Lighthouse, les UX consultants et les développeurs WordPress.
          </m.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, description, badge, highlighted }, i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${
                highlighted
                  ? 'border-violet-500/40 bg-violet-600/10 hover:border-violet-500/60'
                  : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${highlighted ? 'bg-violet-600/20' : 'bg-zinc-800'}`}>
                  <Icon className={`h-4 w-4 ${highlighted ? 'text-violet-400' : 'text-zinc-400'}`} aria-hidden="true" />
                </div>
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${highlighted ? 'bg-violet-500/20 text-violet-300' : 'bg-zinc-800 text-zinc-500'}`}>
                  {badge}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">{title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
