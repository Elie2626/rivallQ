'use client'

import { useEffect } from 'react'
import { onIdTokenChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

/**
 * Silently renews the __session cookie whenever Firebase refreshes the ID token.
 * Firebase auto-refreshes every ~55 min — this keeps the server session alive.
 * Renders nothing.
 */
export function SessionRefresher() {
  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) return
      try {
        const idToken = await user.getIdToken()
        await fetch('/api/auth/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })
      } catch {
        // silent — next hard reload will re-auth if needed
      }
    })
    return unsubscribe
  }, [])

  return null
}
