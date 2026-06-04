'use client'

import { motion } from 'framer-motion'

export function DemoSection() {
  return (
    <section id="demo" className="py-20 lg:py-28 border-t border-zinc-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Démonstration live
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4"
          >
            Voyez comment ça fonctionne
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            En 5 minutes, RivallQ analyse votre site et vous donne un diagnostic complet — SEO, UX, conversion.
            <br className="hidden sm:block" />
            <span className="text-zinc-500">Puis obtenez un devis pour créer ou refondre votre site professionnel.</span>
          </motion.p>
        </div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/40"
        >
          {/* Fausse barre navigateur */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/60">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <div className="flex-1 mx-3 h-6 rounded-md bg-zinc-700/60 flex items-center px-3">
              <span className="text-[11px] text-zinc-500 font-mono">app.rivallq.com/audit/demo</span>
            </div>
          </div>

          <video
            src="/demo.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="w-full block bg-zinc-950"
            style={{ maxHeight: '70vh' }}
          />
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-zinc-600 mt-6"
        >
          Audit complet en 5 minutes · Score SEO, UX & conversion · Devis de création inclus
        </motion.p>
      </div>
    </section>
  )
}
