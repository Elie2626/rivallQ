'use client'

import { useRef, useState } from 'react'
import {
  m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform,
  type MotionValue,
} from 'framer-motion'
import { Reveal, useBlur, useScrollMap } from '@/components/ui/apple-motion'
import { BrowserFrame, FloatingCard, PhoneMock, SoftwareMock } from './device-mockups'

/* ─── Visuals: each layer moves at its own speed inside the step (depth) ─── */

function useDrift(local: MotionValue<number>, distance: number) {
  return useTransform(local, [0, 1], [distance, -distance])
}

function WebVisual({ local }: { local: MotionValue<number> }) {
  const back = useDrift(local, 16)
  const front = useDrift(local, 56)
  return (
    <>
      <m.div style={{ y: back }} className="absolute right-0 top-[4%] w-[76%] opacity-60">
        <BrowserFrame src="/work/wavore.webp" url="wavore.com" />
      </m.div>
      <m.div style={{ y: front }} className="absolute bottom-[4%] left-0 w-[84%]">
        <BrowserFrame src="/work/selesta.webp" url="selesta.fr" priority />
      </m.div>
    </>
  )
}

function AppVisual({ local }: { local: MotionValue<number> }) {
  const phone = useDrift(local, 24)
  const card = useDrift(local, 90)
  return (
    <>
      <m.div style={{ y: phone }} className="absolute inset-y-0 left-1/2 -translate-x-1/2">
        <PhoneMock className="h-full" />
      </m.div>
      <m.div style={{ y: card }} className="absolute left-0 top-[58%] sm:left-[4%]">
        <FloatingCard title="Nouvelle réservation" subtitle="Aujourd’hui · 14:00" />
      </m.div>
    </>
  )
}

function SaasVisual({ local }: { local: MotionValue<number> }) {
  const back = useDrift(local, 16)
  const front = useDrift(local, 56)
  return (
    <>
      <m.div style={{ y: back }} className="absolute left-0 top-[4%] w-[76%] opacity-60">
        <BrowserFrame src="/work/botexpress.webp" url="botexpress.fr" />
      </m.div>
      <m.div style={{ y: front }} className="absolute bottom-[4%] right-0 w-[84%]">
        <BrowserFrame src="/work/closermatch.webp" url="closermatch.fr" />
      </m.div>
    </>
  )
}

function SoftwareVisual({ local }: { local: MotionValue<number> }) {
  const app = useDrift(local, 24)
  const card = useDrift(local, 96)
  return (
    <>
      <m.div style={{ y: app }} className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <SoftwareMock />
      </m.div>
      <m.div style={{ y: card }} className="absolute bottom-[6%] right-0 sm:right-[4%]">
        <FloatingCard title="Facture envoyée" subtitle="Automatiquement, à 18:02" />
      </m.div>
    </>
  )
}

const STEPS = [
  {
    title: 'Sites web',
    headline: 'Des sites qui convainquent en trois secondes.',
    body: 'Sites vitrines, landing pages et e-commerce. Un design sur mesure, un chargement instantané et un référencement pensé dès la première ligne.',
    tags: ['Design sur mesure', 'SEO technique', 'Performance', 'Administration simple'],
    Visual: WebVisual,
  },
  {
    title: 'Applications mobiles',
    headline: 'Des apps que l’on garde sur son écran d’accueil.',
    body: 'Applications iOS et Android fluides et intuitives, de la première maquette jusqu’à la publication sur l’App Store et Google Play.',
    tags: ['iOS & Android', 'UX mobile', 'Notifications', 'Publication sur les stores'],
    Visual: AppVisual,
  },
  {
    title: 'SaaS',
    headline: 'Votre idée, transformée en produit qui se vend.',
    body: 'Plateformes complètes : comptes utilisateurs, abonnements, tableaux de bord, IA intégrée. Une architecture prête à grandir avec vous.',
    tags: ['Abonnements & paiements', 'Espace client', 'IA intégrée', 'Scalabilité'],
    Visual: SaasVisual,
  },
  {
    title: 'Logiciels sur mesure',
    headline: 'L’outil exact dont vos équipes ont besoin.',
    body: 'Logiciels métier, CRM, outils internes et automatisations, taillés pour vos process — et pas l’inverse.',
    tags: ['Outils internes', 'Automatisations', 'Intégrations API', 'Données sécurisées'],
    Visual: SoftwareVisual,
  },
]

const N = STEPS.length
const FADE = 0.045

/**
 * Keyframes for step i as [enter, rest, exit] values: fades in around its start and out around
 * its end. The first step starts already visible and the last one never leaves.
 */
function steps<T>(i: number, [enter, rest, exit]: [T, T, T]): [number[], T[]] {
  const a = i / N
  const b = (i + 1) / N
  if (i === 0) return [[0, b - FADE, b + FADE], [rest, rest, exit]]
  if (i === N - 1) return [[a - FADE, a + FADE, 1], [enter, rest, rest]]
  return [[a - FADE, a + FADE, b - FADE, b + FADE], [enter, rest, rest, exit]]
}

