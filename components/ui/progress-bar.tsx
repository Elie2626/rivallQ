'use client'

import { cn } from '@/lib/utils/cn'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValue?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'auto' | 'violet' | 'emerald' | 'yellow' | 'red' | 'blue'
  className?: string
  animated?: boolean
}

function autoColor(value: number): string {
  if (value >= 90) return 'bg-emerald-500'
  if (value >= 75) return 'bg-green-500'
  if (value >= 50) return 'bg-yellow-500'
  if (value >= 25) return 'bg-orange-500'
  return 'bg-red-500'
}

const colorMap = {
  auto: '',
  violet: 'bg-violet-500',
  emerald: 'bg-emerald-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
}

const sizeMap = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = 'auto',
  className,
  animated = true,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const barColor = color === 'auto' ? autoColor(percentage) : colorMap[color]

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-zinc-400">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-zinc-300">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn('w-full rounded-full bg-zinc-800 overflow-hidden', sizeMap[size])}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            'h-full rounded-full',
            barColor,
            animated && 'transition-all duration-700 ease-out'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
