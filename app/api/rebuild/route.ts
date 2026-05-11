// Internal route — called after rebuild payment
import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { generateOptimizedHomepage, generateAdditionalPages } from '@/lib/anthropic/rebuild'
import type { ScrapedData, SEOAnalysis, UXAnalysis, KeywordAnalysis, Issue, Recommendation } from '@/types'

const ANALYZE_SECRET = process.env.ANALYZE_SECRET
if (!ANALYZE_SECRET) throw new Error('Missing ANALYZE_SECRET environment variable')

export async function POST(request: NextRequest) {
  const auth = request.headers.get('x-internal-secret')
  if (!auth || auth !== ANALYZE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { audit_id } = await request.json()
  if (!audit_id) return NextResponse.json({ error: 'audit_id required' }, { status: 400 })

  const db = getAdminDb()
  const auditRef = db.collection('audits').doc(audit_id)

  try {
    // Fetch audit with all analysis data
    const auditDoc = await auditRef.get()
    if (!auditDoc.exists) {
      return NextResponse.json({ error: 'Audit non trouvé' }, { status: 404 })
    }

    const audit = { id: auditDoc.id, ...auditDoc.data() } as Record<string, unknown>

    // If a rebuild already exists for this audit, skip re-generation
    if (audit.rebuild_id) {
      return NextResponse.json({ success: true, rebuild_id: audit.rebuild_id, skipped: true })
    }

    // Create rebuild record (payment_status: 'pending' = preview only, paid = ZIP unlocked)
    const rebuildRef = db.collection('rebuilds').doc()
    await rebuildRef.set({
      audit_id: audit.id,
      user_id: audit.user_id,
      status: 'generating',
      payment_status: 'pending',
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    })

    // Link rebuild to audit
    await auditRef.update({
      rebuild_id: rebuildRef.id,
      rebuild_status: 'generating',
      updated_at: FieldValue.serverTimestamp(),
    })

    const rebuildInput = {
      url: audit.url as string,
      scraped: audit.scraped_data as ScrapedData,
      seoAnalysis: audit.seo_analysis as SEOAnalysis,
      uxAnalysis: audit.ux_analysis as UXAnalysis,
      keywordAnalysis: audit.keyword_analysis as KeywordAnalysis,
      issues: (audit.issues as Issue[]) ?? [],
      recommendations: (audit.recommendations as Recommendation[]) ?? [],
    }

    // Generate homepage
    const { html, css, meta_title, meta_description } = await generateOptimizedHomepage(rebuildInput)

    // Generate additional pages (optional — don't fail the rebuild if they error)
    let pages: Awaited<ReturnType<typeof generateAdditionalPages>> = []
    try {
      pages = await generateAdditionalPages(rebuildInput, ['about', 'services', 'contact'])
    } catch (pageErr) {
      console.warn('[API /rebuild] Additional pages generation failed (non-fatal):', pageErr)
    }

    // Save rebuild
    await rebuildRef.update({
      status: 'completed',
      homepage_html: html,
      homepage_css: css,
      meta_title,
      meta_description,
      pages,
      updated_at: FieldValue.serverTimestamp(),
    })

    await auditRef.update({
      rebuild_status: 'completed',
      updated_at: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true, rebuild_id: rebuildRef.id })
  } catch (error) {
    console.error('[API /rebuild]', error)

    // Mark rebuild and audit as failed so the UI can react
    const errMsg = error instanceof Error ? error.message : 'Génération échouée'
    const db2 = getAdminDb()
    try {
      const auditSnap = await db2.collection('audits').doc(audit_id).get()
      const rebuildIdToFail = auditSnap.data()?.rebuild_id as string | undefined
      if (rebuildIdToFail) {
        await db2.collection('rebuilds').doc(rebuildIdToFail).update({
          status: 'failed',
          error_message: errMsg,
          updated_at: FieldValue.serverTimestamp(),
        })
      }
      await db2.collection('audits').doc(audit_id).update({
        rebuild_status: 'failed',
        updated_at: FieldValue.serverTimestamp(),
      })
    } catch { /* best-effort */ }

    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
