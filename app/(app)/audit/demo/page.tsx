import type { Metadata } from 'next'
import { AuditResults } from '@/components/app/audit-results'
import { BeforeAfterDemo } from '@/components/app/before-after-demo'
import type { Audit } from '@/types'

export const metadata: Metadata = { title: 'Exemple d\'audit — RivallQ' }

// ── Faux audit complet : renovelec-paris.fr ───────────────────
const DEMO_AUDIT: Audit = {
  id: 'demo',
  user_id: 'demo',
  url: 'https://renovelec-paris.fr',
  status: 'completed',
  payment_status: 'paid',
  payment_intent_id: null,

  seo_score: 31,
  ux_score: 26,
  conversion_score: 19,
  performance_score: 44,
  overall_score: 30,

  scraped_data: {
    title: 'Electricien Paris | Rénovation électrique',
    description: '',
    html: '',
    text: 'Electricien Paris. Nous faisons des travaux électriques. Appelez-nous.',
    links: [],
    images: [],
    headings: [
      { level: 1, text: 'Electricien Paris' },
      { level: 2, text: 'Nos services' },
      { level: 2, text: 'Contact' },
    ],
    meta_tags: {},
    structured_data: [],
    page_speed: {
      load_time_ms: 4800,
      ttfb_ms: 1200,
      fcp_ms: 3100,
      lcp_ms: 5200,
      cls: 0.31,
      total_bytes: 3800000,
    },
    word_count: 87,
    screenshot_url: null,
  },

  seo_analysis: {
    score: 31,
    title_analysis: {
      current: 'Electricien Paris | Rénovation électrique',
      length: 41,
      has_keyword: true,
      suggestions: [
        'Électricien Paris 75 — Dépannage & Rénovation électrique certifié RGE',
        'Électricien agréé Paris : installation, mise aux normes, dépannage rapide',
      ],
      score: 52,
    },
    meta_description_analysis: {
      current: null,
      length: 0,
      missing: true,
      suggestions: [
        'Électricien certifié RGE à Paris. Dépannage en 2h, installation, mise aux normes. Devis gratuit en ligne. ☎ 01 XX XX XX XX.',
        'Artisan électricien à Paris (75) — Interventions rapides 7j/7. Tableau électrique, prises, éclairage, VMC. Devis immédiat.',
      ],
      score: 0,
    },
    headings_analysis: {
      h1_count: 1,
      h2_count: 2,
      h3_count: 0,
      h1_text: 'Electricien Paris',
      issues: [
        'H1 trop court — aucun différenciateur ni localisation précise',
        'Aucun H3 — structure de contenu trop plate',
        'Pas de balisage sémantique pour les services (FAQ, LocalBusiness)',
      ],
      score: 38,
    },
    content_analysis: {
      word_count: 87,
      readability_score: 62,
      keyword_density: { électricien: 0.034, paris: 0.023, rénovation: 0.011 },
      thin_content: true,
      score: 14,
    },
    technical_seo: {
      has_sitemap: false,
      has_robots: false,
      is_https: true,
      canonical_url: null,
      open_graph: false,
      twitter_card: false,
      structured_data_count: 0,
      score: 41,
    },
    backlinks_estimate: 12,
  },

  ux_analysis: {
    score: 26,
    cta_analysis: {
      cta_count: 1,
      primary_cta: 'Contactez-nous',
      cta_visibility_score: 18,
      cta_copy_quality: 22,
      issues: [
        'CTA unique générique — "Contactez-nous" ne crée aucune urgence ni valeur',
        'Bouton en bas de page, invisible sans scroll',
        'Aucun numéro de téléphone visible dans le header',
      ],
      score: 20,
    },
    copywriting_analysis: {
      headline_quality: 24,
      value_proposition_clarity: 15,
      benefit_focus_score: 18,
      emotional_trigger_score: 10,
      urgency_presence: false,
      social_proof_presence: false,
      issues: [
        'Proposition de valeur absente — le visiteur ne comprend pas pourquoi vous choisir',
        'Zéro preuve sociale (avis, notes, logos clients)',
        'Texte orienté "nous" et non "vous" — trop générique',
        'Aucune mention de délais d\'intervention ni de zone couverte',
      ],
      score: 17,
    },
    visual_hierarchy: {
      clarity_score: 34,
      white_space_usage: 28,
      font_consistency: 55,
      color_harmony: 42,
      issues: [
        'Police corps trop petite (12px mobile) — risque auto-zoom iOS',
        'Contraste insuffisant texte/fond sur la section "Nos services"',
        'Images sans width/height — CLS élevé (0.31)',
      ],
      score: 40,
    },
    trust_signals: {
      has_testimonials: false,
      has_certifications: false,
      has_security_badges: false,
      has_contact_info: true,
      has_privacy_policy: false,
      score: 20,
    },
    mobile_friendliness: {
      is_responsive: true,
      touch_targets_ok: false,
      font_size_ok: false,
      viewport_configured: true,
      score: 38,
    },
  },

  keyword_analysis: {
    primary_keywords: [
      { term: 'électricien paris', frequency: 3, density: 0.034, position: 'h1' },
      { term: 'rénovation électrique', frequency: 2, density: 0.023, position: 'title' },
      { term: 'dépannage électrique', frequency: 1, density: 0.011, position: 'body' },
      { term: 'installation électrique', frequency: 1, density: 0.011, position: 'body' },
      { term: 'tableau électrique', frequency: 1, density: 0.011, position: 'body' },
    ],
    secondary_keywords: [
      { term: 'mise aux normes électriques', frequency: 0, density: 0, position: 'body' },
      { term: 'électricien RGE', frequency: 0, density: 0, position: 'body' },
      { term: 'domotique paris', frequency: 0, density: 0, position: 'body' },
    ],
    competitor_keywords: ['électricien certifié RGE', 'dépannage électrique 24h', 'devis électricien gratuit'],
    opportunities: [
      {
        keyword: 'électricien paris 75 pas cher',
        estimated_volume: '1 200/mois',
        difficulty: 'easy',
        recommendation: 'Créer une page dédiée avec tarifs indicatifs — forte intention commerciale',
      },
      {
        keyword: 'dépannage électrique urgent paris',
        estimated_volume: '880/mois',
        difficulty: 'medium',
        recommendation: 'Mettre en avant la réactivité (2h) dans le H1 et une landing page urgences',
      },
      {
        keyword: 'électricien RGE Paris',
        estimated_volume: '590/mois',
        difficulty: 'easy',
        recommendation: 'Afficher le logo RGE en hero — différenciateur fort vs concurrents non certifiés',
      },
      {
        keyword: 'mise aux normes électrique prix',
        estimated_volume: '2 100/mois',
        difficulty: 'medium',
        recommendation: 'Page de contenu avec grille tarifaire — capte les prospects en phase de comparaison',
      },
      {
        keyword: 'tableau électrique remplacement',
        estimated_volume: '760/mois',
        difficulty: 'easy',
        recommendation: 'Page service dédiée avec photos avant/après — très bon taux de conversion',
      },
      {
        keyword: 'installation prise électrique paris',
        estimated_volume: '430/mois',
        difficulty: 'easy',
        recommendation: 'Section FAQ sur les tarifs à la prise — longue traîne à faible concurrence',
      },
    ],
    content_gaps: [
      'Certifications & labels (RGE, Qualifelec)',
      'Zones d\'intervention par arrondissement',
      'Tarifs indicatifs & grille horaire',
      'Garanties & assurance décennale',
      'FAQ : délais, matériaux, normes NFC 15-100',
      'Témoignages clients vérifiés Google',
      'Avant/après photos de chantiers',
    ],
  },

  issues: [
    {
      id: 'i1',
      category: 'seo',
      severity: 'critical',
      title: 'Meta description absente',
      description: 'La balise meta description est manquante sur toutes les pages. Google génère un extrait aléatoire dans les SERP, ce qui réduit drastiquement le taux de clic.',
      impact: 'Corriger cette balise peut augmenter le CTR organique de 30 à 50 % selon les études Google.',
    },
    {
      id: 'i2',
      category: 'conversion',
      severity: 'critical',
      title: 'Aucun numéro de téléphone dans le header',
      description: 'Pour un artisan local, le téléphone est le canal de conversion #1. Il est introuvable sans scroller — la majorité des visiteurs mobiles repartent avant de le trouver.',
      impact: 'Afficher le numéro en sticky header peut multiplier les appels entrants par 2 à 3.',
    },
    {
      id: 'i3',
      category: 'ux',
      severity: 'critical',
      title: 'Zéro preuve sociale',
      description: 'Aucun avis client, aucune note Google, aucun logo de certification (RGE, Qualifelec). Un visiteur qui ne vous connaît pas ne peut pas vous faire confiance.',
      impact: '92 % des consommateurs lisent les avis en ligne avant de contacter un artisan local.',
    },
    {
      id: 'i4',
      category: 'seo',
      severity: 'critical',
      title: 'Contenu insuffisant (87 mots)',
      description: 'La page d\'accueil contient seulement 87 mots. Google considère cela comme du thin content et pénalise le classement. Les concurrents bien positionnés ont en moyenne 650+ mots.',
      impact: 'Atteindre 600 mots minimum avec des mots-clés ciblés peut faire gagner 15 à 25 positions.',
    },
    {
      id: 'i5',
      category: 'performance',
      severity: 'critical',
      title: 'Temps de chargement 4,8 secondes',
      description: 'Le LCP (Largest Contentful Paint) est à 5,2s — très au-dessus du seuil Google de 2,5s. Cela pénalise à la fois le référencement et l\'expérience utilisateur.',
      impact: '53 % des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger (Google).',
    },
    {
      id: 'i6',
      category: 'conversion',
      severity: 'warning',
      title: 'CTA générique sans valeur ajoutée',
      description: '"Contactez-nous" est le CTA le moins performant possible. Il ne communique aucun bénéfice ni urgence.',
      impact: 'Un CTA orienté bénéfice ("Devis gratuit en 5 min") peut augmenter le taux de clic de 30 %.',
    },
    {
      id: 'i7',
      category: 'seo',
      severity: 'warning',
      title: 'Sitemap XML absent',
      description: 'Sans sitemap, Google peut manquer certaines pages du site lors de l\'indexation.',
      impact: 'Un sitemap garantit une indexation complète et rapide de toutes vos pages.',
    },
    {
      id: 'i8',
      category: 'ux',
      severity: 'warning',
      title: 'Taille des cibles tactiles insuffisante',
      description: 'Plusieurs boutons font moins de 44×44px sur mobile — norme Apple/Google. Les clics manqués génèrent de la frustration.',
      impact: 'Corriger les cibles tactiles améliore le taux de conversion mobile de 15 à 20 %.',
    },
    {
      id: 'i9',
      category: 'seo',
      severity: 'warning',
      title: 'Open Graph non configuré',
      description: 'Aucune balise Open Graph — les partages sur les réseaux sociaux et WhatsApp affichent un aperçu vide ou incorrect.',
      impact: 'Les liens avec un aperçu visuel génèrent 3× plus de clics sur les réseaux sociaux.',
    },
    {
      id: 'i10',
      category: 'performance',
      severity: 'info',
      title: 'Images sans dimensions déclarées',
      description: 'Les balises <img> n\'ont pas de width/height. Le navigateur ne peut pas réserver l\'espace — CLS de 0.31 (seuil: 0.10).',
      impact: 'Déclarer les dimensions élimine les sauts de layout qui perturbent la lecture.',
    },
  ],

  recommendations: [
    {
      id: 'r1',
      category: 'conversion',
      priority: 'high',
      title: 'Afficher le téléphone en sticky header',
      description: 'Mettre un numéro cliquable (tel:) dans le header fixe, visible sur toutes les pages et tous les appareils.',
      implementation: 'Ajouter <a href="tel:0XXXXXXXXX"> dans le header avec un icône téléphone. Style: fond rouge, texte blanc, toujours visible.',
      estimated_impact: '+60 à +120 % d\'appels entrants selon les études secteur BTP',
    },
    {
      id: 'r2',
      category: 'seo',
      priority: 'high',
      title: 'Réécrire la meta description sur toutes les pages',
      description: 'Rédiger une meta description unique de 150-160 caractères par page, incluant le mot-clé principal et un appel à l\'action.',
      implementation: 'Exemple : "Électricien certifié RGE à Paris — Dépannage en 2h, installation, mise aux normes. ✓ Devis gratuit ☎ 01 XX XX XX XX"',
      estimated_impact: '+35 à +50 % de CTR organique sur Google',
    },
    {
      id: 'r3',
      category: 'ux',
      priority: 'high',
      title: 'Ajouter une section avis clients Google',
      description: 'Intégrer les 5 meilleurs avis Google (avec note, prénom, date) dans la homepage. Idéalement avec un widget dynamique.',
      implementation: 'Widget Google Reviews ou copie manuelle des avis vérifiés. Placer juste avant le formulaire de contact.',
      estimated_impact: '+45 % de taux de conversion — la preuve sociale est le facteur #1 pour les artisans locaux',
    },
    {
      id: 'r4',
      category: 'seo',
      priority: 'high',
      title: 'Enrichir le contenu à 600+ mots',
      description: 'Développer le contenu de la homepage avec des descriptions de services, zones d\'intervention, FAQ et éléments de réassurance.',
      implementation: 'Structure suggérée : Hero → Services (6 cards) → Zone géographique → Certifications → Avis → FAQ → Contact',
      estimated_impact: '+15 à +25 positions sur les mots-clés principaux',
    },
    {
      id: 'r5',
      category: 'performance',
      priority: 'high',
      title: 'Optimiser le temps de chargement',
      description: 'Compresser les images en WebP, activer le cache navigateur, différer les scripts tiers et minifier CSS/JS.',
      implementation: 'Utiliser un plugin de cache (WP Rocket ou W3 Total Cache), convertir les images avec Squoosh, lazy-loader les images off-screen.',
      estimated_impact: 'LCP < 2,5s → amélioration du classement Google + -40 % de taux de rebond mobile',
    },
    {
      id: 'r6',
      category: 'conversion',
      priority: 'medium',
      title: 'Remplacer le CTA par un formulaire de devis rapide',
      description: 'Proposer un mini-formulaire 3 champs (type de travaux, code postal, téléphone) dans le hero pour capter les leads sans friction.',
      implementation: 'Formulaire inline dans le hero. Bouton : "Obtenir mon devis gratuit — 2 min". Intégration email ou CRM via Zapier.',
      estimated_impact: '+40 % de leads qualifiés vs simple bouton de contact',
    },
    {
      id: 'r7',
      category: 'seo',
      priority: 'medium',
      title: 'Créer un schéma LocalBusiness + FAQ',
      description: 'Ajouter des données structurées JSON-LD pour apparaître dans le Knowledge Panel Google et les résultats enrichis (FAQ).',
      implementation: 'Schema.org/LocalBusiness avec name, address, phone, openingHours, priceRange, aggregateRating. Schema FAQPage pour la section FAQ.',
      estimated_impact: 'Apparition dans le Knowledge Panel + rich snippets FAQ → +25 % de visibilité SERP',
    },
    {
      id: 'r8',
      category: 'ux',
      priority: 'medium',
      title: 'Afficher les certifications et logos de confiance',
      description: 'Section "Certifications" avec logos RGE, Qualifelec, assurance décennale, SIRET affiché — éléments de réassurance essentiels.',
      implementation: 'Bandeau horizontal en-dessous du hero avec les logos en niveaux de gris. Lien vers les certificats officiels.',
      estimated_impact: '+30 % de taux de confiance — décisif pour les travaux > 2 000€',
    },
    {
      id: 'r9',
      category: 'performance',
      priority: 'low',
      title: 'Configurer le sitemap XML et robots.txt',
      description: 'Générer un sitemap.xml et soumettre à Google Search Console. Configurer robots.txt pour guider l\'indexation.',
      implementation: 'Plugin Yoast SEO ou Rank Math si WordPress. Pour site custom : générer avec sitemap-generator-js.',
      estimated_impact: 'Indexation complète et plus rapide — essentiel pour les nouvelles pages',
    },
    {
      id: 'r10',
      category: 'ux',
      priority: 'low',
      title: 'Implémenter les balises Open Graph et Twitter Card',
      description: 'Configurer les meta og:title, og:description, og:image pour que les partages sur Facebook, WhatsApp et LinkedIn affichent un aperçu visuel.',
      implementation: 'Ajouter les balises dans le <head> avec une image dédiée 1200×630px. Tester avec le Facebook Sharing Debugger.',
      estimated_impact: '3× plus de clics sur les partages sociaux — canal d\'acquisition souvent négligé',
    },
  ],

  rebuild_id: null,
  rebuild_status: null,
  rebuild_payment_status: null,
  rebuild_payment_intent_id: null,
  error_message: null,
  created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
}

export default function AuditDemoPage() {
  return (
    <div>
      {/* Bandeau démo */}
      <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-amber-400 text-lg">👁️</span>
          <div>
            <p className="text-sm font-semibold text-amber-300">Exemple de résultat — données fictives</p>
            <p className="text-xs text-zinc-500">Voici exactement ce que vous obtiendrez après votre audit. Site analysé : renovelec-paris.fr</p>
          </div>
        </div>
        <a
          href="/audit/new"
          className="shrink-0 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap"
        >
          Analyser mon site →
        </a>
      </div>

      <AuditResults audit={DEMO_AUDIT} />

      {/* ── Avant / Après ───────────────────────────────────── */}
      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <p className="text-sm font-semibold text-zinc-100">Site avant → après reconstruction IA</p>
            <p className="text-xs text-zinc-500 mt-0.5">Rendu complet de la homepage optimisée, prête à déployer</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">Avant</span>
            <span className="text-zinc-600">→</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Après IA</span>
          </div>
        </div>
        <div className="p-6">
          <BeforeAfterDemo />
        </div>
      </div>
    </div>
  )
}
