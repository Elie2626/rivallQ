'use client'

import { easeInOut, m, type MotionValue } from 'framer-motion'
import { Check } from 'lucide-react'
import { useBlur, useScrollMap } from '@/components/ui/apple-motion'

type Local = { local: MotionValue<number> }

/* ─── 01 · Découverte — a live call, its voice wave, and the notes it produces ─── */

const BARS = [30, 55, 80, 45, 95, 60, 35, 75, 100, 50, 70, 40, 90, 65, 30, 85, 55, 45, 75, 35, 60, 90, 40, 70]

function Note({ local, at, children }: Local & { at: number; children: string }) {
  const opacity = useScrollMap(local, [at, at + 0.12], [0, 1])
  const y = useScrollMap(local, [at, at + 0.12], [8, 0])
  return (
    <m.li style={{ opacity, y }} className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] text-fg-muted ring-1 ring-hairline sm:text-[11px]">
      <Check className="size-3 text-fg" aria-hidden="true" />
      {children}
    </m.li>
  )
}

function DiscoveryScene({ local }: Local) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 px-6">
      <p className="flex items-center gap-2 text-[11px] font-medium text-fg-muted">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-fg opacity-60" />
          <span className="relative size-2 rounded-full bg-fg" />
        </span>
        Appel découverte
      </p>
      <div className="flex h-12 items-center gap-[3px] sm:h-16" aria-hidden="true">
        {BARS.map((h, i) => (
          <m.span
            key={i}
            className="w-[3px] rounded-full bg-fg sm:w-1"
            style={{ height: `${h}%` }}
            animate={{ scaleY: [0.35, 1, 0.55, 0.9, 0.35] }}
            transition={{ duration: 1.1 + (i % 5) * 0.18, repeat: Infinity, ease: 'easeInOut', delay: (i % 7) * 0.09 }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap justify-center gap-2" role="list">
        <Note local={local} at={0.1}>Vos objectifs</Note>
        <Note local={local} at={0.3}>Vos utilisateurs</Note>
        <Note local={local} at={0.5}>Budget & délais</Note>
      </ul>
    </div>
  )
}

/* ─── 02 · Conception — desktop and mobile wireframes drawing themselves in ─── */

function Piece({ local, at, className = '' }: Local & { at: number; className?: string }) {
  const opacity = useScrollMap(local, [at, at + 0.12], [0, 1])
  const scaleX = useScrollMap(local, [at, at + 0.12], [0.2, 1])
  return <m.div style={{ opacity, scaleX }} className={`origin-left rounded-[3px] ${className}`} />
}

function DesignScene({ local }: Local) {
  const phoneOpacity = useScrollMap(local, [0.4, 0.55], [0, 1])
  const phoneY = useScrollMap(local, [0.4, 0.65], [36, 0])

  return (
    <div className="relative h-full p-3 sm:p-5">
      <div className="flex h-full w-[74%] flex-col gap-2.5 rounded-lg bg-surface p-2.5 ring-1 ring-hairline sm:gap-3 sm:p-3">
        <div className="flex items-center gap-1.5">
          <Piece local={local} at={0} className="h-2.5 w-8 bg-fg/80" />
          <div className="ml-auto flex gap-1.5">
            {[0.04, 0.07, 0.1].map(at => <Piece key={at} local={local} at={at} className="h-1.5 w-5 bg-white/20" />)}
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="flex flex-col justify-center gap-1.5">
            <Piece local={local} at={0.14} className="h-2.5 w-[90%] bg-white/30" />
            <Piece local={local} at={0.18} className="h-2.5 w-[65%] bg-white/30" />
            <Piece local={local} at={0.23} className="mt-1.5 h-1.5 w-[80%] bg-white/15" />
            <Piece local={local} at={0.26} className="h-1.5 w-[60%] bg-white/15" />
            <Piece local={local} at={0.3} className="mt-1.5 h-3.5 w-12 rounded-full bg-fg" />
          </div>
          <Piece local={local} at={0.2} className="h-full w-full rounded-md bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[0.34, 0.38, 0.42].map(at => <Piece key={at} local={local} at={at} className="h-7 w-full rounded-md bg-white/10 sm:h-9" />)}
        </div>
      </div>

      <m.div
        style={{ opacity: phoneOpacity, y: phoneY }}
        className="absolute bottom-3 right-4 flex aspect-[9/18] h-[84%] flex-col gap-1.5 rounded-[0.9rem] bg-surface p-2 ring-1 ring-hairline-strong shadow-[0_20px_40px_-12px_rgb(0_0_0/0.9)] sm:right-6"
      >
        <Piece local={local} at={0.5} className="mx-auto mb-1 h-1 w-6 rounded-full bg-white/20" />
        <Piece local={local} at={0.54} className="h-2 w-[70%] bg-white/30" />
        <Piece local={local} at={0.58} className="h-2 w-[50%] bg-white/30" />
        <Piece local={local} at={0.62} className="mt-1 h-10 w-full rounded-md bg-white/10 sm:h-14" />
        <Piece local={local} at={0.66} className="h-1.5 w-[85%] bg-white/15" />
        <Piece local={local} at={0.69} className="h-1.5 w-[60%] bg-white/15" />
        <Piece local={local} at={0.73} className="mt-auto h-3.5 w-full rounded-full bg-fg" />
      </m.div>
    </div>
  )
}

/* ─── 03 · Développement — the code types itself, then Enter ─── */

type Kind = 'k' | 'n' | 's' | 'p'
const CODE: [string, Kind][][] = [
  [['import', 'k'], [' { lancer } ', 'n'], ['from', 'k'], [" '@/studio'", 's']],
  [],
  [['const', 'k'], [' projet ', 'n'], ['= {', 'p']],
  [['  nom: ', 'n'], ["'Votre projet'", 's'], [',', 'p']],
  [['  design: ', 'n'], ["'sur mesure'", 's'], [',', 'p']],
  [['  mobile: ', 'n'], ['true', 'k'], [',', 'p']],
  [['}', 'p']],
  [],
  [['export default function', 'k'], [' App', 'n'], ['() {', 'p']],
  [['  return ', 'k'], ['<Site ', 'n'], ['{...projet}', 'p'], [' />', 'n']],
  [['}', 'p']],
  [],
  [['lancer', 'n'], ['(projet)', 'p']],
]
const TOKEN: Record<Kind, string> = {
  k: 'text-fg font-medium',
  n: 'text-fg-muted',
  s: 'text-fg-subtle italic',
  p: 'text-fg-subtle',
}
const TYPE_START = 0.04
const TYPE_END = 0.78

function CodeLine({ local, index, tokens }: Local & { index: number; tokens: [string, Kind][] }) {
  const span = (TYPE_END - TYPE_START) / CODE.length
  const a = TYPE_START + index * span
  const clipPath = useScrollMap(local, [a, a + span], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  return (
    <div className="flex">
      <span className="w-6 shrink-0 select-none pr-2 text-right text-fg-subtle/50 tabular-nums">{index + 1}</span>
      <m.span style={{ clipPath }} className="whitespace-pre">
        {tokens.map(([text, kind], i) => <span key={i} className={TOKEN[kind]}>{text}</span>)}
      </m.span>
    </div>
  )
}

function CodeScene({ local }: Local) {
  const keyOpacity = useScrollMap(local, [0.78, 0.84], [0, 1])
  const keyScale = useScrollMap(local, [0.86, 0.89, 0.92], [1, 0.86, 1])
  const doneOpacity = useScrollMap(local, [0.9, 0.97], [0, 1])

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-hairline px-3">
        <span className="size-2 rounded-full bg-fg-subtle/40" />
        <span className="size-2 rounded-full bg-fg-subtle/40" />
        <span className="size-2 rounded-full bg-fg-subtle/40" />
        <span className="ml-3 rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] text-fg-muted">projet.tsx</span>
      </div>
      <div className="relative flex-1 overflow-hidden p-3 font-mono text-[8px] leading-[1.65] sm:text-[10.5px]">
        {CODE.map((tokens, i) => <CodeLine key={i} local={local} index={i} tokens={tokens} />)}

        <m.div
          style={{ opacity: keyOpacity, scale: keyScale }}
          className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-elevated px-2.5 py-1.5 font-sans text-[10px] font-medium text-fg ring-1 ring-hairline-strong shadow-[0_6px_0_0_rgb(255_255_255/0.08)]"
        >
          Entrée <span aria-hidden="true">↵</span>
        </m.div>
        <m.p style={{ opacity: doneOpacity }} className="absolute bottom-3 left-3 flex items-center gap-1.5 font-sans text-[10px] text-fg">
          <Check className="size-3" aria-hidden="true" /> Compilé — prêt à publier
        </m.p>
      </div>
    </div>
  )
}

/* ─── 04 · Lancement — the site goes live, then shows up first on Google ─── */

const GOOGLE = [
  ['G', '#4285F4'], ['o', '#EA4335'], ['o', '#FBBC05'], ['g', '#4285F4'], ['l', '#34A853'], ['e', '#EA4335'],
] as const

function GoogleLogo({ className = '' }: { className?: string }) {
  return (
    <span className={`font-semibold tracking-tight ${className}`}>
      {GOOGLE.map(([c, color], i) => <span key={i} style={{ color }}>{c}</span>)}
    </span>
  )
}

/** One laurel branch; mirrored for the right side. */
function Branch({ flip = false }: { flip?: boolean }) {
  const leaves = [0, 1, 2, 3, 4]
  return (
    <svg viewBox="0 0 20 44" className="h-9 w-4 sm:h-11 sm:w-5" style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
      <path d="M15 42 C6 34 5 18 11 3" fill="none" stroke="#d4af37" strokeWidth="1.4" strokeLinecap="round" />
      {leaves.map(k => {
        const y = 36 - k * 7.5
        const x = 11 - Math.sin((k / 4) * Math.PI) * 3 - (4 - k) * 0.6
        return (
          <g key={k}>
            <ellipse cx={x - 3.2} cy={y} rx="3.4" ry="1.6" transform={`rotate(-35 ${x - 3.2} ${y})`} fill="#d4af37" />
            <ellipse cx={x + 3} cy={y - 2.5} rx="3.2" ry="1.5" transform={`rotate(-70 ${x + 3} ${y - 2.5})`} fill="#e6c55a" />
          </g>
        )
      })}
    </svg>
  )
}

function FirstBadge() {
  return (
    <div className="flex items-center">
      <Branch />
      <div className="px-0.5 text-center leading-none">
        <p className="text-[15px] font-bold text-[#e6c55a] sm:text-[18px]">1<sup className="text-[8px]">er</sup></p>
        <p className="mt-0.5 text-[6px] font-medium uppercase tracking-wider text-[#e8eaed] sm:text-[7px]">sur Google</p>
      </div>
      <Branch flip />
    </div>
  )
}

function LaunchScene({ local }: Local) {
  // Home: the query types itself, the cursor travels to the search button and clicks.
  const query = useScrollMap(local, [0.05, 0.3], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'])
  const cursorLeft = useScrollMap(local, [0.3, 0.52], ['92%', '47%'], { ease: easeInOut })
  const cursorTop = useScrollMap(local, [0.3, 0.52], ['104%', '69%'], { ease: easeInOut })
  const cursorOpacity = useScrollMap(local, [0.26, 0.32, 0.6, 0.64], [0, 1, 1, 0])
  const cursorPress = useScrollMap(local, [0.53, 0.56, 0.59], [1, 0.82, 1])
  const buttonScale = useScrollMap(local, [0.53, 0.56, 0.59], [1, 0.93, 1])
  const homeOpacity = useScrollMap(local, [0.6, 0.66], [1, 0])
  const homeScale = useScrollMap(local, [0.6, 0.66], [1, 0.97])

  // Results: the page slides in, your site is the first result.
  const resultsOpacity = useScrollMap(local, [0.63, 0.7], [0, 1])
  const resultsY = useScrollMap(local, [0.63, 0.72], [12, 0])
  const firstOpacity = useScrollMap(local, [0.7, 0.8], [0, 1])
  const firstY = useScrollMap(local, [0.7, 0.8], [8, 0])
  const othersOpacity = useScrollMap(local, [0.78, 0.9], [0, 1])
  const badgeOpacity = useScrollMap(local, [0.8, 0.88], [0, 1])
  const badgeScale = useScrollMap(local, [0.8, 0.9], [0.6, 1], { ease: easeInOut })

  return (
    <div className="relative h-full overflow-hidden bg-[#202124] text-[#e8eaed]">
      <m.div style={{ opacity: homeOpacity, scale: homeScale }} className="absolute inset-0">
        <div className="absolute inset-x-0 top-[20%] text-center">
          <GoogleLogo className="text-[26px] sm:text-[34px]" />
        </div>
        <div className="absolute left-1/2 top-[44%] flex h-7 w-[70%] -translate-x-1/2 items-center gap-2 rounded-full px-3 bg-[#303134] ring-1 ring-[#5f6368] sm:h-8">
          <svg viewBox="0 0 24 24" className="size-3 shrink-0 text-[#9aa0a6]" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <m.span style={{ clipPath: query }} className="whitespace-nowrap text-[10px] sm:text-[11px]">création site sur mesure</m.span>
        </div>
        <m.div style={{ scale: buttonScale }} className="absolute left-1/2 top-[69%] -translate-x-1/2 -translate-y-1/2">
          <span className="block whitespace-nowrap rounded bg-[#303134] px-3 py-1.5 text-[9px] text-[#e8eaed] ring-1 ring-[#303134] sm:text-[10px]">
            Recherche Google
          </span>
        </m.div>
      </m.div>

      <m.div style={{ opacity: resultsOpacity, y: resultsY }} className="absolute inset-0 px-4 py-3">
        <div className="flex items-center gap-3 border-b border-[#3c4043] pb-2">
          <GoogleLogo className="text-[13px]" />
          <span className="flex h-5 flex-1 items-center rounded-full px-2.5 text-[8px] bg-[#303134] sm:text-[9px]">création site sur mesure</span>
        </div>
        <m.div style={{ opacity: firstOpacity, y: firstY }} className="mt-2.5 flex items-center gap-3">
          <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="grid size-3.5 place-items-center rounded-full bg-[#e8eaed] text-[6px] font-bold text-[#202124]">V</span>
            <span className="text-[8px] leading-tight text-[#e8eaed] sm:text-[9px]">votre-site.fr</span>
          </div>
          <p className="mt-0.5 text-[11px] leading-tight text-[#8ab4f8] sm:text-[13px]">Votre site — Création sur mesure</p>
          <p className="mt-0.5 text-[8px] leading-snug text-[#bdc1c6] sm:text-[9px]">Un site rapide, élégant et pensé pour vos clients. En ligne dès aujourd’hui.</p>
          </div>
          <m.div style={{ scale: badgeScale, opacity: badgeOpacity }} className="shrink-0">
            <FirstBadge />
          </m.div>
        </m.div>
        <m.div style={{ opacity: othersOpacity }} className="mt-3 space-y-2.5">
          {[0, 1].map(k => (
            <div key={k} className="space-y-1">
              <span className="block h-1.5 w-16 rounded-full bg-[#3c4043]" />
              <span className="block h-2 w-32 rounded-full bg-[#8ab4f8]/40" />
              <span className="block h-1.5 w-40 rounded-full bg-[#303134]" />
            </div>
          ))}
        </m.div>
      </m.div>

      <m.div style={{ left: cursorLeft, top: cursorTop, opacity: cursorOpacity }} className="absolute" aria-hidden="true">
        <m.svg style={{ scale: cursorPress }} viewBox="0 0 24 24" className="size-5 origin-top-left drop-shadow-[0_2px_4px_rgb(0_0_0/0.35)] sm:size-6">
          <path d="M5 3l14 8.5-6.2 1.3L9.7 19z" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinejoin="round" />
        </m.svg>
      </m.div>
    </div>
  )
}

/* ─── Monitor + scene orchestration ─── */

const SCENES = [DiscoveryScene, DesignScene, CodeScene, LaunchScene]
const FADE = 0.035

function Scene({
  index, progress, stops, Component,
}: { index: number; progress: MotionValue<number>; stops: number[]; Component: (p: Local) => React.ReactNode }) {
  const last = SCENES.length - 1
  const start = stops[index]
  const end = index < last ? stops[index + 1] : 1

  // Cross-fade with depth: the next scene rises from behind, the current one moves past the viewer.
  const [input, opacityOut, scaleOut, blurOut]: [number[], number[], number[], number[]] =
    index === 0
      ? [[0, end - FADE, end + FADE], [1, 1, 0], [1, 1, 1.05], [0, 0, 8]]
      : index === last
        ? [[start - FADE, start + FADE, 1], [0, 1, 1], [0.94, 1, 1], [8, 0, 0]]
        : [[start - FADE, start + FADE, end - FADE, end + FADE], [0, 1, 1, 0], [0.94, 1, 1, 1.05], [8, 0, 0, 8]]

  const opacity = useScrollMap(progress, input, opacityOut)
  const scale = useScrollMap(progress, input, scaleOut)
  const filter = useBlur(useScrollMap(progress, input, blurOut))
  const local = useScrollMap(progress, [start, end], [0, 1])

  return (
    <m.div style={{ opacity, scale, filter }} className="absolute inset-0">
      <Component local={local} />
    </m.div>
  )
}

export function MethodScreen({ progress, stops }: { progress: MotionValue<number>; stops: number[] }) {
  return (
    <div className="mx-auto w-full max-w-[30rem]" aria-hidden="true">
      <div className="relative aspect-[16/10] rounded-[1.1rem] bg-elevated p-2 ring-1 ring-hairline-strong shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)]">
        <div className="relative h-full w-full overflow-hidden rounded-[0.7rem] bg-canvas">
          {SCENES.map((Component, i) => (
            <Scene key={i} index={i} progress={progress} stops={stops} Component={Component} />
          ))}
        </div>
      </div>
      <div className="mx-auto h-7 w-24 bg-gradient-to-b from-elevated to-surface [clip-path:polygon(14%_0,86%_0,100%_100%,0_100%)]" />
      <div className="mx-auto h-1.5 w-40 rounded-full bg-elevated" />
    </div>
  )
}
