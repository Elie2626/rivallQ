'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Check, Search, User, Zap } from 'lucide-react'
import dynamic from 'next/dynamic'
import { EASE_APPLE } from '@/components/ui/apple-motion'

// The Lottie player (WebAssembly) is heavy — load it only in the browser, when this section renders.
const FaceId = dynamic(() => import('./face-id').then(m => m.FaceId), {
  ssr: false,
  loading: () => <div className="-my-8 -ml-8 -mr-4 aspect-[44/37] h-44 shrink-0" />,
})

const IN_VIEW = { once: true, margin: '0px 0px -12% 0px' } as const
const LOOP = { repeat: Infinity, ease: EASE_APPLE } as const

/* ─── Heading: each word rises out of a mask, line after line ─── */

const LINES = ['L’exigence d’un produit.', 'La souplesse d’un partenaire.']

const heading: Variants = { show: { transition: { staggerChildren: 0.06 } } }
const word: Variants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(8px)' },
  show: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration: 1, ease: EASE_APPLE } },
}

function AnimatedHeading() {
  return (
    <m.h2
      initial="hidden"
      whileInView="show"
      viewport={IN_VIEW}
      variants={heading}
      className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl"
    >
      {LINES.map((line, l) => (
        <span key={line} className={`block ${l === 1 ? 'text-fg-muted' : ''}`}>
          {line.split(' ').map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
              <m.span variants={word} className="inline-block">{w}&nbsp;</m.span>
            </span>
          ))}
        </span>
      ))}
    </m.h2>
  )
}

/* ─── Card shell: enters with depth, and a soft light follows the pointer ─── */

