'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

type Consent = 'accepted' | 'declined' | null

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent') as Consent
    if (stored) {
      setConsent(stored)
    } else {
      // Show banner after short delay
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setConsent('declined')
    setVisible(false)
  }

  return (
    <>
      {/* Scripts tiers — uniquement si consentement accepté */}
      {consent === 'accepted' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-51526YPZLE"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-51526YPZLE');
            gtag('config', 'AW-18222517793');
          `}</Script>
          <Script
            src="https://www.botexpress.fr/widget.js"
            strategy="lazyOnload"
            data-chatbot-id="8a90884c-461a-414c-9b0c-a09ab7dacf8a"
            data-api-url="https://agentai-23tt.onrender.com"
          />
        </>
      )}

      {/* Bandeau cookie */}
      {visible && (
        <div
          role="dialog"
          aria-label="Consentement aux cookies"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl p-5 sm:p-6">
            <p className="text-sm font-semibold text-zinc-100 mb-1">
              🍪 Ce site utilise des cookies
            </p>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Nous utilisons Google Analytics et Google Ads pour mesurer l&apos;audience et optimiser nos publicités.
              Ces cookies sont déposés uniquement avec votre accord.{' '}
              <a href="/cookies" className="underline text-violet-400 hover:text-violet-300">
                En savoir plus
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={accept}
                className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2.5 px-4 transition-colors"
              >
                Accepter
              </button>
              <button
                onClick={decline}
                className="flex-1 rounded-xl border border-zinc-700 hover:border-zinc-600 text-zinc-400 hover:text-zinc-300 text-sm font-medium py-2.5 px-4 transition-colors"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
