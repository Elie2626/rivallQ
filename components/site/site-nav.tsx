'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, m } from 'framer-motion'
import { EASE_APPLE } from '@/components/ui/apple-motion'

const LINKS = [
  { id: 'expertises', label: 'Expertises' },
  { id: 'realisations', label: 'Réalisations' },
  { id: 'methode', label: 'Méthode' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

const IDS = LINKS.map(l => l.id)

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Aller au contenu principal
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ease-apple border-b ${
          scrolled || open
            ? 'bg-canvas/70 backdrop-blur-xl backdrop-saturate-150 border-hairline'
            : 'bg-transparent border-transparent'
        }`}
      >
        <nav aria-label="Navigation principale" className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-[17px] font-semibold tracking-tight text-fg rounded-md">
            RivallQ
          </Link>

          <ul className="hidden md:flex items-center gap-1" role="list">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`/#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`relative inline-flex h-9 items-center rounded-full px-3.5 text-[13px] transition-colors duration-300 ${
                    active === id ? 'text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3.5 bottom-1 h-px origin-center bg-fg transition-[transform,opacity] duration-500 ease-apple ${
                      active === id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/#contact"
            className="hidden md:inline-flex h-8 items-center rounded-full bg-fg px-4 text-[13px] font-medium text-canvas transition-[background-color,transform] duration-300 hover:bg-white/85 active:scale-[0.97]"
          >
            Démarrer un projet
          </a>

          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="md:hidden -mr-2 grid h-11 w-11 place-items-center rounded-full text-fg"
          >
            <span className="relative block h-3 w-[18px]" aria-hidden="true">
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-apple ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-apple ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-0 top-12 z-40 bg-canvas/90 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
            transition={{ duration: 0.4, ease: EASE_APPLE }}
          >
            <ul className="flex flex-col gap-1 px-8 pt-8" role="list">
              {[...LINKS, { id: 'contact', label: 'Démarrer un projet' }].map(({ id, label }, i) => (
                <m.li
                  key={label}
                  initial={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.6, ease: EASE_APPLE, delay: 0.05 + i * 0.05 }}
                >
                  <a
                    href={`/#${id}`}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-[28px] font-semibold tracking-tight text-fg"
                  >
                    {label}
                  </a>
                </m.li>
              ))}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
