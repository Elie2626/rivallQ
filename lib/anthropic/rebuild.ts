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

// ── Generate optimized homepage HTML ─────────
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

  const prompt = `Tu es un expert développeur web et copywriter spécialisé en conversion. Redesigne et réécris entièrement la homepage de ce site pour l'optimiser au maximum en SEO, UX et conversion.

IMPORTANT : Tout le contenu textuel (titres, descriptions, CTAs, textes, meta) doit être rédigé en FRANÇAIS.

SITE ORIGINAL : ${input.url}
TITRE ORIGINAL : ${input.scraped.title}
CONTENU ORIGINAL (3000 premiers caractères) : ${input.scraped.text.slice(0, 3000)}
MOTS-CLÉS CIBLES : ${topKeywords}
PROBLÈMES CRITIQUES À CORRIGER : ${input.issues.filter(i => i.severity === 'critical').map(i => i.title).join(', ')}
RECOMMANDATIONS PRIORITAIRES : ${input.recommendations.filter(r => r.priority === 'high').map(r => r.title).join(', ')}

Crée une homepage COMPLÈTE et prête pour la production avec :
1. Design moderne et professionnel (standards 2026)
2. Proposition de valeur forte au-dessus de la ligne de flottaison
3. CTA principal clair
4. Section de preuves sociales (témoignages, avis, logos clients)
5. Section fonctionnalités / bénéfices
6. Section FAQ
7. Second CTA
8. Footer complet

Retourne UNIQUEMENT du JSON valide (sans markdown) avec cette structure exacte :
{
  "meta_title": "<titre optimisé SEO, moins de 60 caractères, en français>",
  "meta_description": "<description optimisée SEO, 150-160 caractères, en français>",
  "html": "<HTML5 sémantique COMPLET pour la homepage — utilise des classes Tailwind CSS>",
  "css": "<CSS personnalisé minimal au-delà de Tailwind>"
}

CONTRAINTES TECHNIQUES :
- Utilise les classes Tailwind CSS partout (Tailwind sera disponible sur le site)
- HTML complet — du <header> au <footer>
- Copywriting convaincant qui améliore l'original, entièrement en français
- Hiérarchie des titres correcte (h1, h2, h3)
- Labels aria et textes alt appropriés
- Design mobile-first`

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

// ── Generate additional pages ─────────────────
export async function generateAdditionalPages(
  input: RebuildInput,
  pageTypes: string[]
): Promise<RebuildPage[]> {
  const pages: RebuildPage[] = []

  for (const pageType of pageTypes) {
    const prompt = `Tu es un expert développeur web et copywriter. Crée une page "${pageType}" optimisée pour ce site.

IMPORTANT : Tout le contenu textuel doit être rédigé en FRANÇAIS.

SITE : ${input.url}
CONTEXTE : ${input.scraped.title} — ${input.scraped.description}
MOTS-CLÉS PRINCIPAUX : ${input.keywordAnalysis.primary_keywords.slice(0, 3).map(k => k.term).join(', ')}

Crée une page "${pageType}" complète et optimisée SEO, entièrement en français. Retourne UNIQUEMENT du JSON valide :
{
  "slug": "${pageType.toLowerCase().replace(/\s+/g, '-')}",
  "title": "<titre de la page en français>",
  "meta_title": "<meta titre SEO en français>",
  "meta_description": "<meta description SEO en français>",
  "html": "<contenu HTML complet avec classes Tailwind, textes en français>"
}`

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
  }

  return pages
}
