'use client'

import { useEffect, useRef } from 'react'
import {
  m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform,
  type MotionValue,
} from 'framer-motion'
import { EASE_APPLE, useBlur, useScrollMap } from '@/components/ui/apple-motion'
import { PROJECTS, type Project } from './projects'

const byName = (name: string) => PROJECTS.find(p => p.name === name)!

/* depth: 0.4 = far away (small, soft, slow) → 1.1 = close (large, sharp, fast) */
const TILES: { project: Project; depth: number; className: string }[] = [
  { project: byName('CloserMatch'),   depth: 1.0,  className: 'top-[13%] left-[5%] md:top-[16%] md:left-[8%]' },
  { project: byName('BotExpress'),    depth: 0.8,  className: 'top-[11%] right-[6%] md:top-[12%] md:right-[10%]' },
  { project: byName('Wavore'),        depth: 0.5,  className: 'hidden xl:block xl:top-[46%] xl:left-[3%]' },
  { project: byName('G-Cours'),       depth: 1.1,  className: 'hidden xl:block xl:top-[42%] xl:right-[5%]' },
  { project: byName('Selesta'),       depth: 0.7,  className: 'bottom-[9%] left-[7%] md:bottom-[16%] md:left-[13%]' },
  { project: byName('Pharmconsult'),  depth: 0.9,  className: 'bottom-[8%] right-[8%] md:bottom-[13%] md:right-[15%]' },
  { project: byName('Matteo Lencou'), depth: 0.45, className: 'hidden lg:block lg:top-[7%] lg:left-[31%]' },
  { project: byName('SAD Services'),  depth: 0.55, className: 'hidden lg:block lg:bottom-[6%] lg:right-[35%]' },
]

