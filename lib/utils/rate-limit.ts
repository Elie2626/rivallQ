/**
 * Simple in-process rate limiter backed by a Map.
 * Good enough for a single-instance deployment (Vercel serverless).
 * For multi-region, replace with an upstash/redis backed solution.
 *
 * Usage:
 *   const check = rateLimit('rebuild', userId, { max: 3, windowMs: 60_000 })
 *   if (!check.ok) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
 */

interface Window {
  count: number
  reset: number
}

const store = new Map<string, Window>()

interface Options {
  /** Max requests per window */
  max: number
  /** Window size in milliseconds */
  windowMs: number
}

interface Result {
  ok: boolean
  remaining: number
  resetAt: number
}

export function rateLimit(namespace: string, key: string, opts: Options): Result {
  const id = `${namespace}:${key}`
  const now = Date.now()

  let win = store.get(id)
  if (!win || win.reset <= now) {
    win = { count: 0, reset: now + opts.windowMs }
    store.set(id, win)
  }

  win.count++

  return {
    ok: win.count <= opts.max,
    remaining: Math.max(0, opts.max - win.count),
    resetAt: win.reset,
  }
}
