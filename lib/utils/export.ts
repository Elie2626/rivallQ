import type { Rebuild } from '@/types'

// ── Generate ZIP export (client-side) ─────────
// Returns a Blob that can be downloaded
export async function generateZipBlob(rebuild: Rebuild): Promise<Blob> {
  // We use a simple concatenation approach here;
  // For a real ZIP, install jszip: npm install jszip
  // and replace with JSZip implementation.
  const files: Record<string, string> = {}

  if (rebuild.homepage_html) {
    files['index.html'] = wrapWithFullPage(
      'Homepage',
      rebuild.homepage_html,
      rebuild.homepage_css ?? ''
    )
  }

  if (rebuild.pages) {
    for (const page of rebuild.pages) {
      files[`${page.slug}.html`] = wrapWithFullPage(page.title, page.html, '')
    }
  }

  // Create a simple text manifest
  files['README.txt'] = generateReadme(rebuild)

  // Build a tar-like text bundle (simplified — replace with JSZip in production)
  const content = Object.entries(files)
    .map(([name, content]) => `=== ${name} ===\n${content}\n`)
    .join('\n\n')

  return new Blob([content], { type: 'text/plain' })
}

function wrapWithFullPage(title: string, body: string, css: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  ${css ? `<style>${css}</style>` : ''}
</head>
<body>
${body}
</body>
</html>`
}

function generateReadme(rebuild: Rebuild): string {
  return `OPTIFY — Site Rebuilt
Generated: ${new Date().toLocaleDateString('fr-FR')}
Audit ID: ${rebuild.audit_id}

FILES INCLUDED:
- index.html — Optimized homepage
${rebuild.pages?.map(p => `- ${p.slug}.html — ${p.title}`).join('\n') ?? ''}

HOW TO DEPLOY:
1. Upload files to your web server (FTP, cPanel, etc.)
2. Or use a static host: Netlify, Vercel, GitHub Pages
3. For WordPress: Use the RivallQ dashboard to install automatically

Need help? Contact elieamar2007@gmail.com
`
}
