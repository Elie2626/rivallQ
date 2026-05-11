// ── Number & currency helpers ─────────────────
export function formatPrice(cents: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)
}

// Accepts a string ISO date, Firestore Timestamp object, or unknown
function toDate(value: unknown): Date {
  if (!value) return new Date()
  // Firestore Timestamp has a toDate() method
  if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: unknown }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate()
  }
  return new Date(value as string)
}

export function formatDate(dateStr: unknown): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(toDate(dateStr))
}

export function formatDateTime(dateStr: unknown): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(toDate(dateStr))
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)} ms`
  return `${(ms / 1000).toFixed(2)} s`
}

// ── Score helpers ─────────────────────────────
export function scoreToLabel(score: number): string {
  if (score >= 90) return 'Excellent'
  if (score >= 75) return 'Bon'
  if (score >= 50) return 'Moyen'
  if (score >= 25) return 'Faible'
  return 'Critique'
}

export function scoreToColor(score: number): string {
  if (score >= 90) return 'text-emerald-500'
  if (score >= 75) return 'text-green-500'
  if (score >= 50) return 'text-yellow-500'
  if (score >= 25) return 'text-orange-500'
  return 'text-red-500'
}

export function scoreToGradient(score: number): string {
  if (score >= 90) return 'from-emerald-500 to-green-400'
  if (score >= 75) return 'from-green-500 to-emerald-400'
  if (score >= 50) return 'from-yellow-500 to-orange-400'
  if (score >= 25) return 'from-orange-500 to-red-400'
  return 'from-red-500 to-rose-400'
}

// ── URL helpers ───────────────────────────────
export function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

export function getDomain(url: string): string {
  try {
    return new URL(normalizeUrl(url)).hostname.replace('www.', '')
  } catch {
    return url
  }
}

// ── String helpers ────────────────────────────
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '…'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
