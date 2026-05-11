import type { ScrapedData, ScrapedImage, PageSpeedData } from '@/types'

const FIRECRAWL_API = 'https://api.firecrawl.dev/v1'

function getFirecrawlHeaders() {
  const key = process.env.FIRECRAWL_API_KEY
  if (!key) throw new Error('Missing FIRECRAWL_API_KEY environment variable')
  return { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }
}

interface FirecrawlResponse {
  success: boolean
  data?: {
    markdown?: string
    html?: string
    rawHtml?: string
    links?: string[]
    screenshot?: string
    metadata?: {
      title?: string
      description?: string
      ogTitle?: string
      ogDescription?: string
      ogImage?: string
      keywords?: string
      robots?: string
      charset?: string
      viewport?: string
      statusCode?: number
    }
  }
  error?: string
}

// ── Main scrape function ──────────────────────
export async function scrapeWebsite(url: string): Promise<ScrapedData> {
  const normalizedUrl = normalizeUrl(url)

  const response = await fetch(`${FIRECRAWL_API}/scrape`, {
    method: 'POST',
    headers: getFirecrawlHeaders(),
    body: JSON.stringify({
      url: normalizedUrl,
      formats: ['markdown', 'html', 'links', 'screenshot'],
      actions: [],
      waitFor: 2000,
      timeout: 30000,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Firecrawl scrape failed: ${response.status} — ${err}`)
  }

  const result: FirecrawlResponse = await response.json()

  if (!result.success || !result.data) {
    throw new Error(result.error ?? 'Firecrawl returned no data')
  }

  const { data } = result
  const html = data.rawHtml ?? data.html ?? ''
  const markdown = data.markdown ?? ''
  const meta = data.metadata ?? {}

  // Parse headings from markdown
  const headings = parseHeadingsFromMarkdown(markdown)

  // Parse images from HTML
  const images = parseImagesFromHtml(html)

  // Parse meta tags from HTML
  const metaTags = parseMetaTagsFromHtml(html, meta)

  // Parse structured data
  const structuredData = parseStructuredData(html)

  // Estimate page speed (Firecrawl doesn't provide this — we use heuristics)
  const pageSpeed = estimatePageSpeed(html, images.length)

  // Clean text from markdown
  const text = markdown
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`[^`]+`/g, '')
    .trim()

  const wordCount = text.split(/\s+/).filter(Boolean).length

  return {
    title: meta.title ?? 'No title found',
    description: meta.description ?? meta.ogDescription ?? '',
    html,
    text,
    links: (data.links ?? []).slice(0, 100),
    images,
    headings,
    meta_tags: metaTags,
    structured_data: structuredData,
    page_speed: pageSpeed,
    word_count: wordCount,
    screenshot_url: data.screenshot ?? null,
  }
}

// ── Helpers ───────────────────────────────────
function normalizeUrl(url: string): string {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }
  return url
}

function parseHeadingsFromMarkdown(markdown: string): { level: number; text: string }[] {
  const headings: { level: number; text: string }[] = []
  const lines = markdown.split('\n')

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (match) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
      })
    }
  }

  return headings.slice(0, 50)
}

function parseImagesFromHtml(html: string): ScrapedImage[] {
  const images: ScrapedImage[] = []
  const imgRegex = /<img[^>]+>/gi
  const matches = html.match(imgRegex) ?? []

  for (const imgTag of matches.slice(0, 50)) {
    const src = imgTag.match(/src=["']([^"']+)["']/i)?.[1] ?? ''
    const alt = imgTag.match(/alt=["']([^"']*)["']/i)?.[1] ?? null
    const width = parseInt(imgTag.match(/width=["']?(\d+)["']?/i)?.[1] ?? '0') || null
    const height = parseInt(imgTag.match(/height=["']?(\d+)["']?/i)?.[1] ?? '0') || null

    if (src) {
      images.push({ src, alt, width, height })
    }
  }

  return images
}

function parseMetaTagsFromHtml(
  html: string,
  metadata: Record<string, string | number | undefined>
): Record<string, string> {
  const tags: Record<string, string> = {}

  // From Firecrawl metadata
  if (metadata.title) tags['title'] = String(metadata.title)
  if (metadata.description) tags['description'] = String(metadata.description)
  if (metadata.ogTitle) tags['og:title'] = String(metadata.ogTitle)
  if (metadata.ogDescription) tags['og:description'] = String(metadata.ogDescription)
  if (metadata.ogImage) tags['og:image'] = String(metadata.ogImage)
  if (metadata.keywords) tags['keywords'] = String(metadata.keywords)
  if (metadata.viewport) tags['viewport'] = String(metadata.viewport)

  // Parse from raw HTML
  const metaRegex = /<meta[^>]+>/gi
  const matches = html.match(metaRegex) ?? []

  for (const metaTag of matches.slice(0, 30)) {
    const name = metaTag.match(/(?:name|property)=["']([^"']+)["']/i)?.[1]
    const content = metaTag.match(/content=["']([^"']*?)["']/i)?.[1]
    if (name && content) {
      tags[name.toLowerCase()] = content
    }
  }

  return tags
}

function parseStructuredData(html: string): unknown[] {
  const schemas: unknown[] = []
  const scriptRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match

  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      schemas.push(JSON.parse(match[1]))
    } catch {
      // ignore malformed JSON-LD
    }
  }

  return schemas
}

function estimatePageSpeed(html: string, imageCount: number): PageSpeedData {
  const htmlSize = new Blob([html]).size
  const estimatedTotal = htmlSize + imageCount * 80_000 // ~80KB per image

  // Rough heuristics
  const loadTime = Math.min(8000, 800 + imageCount * 200 + htmlSize / 1000)
  const ttfb = Math.min(1000, 200 + htmlSize / 5000)

  return {
    load_time_ms: Math.round(loadTime),
    ttfb_ms: Math.round(ttfb),
    fcp_ms: Math.round(ttfb + 200),
    lcp_ms: Math.round(loadTime * 0.7),
    cls: imageCount > 10 ? 0.15 : 0.05,
    total_bytes: estimatedTotal,
  }
}
