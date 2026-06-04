// =============================================
// OPTIFY — Global Types
// =============================================

export type PlanTier = 'audit' | 'rebuild' | 'installation' | 'subscription'

// ── Devis ────────────────────────────────────
export interface Devis {
  id: string
  name: string
  email: string
  phone?: string
  message?: string
  siteType: 'simple' | 'complet' | 'premium'
  pages: string
  features: string[]
  maintenance: boolean
  delay: string
  estimatedPrice: number
  read: boolean
  createdAt: string
  payment_status?: 'pending' | 'paid' | 'failed'
  paid_at?: string
}

export type AuditStatus =
  | 'pending'
  | 'scraping'
  | 'analyzing'
  | 'completed'
  | 'failed'

export type RebuildStatus =
  | 'pending'
  | 'generating'
  | 'completed'
  | 'failed'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

// ── User & Auth ──────────────────────────────
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  plan: PlanTier | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  subscription_status: string | null
  subscription_end_date: string | null
  created_at: string
  updated_at: string
}

// ── Audit ────────────────────────────────────
export interface Audit {
  id: string
  user_id: string
  url: string
  status: AuditStatus
  payment_status: PaymentStatus
  payment_intent_id: string | null

  // Scores
  seo_score: number | null
  ux_score: number | null
  conversion_score: number | null
  performance_score: number | null
  overall_score: number | null

  // Raw data
  scraped_data: ScrapedData | null
  seo_analysis: SEOAnalysis | null
  ux_analysis: UXAnalysis | null
  keyword_analysis: KeywordAnalysis | null
  issues: Issue[] | null
  recommendations: Recommendation[] | null

  // Rebuild
  rebuild_id: string | null
  rebuild_status: RebuildStatus | null
  rebuild_payment_status: PaymentStatus | null
  rebuild_payment_intent_id: string | null

  error_message: string | null

  created_at: string
  updated_at: string
}

// ── Scraped Data ─────────────────────────────
export interface ScrapedData {
  title: string
  description: string
  html: string
  text: string
  links: string[]
  images: ScrapedImage[]
  headings: { level: number; text: string }[]
  meta_tags: Record<string, string>
  structured_data: unknown[]
  page_speed: PageSpeedData
  word_count: number
  screenshot_url: string | null
}

export interface ScrapedImage {
  src: string
  alt: string | null
  width: number | null
  height: number | null
}

export interface PageSpeedData {
  load_time_ms: number
  ttfb_ms: number
  fcp_ms: number | null
  lcp_ms: number | null
  cls: number | null
  total_bytes: number
}

// ── SEO Analysis ─────────────────────────────
export interface SEOAnalysis {
  score: number
  title_analysis: TitleAnalysis
  meta_description_analysis: MetaDescriptionAnalysis
  headings_analysis: HeadingsAnalysis
  content_analysis: ContentAnalysis
  technical_seo: TechnicalSEO
  backlinks_estimate: number | null
}

export interface TitleAnalysis {
  current: string
  length: number
  has_keyword: boolean
  suggestions: string[]
  score: number
}

export interface MetaDescriptionAnalysis {
  current: string | null
  length: number
  missing: boolean
  suggestions: string[]
  score: number
}

export interface HeadingsAnalysis {
  h1_count: number
  h2_count: number
  h3_count: number
  h1_text: string | null
  issues: string[]
  score: number
}

export interface ContentAnalysis {
  word_count: number
  readability_score: number
  keyword_density: Record<string, number>
  thin_content: boolean
  score: number
}

export interface TechnicalSEO {
  has_sitemap: boolean | null
  has_robots: boolean | null
  is_https: boolean
  canonical_url: string | null
  open_graph: boolean
  twitter_card: boolean
  structured_data_count: number
  score: number
}

// ── UX Analysis ──────────────────────────────
export interface UXAnalysis {
  score: number
  cta_analysis: CTAAnalysis
  copywriting_analysis: CopywritingAnalysis
  visual_hierarchy: VisualHierarchyAnalysis
  trust_signals: TrustSignalAnalysis
  mobile_friendliness: MobileFriendlinessAnalysis
}

export interface CTAAnalysis {
  cta_count: number
  primary_cta: string | null
  cta_visibility_score: number
  cta_copy_quality: number
  issues: string[]
  score: number
}

export interface CopywritingAnalysis {
  headline_quality: number
  value_proposition_clarity: number
  benefit_focus_score: number
  emotional_trigger_score: number
  urgency_presence: boolean
  social_proof_presence: boolean
  issues: string[]
  score: number
}

export interface VisualHierarchyAnalysis {
  clarity_score: number
  white_space_usage: number
  font_consistency: number
  color_harmony: number
  issues: string[]
  score: number
}

export interface TrustSignalAnalysis {
  has_testimonials: boolean
  has_certifications: boolean
  has_security_badges: boolean
  has_contact_info: boolean
  has_privacy_policy: boolean
  score: number
}

export interface MobileFriendlinessAnalysis {
  is_responsive: boolean
  touch_targets_ok: boolean
  font_size_ok: boolean
  viewport_configured: boolean
  score: number
}

// ── Keyword Analysis ─────────────────────────
export interface KeywordAnalysis {
  primary_keywords: Keyword[]
  secondary_keywords: Keyword[]
  competitor_keywords: string[]
  opportunities: KeywordOpportunity[]
  content_gaps: string[]
}

export interface Keyword {
  term: string
  frequency: number
  density: number
  position: 'title' | 'h1' | 'h2' | 'body' | 'meta'
}

export interface KeywordOpportunity {
  keyword: string
  estimated_volume: string
  difficulty: 'easy' | 'medium' | 'hard'
  recommendation: string
}

// ── Issues & Recommendations ─────────────────
export interface Issue {
  id: string
  category: 'seo' | 'ux' | 'conversion' | 'performance' | 'copywriting'
  severity: 'critical' | 'warning' | 'info'
  title: string
  description: string
  impact: string
}

export interface Recommendation {
  id: string
  category: 'seo' | 'ux' | 'conversion' | 'performance' | 'copywriting'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  implementation: string
  estimated_impact: string
}

// ── Rebuild ──────────────────────────────────
export interface Rebuild {
  id: string
  audit_id: string
  user_id: string
  status: RebuildStatus
  payment_status: PaymentStatus

  // Generated content
  homepage_html: string | null
  homepage_css: string | null
  meta_title: string | null
  meta_description: string | null
  pages: RebuildPage[] | null
  export_zip_url: string | null

  // Error tracking
  error_message: string | null

  // WP
  wp_install_status: 'pending' | 'in_progress' | 'completed' | 'failed' | null
  wp_credentials_provided: boolean

  created_at: string
  updated_at: string
}

export interface RebuildPage {
  slug: string
  title: string
  html: string
  meta_title: string
  meta_description: string
}

// ── Pricing ──────────────────────────────────
export interface PricingPlan {
  id: PlanTier
  name: string
  price: number
  currency: string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
}

// ── API Responses ────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface AuditStartResponse {
  audit_id: string
  checkout_url: string
}

export interface CheckoutResponse {
  url: string
}
