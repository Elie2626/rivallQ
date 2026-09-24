'use client'

import Link from 'next/link'
import { Check, Zap, Globe, Cpu, Sparkles, Wrench, TrendingUp, ArrowRight } from 'lucide-react'
import { useIsPromoActive } from '@/components/public/promo-banner'
import { Reveal } from '@/components/ui/apple-motion'

const plans = [
  {
    id: 'audit',
    icon: Zap,
    name: 'Audit SEO',
    price: '4,99€',
    promoPrice: null,
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
    featured: false,
    badge: null,
  },
  {
    id: 'simple',
    icon: Globe,
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
    featured: false,
    badge: null,
  },
  {
    id: 'complet',
    icon: Cpu,
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
    featured: true,
    badge: 'Le plus populaire',
  },
  {
    id: 'premium',
    icon: Sparkles,
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
    featured: false,
    badge: null,
  },
]

export function PricingSection() {
  const isPromo = useIsPromoActive()

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-black border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <Reveal>
            <span className="inline-block text-xs font-bold uppercase tracking-widest mb-4 text-gray-400">
              Tarifs
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Simple, transparent,{' '}
              <span className="text-gray-500">sans surprise.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-gray-400 max-w-xl mx-auto">
              Commencez par un audit à 4,99€. Créez votre site à partir de 500€.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map(({ id, icon: Icon, name, price, promoPrice: rawPromoPrice, period, description, features, cta, href, featured, badge }, i) => (
            <Reveal key={id} delay={i * 0.1} y={60} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1.5 ${
                  featured
                    ? 'border-white/30 bg-white/[0.07]'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                }`}
              >
                {isPromo && rawPromoPrice && (
                  <span className="absolute -top-3 right-4 whitespace-nowrap rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-[11px] font-bold text-white shadow-lg">
                    -50%
                  </span>
                )}
                {badge && (
                  <span
                    className={`absolute -top-3 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[11px] font-bold text-black ${
                      isPromo && rawPromoPrice ? 'left-4' : 'left-1/2 -translate-x-1/2'
                    }`}
                  >
                    {badge}
                  </span>
                )}

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${featured ? 'bg-white/15' : 'bg-white/[0.08]'}`}>
                      <Icon className={`h-4 w-4 ${featured ? 'text-white' : 'text-gray-400'}`} aria-hidden="true" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{name}</h3>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    {isPromo && rawPromoPrice ? (
                      <>
                        <span className="text-3xl font-black text-white tabular-nums">{rawPromoPrice}</span>
                        <span className="text-base font-medium text-gray-500 line-through mb-0.5 tabular-nums">{price}</span>
                      </>
                    ) : (
                      <span className="text-3xl font-black text-white tabular-nums">{price}</span>
                    )}
                    <span className="text-sm text-gray-400 mb-1">{period}</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
                </div>

                <ul className="flex-1 flex flex-col gap-2.5 mb-6" role="list">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className={`h-4 w-4 shrink-0 mt-0.5 ${featured ? 'text-white' : 'text-gray-500'}`} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={href}
                  className={`w-full inline-flex items-center justify-center py-3 px-4 rounded-full font-semibold text-sm transition-all duration-300 active:scale-[0.97] ${
                    featured
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.06]'
                  }`}
                >
                  {cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 border border-white/15">
              <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="font-bold text-white text-sm sm:text-base">Formule Partage de revenus</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-white text-black">
                  Nouveau
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xl">
                Pas de budget pour démarrer ?{' '}
                <strong className="text-white">Payez moitié prix à la livraison</strong>, puis{' '}
                <strong className="text-white">10% du chiffre d&apos;affaires</strong> généré par votre site.
              </p>
            </div>
            <Link
              href="/devis"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-white/[0.08] transition-colors whitespace-nowrap"
            >
              Choisir cette formule
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 flex flex-col sm:flex-row items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0">
              <Wrench className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-white text-sm">
                Maintenance mensuelle —{' '}
                {isPromo ? (
                  <>
                    <span className="text-white">25€/mois</span>
                    <span className="text-gray-500 line-through text-xs ml-1.5">50€/mois</span>
                  </>
                ) : (
                  <span className="text-white">50€/mois</span>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Mises à jour, sauvegardes, sécurité, support prioritaire.
              </p>
            </div>
            <Link
              href="/devis"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/15 text-white text-sm font-semibold hover:bg-white/[0.08] transition-colors"
            >
              Ajouter
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Audit sécurisé via Stripe · Remboursement sous 7 jours si insatisfait · Devis gratuit et sans engagement
          </p>
        </Reveal>

      </div>
    </section>
  )
}