function Tile({
  project, depth, className, index, mouse, pointer, scroll,
}: {
  project: Project
  depth: number
  className: string
  index: number
  mouse: React.RefObject<{ x: number; y: number }>
  pointer: { x: MotionValue<number>; y: MotionValue<number> }
  scroll: MotionValue<number>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Closer tiles travel further — scroll and pointer parallax both scale with depth.
  // They lift out through the top so the section's clipping edge never shows.
  const scrollY = useTransform(scroll, [0, 1], [0, -380 * depth])
  const pointerX = useTransform(pointer.x, [-1, 1], [-24 * depth, 24 * depth])
  const pointerY = useTransform(pointer.y, [-1, 1], [-16 * depth, 16 * depth])
  const y = useTransform(() => scrollY.get() + pointerY.get())

  const pushX = useMotionValue(0)
  const pushY = useMotionValue(0)
  const springX = useSpring(pushX, { stiffness: 260, damping: 22 })
  const springY = useSpring(pushY, { stiffness: 260, damping: 22 })

  useEffect(() => {
    if (reduced) return
    const onMove = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const dx = (mouse.current?.x ?? -9999) - (r.left + r.width / 2)
      const dy = (mouse.current?.y ?? -9999) - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy)
      if (dist < 160) {
        const angle = Math.atan2(dy, dx)
        const force = (1 - dist / 160) * 46
        pushX.set(-Math.cos(angle) * force)
        pushY.set(-Math.sin(angle) * force)
      } else {
        pushX.set(0)
        pushY.set(0)
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, mouse, pushX, pushY])

  const far = depth < 0.6
  const size = Math.round(40 + 40 * depth)
  const floatDuration = 6 + ((index * 1.7) % 4)

  return (
    <m.div
      className={`absolute ${className}`}
      style={reduced ? undefined : { x: pointerX, y }}
      aria-hidden="true"
    >
      <m.div
        ref={ref}
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.6, filter: 'blur(12px)' }}
        animate={{ opacity: far ? 0.55 : 1, scale: 1, filter: far ? 'blur(1.5px)' : 'blur(0px)' }}
        transition={{ duration: 1.4, ease: EASE_APPLE, delay: 0.5 + index * 0.07 }}
      >
        <m.div
          className="size-11 md:w-[var(--s)] md:h-[var(--s)]"
          style={{ ['--s' as string]: `${size}px` }}
          animate={reduced ? undefined : { y: [0, -7, 0, 7, 0], rotate: [0, 2, 0, -2, 0] }}
          transition={{ duration: floatDuration, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <div
            className="h-full w-full overflow-hidden rounded-[23%] shadow-[0_20px_40px_-12px_rgb(0_0_0/0.8)] ring-1 ring-hairline"
            style={{ background: project.logoBg }}
          >
            <img
              src={project.logo}
              alt=""
              className="h-full w-full object-cover"
              style={{ transform: `scale(${project.logoZoom ?? 1})` }}
            />
          </div>
        </m.div>
      </m.div>
    </m.div>
  )
}

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 1.3, ease: EASE_APPLE, delay },
})

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const reduced = useReducedMotion()

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const pointer = {
    x: useSpring(rawX, { stiffness: 60, damping: 20 }),
    y: useSpring(rawY, { stiffness: 60, damping: 20 }),
  }

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const contentOpacity = useScrollMap(scrollYProgress, [0, 0.55], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const contentBlur = useBlur(useTransform(scrollYProgress, [0, 0.55], [0, 10]))
  const glowOpacity = useScrollMap(scrollYProgress, [0, 0.6], [1, 0])
  const tilesOpacity = useScrollMap(scrollYProgress, [0.1, 0.8], [1, 0])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-canvas px-4 pt-12"
    >
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(255_255_255/0.09),transparent)]"
        style={reduced ? undefined : { opacity: glowOpacity }}
      />

      <m.div className="pointer-events-none absolute inset-0" style={reduced ? undefined : { opacity: tilesOpacity }}>
        {TILES.map((t, i) => (
          <Tile key={t.project.name} {...t} index={i} mouse={mouse} pointer={pointer} scroll={scrollYProgress} />
        ))}
      </m.div>

      <m.div
        className="relative z-10 mx-auto max-w-4xl text-center will-change-transform"
        style={reduced ? undefined : { scale: contentScale, opacity: contentOpacity, y: contentY, filter: contentBlur }}
      >
        <m.p {...enter(0.1)} className="mb-6 text-sm font-medium tracking-wide text-fg-muted sm:text-base">
          Studio de développement sur mesure
        </m.p>

        <h1 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-fg sm:text-7xl lg:text-[5.5rem]">
          <m.span {...enter(0.2)} className="block">Du site web</m.span>
          <m.span
            {...enter(0.34)}
            className="block bg-gradient-to-b from-fg to-fg-subtle bg-clip-text pb-2 text-transparent"
          >
            au logiciel sur mesure.
          </m.span>
        </h1>

        <m.p
          {...enter(0.5)}
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted text-balance sm:text-xl"
        >
          Sites vitrines, applications mobiles, SaaS et logiciels métier — conçus, développés et lancés par une seule équipe.
        </m.p>

        <m.div {...enter(0.64)} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#contact"
            className="inline-flex h-12 items-center rounded-full bg-fg px-7 text-[15px] font-medium text-canvas transition-[background-color,transform] duration-300 ease-apple hover:bg-white/85 active:scale-[0.97]"
          >
            Démarrer un projet
          </a>
          <a
            href="#realisations"
            className="group inline-flex h-12 items-center gap-1 px-2 text-[15px] font-medium text-fg"
          >
            Voir les réalisations
            <span aria-hidden="true" className="transition-transform duration-300 ease-apple group-hover:translate-x-1">›</span>
          </a>
        </m.div>
      </m.div>

      <m.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden h-10 w-px -translate-x-1/2 overflow-hidden bg-hairline sm:block"
        style={reduced ? undefined : { opacity: glowOpacity }}
      >
        {!reduced && (
          <m.span
            className="absolute inset-x-0 top-0 h-1/2 bg-fg"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
          />
        )}
      </m.div>
    </section>
  )
}
