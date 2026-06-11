'use client'

import { motion } from 'framer-motion'
import { ImageComparison } from '@/components/ui/image-comparison-slider'

const pairs = [
  {
    label: 'Artisan BTP · Lyon',
    site: 'selesta.fr',
    before: '/before-after/selesta-avant.webp',
    after:  '/before-after/selesta-apres.webp',
    tag: 'Ravalement & isolation',
  },
  {
    label: 'Chatbot IA · France',
    site: 'botexpress.fr',
    before: '/before-after/botexpress-avant.webp',
    after:  '/before-after/botexpress-apres.webp',
    tag: 'SaaS & automatisation',
  },
  {
    label: 'Ostéopathe · Bordeaux',
    site: 'rdv-osteo-bordeaux.fr',
    before: '/before-after/osteo-avant.webp',
    after:  '/before-after/osteo-apres.webp',
    tag: 'Santé & bien-être',
  },
]

export function BeforeAfterShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24">
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

      {/* 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pairs.map(({ label, site, before, after, tag }, i) => (
          <motion.div
            key={site}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden flex flex-col"
          >
            {/* Card header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
              <span className="text-xs font-medium text-zinc-300">{label}</span>
              <span className="text-[10px] text-zinc-600 font-mono">{site}</span>
            </div>

            {/* Tag */}
            <div className="px-4 pt-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                {tag}
              </span>
            </div>

            {/* Slider */}
            <div className="p-3 flex-1">
              <ImageComparison
                beforeImage={before}
                afterImage={after}
                altBefore={`Avant — ${label}`}
                altAfter={`Après — ${label}`}
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800">
              <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-red-500/70 inline-block" />Avant</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70 inline-block" />Après</span>
              </div>
              <a href="/devis" className="text-[11px] font-semibold text-violet-400 hover:text-violet-300 transition-colors">
                Refondre mon site →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
