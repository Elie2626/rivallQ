'use client'

import { useState, useEffect } from 'react'
import Script from 'next/script'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('cookie-dismissed')
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem('cookie-dismissed', '1')
    setVisible(false)
  }

  return (
    <>
      {/* Scripts toujours chargés */}
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

      {/* Bandeau informatif */}
      {visible && (
        <div
          role="dialog"
          aria-label="Information cookies"
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6"
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-xs text-zinc-400 leading-relaxed flex-1">
              Ce site utilise des cookies Google Analytics et Google Ads pour mesurer l&apos;audience et améliorer nos publicités.
              En continuant à naviguer, vous acceptez leur utilisation.
            </p>
            <button
              onClick={dismiss}
              className="shrink-0 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-xs font-semibold py-2 px-4 transition-colors whitespace-nowrap"
            >
              J&apos;ai compris
            </button>
          </div>
        </div>
      )}
    </>
  )
}
