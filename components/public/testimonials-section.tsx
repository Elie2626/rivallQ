'use client'

import { useRef } from 'react'
import { m } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'

const featured = [
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
    content: 'L\'audit a pointé exactement ce qui clochait sur notre site. On a commandé la création du site vitrine — livré en 4 jours, propre et optimisé SEO.',
    stars: 5,
    result: '1 semaine économisée',
  },
  {
    siteUrl: 'https://rdv-osteo-bordeaux.fr/',
    displayUrl: 'rdv-osteo-bordeaux.fr',
    name: 'Cabinet Ostéo Bordeaux',
    role: 'Santé & bien-être',
    avatar: 'OB',
    content: 'RivallQ a pointé des problèmes de conversion qu\'on ignorait totalement. En une journée d\'optimisation, notre taux de prise de RDV a bondi.',
    stars: 5,
    result: '+38% RDV en ligne',
  },
  {
    siteUrl: 'https://closermatch.fr',
    displayUrl: 'closermatch.fr',
    name: 'CloserMatch',
    role: 'Recrutement & mise en relation',
    avatar: 'CM',
    content: 'Site refait de zéro par RivallQ — design moderne, rapide, et optimisé pour convertir. On a vu une différence immédiate sur le taux d\'engagement.',
    stars: 5,
    result: '+61% engagement',
  },
  {
    siteUrl: 'https://botexpress.fr',
    displayUrl: 'botexpress.fr',
    name: 'BotExpress',
    role: 'Automatisation & chatbots, France',
    avatar: 'BE',
    content: 'Interface claire, rapport détaillé. RivallQ nous a permis d\'identifier les freins UX qui faisaient fuir nos visiteurs. Résultats visibles en 2 semaines.',
    stars: 5,
    result: '-42% taux de rebond',
  },
]

// Dupliquer pour l'effet infini
const items = [...featured, ...featured]

function SitePreviewCard({ item }: { item: (typeof featured)[number] }) {
  const thumbUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(item.siteUrl)}?w=800&h=450`

  return (
    <article className="w-[300px] sm:w-[340px] flex-shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden flex flex-col hover:border-violet-500/30 transition-colors duration-300">
      {/* Mini browser */}
      <div className="bg-zinc-800/80 flex-shrink-0">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-700/60">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <div className="flex-1 mx-2 rounded-md bg-zinc-700/60 flex items-center px-3 h-6">
            <span className="text-[10px] text-zinc-500 truncate">{item.displayUrl}</span>
          </div>
          <a href={item.siteUrl} target="_blank" rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
            aria-label={`Ouvrir ${item.displayUrl}`}>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="relative h-40 overflow-hidden bg-zinc-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={thumbUrl} alt={`Aperçu de ${item.displayUrl}`}
            className="w-full h-full object-cover object-top" loading="lazy" />
          <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-zinc-900/90 to-transparent" />
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex gap-0.5" aria-label={`${item.stars} étoiles sur 5`}>
          {Array.from({ length: item.stars }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
          ))}
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed flex-1">&ldquo;{item.content}&rdquo;</p>
        <span className="inline-block self-start rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
          {item.result}
        </span>
        <div className="flex items-center gap-3 pt-3 border-t border-zinc-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0" aria-hidden="true">
            {item.avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{item.name}</p>
            <p className="text-xs text-zinc-500">{item.role}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-20 lg:py-28 border-t border-zinc-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Réalisations
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-4"
          >
            Ils ont transformé leur site
          </m.h2>
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-1 mb-2"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </m.div>
          <p className="text-sm text-zinc-500">4,9/5 · {featured.length} clients satisfaits</p>
        </div>
      </div>

      {/* Carousel infini */}
      <div className="relative">
        {/* Fade gauche */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        {/* Fade droite */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4 animate-marquee hover:[animation-play-state:paused]"
          ref={trackRef}
          style={{ width: 'max-content' }}
        >
          {items.map((item, i) => (
            <SitePreviewCard key={`${item.siteUrl}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
