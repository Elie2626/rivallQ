'use client'

import { useEffect } from 'react'

interface ConversionTrackerProps {
  /** Google Ads send_to value, e.g. "AW-XXXXXXX/YYYYYYY" */
  sendTo: string
  value?: number
  currency?: string
  transactionId?: string
}

/**
 * Fires a Google Ads conversion event once on mount.
 * Retries every 300ms (max 5s) if gtag isn't loaded yet.
 * Renders nothing — purely a side-effect component.
 */
export function ConversionTracker({ sendTo, value, currency = 'EUR', transactionId }: ConversionTrackerProps) {
  useEffect(() => {
    let attempts = 0
    const MAX_ATTEMPTS = 17 // ~5s at 300ms intervals

    const fire = () => {
      try {
        const w = window as typeof window & { gtag?: (...args: unknown[]) => void }
        if (typeof w.gtag === 'function') {
          w.gtag('event', 'conversion', {
            send_to: sendTo,
            ...(value !== undefined && { value }),
            currency,
            ...(transactionId && { transaction_id: transactionId }),
          })
          return // success
        }
      } catch {
        // non-fatal
      }

      // gtag not ready yet — retry
      attempts++
      if (attempts < MAX_ATTEMPTS) {
        setTimeout(fire, 300)
      }
    }

    fire()
  }, [sendTo, value, currency, transactionId])

  return null
}
