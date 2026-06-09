'use client'

import { useState } from 'react'
import { getDomain } from '@/lib/utils/format'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lock } from 'lucide-react'
import type { Audit } from '@/types'

export function AuditPending({ audit }: { audit: Audit }) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audit_id: audit.id, plan: 'audit' }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto text-center py-16">
      <div className="h-14 w-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-5">
        <Lock className="h-6 w-6 text-violet-400" />
      </div>
      <h1 className="text-2xl font-bold text-zinc-100 mb-2">Audit en attente de paiement</h1>
      <p className="text-zinc-500 text-sm mb-2">
        Votre audit pour <strong className="text-zinc-300">{getDomain(audit.url)}</strong> est prêt.
      </p>
      <p className="text-zinc-600 text-sm mb-8">
        Effectuez le paiement pour lancer l&apos;analyse complète.
      </p>
      <Button variant="gradient" size="lg" loading={loading} onClick={handleCheckout} rightIcon={<ArrowRight className="h-4 w-4" />}>
        Payer 4,99€ et lancer l&apos;audit
      </Button>
      <p className="text-xs text-zinc-600 mt-4">Paiement sécurisé Stripe · Remboursement 7j</p>
    </div>
  )
}
