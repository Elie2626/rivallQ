'use client'

import { motion } from 'framer-motion'
import { Globe, Brain, Wand2, Rocket } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Globe,
    title: 'Entrez votre URL',
    description: 'Collez l\'URL de votre site. RivallQ scrape automatiquement toutes les pages clés.',
    color: 'from-blue-600 to-cyan-600',
    glow: 'shadow-blue-500/20',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Analyse IA complète',
    description: 'Tsitsit analyse le SEO, l\'UX, le copywriting, les mots-clés et les opportunités de conversion.',
    color: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    number: '03',
    icon: Wand2,
    title: 'Devis sur mesure',
    description: 'Obtenez un devis personnalisé en temps réel. Choisissez votre type de site, vos options et votre délai.',
    color: 'from-indigo-600 to-violet-600',
    glow: 'shadow-indigo-500/20',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Votre site livré',
    description: 'Nous créons votre site et vous le livrons en 24h à 3 semaines selon la formule choisie.',
    color: 'from-emerald-600 to-teal-600',
    glow: 'shadow-emerald-500/20',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Comment ça marche
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4"
          >
            Nouveau site ou refonte — on s&apos;occupe de tout
            <br />
            <span className="text-zinc-500">en 4 étapes</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 max-w-xl mx-auto"
          >
            Aucune compétence technique requise. RivallQ fait tout le travail à votre place.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ number, icon: Icon, title, description, color, glow }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Connector line (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-[calc(100%-1rem)] w-8 h-px bg-gradient-to-r from-zinc-700 to-zinc-800"
                  aria-hidden="true"
                />
              )}

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 h-full hover:border-zinc-700 transition-colors duration-300">
                {/* Icon */}
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg ${glow}`}>
                  <Icon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>

                {/* Number */}
                <span className="text-xs font-bold text-zinc-700 font-mono mb-3 block">{number}</span>

                <h3 className="text-base font-semibold text-zinc-100 mb-2">{title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
