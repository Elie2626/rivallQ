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
 * Renders nothing — purely a side-effect component.
 */
export function ConversionTracker({ sendTo, value, currency = 'EUR', transactionId }: ConversionTrackerProps) {
  useEffect(() => {
    try {
      const w = window as typeof window & { gtag?: (...args: unknown[]) => void }
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'conversion', {
          send_to: sendTo,
          ...(value !== undefined && { value }),
          currency,
          ...(transactionId && { transaction_id: transactionId }),
        })
      }
    } catch {
      // non-fatal — never break the page
    }
  }, [sendTo, value, currency, transactionId])

  return null
}
