'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CreditCard, Zap, Check, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDate, getDomain } from '@/lib/utils/format'
import { toast } from 'sonner'

const plans = [
  {
    id: 'audit',
    name: 'Audit SEO',
    price: '9,99€',
    description: 'Analyse complète de votre site',
    features: ['Score SEO, UX, conversion', 'Top problèmes', 'Mots-clés & recommandations'],
  },
  {
    id: 'rebuild',
    name: 'Site optimisé',
    price: '79€',
    description: 'Homepage & pages régénérées par l\'IA',
    features: ['Copywriting optimisé', 'SEO amélioré', 'Export ZIP'],
    highlighted: true,
  },
  {
    id: 'subscription',
    name: 'Pro mensuel',
    price: '29€/mois',
    description: 'Suivi SEO continu + optimisations',
    features: ['1 audit/mois', 'Suivi positions', 'Alertes & rapport mensuel'],
  },
]

interface Props {
  profile: {
    plan: string | null
    stripe_customer_id: string | null
    stripe_subscription_id: string | null
    subscription_status: string | null
    subscription_end_date: string | null
  } | null
  audits: {
    id: string
    url: string
    created_at: string
    payment_status: string
    rebuild_payment_status: string | null
    overall_score: number | null
  }[]
  userId: string
}

export function BillingClient({ profile, audits }: Props) {
  const [portalLoading, setPortalLoading] = useState(false)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  const hasActiveSubscription = profile?.subscription_status === 'active'

  const handlePortal = async () => {
    setPortalLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      toast.error('Impossible d\'ouvrir le portail de facturation')
    } finally {
      setPortalLoading(false)
    }
  }

  const handleSubscribe = async (planId: string) => {
    setCheckoutLoading(planId)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      toast.error('Erreur lors de la redirection vers le paiement')
    } finally {
      setCheckoutLoading(null)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 mb-1">Facturation</h1>
        <p className="text-zinc-500 text-sm">Gérez vos abonnements et votre historique d&apos;achats.</p>
      </div>

      {/* Subscription status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-400" />
              Abonnement actuel
            </CardTitle>
            {profile?.stripe_customer_id && (
              <Button variant="ghost" size="sm" loading={portalLoading} onClick={handlePortal} rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                Gérer
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {hasActiveSubscription ? (
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-violet-600/20 flex items-center justify-center">
                <Zap className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-zinc-100">Plan Pro mensuel</p>
                  <Badge variant="success">Actif</Badge>
                </div>
                {profile?.subscription_end_date && (
                  <p className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3 w-3" />
                    Prochain renouvellement : {formatDate(profile.subscription_end_date)}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-zinc-400 mb-3">Vous n&apos;avez pas d&apos;abonnement actif.</p>
                <Button variant="gradient" size="sm" onClick={() => handleSubscribe('subscription')} loading={checkoutLoading === 'subscription'}>
                  Passer à Pro — 29€/mois
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plans */}
      {!hasActiveSubscription && (
        <div>
          <h2 className="text-lg font-semibold text-zinc-100 mb-4">Choisir un plan</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {plans.map(({ id, name, price, description, features, highlighted }) => (
              <div
                key={id}
                className={`rounded-2xl border p-5 flex flex-col gap-4 ${highlighted ? 'border-violet-500/40 bg-violet-600/10' : 'border-zinc-800 bg-zinc-900/40'}`}
              >
                <div>
                  <p className="text-sm font-semibold text-zinc-200 mb-0.5">{name}</p>
                  <p className="text-2xl font-bold text-zinc-100">{price}</p>
                  <p className="text-xs text-zinc-500 mt-1">{description}</p>
                </div>
                <ul className="flex-1 flex flex-col gap-1.5">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zinc-400">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={highlighted ? 'gradient' : 'outline'}
                  size="sm"
                  loading={checkoutLoading === id}
                  onClick={() => handleSubscribe(id)}
                >
                  {id === 'audit' ? 'Lancer un audit' : 'Souscrire'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Purchase history */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-zinc-400" />
            Historique des achats
          </CardTitle>
        </CardHeader>
        <CardContent>
          {audits.length === 0 ? (
            <p className="text-sm text-zinc-600 py-4 text-center">Aucun achat pour le moment.</p>
          ) : (
            <div className="divide-y divide-zinc-800">
              {audits.map((audit) => (
                <div key={audit.id} className="flex items-center gap-4 py-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-300 truncate">{getDomain(audit.url)}</p>
                    <p className="text-xs text-zinc-600">{formatDate(audit.created_at)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success">Audit — 9,99€</Badge>
                    {audit.rebuild_payment_status === 'paid' && (
                      <Badge variant="default">Site optimisé — 79€</Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="icon-sm" asChild>
                    <Link href={`/audit/${audit.id}`} aria-label="Voir l'audit">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
