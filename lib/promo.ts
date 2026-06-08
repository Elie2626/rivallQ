// ── Utilitaire promo partagé (server + client) ──────────────────────────────
// Date de fin : 48h après le lancement du 08 juin 2026 à 09h44 CEST
export const PROMO_END_MS = new Date('2026-06-10T09:44:00+02:00').getTime()

export const isPromoActive = (): boolean => Date.now() < PROMO_END_MS

/** Applique -50% si la promo est active, sinon retourne le prix d'origine */
export const applyPromo = (price: number): number =>
  isPromoActive() ? Math.floor(price / 2) : price
