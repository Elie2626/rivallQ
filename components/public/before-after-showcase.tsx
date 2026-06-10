'use client'

import { motion } from 'framer-motion'
import { ImageComparison } from '@/components/ui/image-comparison-slider'

const mshots = (url: string) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=1200&h=675`

const pairs = [
  {
    label: 'Artisan BTP · Lyon',
    site: 'selesta.fr',
    before: mshots('https://selesta.fr'),
    after:  mshots('https://eiffage.com'),
    tag: 'Ravalement & isolation',
  },
  {
    label: 'Ostéopathe · Bordeaux',
    site: 'rdv-osteo-bordeaux.fr',
    before: mshots('https://rdv-osteo-bordeaux.fr'),
    after:  mshots('https://www.doctolib.fr'),
    tag: 'Santé & bien-être',
  },
  {
    label: 'Climatisation · Lyon',
    site: 'clim69.fr',
    before: mshots('https://clim69.fr'),
    after:  mshots('https://rivallq.com'),
    tag: 'Chauffage & clim',
  },
]

export function BeforeAfterShowcase() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-24">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">
          Transformations réelles
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mb-3">
          Avant → Après
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-sm">
          Glisse le curseur pour voir la différence. De vrais sites reconstruits par RivallQ.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
        {pairs.map(({ label, site, before, after, tag }, i) => (
          <motion.div
            key={site}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {tag}
                </span>
                <span className="text-sm font-medium text-zinc-300">{label}</span>
              </div>
              <span className="text-xs text-zinc-600 font-mono">{site}</span>
            </div>

            {/* Slider */}
            <div className="p-4">
              <ImageComparison
                beforeImage={before}
                afterImage={after}
                altBefore={`Site original — ${label}`}
                altAfter={`Site reconstruit — ${label}`}
              />
            </div>

            {/* Card footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/70" />
                  <span className="text-xs text-zinc-500">Avant — ancien design</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
                  <span className="text-xs text-zinc-500">Après — reconstruction RivallQ</span>
                </div>
              </div>
              <a
                href="/devis"
                className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
              >
                Refondre mon site →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
