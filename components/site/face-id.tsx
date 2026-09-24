'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { DotLottieReact, type DotLottieReactProps } from '@lottiefiles/dotlottie-react'

type DotLottie = NonNullable<Parameters<NonNullable<DotLottieReactProps['dotLottieRefCallback']>>[0]>

/**
 * Apple-style Face ID in three beats, never overlapping:
 *  1. a face inside four square corners “looks around”;
 *  2. the corners round into a circle while the features fade;
 *  3. Apple’s Lottie takes over: spinning rings, then a check.
 * With reduced motion it rests on the check.
 */

const CX = 219.5 // circle centre in the Lottie's 440 × 370 frame
const CY = 184.5
const R = 62
const HALF = 64
const f = (n: number) => n.toFixed(2)

/** Rounded corner bracket (top-left), rotated by `rot` degrees. Path shape: M L C L. */
function corner(rot: number) {
  const g = CX - HALF, h = CY - HALF, arm = 26, radius = 16
  const base: [number, number][] = [
    [g, h + arm + radius], [g, h + radius], [g, h + radius * 0.45],
    [g + radius * 0.45, h], [g + radius, h], [g + arm + radius, h],
  ]
  const a = (rot * Math.PI) / 180
  const p = base.map(([x, y]) => {
    const dx = x - CX, dy = y - CY
    return `${f(CX + dx * Math.cos(a) - dy * Math.sin(a))} ${f(CY + dx * Math.sin(a) + dy * Math.cos(a))}`
  })
  return `M${p[0]} L${p[1]} C${p[2]} ${p[3]} ${p[4]} L${p[5]}`
}

/** Quarter circle as a cubic, with the same M L C L shape as the corner so they can morph. */
function quarter(rot: number) {
  const from = 180 + rot, to = 270 + rot
  const pt = (deg: number) => [CX + R * Math.cos((deg * Math.PI) / 180), CY + R * Math.sin((deg * Math.PI) / 180)]
  const k = (4 / 3) * Math.tan(Math.PI / 8) * R
  const [x0, y0] = pt(from), [x3, y3] = pt(to)
  const r0 = (from * Math.PI) / 180, r3 = (to * Math.PI) / 180
  const x1 = x0 - k * Math.sin(r0), y1 = y0 + k * Math.cos(r0)
  const x2 = x3 + k * Math.sin(r3), y2 = y3 - k * Math.cos(r3)
  return `M${f(x0)} ${f(y0)} L${f(x0)} ${f(y0)} C${f(x1)} ${f(y1)} ${f(x2)} ${f(y2)} ${f(x3)} ${f(y3)} L${f(x3)} ${f(y3)}`
}

const SHAPES = [0, 90, 180, 270].map(rot => ({ square: corner(rot), round: quarter(rot) }))
const numbers = (d: string) => d.match(/-?\d+(?:\.\d+)?/g)!.map(Number)
const template = (d: string) => d.split(/-?\d+(?:\.\d+)?/)

/** Morphs each corner from its square bracket to its quarter circle. */
function roundCorners(paths: SVGPathElement[], options: Parameters<typeof animate>[2]) {
  return animate(0, 1, {
    ...(options as object),
    onUpdate: (t: number) => {
      paths.forEach((el, i) => {
        const from = numbers(SHAPES[i].square)
        const to = numbers(SHAPES[i].round)
        const parts = template(SHAPES[i].round)
        const values = from.map((n, k) => f(n + (to[k] - n) * t))
        el.setAttribute('d', parts.reduce((acc, part, k) => acc + part + (values[k] ?? ''), ''))
      })
    },
  })
}

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function FaceId({ className = '' }: { className?: string }) {
  const viewRef = useRef<HTMLDivElement>(null)
  const visible = useInView(viewRef, { amount: 0.5 })
  const reduced = useReducedMotion()
  const [player, setPlayer] = useState<DotLottie | null>(null)
  const glyphRef = useRef<SVGSVGElement>(null)
  const featuresRef = useRef<SVGGElement>(null)
  const cornersRef = useRef<SVGPathElement[]>([])

  useEffect(() => {
    const glyph = glyphRef.current
    const features = featuresRef.current
    const corners = cornersRef.current
    if (!player || !glyph || !features) return
    let cancelled = false

    const finished = () =>
      new Promise<void>(resolve => {
        const onComplete = () => {
          player.removeEventListener('complete', onComplete)
          resolve()
        }
        player.addEventListener('complete', onComplete)
      })
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const loop = async () => {
      while (!cancelled) {
        // Start: Lottie parked on an empty frame, square face.
        player.pause()
        player.setFrame(15)
        corners.forEach((el, i) => el.setAttribute('d', SHAPES[i].square))
        await animate(features, { opacity: 1, scale: 1, x: 0, y: 0 }, { duration: 0 })

        // 1. The face appears and looks around.
        await animate(glyph, { opacity: [0, 1], scale: [0.9, 1] }, { duration: 0.3, ease: 'easeOut' })
        await animate(features, { x: [0, -10, 10, 0, 0], y: [0, 0, 0, -7, 0] }, { duration: 1.2, ease: 'easeInOut' })
        if (cancelled) return

        // 2. Corners round into a circle, features fade.
        await Promise.all([
          roundCorners(corners, { duration: 0.4, ease: [0.65, 0, 0.35, 1] }),
          animate(features, { opacity: 0, scale: 0.8 }, { duration: 0.25, ease: 'easeIn' }),
        ])
        if (cancelled) return

        // 3. The circle fades while the Lottie rings arrive, then the check.
        const done = finished()
        player.play()
        await animate(glyph, { opacity: 0 }, { duration: 0.2, ease: 'easeIn' })
        await done
        if (cancelled) return
        await wait(600)
      }
    }

    const start = () => {
      if (reduced) {
        player.pause()
        player.setFrame(100) // the check
        return
      }
      if (visible) loop()
    }
    if (player.isLoaded) start()
    else player.addEventListener('load', start)

    return () => {
      cancelled = true
      player.removeEventListener('load', start)
      player.pause()
      glyph.style.opacity = '0'
    }
  }, [player, visible, reduced])

  return (
    <div ref={viewRef} className={`relative text-fg ${className}`} role="img" aria-label="Face ID : vérification réussie">
      <DotLottieReact src="/face-id.lottie" autoplay={false} dotLottieRefCallback={setPlayer} className="size-full" />
      <svg
        ref={glyphRef}
        viewBox="0 0 440 370"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
        style={{ opacity: 0, transformOrigin: `${(CX / 440) * 100}% ${(CY / 370) * 100}%` }}
      >
        {SHAPES.map((shape, i) => (
          <path
            key={i}
            ref={el => { if (el) cornersRef.current[i] = el }}
            d={shape.square}
            {...STROKE}
          />
        ))}
        <g ref={featuresRef} {...STROKE} style={{ transformBox: 'fill-box', transformOrigin: '50% 50%' }}>
          <path d="M198 162 V174" />
          <path d="M241 162 V174" />
          <path d="M221 162 V192 Q221 197 215 197 H212" />
          <path d="M197 207 Q219.5 222 242 207" />
        </g>
      </svg>
    </div>
  )
}
