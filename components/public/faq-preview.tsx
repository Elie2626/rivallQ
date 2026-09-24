'use client'

import { useState } from 'react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'Comment se déroule la création de mon site ?',
    a: 'Vous remplissez le formulaire de devis en 5 minutes. Je vous contacte sous 24h pour valider votre projet, puis je commence la création. Le site est livré en 1 à 3 semaines selon la formule choisie.',
  },
  {
    q: 'Comment obtenir un devis pour créer mon site ?',
    a: 'Rendez-vous sur la page /devis. Répondez à 5 questions (type de site, pages, fonctionnalités, délai) et le prix s\'ajuste en temps réel. Vous recevez un devis détaillé sous 24h.',
  },
  {
    q: 'Puis-je voir des exemples de sites créés ?',
    a: 'Oui, les réalisations sont visibles directement sur cette page dans la section "Réalisations". Vous pouvez cliquer sur chaque site pour le visiter.',
  },
  {
    q: 'Que comprend la maintenance mensuelle ?',
    a: 'Mises à jour de sécurité, sauvegardes automatiques quotidiennes, corrections de bugs, optimisations de performance et support technique prioritaire par e-mail et WhatsApp.',
  },
  {
    q: 'Puis-je obtenir un remboursement ?',
    a: 'Oui, sous 7 jours si vous n\'êtes pas satisfait du résultat. Contactez-moi directement à elieamar2007@gmail.com.',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const id = q.replace(/\s+/g, '-').toLowerCase()

  return (
    <div className="border-b border-white/8 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 rounded-lg"
        style={{ ['--tw-ring-color' as string]: '#0066FF' } as React.CSSProperties}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className="text-sm font-semibold text-white">{q}</span>
        <span className="shrink-0 text-gray-400" aria-hidden="true">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FaqPreview() {
  return (
    <section className="py-24 lg:py-32 bg-black border-t border-white/8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <m.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: '#0066FF' }}
          >
            FAQ
          </m.span>
          <m.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-black text-white"
          >
            Questions fréquentes
          </m.h2>
        </div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-white/4 px-6"
        >
          {faqs.map(({ q, a }) => (
            <FaqItem key={q} q={q} a={a} />
          ))}
        </m.div>

        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-white text-sm font-semibold hover:border-white/30 hover:bg-white/6 transition-colors"
          >
            Voir toutes les questions
          </Link>
        </div>
      </div>
    </section>
  )
}