function Card({ className = '', delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 10, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' }}
      viewport={IN_VIEW}
      transition={{ duration: 1.2, ease: EASE_APPLE, delay }}
      onPointerMove={onMove}
      style={{ transformPerspective: 1400 }}
      className={`group relative h-full overflow-hidden rounded-3xl bg-surface p-7 ring-1 ring-hairline transition-shadow duration-500 hover:ring-hairline-strong sm:p-9 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),rgb(255_255_255/0.07),transparent_60%)]"
      />
      <div className="relative h-full">{children}</div>
    </m.div>
  )
}

function Visual({ children }: { children: React.ReactNode }) {
  return <div aria-hidden="true" className="relative mb-7 h-28">{children}</div>
}

/* ─── 1 · Design: layers in parallax, a living specimen, swatches popping in ─── */

function DesignCard() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Narrow screens stack the layers closer, so they drift less to avoid colliding.
  const [depth, setDepth] = useState(1)
  useEffect(() => {
    const query = window.matchMedia('(min-width: 640px)')
    const read = () => setDepth(query.matches ? 1 : 0)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])
  const far = useTransform(scrollYProgress, [0, 1], [30 * depth, -30 * depth])
  const mid = useTransform(scrollYProgress, [0, 1], [60 * depth, -60 * depth])
  const near = useTransform(scrollYProgress, [0, 1], [110 * depth, -110 * depth])

  return (
    <Card className="min-h-[26rem]">
      <div ref={ref} className="relative z-10 max-w-xs">
        <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Un design qui vous ressemble.</h3>
        <p className="mt-3 leading-relaxed text-fg-muted">Aucun template. Chaque interface est dessinée pour votre marque et vos utilisateurs.</p>
      </div>

      <div aria-hidden="true" className="mt-6 flex flex-col items-start gap-5 sm:absolute sm:inset-y-0 sm:right-0 sm:mt-0 sm:block sm:w-1/2">
        <m.div style={reduced ? undefined : { y: far }} className="relative -my-4 sm:absolute sm:right-4 sm:top-2 sm:my-0">
          <m.p
            className="text-[6rem] leading-none sm:text-[9rem] tracking-tighter text-white/[0.07]"
            animate={{ fontWeight: [200, 800, 200] }}
            transition={{ duration: 5, ...LOOP }}
          >
            Aa
          </m.p>
        </m.div>

        <m.div style={reduced ? undefined : { y: mid }} className="relative flex gap-2 sm:absolute sm:right-10 sm:top-[42%]">
          {['bg-fg', 'bg-fg-muted', 'bg-fg-subtle', 'bg-elevated'].map((c, i) => (
            <m.span
              key={c}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={IN_VIEW}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.4 + i * 0.1 }}
              className={`size-10 rounded-full ring-1 ring-hairline ${c}`}
            />
          ))}
        </m.div>

        <m.div style={reduced ? undefined : { y: near }} className="relative flex items-center whitespace-nowrap sm:absolute sm:bottom-10 sm:right-16 gap-3 rounded-2xl bg-elevated/80 p-3 ring-1 ring-hairline-strong backdrop-blur-xl">
          <span className="relative h-9 overflow-hidden rounded-full bg-fg px-4 text-xs font-medium leading-9 text-canvas">
            Réserver
            <m.span
              className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
              animate={{ x: ['0%', '400%'] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4, ease: 'easeInOut' }}
            />
          </span>
          <span className="h-9 rounded-full px-4 text-xs leading-9 text-fg ring-1 ring-hairline-strong">En savoir plus</span>
        </m.div>
      </div>
    </Card>
  )
}

/* ─── 2 · Speed: the ring draws once, then a page keeps loading instantly ─── */

function SpeedCard({ delay }: { delay: number }) {
  return (
    <Card delay={delay} className="flex flex-col">
      <Visual>
        <div className="flex h-full items-center gap-5">
          <div className="relative size-24 shrink-0">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/10" />
              <m.circle
                cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                className="text-fg"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 0.96 }}
                viewport={IN_VIEW}
                transition={{ duration: 1.8, ease: EASE_APPLE, delay: delay + 0.3 }}
              />
            </svg>
            <m.span
              className="absolute inset-0 grid place-items-center"
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 3, times: [0, 0.12, 0.3], repeat: Infinity }}
            >
              <Zap className="size-7 text-fg" />
            </m.span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            {[100, 72, 86].map((w, i) => (
              <div key={i} className="h-2 overflow-hidden rounded-full bg-white/[0.06]" style={{ width: `${w}%` }}>
                <m.div
                  className="h-full origin-left rounded-full bg-fg/80"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={IN_VIEW}
                  transition={{ duration: 2.4, delay: 0.4 + i * 0.3, ease: 'easeInOut' }}
                />
              </div>
            ))}
          </div>
        </div>
      </Visual>
      <h3 className="text-xl font-semibold tracking-tight text-fg">Rapide, partout.</h3>
      <p className="mt-2 leading-relaxed text-fg-muted">Des pages qui s’affichent instantanément, sur mobile comme sur ordinateur.</p>
    </Card>
  )
}

/* ─── 3 · Google: a search types itself, your site climbs to the top ─── */

const RANK = { duration: 5, times: [0, 0.35, 0.55, 0.9, 1], repeat: Infinity, ease: EASE_APPLE }

function SearchCard({ delay }: { delay: number }) {
  return (
    <Card delay={delay}>
      <Visual>
        <div className="flex h-7 items-center gap-2 rounded-full bg-white/[0.06] px-3 ring-1 ring-hairline">
          <Search className="size-3 text-fg-subtle" />
          <m.span
            className="whitespace-nowrap text-[11px] text-fg"
            animate={{ clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)', 'inset(0 100% 0 0)'] }}
            transition={{ duration: 5, times: [0, 0.25, 0.92, 1], repeat: Infinity, ease: 'linear' }}
          >
            création site sur mesure
          </m.span>
        </div>
        <div className="relative mt-3 h-[76px]">
          {[0, 1].map(i => (
            <m.div
              key={i}
              className="absolute inset-x-0 flex h-[22px] items-center gap-2 rounded-lg bg-white/[0.04] px-2.5"
              animate={{ y: i === 0 ? [0, 0, 27, 27, 0] : [27, 27, 54, 54, 27] }}
              transition={RANK}
            >
              <span className="h-1.5 w-16 rounded-full bg-white/15" />
              <span className="h-1.5 w-10 rounded-full bg-white/10" />
            </m.div>
          ))}
          <m.div
            className="absolute inset-x-0 flex h-[22px] items-center gap-2 rounded-lg bg-fg px-2.5 text-[10px] font-medium text-canvas"
            animate={{ y: [54, 54, 0, 0, 54] }}
            transition={RANK}
          >
            votre-site.fr
            <m.span
              className="ml-auto rounded-full bg-canvas px-1.5 text-[9px] text-fg"
              animate={{ opacity: [0, 0, 1, 1, 0] }}
              transition={RANK}
            >
              #1
            </m.span>
          </m.div>
        </div>
      </Visual>
      <h3 className="text-xl font-semibold tracking-tight text-fg">Pensé pour Google.</h3>
      <p className="mt-2 leading-relaxed text-fg-muted">Structure, balisage et contenus optimisés pour être trouvé par vos futurs clients.</p>
    </Card>
  )
}

/* ─── 4 · Security: Face ID scans, then HTTPS, backups and GDPR light up ─── */

const CHECKS = { duration: 4, times: [0, 0.25, 0.4, 0.9, 1], repeat: Infinity, ease: EASE_APPLE }

function SecurityCard({ delay }: { delay: number }) {
  return (
    <Card delay={delay}>
      <Visual>
        <div className="flex h-full items-center gap-5">
          <FaceId className="-my-8 -ml-8 -mr-4 aspect-[44/37] h-44 shrink-0" />
          <div className="flex flex-col gap-2">
            {['HTTPS', 'Sauvegardes', 'RGPD'].map((label, i) => (
              <m.span
                key={label}
                className="flex items-center gap-1.5 text-[11px] text-fg-muted"
                animate={{ opacity: [0.25, 0.25, 1, 1, 0.25] }}
                transition={{ ...CHECKS, delay: i * 0.12 }}
              >
                <Check className="size-3 text-fg" />{label}
              </m.span>
            ))}
          </div>
        </div>
      </Visual>
      <h3 className="text-xl font-semibold tracking-tight text-fg">Sécurisé par défaut.</h3>
      <p className="mt-2 leading-relaxed text-fg-muted">HTTPS, sauvegardes, données protégées et conformité RGPD dès la conception.</p>
    </Card>
  )
}

/* ─── 5 · One contact: every skill wires into a single person ─── */

const SATELLITES = [
  { label: 'Design', x: 18, y: 18 },
  { label: 'Développement', x: 82, y: 18 },
  { label: 'SEO', x: 18, y: 82 },
  { label: 'Suivi', x: 82, y: 82 },
]

function ContactCard({ delay }: { delay: number }) {
  return (
    <Card delay={delay}>
      <Visual>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {SATELLITES.map((s, i) => (
            <m.line
              key={s.label}
              x1={s.x} y1={s.y} x2={50} y2={50}
              stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke"
              className="text-fg/30"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={IN_VIEW}
              transition={{ duration: 1.2, ease: EASE_APPLE, delay: delay + 0.4 + i * 0.12 }}
            />
          ))}
        </svg>
        {SATELLITES.map((s, i) => (
          <m.span
            key={s.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-elevated px-2.5 py-1 text-[10px] text-fg-muted ring-1 ring-hairline"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={IN_VIEW}
            transition={{ type: 'spring', stiffness: 220, damping: 18, delay: delay + 0.2 + i * 0.1 }}
          >
            {s.label}
          </m.span>
        ))}
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center">
          <m.span
            className="absolute inset-0 rounded-full ring-1 ring-fg/50"
            animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
          <span className="relative grid size-11 place-items-center rounded-full bg-fg">
            <User className="size-5 text-canvas" />
          </span>
        </span>
      </Visual>
      <h3 className="text-xl font-semibold tracking-tight text-fg">Un seul interlocuteur.</h3>
      <p className="mt-2 leading-relaxed text-fg-muted">Un contact unique qui conçoit, développe et fait évoluer votre projet dans la durée.</p>
    </Card>
  )
}

export function Pillars() {
  return (
    <section className="bg-canvas px-4 py-32 sm:px-6 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={IN_VIEW}
            transition={{ duration: 0.9, ease: EASE_APPLE }}
            className="text-sm font-medium text-fg-subtle"
          >
            Pourquoi RivallQ
          </m.p>
          <AnimatedHeading />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2"><DesignCard /></div>
          <SpeedCard delay={0.1} />
          <SearchCard delay={0.05} />
          <SecurityCard delay={0.15} />
          <ContactCard delay={0.25} />
        </div>
      </div>
    </section>
  )
}
