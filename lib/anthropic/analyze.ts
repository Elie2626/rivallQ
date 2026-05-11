import { getAnthropicClient, MODEL, MAX_TOKENS } from './client'
import type {
  ScrapedData,
  SEOAnalysis,
  UXAnalysis,
  KeywordAnalysis,
  Issue,
  Recommendation,
} from '@/types'

/** Strip markdown code fences if Claude wraps the JSON */
function extractJson(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fenced) return fenced[1].trim()
  const start = raw.search(/[{[]/)
  const end = Math.max(raw.lastIndexOf('}'), raw.lastIndexOf(']'))
  if (start !== -1 && end !== -1) return raw.slice(start, end + 1)
  return raw.trim()
}

// ── SEO Analysis ─────────────────────────────
export async function analyzeSEO(scraped: ScrapedData): Promise<SEOAnalysis> {
  const prompt = `Tu es un expert SEO. Analyse les données du site web ci-dessous et retourne une analyse SEO détaillée en JSON valide uniquement — pas de markdown, pas d'explication, juste l'objet JSON.

IMPORTANT : Tous les textes (suggestions, issues, descriptions) doivent être rédigés en FRANÇAIS.

DONNÉES DU SITE :
- Titre : ${scraped.title}
- Meta description : ${scraped.description}
- Nombre de mots : ${scraped.word_count}
- Titres : ${JSON.stringify(scraped.headings.slice(0, 20))}
- Meta tags : ${JSON.stringify(scraped.meta_tags)}
- Données structurées : ${scraped.structured_data.length}
- Images sans alt : ${scraped.images.filter(i => !i.alt).length}
- Total images : ${scraped.images.length}
- Contenu (2000 premiers caractères) : ${scraped.text.slice(0, 2000)}

Retourne EXACTEMENT cette structure JSON (tous les textes en français) :
{
  "score": <nombre 0-100>,
  "title_analysis": {
    "current": "<texte du titre>",
    "length": <nombre>,
    "has_keyword": <boolean>,
    "suggestions": ["<suggestion en français>", "<suggestion en français>"],
    "score": <nombre 0-100>
  },
  "meta_description_analysis": {
    "current": "<meta description ou null>",
    "length": <nombre>,
    "missing": <boolean>,
    "suggestions": ["<suggestion en français>"],
    "score": <nombre 0-100>
  },
  "headings_analysis": {
    "h1_count": <nombre>,
    "h2_count": <nombre>,
    "h3_count": <nombre>,
    "h1_text": "<texte h1 ou null>",
    "issues": ["<problème en français>"],
    "score": <nombre 0-100>
  },
  "content_analysis": {
    "word_count": <nombre>,
    "readability_score": <nombre 0-100>,
    "keyword_density": {"<mot-clé>": <pourcentage>},
    "thin_content": <boolean>,
    "score": <nombre 0-100>
  },
  "technical_seo": {
    "has_sitemap": null,
    "has_robots": null,
    "is_https": <boolean>,
    "canonical_url": "<url ou null>",
    "open_graph": <boolean>,
    "twitter_card": <boolean>,
    "structured_data_count": <nombre>,
    "score": <nombre 0-100>
  },
  "backlinks_estimate": null
}`

  const message = await getAnthropicClient().messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  return JSON.parse(extractJson(text)) as SEOAnalysis
}

// ── UX Analysis ──────────────────────────────
export async function analyzeUX(scraped: ScrapedData): Promise<UXAnalysis> {
  const prompt = `Tu es un expert UX et optimisation du taux de conversion. Analyse le contenu du site ci-dessous et retourne une analyse UX détaillée en JSON valide uniquement.

IMPORTANT : Tous les textes (issues, descriptions, recommandations) doivent être rédigés en FRANÇAIS.

CONTENU :
- Titre : ${scraped.title}
- Texte complet (3000 premiers caractères) : ${scraped.text.slice(0, 3000)}
- Titres : ${JSON.stringify(scraped.headings.slice(0, 15))}
- Liens (20 premiers) : ${JSON.stringify(scraped.links.slice(0, 20))}
- Images : ${scraped.images.length} au total, ${scraped.images.filter(i => !i.alt).length} sans alt

Retourne EXACTEMENT cette structure JSON (tous les textes en français) :
{
  "score": <nombre 0-100>,
  "cta_analysis": {
    "cta_count": <nombre>,
    "primary_cta": "<texte du CTA principal ou null>",
    "cta_visibility_score": <nombre 0-100>,
    "cta_copy_quality": <nombre 0-100>,
    "issues": ["<problème en français>"],
    "score": <nombre 0-100>
  },
  "copywriting_analysis": {
    "headline_quality": <nombre 0-100>,
    "value_proposition_clarity": <nombre 0-100>,
    "benefit_focus_score": <nombre 0-100>,
    "emotional_trigger_score": <nombre 0-100>,
    "urgency_presence": <boolean>,
    "social_proof_presence": <boolean>,
    "issues": ["<problème en français>"],
    "score": <nombre 0-100>
  },
  "visual_hierarchy": {
    "clarity_score": <nombre 0-100>,
    "white_space_usage": <nombre 0-100>,
    "font_consistency": <nombre 0-100>,
    "color_harmony": <nombre 0-100>,
    "issues": ["<problème en français>"],
    "score": <nombre 0-100>
  },
  "trust_signals": {
    "has_testimonials": <boolean>,
    "has_certifications": <boolean>,
    "has_security_badges": <boolean>,
    "has_contact_info": <boolean>,
    "has_privacy_policy": <boolean>,
    "score": <nombre 0-100>
  },
  "mobile_friendliness": {
    "is_responsive": <boolean>,
    "touch_targets_ok": <boolean>,
    "font_size_ok": <boolean>,
    "viewport_configured": <boolean>,
    "score": <nombre 0-100>
  }
}`

  const message = await getAnthropicClient().messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  return JSON.parse(extractJson(text)) as UXAnalysis
}

// ── Keyword Analysis ─────────────────────────
export async function analyzeKeywords(scraped: ScrapedData): Promise<KeywordAnalysis> {
  const prompt = `Tu es un expert en recherche de mots-clés SEO. Analyse le site ci-dessous et retourne une analyse des mots-clés en JSON valide uniquement.

IMPORTANT : Tous les textes (recommandations, lacunes de contenu, mots-clés concurrents) doivent être rédigés en FRANÇAIS.

CONTENU DU SITE :
- Titre : ${scraped.title}
- Description : ${scraped.description}
- Titres : ${JSON.stringify(scraped.headings.slice(0, 15))}
- Texte (2500 premiers caractères) : ${scraped.text.slice(0, 2500)}

Retourne EXACTEMENT ce JSON (tous les textes en français) :
{
  "primary_keywords": [
    {"term": "<mot-clé>", "frequency": <nombre>, "density": <pourcentage>, "position": "title|h1|h2|body|meta"}
  ],
  "secondary_keywords": [
    {"term": "<mot-clé>", "frequency": <nombre>, "density": <pourcentage>, "position": "body"}
  ],
  "competitor_keywords": ["<mot-clé>", "<mot-clé>"],
  "opportunities": [
    {
      "keyword": "<mot-clé>",
      "estimated_volume": "low|medium|high",
      "difficulty": "easy|medium|hard",
      "recommendation": "<comment utiliser ce mot-clé, en français>"
    }
  ],
  "content_gaps": ["<sujet manquant en français>", "<sujet manquant en français>"]
}`

  const message = await getAnthropicClient().messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  return JSON.parse(extractJson(text)) as KeywordAnalysis
}

// ── Issues & Recommendations ─────────────────
export async function generateIssuesAndRecommendations(
  seoAnalysis: SEOAnalysis,
  uxAnalysis: UXAnalysis,
  keywordAnalysis: KeywordAnalysis,
  url: string
): Promise<{ issues: Issue[]; recommendations: Recommendation[] }> {
  const prompt = `Tu es un expert en optimisation de la conversion et SEO. Sur la base de l'analyse ci-dessous, génère des problèmes et recommandations actionnables. Retourne du JSON valide uniquement.

IMPORTANT : Tous les textes (titres, descriptions, impacts, implémentations) doivent être rédigés en FRANÇAIS.

URL : ${url}

SCORE SEO : ${seoAnalysis.score}/100
SCORE UX : ${uxAnalysis.score}/100
PROBLÈMES SEO : ${JSON.stringify(seoAnalysis.headings_analysis.issues)} ${JSON.stringify(seoAnalysis.meta_description_analysis.suggestions?.slice(0,2))}
PROBLÈMES UX : ${JSON.stringify(uxAnalysis.copywriting_analysis.issues)} ${JSON.stringify(uxAnalysis.cta_analysis.issues)}
OPPORTUNITÉS MOTS-CLÉS : ${JSON.stringify(keywordAnalysis.opportunities.slice(0, 5))}

Retourne EXACTEMENT ce JSON (6 à 10 problèmes et 6 à 10 recommandations, tous en français) :
{
  "issues": [
    {
      "id": "issue_1",
      "category": "seo|ux|conversion|performance|copywriting",
      "severity": "critical|warning|info",
      "title": "<titre court en français>",
      "description": "<description détaillée en français>",
      "impact": "<impact business en français>"
    }
  ],
  "recommendations": [
    {
      "id": "rec_1",
      "category": "seo|ux|conversion|performance|copywriting",
      "priority": "high|medium|low",
      "title": "<titre court en français>",
      "description": "<que faire, en français>",
      "implementation": "<comment implémenter, en français>",
      "estimated_impact": "<résultat attendu en français>"
    }
  ]
}`

  const message = await getAnthropicClient().messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: 'user', content: prompt }],
  })

  const text = (message.content[0] as { type: string; text: string }).text
  return JSON.parse(extractJson(text)) as { issues: Issue[]; recommendations: Recommendation[] }
}

// ── Score calculation ─────────────────────────
export function calculateOverallScore(
  seoScore: number,
  uxScore: number,
  conversionScore: number,
  performanceScore: number
): number {
  return Math.round(
    seoScore * 0.35 +
    uxScore * 0.25 +
    conversionScore * 0.25 +
    performanceScore * 0.15
  )
}
