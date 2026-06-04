'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
  return (
    <section className="py-20 lg:py-28 border-t border-zinc-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-zinc-900/50 p-12 text-center overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet-600/20 blur-[80px]" />
            <div className="absolute top-1/4 right-1/4 h-48 w-48 rounded-full bg-indigo-600/15 blur-[60px]" />
          </div>

          {/* Live indicator */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              14 propriétaires ont audité leur site aujourd&apos;hui
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
            En ce moment, votre concurrent<br />
            <span className="text-violet-400">optimise son SEO.</span>
          </h2>

          <p className="text-zinc-400 text-lg mb-3 max-w-xl mx-auto">
            Pour 9,99€ — le prix d&apos;un café — découvrez exactement pourquoi vos visiteurs partent sans convertir.
          </p>

          <p className="text-zinc-500 text-sm mb-8 max-w-lg mx-auto">
            Résultats en 5 minutes. Remboursé sous 7 jours si insatisfait. Sans abonnement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/register" className="gap-2">
                Auditer mon site — 9,99€
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="ghost" size="xl" asChild>
              <Link href="#demo">Voir la démo gratuite</Link>
            </Button>
          </div>

          {/* Mini social proof */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-600">
            {['selesta.fr', 'clim69.fr', 'foxair.fr', 'g-cours.fr', 'isolationlyonrenovation.selesta.fr'].map(site => (
              <span key={site} className="font-mono">{site}</span>
            ))}
            <span className="text-zinc-700">+ 2 400 autres</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
