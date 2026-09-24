'use client'

import { useEffect, useRef, useState } from 'react'
import {
  m, useReducedMotion, useScroll, useTransform,
  type MotionValue,
} from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/apple-motion'
import { PROJECTS, type Project } from './projects'

type Box = { left: number; width: number }

function LogoTile({ project }: { project: Project }) {
  return (
    <span className="size-10 shrink-0 overflow-hidden rounded-[23%] ring-1 ring-hairline" style={{ background: project.logoBg }}>
      <img src={project.logo} alt="" className="h-full w-full object-cover" style={{ transform: `scale(${project.logoZoom ?? 1})` }} />
    </span>
  )
}

function CardBody({ project, imageX }: { project: Project; imageX?: MotionValue<string> }) {
  return (
    <>
      <div className="relative aspect-[1200/630] overflow-hidden rounded-3xl bg-elevated ring-1 ring-hairline">
        <m.img
          src={project.shot}
          alt={`Page d’accueil du site ${project.name}`}
          loading="lazy"
          style={imageX ? { x: imageX, scale: 1.1 } : undefined}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="mt-5 flex items-center gap-3">
        <LogoTile project={project} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-fg">{project.name}</p>
          <p className="truncate text-sm text-fg-subtle">{project.category}</p>
        </div>
        <span className="hidden rounded-full border border-hairline px-3 py-1 text-xs text-fg-muted sm:inline">{project.kind}</span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-fg transition-[background-color,color,transform] duration-500 ease-apple group-hover:rotate-45 group-hover:bg-fg group-hover:text-canvas">
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </>
  )
}

const CARD = 'group block w-[80vw] shrink-0 sm:w-[62vw] lg:w-[44vw] lg:max-w-[680px]'

function Card({
  project, index, x, boxes, viewport, imageX,
}: {
  project: Project
  index: number
  x: MotionValue<number>
  boxes: Box[]
  viewport: number
  imageX: MotionValue<string>
}) {
  // The card nearest the middle of the screen sits forward; the others recede.
  const distance = useTransform(x, v => {
    const box = boxes[index]
    if (!box || !viewport) return 0
    const center = box.left + box.width / 2 + v
    return Math.min(1, Math.abs(center - viewport / 2) / viewport)
  })
  const scale = useTransform(distance, [0, 1], [1, 0.9])
  const opacity = useTransform(distance, [0, 1], [1, 0.45])

  return (
    <m.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — ${project.category} (s’ouvre dans un nouvel onglet)`}
      style={{ scale, opacity }}
      className={CARD}
    >
      <CardBody project={project} imageX={imageX} />
    </m.a>
  )
}

function EndCard() {
  return (
    <a href="#contact" className={`${CARD} grid place-items-center`}>
      <div className="flex aspect-[1200/630] w-full flex-col items-center justify-center rounded-3xl border border-dashed border-hairline-strong text-center transition-colors duration-500 group-hover:bg-white/[0.03]">
        <p className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">Votre projet ici ?</p>
        <p className="mt-2 text-fg-muted">Parlons-en <span aria-hidden="true">›</span></p>
      </div>
    </a>
  )
}

function Heading() {
  return (
    <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <p className="text-sm font-medium text-fg-subtle">Réalisations</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-5xl">
        Des projets en ligne,<br />utilisés chaque jour.
      </h2>
    </Reveal>
  )
}

function StaticWork() {
  return (
    <section id="realisations" className="bg-canvas py-24">
      <Heading />
      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:px-6">
        {PROJECTS.map(p => (
          <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className={`${CARD} snap-center`}>
            <CardBody project={p} />
          </a>
        ))}
        <EndCard />
      </div>
    </section>
  )
}

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [distance, setDistance] = useState(0)
  const [boxes, setBoxes] = useState<Box[]>([])
  const [viewport, setViewport] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      setViewport(window.innerWidth)
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
      setBoxes(Array.from(track.children, el => {
        const node = el as HTMLElement
        return { left: node.offsetLeft, width: node.offsetWidth }
      }))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [reduced])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Function forms on purpose: they opt out of framer-motion's native scroll-timeline
  // acceleration, which rejects this section's empty scroll range before `distance` is measured.
  const x = useTransform(scrollYProgress, v => -v * distance)
  const progress = useTransform(scrollYProgress, v => v)
  // Screenshots drift the opposite way inside their frames — a quiet depth cue.
  const imageX = useTransform(scrollYProgress, v => `${4 - 8 * v}%`)

  if (reduced) return <StaticWork />

  return (
    <section
      id="realisations"
      ref={sectionRef}
      className="relative bg-canvas"
      style={{ height: `calc(100dvh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center gap-10 overflow-hidden pt-12 lg:gap-14">
        <Heading />

        <m.div ref={trackRef} style={{ x }} className="flex w-max gap-6 px-4 will-change-transform sm:px-6 lg:gap-8 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {PROJECTS.map((p, i) => (
            <Card key={p.name} project={p} index={i} x={x} boxes={boxes} viewport={viewport} imageX={imageX} />
          ))}
          <EndCard />
        </m.div>

        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="h-px w-full overflow-hidden bg-hairline">
            <m.div style={{ scaleX: progress }} className="h-full origin-left bg-fg" />
          </div>
        </div>
      </div>
    </section>
  )
}
