'use client'

import { m } from 'framer-motion'
import { Globe, Brain, Wand2, Rocket, User } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Globe,
    title: 'Entrez votre URL',
    description: 'Collez l\'URL de votre site. RivallQ analyse automatiquement toutes vos pages en quelques secondes.',
    color: 'from-blue-600 to-cyan-600',
    glow: 'shadow-blue-500/20',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Diagnostic complet',
    description: 'L\'IA génère un rapport SEO, UX et conversion — score, problèmes critiques, mots-clés manquants.',
    color: 'from-violet-600 to-purple-600',
    glow: 'shadow-violet-500/20',
  },
  {
    number: '03',
    icon: Wand2,
    title: 'Devis sur mesure',
    description: 'Remplissez le questionnaire en 2 min. Le prix s\'affiche en temps réel selon vos besoins.',
    color: 'from-indigo-600 to-violet-600',
    glow: 'shadow-indigo-500/20',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Je crée votre site',
    description: 'Je conçois et développe votre site moi-même, à la main — pas un template automatique. Livré en 24h à 3 semaines.',
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
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Comment ça marche
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4"
          >
            Nouveau site ou refonte — on s&apos;occupe de tout
            <br />
            <span className="text-zinc-500">en 4 étapes</span>
          </m.h2>
          <m.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 max-w-xl mx-auto"
          >
            Aucune compétence technique requise. RivallQ fait tout le travail à votre place.
          </m.p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ number, icon: Icon, title, description, color, glow }, i) => (
            <m.div
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
            </m.div>
          ))}
        </div>

        {/* Callout "fait par un humain" */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 rounded-2xl border border-violet-500/20 bg-violet-600/5 px-6 py-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
            <User className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-bold text-zinc-100 mb-0.5">
              Votre site est créé par un expert — pas généré automatiquement
            </p>
            <p className="text-sm text-zinc-400">
              Chaque site est conçu et développé <strong className="text-zinc-200">à la main</strong> par Elie,
              développeur web spécialisé en SEO. Pas un Wix, pas un template IA. Un vrai site professionnel, sur mesure.
            </p>
          </div>
        </m.div>

      </div>
    </section>
  )
}
