// Client-accessible endpoint to trigger the rebuild pipeline.
// Called by AuditResults/AuditProcessing after analysis completes.
//
// The HTTP response is sent immediately after the Firestore records are
// created (< 2 s). The actual Claude generation runs via after() so it
// is not bound by the HTTP connection lifetime.
import { after } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'
import { rateLimit } from '@/lib/utils/rate-limit'
import { generateOptimizedHomepage, generateAdditionalPages } from '@/lib/anthropic/rebuild'
import type { ScrapedData, SEOAnalysis, UXAnalysis, KeywordAnalysis, Issue, Recommendation } from '@/types'

// Allow up to 300 s on platforms that support it (Vercel Pro / Enterprise).
// On Hobby the platform clamps this to 60 s — the after() task will run up
// to that limit. The HTTP response is already sent well before that.
export const maxDuration = 300

export async function POST(request: NextRequest) {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { audit_id } = await request.json()
  if (!audit_id) return NextResponse.json({ error: 'audit_id requis' }, { status: 400 })

  // Rate limit: max 5 rebuild generations per user per hour
  const rl = rateLimit('rebuild:start', user.uid, { max: 5, windowMs: 60 * 60 * 1000 })
  if (!rl.ok) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessayez dans une heure.' }, { status: 429 })
  }

  const db = getAdminDb()
  const auditRef = db.collection('audits').doc(audit_id)

  // Fetch audit
  const auditDoc = await auditRef.get()
  if (!auditDoc.exists) return NextResponse.json({ error: 'Audit non trouvé' }, { status: 404 })

  const audit = { id: auditDoc.id, ...auditDoc.data() } as Record<string, unknown>

  // Security: only the owner can trigger
  if (audit.user_id !== user.uid) return NextResponse.json({ error: 'Interdit' }, { status: 403 })

  // Only trigger on completed audits
  if (audit.status !== 'completed') return NextResponse.json({ error: 'Analyse non terminée' }, { status: 400 })

  // Already has a rebuild — nothing to do
  if (audit.rebuild_id) return NextResponse.json({ rebuild_id: audit.rebuild_id, skipped: true })

  // ── Create rebuild record synchronously so the UI can start showing progress ──
  const rebuildRef = db.collection('rebuilds').doc()
  await rebuildRef.set({
    audit_id,
    user_id: user.uid,
    status: 'generating',
    payment_status: 'pending',
    created_at: FieldValue.serverTimestamp(),
    updated_at: FieldValue.serverTimestamp(),
  })

  // Link audit to rebuild immediately (client polls this)
  await auditRef.update({
    rebuild_id: rebuildRef.id,
    rebuild_status: 'generating',
    updated_at: FieldValue.serverTimestamp(),
  })

  // Snapshot the rebuild input before returning the response
  const rebuildInput = {
    url: audit.url as string,
    scraped: audit.scraped_data as ScrapedData,
    seoAnalysis: audit.seo_analysis as SEOAnalysis,
    uxAnalysis: audit.ux_analysis as UXAnalysis,
    keywordAnalysis: audit.keyword_analysis as KeywordAnalysis,
    issues: (audit.issues as Issue[]) ?? [],
    recommendations: (audit.recommendations as Recommendation[]) ?? [],
  }

  const rebuildId = rebuildRef.id

  // ── Schedule long-running generation AFTER the HTTP response is sent ──
  after(async () => {
    try {
      // Generate homepage (up to 16k tokens — ~60-120 s)
      const { html, css, meta_title, meta_description } = await generateOptimizedHomepage(rebuildInput)

      // Generate additional pages (optional — non-fatal)
      let pages: Awaited<ReturnType<typeof generateAdditionalPages>> = []
      try {
        pages = await generateAdditionalPages(rebuildInput, ['about', 'services', 'contact'])
      } catch {
        // Non-fatal — proceed with homepage only
      }

      // Save completed rebuild
      await db.collection('rebuilds').doc(rebuildId).update({
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
    } catch (error) {
      console.error('[after /rebuild/start] generation failed:', error)
      const errMsg = error instanceof Error ? error.message : 'Génération échouée'

      try {
        await db.collection('rebuilds').doc(rebuildId).update({
          status: 'failed',
          error_message: errMsg,
          updated_at: FieldValue.serverTimestamp(),
        })
        await auditRef.update({
          rebuild_status: 'failed',
          updated_at: FieldValue.serverTimestamp(),
        })
      } catch {
        // best-effort
      }
    }
  })

  // Return immediately — generation continues in the background
  return NextResponse.json({ success: true, rebuild_id: rebuildId })
}
