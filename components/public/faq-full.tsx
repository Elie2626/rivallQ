'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const categories = [
  {
    title: 'Général',
    faqs: [
      { q: 'Qu\'est-ce qu\'RivallQ ?', a: 'RivallQ est un outil d\'audit et de création de sites web propulsé par l\'IA. Il analyse votre site en profondeur (SEO, UX, conversion) en 5 minutes, puis vous propose un devis personnalisé pour créer votre nouveau site à partir de 500€.' },
      { q: 'Comment fonctionne l\'analyse IA ?', a: 'RivallQ utilise Firecrawl pour scraper votre site, puis Tsitsit pour analyser le SEO, le copywriting, l\'UX et les opportunités de conversion. Le tout en moins de 5 minutes.' },
      { q: 'Quels types de sites sont supportés ?', a: 'Tous les sites web : WordPress, Wix, Squarespace, Webflow, sites custom en HTML/CSS/JS, e-commerce... Si c\'est accessible via une URL, RivallQ peut l\'analyser.' },
    ],
  },
  {
    title: 'Audit & résultats',
    faqs: [
      { q: 'Que contient exactement l\'audit à 4,99€ ?', a: 'Score SEO (0-100), score UX, score de conversion, top 10 des problèmes critiques, analyse des mots-clés, recommandations prioritaires, et un lien vers le questionnaire de devis.' },
      { q: 'Les résultats sont-ils fiables ?', a: 'Oui. Tsitsit analyse chaque élément du code source, du contenu et de la structure. Les recommandations sont basées sur les meilleures pratiques SEO 2026 et CRO (Conversion Rate Optimization).' },
      { q: 'Combien de temps dure l\'analyse ?', a: 'Entre 3 et 5 minutes selon la complexité du site. Vous pouvez suivre l\'avancement en temps réel sur votre dashboard.' },
    ],
  },
  {
    title: 'Création de site',
    faqs: [
      { q: 'Quelles sont les formules de création de site ?', a: 'Trois formules : Site Vitrine Simple (500€, livré en 24h–1 semaine), Site Vitrine Complet avec chatbot IA (1 000€, 1–2 semaines), Site Premium 3D avec animations avancées (1 500€, 2–3 semaines). Maintenance disponible en option à 50€/mois.' },
      { q: 'Comment obtenir un devis ?', a: 'Rendez-vous sur /devis. Répondez à 5 questions sur votre projet (type de site, nombre de pages, fonctionnalités, délai) et le prix s\'adapte en temps réel. Vous recevez ensuite un devis détaillé sous 24h.' },
      { q: 'Le devis est-il gratuit et sans engagement ?', a: 'Oui, totalement. Vous pouvez obtenir autant de devis que vous le souhaitez, sans engagement ni paiement. Vous ne payez qu\'une fois le devis accepté.' },
    ],
  },
  {
    title: 'Paiement & remboursement',
    faqs: [
      { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Carte bancaire (Visa, Mastercard, Amex), via Stripe. Les paiements sont sécurisés et chiffrés. Nous n\'avons jamais accès à vos coordonnées bancaires.' },
      { q: 'Puis-je me faire rembourser ?', a: 'Oui, sous 7 jours si vous n\'êtes pas satisfait du résultat. Envoyez simplement un email à elieamar2007@gmail.com avec votre numéro de commande.' },
      { q: 'L\'abonnement est-il sans engagement ?', a: 'Oui. L\'abonnement mensuel à 29€/mois peut être annulé à tout moment depuis votre espace facturation, sans frais ni préavis.' },
    ],
  },
  {
    title: 'Confidentialité & RGPD',
    faqs: [
      { q: 'Que faites-vous avec les données de mon site ?', a: 'Les données scrapées sont utilisées uniquement pour générer votre audit. Elles sont stockées sur des serveurs européens, chiffrées, et jamais revendues à des tiers.' },
      { q: 'RivallQ est-il conforme au RGPD ?', a: 'Oui. RivallQ est hébergé en Europe, applique le principe de minimisation des données, et vous pouvez demander la suppression de votre compte à tout moment.' },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-zinc-200">{q}</span>
        <span className="shrink-0 text-zinc-500" aria-hidden="true">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-zinc-500 leading-relaxed">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqFull() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {categories.map(({ title, faqs }) => (
          <div key={title} className="mb-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">{title}</h2>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 px-6">
              {faqs.map(({ q, a }) => <FaqItem key={q} q={q} a={a} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
