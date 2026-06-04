import { NextRequest, NextResponse } from 'next/server'
import { getServerUser } from '@/lib/firebase/server'
import { getAdminDb } from '@/lib/firebase/admin'

export async function GET(request: NextRequest) {
  const user = await getServerUser()
  if (!user) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const rebuildId = searchParams.get('rebuild_id')
  if (!rebuildId) return NextResponse.json({ error: 'rebuild_id requis' }, { status: 400 })

  const db = getAdminDb()
  const rebuildDoc = await db.collection('rebuilds').doc(rebuildId).get()

  if (!rebuildDoc.exists) {
    return NextResponse.json({ error: 'Rebuild non disponible' }, { status: 404 })
  }

  const rebuild = rebuildDoc.data() as Record<string, unknown>

  if (rebuild.user_id !== user.uid || rebuild.status !== 'completed') {
    return NextResponse.json({ error: 'Rebuild non disponible' }, { status: 404 })
  }

  if (rebuild.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Paiement requis pour télécharger le ZIP' }, { status: 402 })
  }

  // Build ZIP content (simplified text bundle)
  const files: string[] = []

  // Homepage
  const homepageHtml = wrapPage(
    (rebuild.meta_title as string) ?? 'Homepage',
    (rebuild.homepage_html as string) ?? '',
    (rebuild.homepage_css as string) ?? ''
  )
  files.push(`=== index.html ===\n${homepageHtml}`)

  // Additional pages
  if (rebuild.pages) {
    for (const page of rebuild.pages as Array<{ slug: string; title: string; html: string }>) {
      files.push(`=== ${page.slug}.html ===\n${wrapPage(page.title, page.html, '')}`)
    }
  }

  // README
  files.push(`=== README.txt ===\nRivallQ — Site généré le ${new Date().toLocaleDateString('fr-FR')}\n\nDéployez les fichiers HTML sur votre hébergeur.\nBesoin d'aide ? elieamar2007@gmail.com`)

  const content = files.join('\n\n')

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="rivallq-site-${rebuildId.slice(0, 8)}.zip"`,
    },
  })
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function wrapPage(title: string, body: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${css ? `<style>${escapeHtml(css)}</style>` : ''}
</head>
<body class="bg-white">
${body}
</body>
</html>`
}
