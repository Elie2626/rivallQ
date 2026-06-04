'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Globe, Cpu, Star, ArrowRight, CheckCircle2, Clock, CreditCard, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'
import type { Devis } from '@/types'

const SITE_ICONS = {
  simple:  Globe,
  complet: Cpu,
  premium: Star,
}
const SITE_LABELS = {
  simple:  'Site Vitrine Simple',
  complet: 'Site Vitrine Complet',
  premium: 'Site Premium 3D',
}

function DevisRow({ devis }: { devis: Devis }) {
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  const isPaid = devis.payment_status === 'paid'
  const Icon = SITE_ICONS[devis.siteType] ?? Globe
  const label = SITE_LABELS[devis.siteType] ?? devis.siteType

  const handlePay = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/devis-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ devis_id: devis.id }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error ?? 'Erreur lors du paiement')
        setLoading(false)
      }
    } catch {
      toast.error('Erreur réseau, réessayez.')
      setLoading(false)
    }
  }

  return (
    <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Icon + infos */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className={cn(
          'h-10 w-10 rounded-xl flex items-center justify-center shrink-0',
          isPaid ? 'bg-emerald-500/15' : 'bg-violet-600/20'
        )}>
          <Icon className={cn('h-5 w-5', isPaid ? 'text-emerald-400' : 'text-violet-400')} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-200">{label}</p>
          <p className="text-xs text-zinc-600">
            {new Date(devis.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Prix */}
      <div className="text-right shrink-0">
        <p className="text-base font-bold text-zinc-100">{devis.estimatedPrice.toLocaleString('fr-FR')} €</p>
        {devis.maintenance && <p className="text-[10px] text-emerald-400">+ 50€/mois</p>}
      </div>

      {/* Statut / action */}
      <div className="flex items-center gap-3 shrink-0">
        {isPaid ? (
          <Badge variant="success" className="flex items-center gap-1.5 px-3 py-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Payé
          </Badge>
        ) : (
          <>
            {/* Case à cocher "Site terminé" */}
            <label className={cn(
              'flex items-center gap-2 cursor-pointer select-none rounded-xl border px-3 py-2 transition-all',
              checked
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                : 'border-zinc-700 bg-zinc-900/60 text-zinc-500 hover:border-zinc-600'
            )}>
              <div className={cn(
                'h-4 w-4 rounded border-2 flex items-center justify-center transition-all shrink-0',
                checked ? 'border-emerald-500 bg-emerald-500' : 'border-zinc-600'
              )}>
                {checked && <CheckCircle2 className="h-3 w-3 text-white" strokeWidth={3} />}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              />
              <span className="text-xs font-medium whitespace-nowrap">Site terminé</span>
            </label>

            {/* Bouton payer — visible seulement si coché */}
            {checked && (
              <Button
                variant="gradient"
                size="sm"
                loading={loading}
                onClick={handlePay}
                leftIcon={loading ? undefined : <CreditCard className="h-3.5 w-3.5" />}
                className="whitespace-nowrap"
              >
                Payer {devis.estimatedPrice.toLocaleString('fr-FR')} €
              </Button>
            )}

            {!checked && (
              <Badge variant="secondary" className="flex items-center gap-1.5">
                <Clock className="h-3 w-3" />
                En cours
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  )
}

interface Props {
  devis: Devis[]
  paidDevisId?: string | null
}

export function DevisSection({ devis, paidDevisId }: Props) {
  if (devis.length === 0) {
    return (
      <div className="rounded-2xl border border-violet-500/30 bg-violet-600/10 p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
            <FileText className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-violet-300 mb-0.5">Créez votre site web sur mesure</p>
            <p className="text-xs text-zinc-500">Site vitrine dès 500€ · Devis gratuit en temps réel · Livraison en 24h à 3 semaines</p>
          </div>
        </div>
        <Button variant="gradient" size="sm" asChild className="shrink-0">
          <Link href="/devis">Obtenir un devis</Link>
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-violet-400" />
            Mes devis
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/devis" className="flex items-center gap-1">
              + Nouveau devis
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {paidDevisId && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <p className="text-sm text-emerald-300">Paiement confirmé — merci ! Nous vous contactons pour les prochaines étapes.</p>
          </div>
        )}
        <div className="divide-y divide-zinc-800">
          {devis.map(d => <DevisRow key={d.id} devis={d} />)}
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">
            Cochez &quot;Site terminé&quot; une fois votre site livré pour procéder au paiement.
          </p>
          <a
            href="https://wa.me/33695127728"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/20 transition-colors shrink-0"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-emerald-400 shrink-0" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contacter via WhatsApp
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
