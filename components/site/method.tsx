'use client'

import { useEffect, useRef, useState } from 'react'
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Reveal, useScrollMap } from '@/components/ui/apple-motion'
import { MethodScreen } from './method-screen'

const STEPS = [
  {
    title: 'Découverte',
    body: 'On échange sur vos objectifs, vos utilisateurs et vos contraintes. Vous repartez avec un périmètre clair et un devis détaillé.',
  },
  {
    title: 'Conception',
    body: 'Parcours, maquettes et design d’interface, sur ordinateur comme sur mobile. Vous validez chaque écran avant la moindre ligne de code.',
  },
  {
    title: 'Développement',
    body: 'Le produit se construit par étapes, avec des démonstrations régulières. Vous suivez l’avancement du début à la fin.',
  },
  {
    title: 'Lancement & suivi',
    body: 'Mise en ligne, publication sur les stores, prise en main. Puis maintenance et évolutions, à votre rythme.',
  },
]

/** Where each step starts, as a fraction of the list's scroll progress. */
const EVEN_STOPS = STEPS.map((_, i) => i / STEPS.length)

function Dot({ progress, at, index }: { progress: MotionValue<number>; at: number; index: number }) {
  const lit = useScrollMap(progress, [Math.max(0, at - 0.02), at + 0.02], [0, 1])
  const unlit = useTransform(lit, v => 1 - v)
  return (
    <span className="relative grid size-8 shrink-0 place-items-center rounded-full border border-hairline-strong bg-canvas text-xs font-medium tabular-nums text-fg-muted">
      <m.span style={{ opacity: lit, scale: lit }} className="absolute inset-0 rounded-full bg-fg" />
      <m.span style={{ opacity: lit }} className="relative text-canvas">{index + 1}</m.span>
      <m.span style={{ opacity: unlit }} className="absolute">{index + 1}</m.span>
    </span>
  )
}

export function Method() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const [stops, setStops] = useState(EVEN_STOPS)
  // 0 when the first step reaches mid-screen, 1 when the end of the list does.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 0.55', 'end 0.55'] })

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const items = Array.from(list.querySelectorAll<HTMLLIElement>(':scope > li'))
      setStops(items.map(li => li.offsetTop / list.offsetHeight))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [])

  return (
    <section id="methode" className="bg-canvas px-4 py-32 sm:px-6 lg:py-44">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-24">
        {/* On mobile the wrapper dissolves so the screen can stick across the whole list. */}
        <div className="contents lg:sticky lg:top-24 lg:block lg:self-start">
          <Reveal>
            <p className="text-sm font-medium text-fg-subtle">Méthode</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
              De l’idée au lancement,<br />sans zone d’ombre.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
              Un seul interlocuteur, des étapes claires et des points réguliers. Vous savez toujours où en est votre projet.
            </p>
          </Reveal>

          <div className="sticky top-12 z-10 -mx-4 bg-canvas/85 px-4 pb-6 pt-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:mt-12 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <Reveal y={48}>
              <MethodScreen progress={scrollYProgress} stops={stops} />
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative" role="list">
          <span aria-hidden="true" className="absolute bottom-4 left-[15.5px] top-4 w-px bg-hairline" />
          <m.span
            aria-hidden="true"
            style={reduced ? undefined : { scaleY: scrollYProgress }}
            className="absolute bottom-4 left-[15.5px] top-4 w-px origin-top bg-fg"
          />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={`relative flex gap-6 ${i < STEPS.length - 1 ? 'min-h-[45vh] lg:min-h-[60vh]' : 'min-h-[35vh] lg:min-h-[40vh]'}`}
            >
              {reduced ? (
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fg text-xs font-medium text-canvas">{i + 1}</span>
              ) : (
                <Dot progress={scrollYProgress} at={stops[i]} index={i} />
              )}
              <Reveal delay={0.05}>
                <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-fg-muted">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
