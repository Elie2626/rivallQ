'use client'

import { cn } from '@/lib/utils/cn'
import { scoreToLabel } from '@/lib/utils/format'

interface ScoreRingProps {
  score: number
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showLabel?: boolean
  className?: string
}

const sizeConfig = {
  sm: { size: 64, stroke: 5, textSize: 'text-lg', labelSize: 'text-[10px]' },
  md: { size: 96, stroke: 6, textSize: 'text-2xl', labelSize: 'text-xs' },
  lg: { size: 128, stroke: 8, textSize: 'text-3xl', labelSize: 'text-sm' },
  xl: { size: 160, stroke: 10, textSize: 'text-4xl', labelSize: 'text-sm' },
}

function scoreToStroke(score: number): string {
  if (score >= 90) return '#10b981' // emerald
  if (score >= 75) return '#22c55e' // green
  if (score >= 50) return '#eab308' // yellow
  if (score >= 25) return '#f97316' // orange
  return '#ef4444' // red
}

export function ScoreRing({
  score,
  label,
  size = 'md',
  showLabel = true,
  className,
}: ScoreRingProps) {
  const { size: sz, stroke, textSize, labelSize } = sizeConfig[size]
  const radius = (sz - stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = scoreToStroke(score)

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: sz, height: sz }}
      role="img"
      aria-label={`Score: ${score}/100 — ${scoreToLabel(score)}`}
    >
      <svg
        width={sz}
        height={sz}
        viewBox={`0 0 ${sz} ${sz}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={sz / 2}
          cy={sz / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-zinc-800"
        />
        {/* Progress */}
        <circle
          cx={sz / 2}
          cy={sz / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-bold text-zinc-100 leading-none', textSize)}>
          {score}
        </span>
        {showLabel && (
          <span className={cn('text-zinc-500 font-medium mt-0.5', labelSize)}>
            {label ?? scoreToLabel(score)}
          </span>
        )}
      </div>
    </div>
  )
}
