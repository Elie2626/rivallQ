'use client'

import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

// ── Témoignages avec aperçu de site réel ──────────────────────
const featured: {
  siteUrl: string
  displayUrl: string
  name: string
  role: string
  avatar: string
  content: string
  stars: number
  result: string
}[] = [
  {
    siteUrl: 'https://selesta.fr',
    displayUrl: 'selesta.fr',
    name: 'Équipe Selesta',
    role: 'Plateforme SaaS',
    avatar: 'SE',
    content: 'RivallQ a identifié des problèmes SEO critiques qu\'on n\'aurait jamais vus seuls. Le rapport était clair et les recommandations actionnables immédiatement.',
    stars: 5,
    result: '+52 pts SEO',
  },
  {
    siteUrl: 'https://isolationlyonrenovation.selesta.fr',
    displayUrl: 'isolationlyonrenovation.selesta.fr',
    name: 'Isolation Lyon Rénovation',
    role: 'Artisan BTP, Lyon',
    avatar: 'IL',
    content: 'On a doublé nos demandes de devis en moins d\'un mois après avoir appliqué les recommandations UX d\'RivallQ. ROI immédiat.',
    stars: 5,
    result: '×2 demandes de devis',
  },
  {
    siteUrl: 'https://g-cours.fr',
    displayUrl: 'g-cours.fr',
    name: 'G-Cours',
    role: 'Plateforme éducative',
    avatar: 'GC',
    content: 'La reconstruction automatique de notre page d\'accueil nous a économisé une semaine de travail. Le résultat est propre, rapide et optimisé.',
    stars: 5,
    result: '1 semaine économisée',
  },
  {
    siteUrl: 'https://tsohar-ai.onrender.com',
    displayUrl: 'tsohar-ai.onrender.com',
    name: 'Équipe Tsohar AI',
    role: 'Plateforme IA',
    avatar: 'TA',
    content: 'RivallQ a pointé des problèmes de conversion qu\'on ignorait totalement. En une journée d\'optimisation, notre taux de sign-up a bondi.',
    stars: 5,
    result: '+38% sign-ups',
  },
  {
    siteUrl: 'https://clim69.fr',
    displayUrl: 'clim69.fr',
    name: 'Clim69',
    role: 'Climatisation & chauffage, Lyon',
    avatar: 'C6',
    content: 'Le rapport SEO était précis et simple à comprendre. On a suivi les recommandations et notre fiche Google remonte enfin en première page.',
    stars: 5,
    result: 'Page 1 Google',
  },
  {
    siteUrl: 'https://foxair.fr',
    displayUrl: 'foxair.fr',
    name: 'FoxAir',
    role: 'Climatisation, Rhône-Alpes',
    avatar: 'FA',
    content: 'Interface claire, rapport détaillé. RivallQ nous a permis d\'identifier les freins UX qui faisaient fuir nos visiteurs. Résultats visibles en 2 semaines.',
    stars: 5,
    result: '-42% taux de rebond',
  },
]


function SitePreviewCard({
  item,
  index,
}: {
  item: (typeof featured)[number]
  index: number
}) {
  // WordPress mshots — service gratuit, fiable, pas de clé API
  const thumbUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.siteUrl)}?w=1200&h=630`

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden flex flex-col hover:border-violet-500/30 transition-colors duration-300"
    >
      {/* ── Mini browser ── */}
      <div className="relative bg-zinc-800/80 flex-shrink-0">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-700/60">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-2 rounded-md bg-zinc-700/60 flex items-center px-3 h-6 gap-2">
            <span className="text-[10px] text-zinc-500 truncate">{item.displayUrl}</span>
          </div>
          <a
            href={item.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
            aria-label={`Ouvrir ${item.displayUrl}`}
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Screenshot — balise img native, pas de contrainte de domaine Next.js */}
        <div className="relative h-44 overflow-hidden bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbUrl}
            alt={`Aperçu de ${item.displayUrl}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          {/* Gradient fade bottom */}
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-zinc-900/90 to-transparent" />
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Stars */}
        <div className="flex gap-0.5" aria-label={`${item.stars} étoiles sur 5`}>
          {Array.from({ length: item.stars }).map((_, si) => (
            <Star key={si} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm text-zinc-300 leading-relaxed flex-1">&ldquo;{item.content}&rdquo;</p>

        {/* Result */}
        <span className="inline-block self-start rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
          {item.result}
        </span>

        {/* Author */}
        <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
          <div
            className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            aria-hidden="true"
          >
            {item.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{item.name}</p>
            <p className="text-xs text-zinc-500">{item.role}</p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 border-t border-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Témoignages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4"
          >
            Ils ont transformé leur site
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-1 mb-2"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </motion.div>
          <p className="text-sm text-zinc-500">4,9/5 basé sur 200+ avis</p>
        </div>

        {/* Featured — avec aperçu de site */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {featured.map((item, i) => (
            <SitePreviewCard key={item.siteUrl} item={item} index={i} />
          ))}
        </div>


      </div>
    </section>
  )
}
