'use client'

import { useRef, useSyncExternalStore } from 'react'
import {
  m, transform, useMotionTemplate, useReducedMotion, useScroll, useTransform,
  type MotionValue, type TransformOptions,
} from 'framer-motion'

/** Long, soft deceleration — the curve behind most Apple UI motion. */
export const EASE_APPLE = [0.16, 1, 0.3, 1] as const

/**
 * Range-mapped transform computed in JS on every scroll frame.
 * framer-motion hands range-based opacity to a native scroll timeline, which maps
 * target offsets wrongly inside sticky sections; the function form opts out of that.
 */
export function useScrollMap(
  value: MotionValue<number>, input: number[], output: number[], options?: TransformOptions<number>,
): MotionValue<number>
export function useScrollMap(
  value: MotionValue<number>, input: number[], output: string[], options?: TransformOptions<string>,
): MotionValue<string>
export function useScrollMap<T extends number | string>(
  value: MotionValue<number>, input: number[], output: T[], options?: TransformOptions<T>,
) {
  const map = transform(input, output, options)
  return useTransform(value, v => map(v))
}

const SMALL_SCREEN = '(max-width: 767px)'
const subscribeSmall = (cb: () => void) => {
  const q = window.matchMedia(SMALL_SCREEN)
  q.addEventListener('change', cb)
  return () => q.removeEventListener('change', cb)
}

/** True on phones, where animated blur over large layers is too heavy to stay smooth. */
export function useSmallScreen() {
  return useSyncExternalStore(subscribeSmall, () => window.matchMedia(SMALL_SCREEN).matches, () => false)
}

/**
 * Maps a numeric motion value (px) to a CSS blur() filter.
 * Phones get no filter: the motion stays, only the costly blur is dropped.
 */
export function useBlur(px: MotionValue<number>) {
  const blur = useMotionTemplate`blur(${px}px)`
  const none = useTransform(px, () => 'none')
  return useSmallScreen() ? none : blur
}

/** Rises out of a soft blur the first time it enters the viewport. */
export function Reveal({
  children, delay = 0, y = 32, className,
}: { children: React.ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: EASE_APPLE, delay }}
    >
      {children}
    </m.div>
  )
}

/** Words light up one after another as the paragraph travels through the viewport. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.4'] })
  const words = text.split(' ')

  if (reduced) return <p className={className}>{text}</p>

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({
  children, progress, range,
}: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useScrollMap(progress, range, [0.16, 1])
  return (
    <m.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </m.span>
  )
}
