// Internal route — called by Stripe webhook after payment confirmation
// Runs the full scraping + AI analysis pipeline
import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { scrapeWebsite } from '@/lib/firecrawl/scraper'
import {
  analyzeSEO,
  analyzeUX,
  analyzeKeywords,
  generateIssuesAndRecommendations,
  calculateOverallScore,
} from '@/lib/anthropic/analyze'

// Secret token to prevent unauthorized calls — MUST be set in production
const ANALYZE_SECRET = process.env.ANALYZE_SECRET
if (!ANALYZE_SECRET) throw new Error('Missing ANALYZE_SECRET environment variable')

export async function POST(request: NextRequest) {
  // Validate internal secret
  const auth = request.headers.get('x-internal-secret')
  if (!auth || auth !== ANALYZE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { audit_id } = await request.json()
  if (!audit_id) return NextResponse.json({ error: 'audit_id required' }, { status: 400 })

  const db = getAdminDb()
  const auditRef = db.collection('audits').doc(audit_id)

  try {
    // Fetch audit
    const auditDoc = await auditRef.get()
    if (!auditDoc.exists) {
      return NextResponse.json({ error: 'Audit non trouvé' }, { status: 404 })
    }

    const audit = auditDoc.data() as Record<string, unknown>

    if (audit.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Audit non payé' }, { status: 403 })
    }

    // Update status: scraping
    await auditRef.update({ status: 'scraping', updated_at: FieldValue.serverTimestamp() })

    // 1. Scrape
    const scraped = await scrapeWebsite(audit.url as string)

    // Update status: analyzing
    await auditRef.update({
      status: 'analyzing',
      scraped_data: scraped,
      updated_at: FieldValue.serverTimestamp(),
    })

    // 2. Parallel AI analysis
    const [seoAnalysis, uxAnalysis, keywordAnalysis] = await Promise.all([
      analyzeSEO(scraped),
      analyzeUX(scraped),
      analyzeKeywords(scraped),
    ])

    // 3. Issues & recommendations
    const { issues, recommendations } = await generateIssuesAndRecommendations(
      seoAnalysis,
      uxAnalysis,
      keywordAnalysis,
      audit.url as string
    )

    // 4. Calculate scores
    const conversionScore = uxAnalysis.cta_analysis.score
    const performanceScore = Math.round(
      100 - (scraped.page_speed.load_time_ms / 100)
    )
    const overallScore = calculateOverallScore(
      seoAnalysis.score,
      uxAnalysis.score,
      conversionScore,
      Math.max(0, Math.min(100, performanceScore))
    )

    // 5. Update audit with results
    await auditRef.update({
      status: 'completed',
      seo_score: seoAnalysis.score,
      ux_score: uxAnalysis.score,
      conversion_score: conversionScore,
      performance_score: Math.max(0, Math.min(100, performanceScore)),
      overall_score: overallScore,
      seo_analysis: seoAnalysis,
      ux_analysis: uxAnalysis,
      keyword_analysis: keywordAnalysis,
      issues,
      recommendations,
      updated_at: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true, audit_id, overall_score: overallScore })
  } catch (error) {
    console.error('[API /analyze]', error)

    // Mark audit as failed
    await auditRef.update({
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Erreur inconnue',
      updated_at: FieldValue.serverTimestamp(),
    }).catch(() => {})

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Analyse échouée' },
      { status: 500 }
    )
  }
}
