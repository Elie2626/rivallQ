'use client'

import { motion } from 'framer-motion'
import { X, Check, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const alternatives = [
  {
    label: 'Agence SEO',
    price: '1 500€ – 3 000€/mois',
    sub: 'Contrat 6-12 mois minimum',
    cons: ['Délai de 3 à 6 mois', 'Audit seul = 500€+', 'Pas de création de site incluse'],
  },
  {
    label: 'Consultant freelance',
    price: '300€ – 800€/session',
    sub: 'Rapport PDF sans implémentation',
    cons: ['Délai 2-4 semaines', 'Recommandations sans corrections', 'Refonte facturée à part'],
  },
  {
    label: 'Refonte web complète',
    price: '3 000€ – 15 000€',
    sub: 'Projet de 1 à 3 mois',
    cons: ['Perte de vos contenus existants', 'Dépendance à l\'agence', 'Pas d\'audit SEO inclus'],
  },
]

const rivallqPros = [
  'Audit SEO, UX & conversion complet',
  'Résultats en 5 minutes chrono',
  'Création de site à partir de 500€',
  'Devis personnalisé en temps réel',
  'Livraison en 24h à 3 semaines',
  'Remboursé si insatisfait — 7 jours',
]

export function ValueComparison() {
  return (
    <section className="py-20 lg:py-28 border-t border-zinc-900 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Pourquoi RivallQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4"
          >
            Ce que les autres facturent.
            <br />
            <span className="text-zinc-500">Ce que vous payez.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-xl mx-auto"
          >
            Même résultat. Fraction du coût. Fraction du temps.
          </motion.p>
        </div>

        {/* Comparison grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {alternatives.map(({ label, price, sub, cons }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col"
            >
              <h3 className="text-sm font-semibold text-zinc-400 mb-1">{label}</h3>
              <p className="text-[11px] text-zinc-600 mb-3">{sub}</p>
              <p className="text-lg font-bold text-zinc-300 mb-4">{price}</p>
              <ul className="flex flex-col gap-2">
                {cons.map(c => (
                  <li key={c} className="flex items-start gap-2 text-xs text-zinc-500">
                    <X className="h-3.5 w-3.5 text-red-500/70 shrink-0 mt-0.5" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* RivallQ — highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.28 }}
            className="rounded-2xl border border-violet-500/50 bg-violet-600/10 p-6 flex flex-col relative shadow-xl shadow-violet-500/10"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
              La meilleure option
            </span>
            <h3 className="text-sm font-semibold text-violet-300 mb-1">RivallQ</h3>
            <p className="text-[11px] text-zinc-500 mb-3">Résultats en 5 minutes</p>
            <div className="mb-4">
              <span className="text-3xl font-black text-zinc-100">4,99€</span>
              <span className="text-xs text-zinc-500 ml-1">audit complet</span>
            </div>
            <ul className="flex-1 flex flex-col gap-2 mb-5">
              {rivallqPros.map(p => (
                <li key={p} className="flex items-start gap-2 text-xs text-zinc-300">
                  <Check className="h-3.5 w-3.5 text-violet-400 shrink-0 mt-0.5" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Button variant="gradient" className="w-full" asChild>
              <Link href="/register">
                Commencer — 4,99€
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" aria-hidden="true" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* ROI callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <TrendingUp className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-semibold text-violet-300 mb-1">Vous avez déjà un site ?</p>
            <p className="text-sm text-zinc-400 mb-4">
              On peut <strong className="text-zinc-200">refondre ou moderniser votre site existant</strong> — même tarif que la création. Aucune perte de contenu, zéro interruption.
            </p>
            <p className="text-sm font-semibold text-emerald-300 mb-1">Calcul ROI rapide</p>
            <p className="text-sm text-zinc-400">
              Si votre site convertit <strong className="text-zinc-200">1 client supplémentaire</strong> par mois grâce à l&apos;audit —
              valeur moyenne d&apos;un client TPE : 300€ — le retour sur investissement est de{' '}
              <strong className="text-emerald-300">×30 dès le premier mois.</strong>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
