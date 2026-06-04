'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, ChevronRight, ChevronLeft,
  Globe, Cpu, Sparkles,
  ShoppingCart, Calendar, Users, Languages, Image, Database,
  Wrench, User, Phone, Mail, MessageSquare, Send,
  CheckCircle2, BookOpen, LogIn, UserPlus,
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

// ── Animated counter ──────────────────────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 500) {
  const [display, setDisplay] = useState(target)
  const prevRef = useRef(target)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const start = prevRef.current
    const diff = target - start
    if (diff === 0) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(start + diff * eased))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        prevRef.current = target
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SITE_TYPES = [
  {
    id: 'simple',
    label: 'Site Vitrine Simple',
    price: 500,
    description: 'Parfait pour présenter votre activité',
    features: ['1 à 5 pages', 'Design professionnel', 'Mobile responsive', 'Formulaire de contact', 'Livraison 24h – 1 semaine'],
    icon: Globe,
    borderSelected: 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-blue-600/5',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
  },
  {
    id: 'complet',
    label: 'Site Vitrine Complet',
    price: 1000,
    description: 'Avec chatbot IA intégré',
    features: ["Jusqu'à 10 pages", 'Chatbot IA', 'Blog / actualités', 'SEO avancé', 'Livraison 1 – 2 semaines'],
    icon: Cpu,
    borderSelected: 'border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-violet-600/5',
    iconBg: 'bg-violet-500/20',
    iconColor: 'text-violet-400',
    highlighted: true,
  },
  {
    id: 'premium',
    label: 'Site Premium 3D',
    price: 1500,
    description: 'Design 3D & animations avancées',
    features: ['Pages illimitées', 'Design 3D sur mesure', 'Chatbot IA', 'Animations avancées', 'Livraison 2 – 3 semaines'],
    icon: Sparkles,
    borderSelected: 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-amber-600/5',
    iconBg: 'bg-amber-500/20',
    iconColor: 'text-amber-400',
  },
]

const PAGE_OPTIONS = [
  { id: 'p1', label: '1 à 5 pages', extra: 0, description: 'Accueil, À propos, Services, Contact…' },
  { id: 'p2', label: '6 à 10 pages', extra: 100, description: 'Site complet avec toutes vos offres' },
  { id: 'p3', label: '11 à 20 pages', extra: 200, description: 'Site riche avec beaucoup de contenu' },
  { id: 'p4', label: 'Plus de 20 pages', extra: 400, description: 'Grande structure, catalogue produits…' },
]

const FEATURES = [
  { id: 'ecommerce', label: 'E-commerce / boutique', extra: 500, icon: ShoppingCart, description: 'Vente en ligne, panier, paiement sécurisé' },
  { id: 'reservation', label: 'Système de réservation', extra: 300, icon: Calendar, description: 'Agenda, prises de RDV en ligne' },
  { id: 'membres', label: 'Espace membres', extra: 400, icon: Users, description: 'Accès privé, abonnement, contenu exclusif' },
  { id: 'multilang', label: 'Multi-langue', extra: 200, icon: Languages, description: 'FR + EN + autres langues' },
  { id: 'galerie', label: 'Galerie / portfolio', extra: 100, icon: Image, description: 'Photos, vidéos, réalisations' },
  { id: 'crm', label: 'Intégration CRM', extra: 300, icon: Database, description: 'HubSpot, Salesforce, Pipedrive…' },
]

const DELAYS = [
  { id: 'standard', label: 'Standard', duration: '3 à 4 semaines', extra: 0 },
  { id: 'rapide', label: 'Rapide', duration: '2 semaines', extra: 200 },
  { id: 'express', label: 'Express', duration: '1 semaine', extra: 500 },
]

// ── Types ─────────────────────────────────────────────────────────────────────
interface FormState {
  siteType: string
  pages: string
  features: string[]
  maintenance: boolean
  delay: string
  name: string
  email: string
  phone: string
  message: string
}

const INITIAL: FormState = {
  siteType: '',
  pages: 'p1',
  features: [],
  maintenance: false,
  delay: 'standard',
  name: '',
  email: '',
  phone: '',
  message: '',
}

// ── Price calculator ──────────────────────────────────────────────────────────
function calcPrice(form: FormState) {
  const base = SITE_TYPES.find(s => s.id === form.siteType)?.price ?? 0
  const pages = PAGE_OPTIONS.find(p => p.id === form.pages)?.extra ?? 0
  const features = form.features.reduce((sum, id) => sum + (FEATURES.find(f => f.id === id)?.extra ?? 0), 0)
  const delay = DELAYS.find(d => d.id === form.delay)?.extra ?? 0
  return base + pages + features + delay
}

