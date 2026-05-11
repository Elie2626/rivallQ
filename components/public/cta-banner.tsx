'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-violet-600/20 blur-[60px]" />
          </div>

          <div className="flex justify-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/30">
              <Zap className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4">
            Votre site mérite mieux.
            <br />
            <span className="text-violet-400">Commencez maintenant.</span>
          </h2>

          <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
            Un audit complet pour 9,99€. Sans abonnement, sans engagement.
            Résultats garantis ou remboursé.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/register" className="gap-2">
                Auditer mon site maintenant
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button variant="ghost" size="xl" asChild>
              <Link href="/pricing">Voir les tarifs</Link>
            </Button>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            Paiement sécurisé Stripe · Remboursement 7j · Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  )
}
