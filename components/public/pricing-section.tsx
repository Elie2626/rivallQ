'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Zap, Globe, Cpu, Sparkles, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useIsPromoActive } from '@/components/public/promo-banner'

const plans = [
  {
    id: 'audit',
    icon: Zap,
    iconColor: 'text-zinc-400',
    name: 'Audit SEO',
    price: '9,99€',
    promoPrice: '4,99€',
    period: 'paiement unique',
    description: 'Analysez votre site et découvrez ce qui freine vos clients.',
    features: [
      'Score SEO / UX / Conversion',
      'Top problèmes détectés',
      'Analyse des mots-clés',
      'Rapport complet par IA',
      'Bouton "Demander un devis"',
    ],
    cta: 'Lancer mon audit',
    href: '/register',
    highlighted: false,
    badge: null,
  },
  {
    id: 'simple',
    icon: Globe,
    iconColor: 'text-blue-400',
    name: 'Site Vitrine Simple',
    price: '500€',
    promoPrice: '250€',
    period: 'paiement unique',
    description: 'Un site professionnel pour présenter votre activité.',
    features: [
      '1 à 5 pages',
      'Design professionnel',
      'Mobile responsive',
      'Formulaire de contact',
      'SEO de base',
      'Livré en 24h à 1 semaine',
    ],
    cta: 'Demander un devis',
    href: '/devis',
    highlighted: false,
    badge: null,
  },
  {
    id: 'complet',
    icon: Cpu,
    iconColor: 'text-violet-400',
    name: 'Site Vitrine Complet',
    price: '1 000€',
    promoPrice: '500€',
    period: 'paiement unique',
    description: 'Avec chatbot IA intégré pour capter et convertir vos visiteurs.',
    features: [
      "Jusqu'à 10 pages",
      'Chatbot IA intégré',
      'Blog / actualités',
      'SEO avancé + Analytics',
      'Formulaires avancés',
      'Livré en 1 à 2 semaines',
    ],
    cta: 'Demander un devis',
    href: '/devis',
    highlighted: true,
    badge: 'Le plus populaire',
  },
  {
    id: 'premium',
    icon: Sparkles,
    iconColor: 'text-amber-400',
    name: 'Site Premium 3D',
    price: '1 500€',
    promoPrice: '750€',
    period: 'paiement unique',
    description: 'Design 3D, animations avancées et chatbot IA.',
    features: [
      'Pages illimitées',
      'Design 3D sur mesure',
      'Animations avancées',
      'Chatbot IA premium',
      'Dashboard admin',
      'Livré en 2 à 3 semaines',
    ],
    cta: 'Demander un devis',
    href: '/devis',
    highlighted: false,
    badge: null,
  },
]

export function PricingSection() {
  const isPromo = useIsPromoActive()

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
            Commencez par un audit à 9,99€. Créez votre site à partir de 500€.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map(({ id, icon: Icon, iconColor, name, price, promoPrice, period, description, features, cta, href, highlighted, badge }, i) => (
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
              {/* Badge promo -50% */}
              {isPromo && (
                <span className="absolute -top-3 right-4 whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-3 py-1 text-[11px] font-bold text-white shadow-lg">
                  -50%
                </span>
              )}
              {badge && !isPromo && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
                  {badge}
                </span>
              )}
              {badge && isPromo && (
                <span className="absolute -top-3 left-4 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-[11px] font-semibold text-white shadow-lg">
                  {badge}
                </span>
              )}
              {highlighted && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-600/5 to-transparent pointer-events-none" aria-hidden="true" />
              )}

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${highlighted ? 'bg-violet-600/20' : 'bg-zinc-800'}`}>
                    <Icon className={`h-4 w-4 ${iconColor}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-300">{name}</h3>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  {isPromo ? (
                    <>
                      <span className="text-3xl font-bold text-zinc-100">{promoPrice}</span>
                      <span className="text-base font-medium text-zinc-600 line-through mb-0.5">{price}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-zinc-100">{price}</span>
                  )}
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

        {/* Maintenance add-on */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Wrench className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold text-zinc-200 text-sm">
              Maintenance mensuelle —{' '}
              {isPromo ? (
                <>
                  <span className="text-emerald-400">25€/mois</span>
                  <span className="text-zinc-600 line-through text-xs ml-1.5">50€/mois</span>
                </>
              ) : (
                <span className="text-emerald-400">50€/mois</span>
              )}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              Mises à jour, sauvegardes automatiques, sécurité, support technique prioritaire. Disponible en complément de tout projet.
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" asChild>
            <Link href="/devis">Ajouter au devis</Link>
          </Button>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-xs text-zinc-500">
            Audit sécurisé via Stripe · Remboursement sous 7 jours si insatisfait · Devis gratuit et sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  )
}