// ── Main component ────────────────────────────────────────────────────────────
export function DevisQuestionnaire() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const price = calcPrice(form)
  const animatedPrice = useAnimatedNumber(price)

  const STEPS = [
    { label: 'Type de site', icon: Globe },
    { label: 'Pages', icon: BookOpen },
    { label: 'Fonctionnalités', icon: Sparkles },
    { label: 'Options', icon: Wrench },
    { label: 'Contact', icon: User },
  ]

  const canNext = step === 0 ? !!form.siteType : true
  const canSubmit = !!form.name.trim() && !!form.email.trim()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, estimatedPrice: price }),
      })
    } catch { /* non-fatal */ }
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-12 gap-6 max-w-lg mx-auto"
      >
        <div className="h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Demande envoyée !</h2>
          <p className="text-zinc-400">
            Nous vous contactons dans les <strong className="text-zinc-200">24 heures</strong> avec votre devis personnalisé.
          </p>
        </div>

        {/* Prix estimé */}
        <div className="w-full rounded-2xl border border-violet-500/30 bg-violet-600/10 px-8 py-5 text-center">
          <p className="text-xs text-zinc-500 mb-1">Estimation de votre projet</p>
          <p className="text-4xl font-black text-zinc-100">{price.toLocaleString('fr-FR')} €</p>
          {form.maintenance && (
            <p className="text-sm text-emerald-400 mt-1.5">+ 50 €/mois maintenance</p>
          )}
        </div>

        {/* CTA compte client */}
        <div className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/60 p-5 text-left">
          <p className="text-sm font-semibold text-zinc-200 mb-1">Gérez votre devis depuis votre espace client</p>
          <p className="text-xs text-zinc-500 mb-4">
            Créez un compte avec <strong className="text-zinc-300">{form.email}</strong> pour retrouver ce devis, suivre son avancement et y apporter des modifications à tout moment.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="gradient" asChild className="flex-1">
              <Link href={`/register?email=${encodeURIComponent(form.email)}`}>
                <UserPlus className="h-4 w-4 mr-2" />
                Créer mon compte
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/login">
                <LogIn className="h-4 w-4 mr-2" />
                J&apos;ai déjà un compte
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-xs text-zinc-600">Confirmation envoyée à {form.email}</p>
      </motion.div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header: progress + live price */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        {/* Step indicators */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <button
                onClick={() => i < step && setStep(i)}
                aria-label={s.label}
                className={cn(
                  'h-8 w-8 rounded-full border text-xs font-bold transition-all flex items-center justify-center',
                  i < step
                    ? 'bg-violet-600 border-violet-600 text-white cursor-pointer hover:bg-violet-500'
                    : i === step
                    ? 'border-violet-500 text-violet-400 bg-violet-500/10'
                    : 'border-zinc-700 text-zinc-600 cursor-default'
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className={cn('h-0.5 w-5 rounded-full transition-all', i < step ? 'bg-violet-600' : 'bg-zinc-800')} />
              )}
            </div>
          ))}
        </div>

        {/* Live price badge */}
        <motion.div
          layout
          className={cn(
            'rounded-xl border px-4 py-2 text-right transition-colors duration-500',
            price > 0 ? 'border-violet-500/40 bg-violet-600/10' : 'border-zinc-800 bg-zinc-900/50'
          )}
        >
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider leading-none mb-1">Estimation</p>
          <p className={cn('text-2xl font-black tabular-nums leading-none', price > 0 ? 'text-zinc-100' : 'text-zinc-600')}>
            {animatedPrice > 0 ? `${animatedPrice.toLocaleString('fr-FR')} €` : '—'}
          </p>
          {form.maintenance && (
            <p className="text-[10px] text-emerald-400 mt-0.5">+ 50 €/mois</p>
          )}
        </motion.div>
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.18 }}
        >
          {step === 0 && <StepType form={form} setForm={setForm} onNext={() => setStep(1)} />}
          {step === 1 && <StepPages form={form} setForm={setForm} />}
          {step === 2 && <StepFeatures form={form} setForm={setForm} />}
          {step === 3 && <StepOptions form={form} setForm={setForm} />}
          {step === 4 && <StepContact form={form} setForm={setForm} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
        <Button
          variant="ghost"
          onClick={() => setStep(s => s - 1)}
          disabled={step === 0}
          leftIcon={<ChevronLeft className="h-4 w-4" />}
        >
          Retour
        </Button>

        {step < STEPS.length - 1 ? (
          <Button
            variant="gradient"
            onClick={() => setStep(s => s + 1)}
            disabled={!canNext}
            rightIcon={<ChevronRight className="h-4 w-4" />}
          >
            Continuer
          </Button>
        ) : (
          <Button
            variant="gradient"
            onClick={handleSubmit}
            loading={loading}
            disabled={!canSubmit}
            rightIcon={<Send className="h-4 w-4" />}
          >
            Envoyer ma demande
          </Button>
        )}
      </div>
    </div>
  )
}

