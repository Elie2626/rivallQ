import { cn } from '@/lib/utils/cn'
import type { AuditStatus, RebuildStatus, PaymentStatus } from '@/types'

type Status = AuditStatus | RebuildStatus | PaymentStatus | string

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  pending:     { label: 'En attente',   color: 'text-zinc-400',    dot: 'bg-zinc-500' },
  scraping:    { label: 'Scraping…',    color: 'text-blue-400',    dot: 'bg-blue-500 animate-pulse' },
  analyzing:   { label: 'Analyse…',     color: 'text-violet-400',  dot: 'bg-violet-500 animate-pulse' },
  generating:  { label: 'Génération…',  color: 'text-indigo-400',  dot: 'bg-indigo-500 animate-pulse' },
  completed:   { label: 'Terminé',      color: 'text-emerald-400', dot: 'bg-emerald-500' },
  failed:      { label: 'Échec',        color: 'text-red-400',     dot: 'bg-red-500' },
  paid:        { label: 'Payé',         color: 'text-emerald-400', dot: 'bg-emerald-500' },
  refunded:    { label: 'Remboursé',    color: 'text-orange-400',  dot: 'bg-orange-500' },
  active:      { label: 'Actif',        color: 'text-emerald-400', dot: 'bg-emerald-500' },
  canceled:    { label: 'Annulé',       color: 'text-red-400',     dot: 'bg-red-500' },
  in_progress: { label: 'En cours…',   color: 'text-blue-400',    dot: 'bg-blue-500 animate-pulse' },
}

interface StatusIndicatorProps {
  status: Status
  className?: string
  showLabel?: boolean
}

export function StatusIndicator({ status, className, showLabel = true }: StatusIndicatorProps) {
  const config = statusConfig[status] ?? {
    label: status,
    color: 'text-zinc-400',
    dot: 'bg-zinc-500',
  }

  return (
    <span className={cn('inline-flex items-center gap-1.5', config.color, className)}>
      <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', config.dot)} aria-hidden="true" />
      {showLabel && <span className="text-xs font-medium">{config.label}</span>}
    </span>
  )
}
