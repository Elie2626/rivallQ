import { getAnthropicClient, MODEL } from './client'
import type {
  ScrapedData,
  SEOAnalysis,
  UXAnalysis,
  KeywordAnalysis,
  Issue,
  Recommendation,
  RebuildPage,
} from '@/types'

interface RebuildInput {
  url: string
  scraped: ScrapedData
  seoAnalysis: SEOAnalysis
  uxAnalysis: UXAnalysis
  keywordAnalysis: KeywordAnalysis
  issues: Issue[]
  recommendations: Recommendation[]
}

// ── Apply audit recommendations to the existing homepage ─────────
// IMPORTANT: This does NOT rewrite the site — it applies targeted fixes
// while preserving all existing pages, images, and structure.
export async function generateOptimizedHomepage(input: RebuildInput): Promise<{
  html: string
  css: string
  meta_title: string
  meta_description: string
}> {
  const topKeywords = input.keywordAnalysis.primary_keywords
    .slice(0, 5)
    .map(k => k.term)
    .join(', ')

  const criticalIssues = input.issues.filter(i => i.severity === 'critical')
  const highRecs = input.recommendations.filter(r => r.priority === 'high')
  const mediumRecs = input.recommendations.filter(r => r.priority === 'medium')

  // Collect existing image URLs so Claude knows to preserve them
  const existingImageUrls = input.scraped.images
    .filter(img => img.src && img.src.startsWith('http'))
    .map(img => `${img.src}${img.alt ? ` (alt: "${img.alt}")` : ''}`)
    .join('\n')

  // Existing heading structure for reference
  const existingHeadings = input.scraped.headings
    .map(h => `${'#'.repeat(h.level)} ${h.text}`)
    .join('\n')

  // Current SEO state
  const currentTitle = input.seoAnalysis.title_analysis.current
  const currentMeta = input.seoAnalysis.meta_description_analysis.current ?? 'Manquante'
  const titleSuggestion = input.seoAnalysis.title_analysis.suggestions[0] ?? currentTitle
  const metaSuggestion = input.seoAnalysis.meta_description_analysis.suggestions[0] ?? currentMeta

  const prompt = `Tu es un expert développeur web, SEO et UX. Tu dois améliorer la page d'accueil d'un site en appliquant uniquement les recommandations d'audit identifiées, SANS réécrire ou restructurer complètement le site.

## RÈGLES ABSOLUES
1. **Conserve toutes les images** avec leurs URLs exactes — ne modifie JAMAIS une URL d'image
2. **Conserve la structure globale** de la page — header, sections, footer dans le même ordre
3. **Conserve le contenu textuel existant** — améliore-le seulement si explicitement recommandé
4. **N'utilise JAMAIS d'emojis** dans l'interface
5. **Respecte la langue** du site original dans tous les textes

## SITE ANALYSÉ
URL : ${input.url}
Titre actuel : ${currentTitle}
Meta description actuelle : ${currentMeta}

## TITRE SUGGÉRÉ (mots-clés cibles : ${topKeywords})
${titleSuggestion}

## META DESCRIPTION SUGGÉRÉE
${metaSuggestion}

## STRUCTURE EXISTANTE DES TITRES
${existingHeadings || 'Non disponible'}

## IMAGES À CONSERVER ABSOLUMENT
${existingImageUrls || 'Aucune image détectée'}

## HTML ORIGINAL DE LA PAGE D'ACCUEIL
\`\`\`html
${input.scraped.html.slice(0, 14000)}
\`\`\`

## PROBLÈMES CRITIQUES À CORRIGER EN PRIORITÉ
${criticalIssues.length > 0
    ? criticalIssues.map(i => `- **[${i.category.toUpperCase()}]** ${i.title}\n  → ${i.description}\n  → Impact : ${i.impact}`).join('\n')
    : 'Aucun problème critique'}

## RECOMMANDATIONS HAUTE PRIORITÉ
${highRecs.length > 0
    ? highRecs.map(r => `- **[${r.category.toUpperCase()}]** ${r.title}\n  → ${r.implementation}\n  → Impact estimé : ${r.estimated_impact}`).join('\n')
    : 'Aucune'}

## RECOMMANDATIONS PRIORITÉ MOYENNE
${mediumRecs.slice(0, 5).length > 0
    ? mediumRecs.slice(0, 5).map(r => `- **[${r.category.toUpperCase()}]** ${r.title}\n  → ${r.implementation}`).join('\n')
    : 'Aucune'}

## ANALYSE SEO
- Score : ${input.seoAnalysis.score}/100
- H1 : ${input.seoAnalysis.headings_analysis.h1_text ?? 'Manquant'}
- Nombre de mots : ${input.scraped.word_count}
- Balise title : ${input.seoAnalysis.title_analysis.length} caractères (idéal : 50-60)
- Meta description : ${input.seoAnalysis.meta_description_analysis.missing ? 'MANQUANTE' : `${input.seoAnalysis.meta_description_analysis.length} caractères`}
- Open Graph : ${input.seoAnalysis.technical_seo.open_graph ? 'Présent' : 'Absent'}

## ANALYSE UX
- Score : ${input.uxAnalysis.score}/100
- CTAs détectés : ${input.uxAnalysis.cta_analysis.cta_count}
- CTA principal : ${input.uxAnalysis.cta_analysis.primary_cta ?? 'Non détecté'}
- Témoignages : ${input.uxAnalysis.trust_signals.has_testimonials ? 'Présents' : 'Absents'}
- Mobile-friendly : ${input.uxAnalysis.mobile_friendliness.is_responsive ? 'Oui' : 'NON — à corriger'}

## INSTRUCTIONS DE MODIFICATION
Applique les corrections suivantes sur l'HTML original :

1. **Balises <head>** : Mets à jour <title>, <meta name="description">, ajoute Open Graph si absent
2. **Hiérarchie des titres** : Corrige si plusieurs h1, ou h1 manquant — utilise le mot-clé principal dans le h1
3. **Attributs alt** : Ajoute des descriptions pertinentes aux images sans alt (garde les URLs exactes)
4. **CTAs** : Améliore la visibilité et le texte des boutons d'appel à l'action si recommandé
5. **Témoignages** : Si absents ET recommandés, ajoute une section témoignages sobre (3 cartes) après les fonctionnalités
6. **Mobile** : Ajoute les classes responsives manquantes si le site n'est pas responsive
7. **Vitesse** : Ajoute loading="lazy" sur les images sous la ligne de flottaison
8. **Structured data** : Ajoute un JSON-LD minimal (LocalBusiness ou Organization) si absent

Pour les composants UI à ajouter (témoignages, badges de confiance, etc.) :
- Utilise Tailwind CSS avec un design moderne et épuré
- Couleurs cohérentes avec le style existant du site
- Cartes avec ombre légère, coins arrondis, icônes SVG (pas d'emojis)
- Typographie claire, hiérarchie visuelle forte

Retourne UNIQUEMENT du JSON valide sans balises markdown :
{
  "meta_title": "<titre SEO optimisé, 50-60 caractères, dans la langue du site>",
  "meta_description": "<description SEO, 150-160 caractères, dans la langue du site>",
  "html": "<HTML COMPLET de la page — même structure que l'original, avec toutes les corrections appliquées et toutes les images conservées>",
  "css": "<CSS additionnel minimal si besoin de styles personnalisés — vide si tout est en Tailwind>"
}`

  const message = await getAnthropicClient().messages.create({
    model: MODEL,
    max_tokens: 16000,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text

  // Strip markdown fences then extract JSON
  const clean = text.replace(/```(?:json)?\s*/g, '').replace(/```/g, '')
  const jsonMatch = clean.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('Failed to parse rebuild response — no JSON found')
  return JSON.parse(jsonMatch[0])
}

// ── Generate improvement summaries for existing pages ─────────────
// Instead of rewriting pages from scratch, we identify what needs
// to be fixed on each page based on the audit.
export async function generateAdditionalPages(
  input: RebuildInput,
  pageTypes: string[]
): Promise<RebuildPage[]> {
  // Detect which pages actually exist on the site from the scraped links
  const siteLinks = input.scraped.links.filter(link => {
    try {
      const u = new URL(link)
      const base = new URL(input.url)
      return u.hostname === base.hostname && u.pathname !== '/' && u.pathname !== ''
    } catch {
      return false
    }
  })

  // Map discovered links to page types
  const detectedPages = siteLinks.slice(0, 6).map(link => {
    try {
      return new URL(link).pathname.replace(/^\//, '').split('/')[0]
    } catch {
      return null
    }
  }).filter(Boolean) as string[]

  // Use detected pages or fall back to standard page types
  const pagesToProcess = detectedPages.length > 0 ? detectedPages : pageTypes

  const pages: RebuildPage[] = []

  for (const pageSlug of pagesToProcess.slice(0, 4)) {
    const pageUrl = `${input.url.replace(/\/$/, '')}/${pageSlug}`

    const prompt = `Tu es un expert SEO et UX. Le site "${input.url}" a une page "${pageSlug}" à l'URL ${pageUrl}.

Contexte du site :
- Titre : ${input.scraped.title}
- Description : ${input.scraped.description}
- Mots-clés principaux : ${input.keywordAnalysis.primary_keywords.slice(0, 3).map(k => k.term).join(', ')}
- Score SEO global : ${input.seoAnalysis.score}/100

Basé sur l'audit du site, génère un plan d'action SEO/UX pour améliorer cette page spécifique.
Crée un contenu HTML optimisé pour cette page qui :
1. Garde la même identité visuelle que la homepage (Tailwind CSS, même palette de couleurs si détectable)
2. Intègre les mots-clés dans les titres et le contenu de manière naturelle
3. A un CTA clair et visible
4. Est mobile-first et accessible
5. N'utilise PAS d'emojis

Retourne UNIQUEMENT du JSON valide sans markdown :
{
  "slug": "${pageSlug}",
  "title": "<titre de la page dans la langue du site>",
  "meta_title": "<meta titre SEO, 50-60 caractères>",
  "meta_description": "<meta description SEO, 150-160 caractères>",
  "html": "<contenu HTML complet de la page avec classes Tailwind>"
}`

    try {
      const message = await getAnthropicClient().messages.create({
        model: MODEL,
        max_tokens: 8192,
        messages: [{ role: 'user', content: prompt }],
      })

      const text = (message.content[0] as { type: string; text: string }).text
      const clean = text.replace(/```(?:json)?\s*/g, '').replace(/```/g, '')
      const jsonMatch = clean.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        pages.push(JSON.parse(jsonMatch[0]) as RebuildPage)
      }
    } catch {
      // Non-fatal — skip this page
    }
  }

  return pages
}