// ── Step 0 : Type de site ─────────────────────────────────────────────────────
function StepType({
  form, setForm, onNext,
}: {
  form: FormState
  setForm: React.Dispatch<React.SetStateAction<FormState>>
  onNext: () => void
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-100 mb-1">Quel type de site souhaitez-vous ?</h2>
      <p className="text-sm text-zinc-500 mb-6">Le prix s&apos;adapte automatiquement à votre choix.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {SITE_TYPES.map((type) => {
          const Icon = type.icon
          const selected = form.siteType === type.id
          return (
            <button
              key={type.id}
              onClick={() => {
                setForm(f => ({ ...f, siteType: type.id }))
                setTimeout(onNext, 280)
              }}
              className={cn(
                'relative rounded-2xl border p-5 text-left transition-all duration-200 cursor-pointer',
                selected
                  ? type.borderSelected + ' shadow-lg'
                  : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900'
              )}
            >
              {type.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-0.5 text-[11px] font-semibold text-white shadow">
                  Le plus populaire
                </span>
              )}
              {selected && (
                <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-violet-600 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center mb-3 transition-all', selected ? type.iconBg : 'bg-zinc-800')}>
                <Icon className={cn('h-5 w-5 transition-all', selected ? type.iconColor : 'text-zinc-400')} />
              </div>
              <p className="font-semibold text-zinc-100 mb-0.5 text-sm">{type.label}</p>
              <p className="text-xs text-zinc-500 mb-3">{type.description}</p>
              <p className="text-2xl font-black text-zinc-100">{type.price.toLocaleString('fr-FR')} €</p>
              <ul className="mt-3 space-y-1.5">
                {type.features.map(f => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <Check className="h-3 w-3 text-emerald-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 1 : Nombre de pages ──────────────────────────────────────────────────
function StepPages({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-100 mb-1">Combien de pages ?</h2>
      <p className="text-sm text-zinc-500 mb-6">Estimez le nombre de pages dont vous avez besoin.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {PAGE_OPTIONS.map((opt) => {
          const selected = form.pages === opt.id
          return (
            <button
              key={opt.id}
              onClick={() => setForm(f => ({ ...f, pages: opt.id }))}
              className={cn(
                'rounded-xl border p-4 text-left transition-all flex items-center gap-4',
                selected ? 'border-violet-500/50 bg-violet-600/10' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              )}
            >
              <div className={cn(
                'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                selected ? 'border-violet-500 bg-violet-500' : 'border-zinc-600'
              )}>
                {selected && <div className="h-2 w-2 rounded-full bg-white" />}
              </div>
              <div className="flex-1">
                <p className="font-medium text-zinc-200 text-sm">{opt.label}</p>
                <p className="text-xs text-zinc-500">{opt.description}</p>
              </div>
              <span className={cn('text-sm font-semibold shrink-0', selected ? 'text-violet-400' : 'text-zinc-500')}>
                {opt.extra === 0 ? 'Inclus' : `+${opt.extra} €`}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 2 : Fonctionnalités ──────────────────────────────────────────────────
function StepFeatures({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  const toggle = (id: string) =>
    setForm(f => ({
      ...f,
      features: f.features.includes(id) ? f.features.filter(x => x !== id) : [...f.features, id],
    }))

  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-100 mb-1">Fonctionnalités supplémentaires</h2>
      <p className="text-sm text-zinc-500 mb-6">Rien d&apos;obligatoire — sélectionnez ce dont vous avez besoin.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {FEATURES.map((feat) => {
          const Icon = feat.icon
          const selected = form.features.includes(feat.id)
          return (
            <button
              key={feat.id}
              onClick={() => toggle(feat.id)}
              className={cn(
                'rounded-xl border p-4 text-left transition-all flex items-center gap-3',
                selected ? 'border-violet-500/50 bg-violet-600/10' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
              )}
            >
              <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-all', selected ? 'bg-violet-600/20' : 'bg-zinc-800')}>
                <Icon className={cn('h-4 w-4', selected ? 'text-violet-400' : 'text-zinc-400')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-zinc-200 text-sm">{feat.label}</p>
                <p className="text-xs text-zinc-500 truncate">{feat.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={cn('text-sm font-semibold', selected ? 'text-violet-400' : 'text-zinc-500')}>
                  +{feat.extra} €
                </span>
                <div className={cn('h-4 w-4 rounded border flex items-center justify-center transition-all', selected ? 'bg-violet-600 border-violet-600' : 'border-zinc-600')}>
                  {selected && <Check className="h-2.5 w-2.5 text-white" />}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 3 : Maintenance & Délai ──────────────────────────────────────────────
function StepOptions({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  return (
    <div className="space-y-8">
      {/* Maintenance */}
      <div>
        <h2 className="text-xl font-bold text-zinc-100 mb-1">Maintenance mensuelle</h2>
        <p className="text-sm text-zinc-500 mb-4">Mises à jour, sauvegardes, sécurité, support technique.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { val: false, label: 'Non merci', sub: 'Gestion en interne', color: '' },
            { val: true, label: 'Oui, avec maintenance', sub: 'Tranquillité garantie', extra: '50 €/mois', color: 'emerald' },
          ].map(({ val, label, sub, extra, color }) => {
            const selected = form.maintenance === val
            return (
              <button
                key={String(val)}
                onClick={() => setForm(f => ({ ...f, maintenance: val }))}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all flex items-center gap-3',
                  selected
                    ? color === 'emerald'
                      ? 'border-emerald-500/50 bg-emerald-600/10'
                      : 'border-violet-500/50 bg-violet-600/10'
                    : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                )}
              >
                <div className={cn(
                  'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                  selected
                    ? color === 'emerald' ? 'border-emerald-500 bg-emerald-500' : 'border-violet-500 bg-violet-500'
                    : 'border-zinc-600'
                )}>
                  {selected && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-zinc-200 text-sm">{label}</p>
                  <p className="text-xs text-zinc-500">{sub}</p>
                </div>
                {extra && <span className="text-sm font-bold text-emerald-400 shrink-0">{extra}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Délai */}
      <div>
        <h2 className="text-xl font-bold text-zinc-100 mb-1">Délai de livraison</h2>
        <p className="text-sm text-zinc-500 mb-4">Quel est votre calendrier ?</p>
        <div className="grid sm:grid-cols-3 gap-3">
          {DELAYS.map((d) => {
            const selected = form.delay === d.id
            return (
              <button
                key={d.id}
                onClick={() => setForm(f => ({ ...f, delay: d.id }))}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all',
                  selected ? 'border-violet-500/50 bg-violet-600/10' : 'border-zinc-800 bg-zinc-900/40 hover:border-zinc-700'
                )}
              >
                <p className="font-semibold text-zinc-200 text-sm mb-0.5">{d.label}</p>
                <p className="text-xs text-zinc-500 mb-2">{d.duration}</p>
                <span className={cn('text-sm font-bold', selected ? 'text-violet-400' : 'text-zinc-500')}>
                  {d.extra === 0 ? 'Inclus' : `+${d.extra} €`}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Step 4 : Contact ──────────────────────────────────────────────────────────
function StepContact({ form, setForm }: { form: FormState; setForm: React.Dispatch<React.SetStateAction<FormState>> }) {
  const inputClass = 'w-full h-11 pl-10 pr-4 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-colors'

  return (
    <div>
      <h2 className="text-xl font-bold text-zinc-100 mb-1">Vos coordonnées</h2>
      <p className="text-sm text-zinc-500 mb-6">Nous vous envoyons votre devis détaillé sous 24h.</p>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="dq-name">
              Prénom et nom <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <input id="dq-name" type="text" autoComplete="name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Jean Dupont" className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="dq-email">
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <input id="dq-email" type="email" autoComplete="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="jean@monentreprise.fr" className={inputClass} />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="dq-phone">
            Téléphone <span className="text-zinc-600 font-normal">(optionnel)</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
            <input id="dq-phone" type="tel" autoComplete="tel" value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              placeholder="+33 6 00 00 00 00"
              className={inputClass} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5" htmlFor="dq-message">
            Décrivez votre projet <span className="text-zinc-600 font-normal">(optionnel)</span>
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-zinc-500 pointer-events-none" />
            <textarea id="dq-message" value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Mon activité est… j'ai besoin de… j'ai déjà un site sur…"
              rows={4}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 resize-none transition-colors" />
          </div>
        </div>
      </div>
    </div>
  )
}