function useStep(progress: MotionValue<number>, i: number, values: [number, number, number]) {
  const [input, output] = steps(i, values)
  return useScrollMap(progress, input, output)
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" role="list">
      {tags.map(t => (
        <li key={t} className="rounded-full border border-hairline px-3 py-1 text-xs text-fg-muted">{t}</li>
      ))}
    </ul>
  )
}

function StepText({ step, index, progress }: { step: (typeof STEPS)[number]; index: number; progress: MotionValue<number> }) {
  const opacity = useStep(progress, index, [0, 1, 0])
  const y = useStep(progress, index, [40, 0, -40])
  const filter = useBlur(useStep(progress, index, [8, 0, 8]))

  return (
    <m.div style={{ opacity, y, filter }} className="absolute inset-0">
      <p className="text-sm font-medium text-fg-subtle tabular-nums">0{index + 1} — {step.title}</p>
      <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.02em] text-fg text-balance sm:text-4xl">
        {step.headline}
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted sm:text-base">{step.body}</p>
      <div className="hidden sm:block"><Tags tags={step.tags} /></div>
    </m.div>
  )
}

function StepVisual({ step, index, progress }: { step: (typeof STEPS)[number]; index: number; progress: MotionValue<number> }) {
  // Depth pass: the incoming scene rises from behind, the outgoing one moves past the viewer.
  const opacity = useStep(progress, index, [0, 1, 0])
  const scale = useStep(progress, index, [0.86, 1, 1.1])
  const filter = useBlur(useStep(progress, index, [14, 0, 14]))
  const local = useTransform(progress, [index / N, (index + 1) / N], [0, 1])
  const { Visual } = step

  return (
    <m.div style={{ opacity, scale, filter }} className="absolute inset-0 will-change-transform" aria-hidden="true">
      <Visual local={local} />
    </m.div>
  )
}

function Indicator({ progress, active, onSelect }: { progress: MotionValue<number>; active: number; onSelect: (i: number) => void }) {
  return (
    <ol className="flex gap-2 lg:flex-col lg:gap-1" role="list">
      {STEPS.map((s, i) => (
        <li key={s.title} className="flex-1 lg:flex-none">
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-current={active === i ? 'step' : undefined}
            className="group flex w-full cursor-pointer items-center gap-3 py-2 text-left"
          >
            <span className="relative h-0.5 w-full overflow-hidden rounded-full bg-hairline lg:h-8 lg:w-0.5">
              <Fill progress={progress} index={i} />
            </span>
            <span className={`hidden whitespace-nowrap text-sm transition-colors duration-500 lg:inline ${active === i ? 'text-fg' : 'text-fg-subtle group-hover:text-fg-muted'}`}>
              {s.title}
            </span>
          </button>
        </li>
      ))}
    </ol>
  )
}

function Fill({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const fill = useTransform(progress, [index / N, (index + 1) / N], [0, 1])
  return (
    <>
      <m.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-fg lg:hidden" />
      <m.span style={{ scaleY: fill }} className="absolute inset-0 hidden origin-top bg-fg lg:block" />
    </>
  )
}

function Header() {
  return (
    <div>
      <p className="text-sm font-medium text-fg-subtle">Expertises</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl sr-only sm:not-sr-only">
        Une seule équipe,<br />quatre savoir-faire.
      </h2>
    </div>
  )
}

function StaticExpertises() {
  const still = useMotionValue(0.5)
  return (
    <section id="expertises" className="bg-canvas px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-24">
        <Header />
        {STEPS.map(({ Visual, ...s }, i) => (
          <div key={s.title} className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-fg-subtle">0{i + 1} — {s.title}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-fg">{s.headline}</h3>
              <p className="mt-4 text-fg-muted">{s.body}</p>
              <Tags tags={s.tags} />
            </div>
            <div className="relative aspect-[5/4]" aria-hidden="true"><Visual local={still} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Expertises() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', v => {
    const next = Math.min(N - 1, Math.max(0, Math.floor(v * N)))
    setActive(prev => (prev === next ? prev : next))
  })

  const select = (i: number) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const scrollable = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + scrollable * ((i + 0.5) / N), behavior: 'smooth' })
  }

  if (reduced) return <StaticExpertises />

  return (
    <section id="expertises" ref={ref} className="relative bg-canvas" style={{ height: `${N * 90 + 100}vh` }}>
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="mx-auto grid h-full max-w-6xl grid-rows-[auto_minmax(0,1fr)_auto_auto] gap-6 px-4 pb-6 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:grid-rows-1 lg:items-center lg:gap-16 lg:pb-0 lg:pt-12">

          <div className="contents lg:flex lg:flex-col lg:gap-10">
            <Reveal className="lg:order-none"><Header /></Reveal>

            <div className="relative row-start-3 min-h-[12.5rem] sm:min-h-[17rem] lg:row-auto">
              {STEPS.map((s, i) => (
                <StepText key={s.title} step={s} index={i} progress={scrollYProgress} />
              ))}
            </div>

            <div className="row-start-4 lg:row-auto">
              <Indicator progress={scrollYProgress} active={active} onSelect={select} />
            </div>
          </div>

          <div className="relative row-start-2 -mx-2 sm:mx-0 lg:row-auto lg:aspect-[5/4]">
            {STEPS.map((s, i) => (
              <StepVisual key={s.title} step={s} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
