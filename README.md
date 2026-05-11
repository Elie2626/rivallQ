# Optify — SaaS Audit SEO & Reconstruction IA

Auditez, optimisez et reconstruisez votre site web en 60 secondes avec l'IA.

## Stack technique

| Layer | Technologie |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database / Auth | Supabase |
| AI | Claude API (Anthropic) |
| Scraping | Firecrawl API |
| Paiements | Stripe Checkout + Webhooks |
| Animations | Framer Motion |
| Hosting | Vercel-ready |

## Installation

### 1. Variables d'environnement

Remplir `.env.local` avec toutes les clés :

```env
ANTHROPIC_API_KEY=sk-ant-...
FIRECRAWL_API_KEY=fc-...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_PRICE_AUDIT=price_...
STRIPE_PRICE_REBUILD=price_...
STRIPE_PRICE_INSTALLATION=price_...
STRIPE_PRICE_SUBSCRIPTION=price_...
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_APP_URL=https://optify.io
ANALYZE_SECRET=votre-secret-interne-fort
```

### 2. Base de données Supabase

Exécuter `supabase/schema.sql` dans le SQL Editor de Supabase.

### 3. Stripe — 4 produits à créer

| Produit | Prix | Type |
|---|---|---|
| Audit SEO | 4,99€ | One-time |
| Site Optimisé | 79€ | One-time |
| Installation WP | 299€ | One-time |
| Pro Mensuel | 29€/mois | Récurrent |

### 4. Stripe Webhook (dev)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 5. Lancer

```bash
npm run dev
```

## Architecture

```
app/
├── (auth)/     # Login, Register, Reset
├── (public)/   # Home, Features, Pricing, FAQ, Contact
├── (app)/      # Dashboard, Audit, Rebuild, Billing
├── (admin)/    # Admin dashboard
└── api/        # audit, analyze, rebuild, stripe, webhooks, export
```

## Rendre admin un utilisateur

```sql
UPDATE profiles SET is_admin = true WHERE email = 'vous@email.com';
```

## Déployer sur Vercel

```bash
vercel --prod
```

---
Fabriqué avec Claude AI.
