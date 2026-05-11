'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    id: 'audit',
    name: 'Audit',
    price: '9,99€',
    period: 'paiement unique',
    description: 'Pour découvrir les problèmes de votre site.',
    features: [
      'Score SEO (0-100)',
      'Score UX & conversion',
      'Top 10 problèmes détectés',
      'Analyse des mots-clés',
      'Rapport détaillé',
      'Teaser du site régénéré',
    ],
    cta: 'Commencer l\'audit',
    href: '/register',
    highlighted: false,
    badge: null,
  },
  {
    id: 'rebuild',
    name: 'Site optimisé',
    price: '79€',
    period: 'paiement unique',
    description: 'La nouvelle version complète de votre site, optimisée par l\'IA.',
    features: [
      'Tout de l\'audit inclus',
      'Homepage complète régénérée',
      'Pages clés optimisées',
      'Copywriting amélioré par Claude',
      'SEO on-page optimisé',
      'Export ZIP prêt à déployer',
    ],
    cta: 'Obtenir mon site optimisé',
    href: '/register',
    highlighted: true,
    badge: 'Le plus populaire',
  },
  {
    id: 'installation',
    name: 'Done For You',
    price: '299€',
    period: 'paiement unique',
    description: 'On installe tout sur votre WordPress. Vous ne faites rien.',
    features: [
      'Tout du plan Site optimisé',
      'Publication sur WordPress',
      'Configuration SEO technique',
      'Redirection URLs',
      'Test & validation qualité',
      'Support prioritaire 7j',
    ],
    cta: 'Déléguer l\'installation',
    href: '/register',
    highlighted: false,
    badge: null,
  },
  {
    id: 'subscription',
    name: 'Pro mensuel',
    price: '29€',
    period: '/mois',
    description: 'Suivez et améliorez votre SEO en continu.',
    features: [
      '1 audit complet / mois',
      'Suivi de position des mots-clés',
      'Alertes de régression SEO',
      'Nouvelles optimisations IA',
      'Rapport mensuel PDF',
      'Support email prioritaire',
    ],
    cta: 'Démarrer l\'abonnement',
    href: '/register',
    highlighted: false,
    badge: 'Économisez 60%',
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4"
          >
            Tarifs
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-100 mb-4"
          >
            Simple, transparent,{' '}
            <span className="text-zinc-500">sans surprise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-xl mx-auto"
          >
            Commencez par un audit à 9,99€. Débloquez la suite seulement si vous êtes satisfait.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map(({ id, name, price, period, description, features, cta, href, highlighted, badge }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                highlighted
                  ? 'border-violet-500/50 bg-violet-600/10 shadow-xl shadow-violet-500/10'
                  : 'border-zinc-800 bg-zinc-900/40'
              }`}
            >
              {badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
                  {badge}
                </span>
              )}

              {highlighted && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" aria-hidden="true" />
              )}

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  {highlighted && <Zap className="h-4 w-4 text-violet-400" aria-hidden="true" />}
                  <h3 className="text-sm font-semibold text-zinc-300">{name}</h3>
                </div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-3xl font-bold text-zinc-100">{price}</span>
                  <span className="text-sm text-zinc-500 mb-1">{period}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
              </div>

              <ul className="flex-1 flex flex-col gap-2.5 mb-6" role="list">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check
                      className={`h-4 w-4 shrink-0 mt-0.5 ${highlighted ? 'text-violet-400' : 'text-emerald-500'}`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={highlighted ? 'gradient' : 'outline'}
                className="w-full"
                asChild
              >
                <Link href={href}>{cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-violet-400 font-medium mt-10"
        >
          Paiement sécurisé via Stripe · Remboursement sous 7 jours si insatisfait · TVA applicable selon votre pays
        </motion.p>
      </div>
    </section>
  )
}
