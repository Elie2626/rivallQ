import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'
import { FieldValue } from 'firebase-admin/firestore'

// ── SSRF guard ────────────────────────────────────────────────────────────────
// Block requests to private/loopback/link-local address ranges.
const PRIVATE_IP_RE = /^(10\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.|127\.|0\.|169\.254\.|::1|fc00:|fe80:)/i

function validateWordPressUrl(raw: string): string | null {
  let parsed: URL
  try { parsed = new URL(raw) } catch { return null }

  // Only allow https (http would leak Basic-Auth credentials in transit)
  if (parsed.protocol !== 'https:') return null

  const host = parsed.hostname
  // Block localhost, private ranges, and the AWS metadata IP
  if (host === 'localhost' || host === '169.254.169.254') return null
  if (PRIVATE_IP_RE.test(host)) return null

  return parsed.origin // strip path/query to only use the base origin
}

export async function POST(request: NextRequest) {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { rebuild_id, url, username, appPassword } = await request.json()

  if (!rebuild_id || !url || !username || !appPassword) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  // ── Validate WordPress URL before making any outbound requests ──
  const safeOrigin = validateWordPressUrl(url as string)
  if (!safeOrigin) {
    return NextResponse.json(
      { error: 'URL WordPress invalide. Utilisez une URL https:// publique.' },
      { status: 400 }
    )
  }

  const db = getAdminDb()
  const rebuildRef = db.collection('rebuilds').doc(rebuild_id)
  const rebuildDoc = await rebuildRef.get()

  if (!rebuildDoc.exists) {
    return NextResponse.json({ error: 'Rebuild non disponible' }, { status: 404 })
  }

  const rebuild = rebuildDoc.data() as Record<string, unknown>

  if (rebuild.user_id !== user.uid || rebuild.status !== 'completed') {
    return NextResponse.json({ error: 'Rebuild non disponible' }, { status: 404 })
  }

  // Also require payment to install (same gate as ZIP download)
  if (rebuild.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Paiement requis pour l\'installation WordPress' }, { status: 402 })
  }

  try {
    const wpBase = safeOrigin
    const credentials = Buffer.from(`${username}:${appPassword}`).toString('base64')
    const headers = {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    }

    // Test connection
    const testRes = await fetch(`${wpBase}/wp-json/wp/v2/users/me`, { headers })
    if (!testRes.ok) {
      return NextResponse.json({ error: 'Connexion WordPress impossible. Vérifiez vos identifiants.' }, { status: 400 })
    }

    await rebuildRef.update({
      wp_install_status: 'in_progress',
      wp_site_url: wpBase,
      wp_credentials_provided: true,
      updated_at: FieldValue.serverTimestamp(),
    })

    // Create/update homepage page in WordPress
    const pagesRes = await fetch(`${wpBase}/wp-json/wp/v2/pages?slug=home`, { headers })
    const pages = await pagesRes.json()

    const pageData = {
      title: rebuild.meta_title ?? 'Homepage',
      content: rebuild.homepage_html ?? '',
      status: 'publish',
      slug: 'home',
      meta: {
        _yoast_wpseo_title: rebuild.meta_title,
        _yoast_wpseo_metadesc: rebuild.meta_description,
      },
    }

    if (pages.length > 0) {
      // Update existing
      await fetch(`${wpBase}/wp-json/wp/v2/pages/${pages[0].id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(pageData),
      })
    } else {
      // Create new
      await fetch(`${wpBase}/wp-json/wp/v2/pages`, {
        method: 'POST',
        headers,
        body: JSON.stringify(pageData),
      })
    }

    await rebuildRef.update({
      wp_install_status: 'completed',
      updated_at: FieldValue.serverTimestamp(),
    })

    return NextResponse.json({ success: true, message: 'Homepage publiée sur WordPress avec succès.' })
  } catch (error) {
    await rebuildRef.update({
      wp_install_status: 'failed',
      wp_error_message: error instanceof Error ? error.message : 'Erreur inconnue',
      updated_at: FieldValue.serverTimestamp(),
    }).catch(() => {})

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Installation WordPress échouée' },
      { status: 500 }
    )
  }
}
