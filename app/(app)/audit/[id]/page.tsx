export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { AuditResults } from '@/components/app/audit-results'
import { AuditProcessing } from '@/components/app/audit-processing'
import { AuditPending } from '@/components/app/audit-pending'
import { serializeDoc } from '@/lib/utils/serialize'
import type { Audit } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  return { title: `Audit ${id.slice(0, 8)} — RivallQ` }
}

export default async function AuditPage({ params }: Props) {
  const { id } = await params
  const user = await getServerUser()

  if (!user) redirect('/login')

  const doc = await getAdminDb().collection('audits').doc(id).get()

  if (!doc.exists) notFound()

  const audit = serializeDoc<Audit>(doc.id, doc.data())

  if (audit.user_id !== user.uid) notFound()

  // Not paid yet
  if (audit.payment_status !== 'paid') {
    return <AuditPending audit={audit} />
  }

  // Processing (includes 'pending' once paid — analysis will start shortly)
  if (audit.status === 'pending' || audit.status === 'scraping' || audit.status === 'analyzing') {
    return <AuditProcessing audit={audit} />
  }

  // Failed
  if (audit.status === 'failed') {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="h-14 w-14 rounded-2xl bg-red-600/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl" aria-hidden="true">⚠️</span>
        </div>
        <h1 className="text-2xl font-bold text-zinc-100 mb-2">Analyse échouée</h1>
        <p className="text-zinc-500 mb-6">{audit.error_message ?? 'Une erreur est survenue lors de l\'analyse.'}</p>
        <a href="/audit/new" className="text-violet-400 hover:text-violet-300 text-sm font-medium">
          Relancer un audit →
        </a>
      </div>
    )
  }

  // Completed
  return <AuditResults audit={audit} />
}
