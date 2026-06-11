'use client'

import { useState, useEffect, memo } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowLeftRight, Monitor, Smartphone, ExternalLink, Globe, ChevronRight } from 'lucide-react'

// ── Shared CSS (design system commun à toutes les pages "après") ─────
const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --blue:#3b82f6;--blue-dark:#1d4ed8;--blue-glow:rgba(59,130,246,.18);
    --green:#22c55e;--green-bg:rgba(34,197,94,.12);--green-border:rgba(34,197,94,.25);
    --bg:#08090c;--bg2:#0d0f14;--card:#111318;--card2:#161922;
    --border:rgba(255,255,255,.07);--txt:#dde1ea;--muted:#5a6070;--muted2:#8892a4;
  }
  html{scroll-behavior:smooth;height:100%}
  body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--txt);-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.6;overflow-x:hidden;min-height:100%;display:flex;flex-direction:column}
  a{color:inherit;text-decoration:none}svg{display:block;flex-shrink:0}
  .topbar{background:linear-gradient(90deg,#1d3a6b,#1e3a8a,#1d3a6b);padding:9px 20px;text-align:center;font-size:12px;font-weight:600;color:#93c5fd;letter-spacing:.2px;display:flex;align-items:center;justify-content:center;gap:8px}
  .topbar-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;flex-shrink:0;box-shadow:0 0 6px #4ade80;animation:blink 2s infinite}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
  .hdr{position:sticky;top:0;z-index:200;background:rgba(8,9,12,.92);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
  .hdr-in{max-width:1120px;margin:0 auto;padding:0 20px;height:58px;display:flex;align-items:center;gap:12px}
  .logo{display:flex;align-items:center;gap:9px;font-weight:800;font-size:15px;letter-spacing:-.3px;color:#fff;margin-right:auto}
  .logo-mark{width:32px;height:32px;border-radius:9px;background:var(--blue);display:flex;align-items:center;justify-content:center}
  .hdr-nav{display:flex;gap:0}
  .hdr-nav a{font-size:13px;font-weight:500;color:var(--muted2);padding:6px 12px;border-radius:8px;transition:color .15s}
  .hdr-nav a:hover{color:#fff}
  .hdr-pill{display:flex;align-items:center;gap:5px;background:var(--green-bg);border:1px solid var(--green-border);color:var(--green);font-size:11px;font-weight:600;padding:4px 10px;border-radius:100px;white-space:nowrap}
  .hdr-pill-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:blink 2s infinite}
  .hdr-tel{display:flex;align-items:center;gap:7px;background:var(--blue);color:#fff;font-weight:700;font-size:12.5px;padding:8px 14px;border-radius:10px;white-space:nowrap}
  .sec{padding:52px 20px}
  .sec-in{max-width:1120px;margin:0 auto}
  .sec-label{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
  .sec-label::before{content:'';width:16px;height:2px;background:var(--blue);border-radius:1px}
  .sec-title{font-size:26px;font-weight:800;letter-spacing:-.8px;color:#fff;line-height:1.15;margin-bottom:6px}
  .sec-sub{font-size:13px;color:var(--muted2);line-height:1.7}
  .btn-p{display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:#fff;font-weight:700;font-size:13px;padding:13px 20px;border-radius:12px;box-shadow:0 4px 20px rgba(59,130,246,.35)}
  .btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--txt);font-weight:600;font-size:13px;padding:13px 20px;border-radius:12px}
  .trust{background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 20px}
  .trust-in{max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap}
  .trust-item{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--muted2);font-weight:500}
  .trust-badge{font-size:9.5px;font-weight:800;padding:2px 6px;border-radius:5px;letter-spacing:.4px;text-transform:uppercase}
  .rge{background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.2)}
  .ql{background:rgba(139,92,246,.12);color:#a78bfa;border:1px solid rgba(139,92,246,.2)}
  .stars{display:flex;gap:1px;color:#fbbf24;font-size:12px}
  .ftr{border-top:1px solid var(--border);padding:20px;text-align:center}
  .ftr p{font-size:11px;color:var(--muted);line-height:1.7}
  .srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:32px}
  .srv{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;transition:border-color .2s,transform .2s,background .2s}
  .srv:hover{border-color:rgba(59,130,246,.3);background:var(--card2);transform:translateY(-2px)}
  .srv-ico{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(99,102,241,.1));border:1px solid rgba(59,130,246,.15);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
  .srv-ico svg{width:17px;height:17px;stroke:var(--blue);stroke-width:1.7;fill:none;stroke-linecap:round;stroke-linejoin:round}
  .srv h4{font-size:13px;font-weight:700;color:#fff;margin-bottom:5px}
  .srv p{font-size:11.5px;color:var(--muted2);line-height:1.65}
  .srv-tag{display:inline-block;font-size:9.5px;font-weight:700;color:#4ade80;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.15);padding:2px 7px;border-radius:100px;margin-top:10px}
  @media(max-width:600px){
    .hdr-nav,.hdr-pill{display:none}
    .hdr-tel{font-size:11.5px;padding:7px 11px}
    .srv-grid{grid-template-columns:1fr}
  }
`

// Le header utilise postMessage pour notifier le parent React de changer de page
// __ACTIVE__ est remplacé par la page active pour highlighting
const SHARED_HEADER = `
  <script>
    function nav(page) {
      window.parent.postMessage({rivallqNav: page}, '*');
    }
  <\/script>
  <div class="topbar"><span class="topbar-dot"></span>Disponible maintenant — Intervention garantie en 2h sur Paris &amp; Île-de-France</div>
  <header class="hdr">
    <div class="hdr-in">
      <div class="logo">
        <div class="logo-mark"><svg viewBox="0 0 24 24" fill="white" width="15" height="15"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
        RénovElec<span style="color:var(--blue)">Paris</span>
      </div>
      <nav class="hdr-nav">
        <a href="#" onclick="event.preventDefault();nav('home')" style="__ACTIVE_home__">Accueil</a>
        <a href="#" onclick="event.preventDefault();nav('services')" style="__ACTIVE_services__">Services</a>
        <a href="#" onclick="event.preventDefault();nav('services')" style="__ACTIVE_tarifs__">Tarifs</a>
        <a href="#" onclick="event.preventDefault();nav('contact')" style="__ACTIVE_contact__">Contact</a>
      </nav>
      <div class="hdr-pill"><span class="hdr-pill-dot"></span>En ligne</div>
      <a href="#" onclick="event.preventDefault();nav('contact')" class="hdr-tel">
        <svg viewBox="0 0 24 24" fill="white" width="12" height="12"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        01 87 65 43 21
      </a>
    </div>
  </header>
`

const SHARED_FOOTER = `
  <div class="trust">
    <div class="trust-in">
      <div class="trust-item"><span class="trust-badge rge">RGE</span> Certifié RGE</div>
      <div class="trust-item"><span class="trust-badge ql">QL</span> Qualifelec</div>
      <div class="trust-item"><div class="stars">★★★★★</div>&nbsp;4,9/5 · 200+ avis</div>
      <div class="trust-item">Assurance décennale</div>
    </div>
  </div>
  <footer class="ftr">
    <p>© 2025 RénovElec Paris — SIRET 123 456 789 00012 — Certifié RGE · Qualifelec · Assurance décennale</p>
    <p style="margin-top:5px"><a href="#">Mentions légales</a> · <a href="#">Confidentialité</a> · <a href="#">CGV</a></p>
  </footer>
`

type AfterPage = 'home' | 'services' | 'contact'

const ACTIVE_STYLE = 'color:#fff;font-weight:600'
const INACTIVE_STYLE = ''

function buildPage(activePage: AfterPage, body: string): string {
  const header = SHARED_HEADER
    .replace('__ACTIVE_home__', activePage === 'home' ? ACTIVE_STYLE : INACTIVE_STYLE)
    .replace('__ACTIVE_services__', activePage === 'services' ? ACTIVE_STYLE : INACTIVE_STYLE)
    .replace('__ACTIVE_tarifs__', activePage === 'services' ? ACTIVE_STYLE : INACTIVE_STYLE)
    .replace('__ACTIVE_contact__', activePage === 'contact' ? ACTIVE_STYLE : INACTIVE_STYLE)
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${SHARED_CSS}</style></head><body>${header}<div style="flex:1">${body}</div>${SHARED_FOOTER}</body></html>`
}

// ── Page Accueil ─────────────────────────────────────────────────
const HOME_BODY = `
  <section style="position:relative;overflow:hidden;padding:64px 20px 72px">
    <div style="position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 70%);top:-200px;left:50%;transform:translateX(-50%);pointer-events:none"></div>
    <div style="position:relative;max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr 300px;gap:48px;align-items:center">
      <div>
        <div style="display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(59,130,246,.35);background:rgba(59,130,246,.08);color:#60a5fa;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:5px 11px;border-radius:100px;margin-bottom:22px">RGE · Qualifelec · Assurance décennale</div>
        <h1 style="font-size:40px;font-weight:900;line-height:1.06;letter-spacing:-2px;color:#fff;margin-bottom:16px">Électricien Paris<br><span style="background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Intervention en 2h</span><br>7j/7, 24h/24</h1>
        <p style="font-size:14px;color:var(--muted2);line-height:1.75;margin-bottom:26px;max-width:440px">Dépannage urgent, tableau électrique, mise aux normes NFC 15-100. Devis 100% gratuit. Artisan certifié, garantie pièces &amp; main d'œuvre 2 ans.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <a href="tel:0187654321" class="btn-p">Appel gratuit — Réponse immédiate</a>
          <a href="#devis" class="btn-s">Devis en ligne en 2 min →</a>
        </div>
      </div>
      <div id="devis" style="background:var(--card2);border:1px solid rgba(59,130,246,.2);border-radius:22px;padding:26px;box-shadow:0 32px 64px rgba(0,0,0,.6)">
        <h3 style="font-size:14px;font-weight:700;color:#fff;margin-bottom:4px">Votre devis gratuit</h3>
        <p style="font-size:11px;color:var(--muted2);margin-bottom:14px">Réponse en moins de 30 minutes</p>
        <div style="display:flex;align-items:center;gap:6px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.18);border-radius:10px;padding:8px 12px;margin-bottom:14px;font-size:11px;color:var(--green);font-weight:600">Technicien disponible — intervention possible aujourd'hui</div>
        <select style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;color:var(--txt);width:100%;margin-bottom:8px;font-family:inherit;outline:none;appearance:none;-webkit-appearance:none"><option>Type de travaux…</option><option>Dépannage urgent</option><option>Tableau électrique</option><option>Installation / prises</option><option>Mise aux normes</option></select>
        <input style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;color:var(--txt);width:100%;margin-bottom:8px;font-family:inherit;outline:none" type="text" placeholder="Code postal (ex : 75011)" />
        <input style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;color:var(--txt);width:100%;margin-bottom:8px;font-family:inherit;outline:none" type="tel" placeholder="Votre téléphone" />
        <button style="width:100%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;font-weight:800;font-size:13px;padding:13px;border-radius:11px;border:none;cursor:pointer;font-family:inherit">Obtenir mon devis gratuit →</button>
      </div>
    </div>
  </section>
  <div style="background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div style="max-width:1120px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr)">
      <div style="padding:28px 20px;text-align:center;border-right:1px solid var(--border)"><span style="font-size:30px;font-weight:900;letter-spacing:-1px;color:#3b82f6;display:block">2h</span><div style="font-size:11px;color:var(--muted2);margin-top:5px">Délai d'intervention<br>garanti</div></div>
      <div style="padding:28px 20px;text-align:center;border-right:1px solid var(--border)"><span style="font-size:30px;font-weight:900;letter-spacing:-1px;color:#3b82f6;display:block">800+</span><div style="font-size:11px;color:var(--muted2);margin-top:5px">Clients satisfaits<br>à Paris</div></div>
      <div style="padding:28px 20px;text-align:center;border-right:1px solid var(--border)"><span style="font-size:30px;font-weight:900;letter-spacing:-1px;color:#3b82f6;display:block">4,9/5</span><div style="font-size:11px;color:var(--muted2);margin-top:5px">Note Google sur<br>200+ avis</div></div>
      <div style="padding:28px 20px;text-align:center"><span style="font-size:30px;font-weight:900;letter-spacing:-1px;color:#3b82f6;display:block">12 ans</span><div style="font-size:11px;color:var(--muted2);margin-top:5px">D'expérience en<br>électricité</div></div>
    </div>
  </div>
  <section class="sec"><div class="sec-in">
    <div class="sec-label">Prestations</div>
    <div class="sec-title">Tous vos travaux électriques</div>
    <div class="sec-sub">Du dépannage d'urgence à la rénovation complète — toute l'Île-de-France.</div>
    <div class="srv-grid">
      <div class="srv"><div class="srv-ico"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div><h4>Dépannage urgent</h4><p>Panne totale, court-circuit, disjoncteur. Intervention 7j/7 dont jours fériés.</p><span class="srv-tag">Disponible aujourd'hui</span></div>
      <div class="srv"><div class="srv-ico"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01"/></svg></div><h4>Tableau électrique</h4><p>Remplacement, mise aux normes, protection différentielle. Certificat Consuel inclus.</p><span class="srv-tag">Certificat Consuel</span></div>
      <div class="srv"><div class="srv-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></div><h4>Installation &amp; éclairage</h4><p>Prises, interrupteurs, spots LED, rails, goulottes. Finitions nettes.</p></div>
      <div class="srv"><div class="srv-ico"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg></div><h4>Mise aux normes</h4><p>Conformité NFC 15-100, liaison équipotentielle, rapport Consuel.</p><span class="srv-tag">NFC 15-100</span></div>
      <div class="srv"><div class="srv-ico"><svg viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></div><h4>VMC &amp; ventilation</h4><p>Installation, remplacement et entretien VMC simple et double flux. RT2020.</p></div>
      <div class="srv"><div class="srv-ico"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><h4>Domotique &amp; IRVE</h4><p>Volets connectés, éclairage intelligent, alarme, borne recharge véhicule.</p></div>
    </div>
  </div></section>
`

// ── Page Services / Tarifs ───────────────────────────────────────
const SERVICES_BODY = `
  <section style="padding:52px 20px 32px"><div style="max-width:1120px;margin:0 auto">
    <div class="sec-label">Nos services</div>
    <h1 style="font-size:34px;font-weight:900;letter-spacing:-1.5px;color:#fff;margin-bottom:8px">Toutes nos prestations électriques</h1>
    <p style="font-size:14px;color:var(--muted2);max-width:560px;line-height:1.7">Artisan RGE certifié, nous intervenons pour tous vos travaux d'électricité à Paris et Île-de-France avec une garantie 2 ans.</p>
  </div></section>
  <section class="sec" style="padding-top:0"><div class="sec-in">
    <div style="display:grid;gap:16px">
      ${['Dépannage &amp; urgence|Court-circuit, panne totale, disjoncteur qui saute. Intervention garantie en 2h, 7j/7 24h/24 dont jours fériés et nuits.|Disponible maintenant|À partir de 79€',
      'Tableau électrique|Remplacement complet ou partiel, ajout de circuits, protection différentielle, mise aux normes. Certificat Consuel fourni.|Certificat Consuel inclus|À partir de 450€',
      'Installation électrique|Prises, interrupteurs, va-et-vient, spots LED, rails, goulottes. Tout type de logement et local commercial.|Devis gratuit|Sur devis',
      'Mise aux normes NFC 15-100|Mise en conformité complète avec rapport Consuel. Idéal avant mise en location ou vente.|Rapport Consuel|Sur devis',
      'VMC &amp; ventilation|Installation et remplacement VMC simple et double flux, entretien, filtres. Conformité RT2020.|RT2020|Sur devis',
      'Domotique &amp; IRVE|Volets connectés, éclairage intelligent, interphones, alarmes, bornes de recharge véhicule électrique (IRVE).|Aide ADVENIR|Sur devis']
      .map(s => {
        const [title, desc, tag, price] = s.split('|')
        return `<div style="background:var(--card);border:1px solid var(--border);border-radius:18px;padding:24px;display:flex;align-items:flex-start;gap:20px">
          <div style="width:44px;height:44px;border-radius:12px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg viewBox="0 0 24 24" style="width:18px;height:18px;stroke:#3b82f6;stroke-width:1.7;fill:none;stroke-linecap:round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:6px">
              <h3 style="font-size:14px;font-weight:700;color:#fff">${title}</h3>
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:9.5px;font-weight:700;color:#4ade80;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.15);padding:2px 8px;border-radius:100px">${tag}</span>
                <span style="font-size:12px;font-weight:700;color:#fff">${price}</span>
              </div>
            </div>
            <p style="font-size:12.5px;color:var(--muted2);line-height:1.65">${desc}</p>
          </div>
        </div>`}).join('')}
    </div>
    <div style="margin-top:32px;background:linear-gradient(135deg,#0f1e3d,#0d1b35);border:1px solid rgba(59,130,246,.2);border-radius:20px;padding:40px;text-align:center">
      <h2 style="font-size:24px;font-weight:800;color:#fff;margin-bottom:8px">Devis gratuit en 30 min</h2>
      <p style="font-size:13px;color:var(--muted2);margin-bottom:24px">Appelez-nous ou remplissez le formulaire — nos tarifs sont fixes et sans surprise.</p>
      <a href="tel:0187654321" style="display:inline-flex;align-items:center;gap:8px;background:#fff;color:#0a1628;font-weight:800;font-size:13.5px;padding:14px 28px;border-radius:12px">01 87 65 43 21 — Appel gratuit</a>
    </div>
  </div></section>
`

// ── Page Contact ─────────────────────────────────────────────────
const CONTACT_BODY = `
  <section style="padding:52px 20px 32px"><div style="max-width:1120px;margin:0 auto">
    <div class="sec-label">Contact</div>
    <h1 style="font-size:34px;font-weight:900;letter-spacing:-1.5px;color:#fff;margin-bottom:8px">Nous contacter</h1>
    <p style="font-size:14px;color:var(--muted2);max-width:560px;line-height:1.7">Réponse garantie en moins de 30 minutes. Devis gratuit et sans engagement.</p>
  </div></section>
  <section class="sec" style="padding-top:0"><div class="sec-in">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start">
      <div style="background:var(--card2);border:1px solid rgba(59,130,246,.2);border-radius:22px;padding:32px">
        <h2 style="font-size:18px;font-weight:700;color:#fff;margin-bottom:24px">Envoyer un message</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
          <input style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--txt);font-family:inherit;outline:none;width:100%" placeholder="Prénom" />
          <input style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--txt);font-family:inherit;outline:none;width:100%" placeholder="Nom" />
        </div>
        <input style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--txt);font-family:inherit;outline:none;width:100%;margin-bottom:10px" type="email" placeholder="Email" />
        <input style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--txt);font-family:inherit;outline:none;width:100%;margin-bottom:10px" type="tel" placeholder="Téléphone" />
        <select style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--muted2);font-family:inherit;outline:none;width:100%;margin-bottom:10px;appearance:none;-webkit-appearance:none"><option value="">Type de travaux…</option><option>Dépannage urgent</option><option>Tableau électrique</option><option>Installation</option><option>Mise aux normes</option></select>
        <textarea style="background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 14px;font-size:13px;color:var(--txt);font-family:inherit;outline:none;width:100%;resize:vertical;min-height:90px;margin-bottom:14px" placeholder="Décrivez vos travaux…"></textarea>
        <button style="width:100%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;font-weight:800;font-size:13px;padding:13px;border-radius:11px;border:none;cursor:pointer;font-family:inherit">Envoyer ma demande →</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        <div style="background:var(--card);border:1px solid var(--border);border-radius:18px;padding:24px">
          <h3 style="font-size:13px;font-weight:700;color:#fff;margin-bottom:16px">Informations de contact</h3>
          <div style="display:flex;flex-direction:column;gap:12px">
            <div style="display:flex;align-items:center;gap:12px;font-size:13px;color:var(--muted2)">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#3b82f6;stroke-width:2;fill:none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg></div>
              <div><div style="font-size:10px;color:var(--muted);margin-bottom:1px">Téléphone</div>01 87 65 43 21</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;font-size:13px;color:var(--muted2)">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#3b82f6;stroke-width:2;fill:none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
              <div><div style="font-size:10px;color:var(--muted);margin-bottom:1px">Email</div>contact@renovelec-paris.fr</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;font-size:13px;color:var(--muted2)">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#3b82f6;stroke-width:2;fill:none"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.4 7.05 11.5 7.35 11.76a1 1 0 0 0 1.3 0C12.95 21.5 20 15.4 20 10a8 8 0 0 0-8-8z"/></svg></div>
              <div><div style="font-size:10px;color:var(--muted);margin-bottom:1px">Zone d'intervention</div>Paris (75) &amp; Île-de-France</div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;font-size:13px;color:var(--muted2)">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:#3b82f6;stroke-width:2;fill:none"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
              <div><div style="font-size:10px;color:var(--muted);margin-bottom:1px">Horaires</div>7j/7 · 24h/24 pour urgences</div>
            </div>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,rgba(34,197,94,.08),rgba(59,130,246,.08));border:1px solid rgba(34,197,94,.2);border-radius:18px;padding:24px;text-align:center">
          <div style="font-size:24px;font-weight:900;color:#4ade80;margin-bottom:6px">Urgence ?</div>
          <p style="font-size:12.5px;color:var(--muted2);margin-bottom:16px">Technicien disponible maintenant — intervention sous 2h garantie</p>
          <a href="tel:0187654321" style="display:flex;align-items:center;justify-content:center;gap:8px;background:#22c55e;color:#fff;font-weight:800;font-size:13px;padding:12px;border-radius:11px">Appeler maintenant</a>
        </div>
      </div>
    </div>
  </div></section>
`

const AFTER_PAGES: Record<AfterPage, { label: string; url: string; html: string }> = {
  home: {
    label: 'Accueil',
    url: 'renovelec-paris.fr',
    html: buildPage('home', HOME_BODY),
  },
  services: {
    label: 'Services',
    url: 'renovelec-paris.fr/services',
    html: buildPage('services', SERVICES_BODY),
  },
  contact: {
    label: 'Contact',
    url: 'renovelec-paris.fr/contact',
    html: buildPage('contact', CONTACT_BODY),
  },
}

// ── Site AVANT — multi-pages (même mauvais style) ────────────────
const BEFORE_SITE_URL = 'renovelec-paris.fr'

const BEFORE_CSS = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { height: 100%; }
  body { font-family: Arial, sans-serif; background: #fff; color: #333; font-size: 12px; display: flex; flex-direction: column; height: 100%; }
  .header { background: #003366; color: white; padding: 10px 20px; flex-shrink:0; }
  .header h1 { font-size: 18px; }
  .header p { font-size: 11px; color: #aac; margin-top:2px; }
  .nav { background: #004080; display: flex; gap: 0; flex-shrink:0; }
  .nav a { color: white; text-decoration: none; padding: 8px 14px; font-size: 12px; display: block; border-right: 1px solid #005599; cursor:pointer; }
  .nav a:hover, .nav a.active { background: #005599; }
  .main { flex: 1; display: flex; flex-direction: column; }
  .hero { background: #f0f0f0; padding: 20px; border-bottom: 2px solid #ccc; flex-shrink:0; }
  .hero h2 { font-size: 16px; color: #003366; margin-bottom: 8px; }
  .hero p { font-size: 12px; line-height: 1.5; color: #555; }
  .content { padding: 20px; flex: 1; }
  .section-title { font-size: 14px; color: #003366; margin-bottom: 10px; }
  .services { display: flex; gap: 10px; flex-wrap: wrap; margin: 15px 0; }
  .service-box { border: 1px solid #ccc; padding: 10px; width: 110px; text-align: center; font-size: 11px; background: #fafafa; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 10px; }
  td, th { border: 1px solid #ddd; padding: 6px; text-align: left; }
  th { background: #eee; }
  .contact-section { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-top: 20px; }
  .contact-btn { background: #003366; color: white; padding: 8px 16px; border: none; font-size: 12px; cursor: pointer; margin-top: 10px; }
  input, textarea, select { border: 1px solid #ccc; padding: 5px 8px; font-size: 11px; width: 100%; margin-top: 6px; font-family: Arial, sans-serif; }
  .footer { background: #222; color: #888; padding: 10px 20px; font-size: 10px; flex-shrink:0; }
`

const BEFORE_SHARED_HEADER = (active: string) => `
  <script>
    function bnav(page) { window.parent.postMessage({rivallqBeforeNav: page}, '*'); }
  <\/script>
  <div class="header">
    <h1>Electricien Paris</h1>
    <p>Rénovation électrique - Paris et Île-de-France</p>
  </div>
  <div class="nav">
    <a onclick="bnav('home')" class="${active === 'home' ? 'active' : ''}">Accueil</a>
    <a onclick="bnav('services')" class="${active === 'services' ? 'active' : ''}">Services</a>
    <a onclick="bnav('tarifs')" class="${active === 'tarifs' ? 'active' : ''}">Tarifs</a>
    <a onclick="bnav('contact')" class="${active === 'contact' ? 'active' : ''}">Contact</a>
  </div>
`

const BEFORE_FOOTER = `
  <div class="footer"><p>© 2024 Electricien Paris — Tous droits réservés — Mentions légales</p></div>
`

function buildBeforePage(active: string, body: string) {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><style>${BEFORE_CSS}</style></head><body>${BEFORE_SHARED_HEADER(active)}<div class="main">${body}</div>${BEFORE_FOOTER}</body></html>`
}

type BeforePage = 'home' | 'services' | 'tarifs' | 'contact'

const BEFORE_PAGES: Record<BeforePage, { label: string; url: string; html: string }> = {
  home: {
    label: 'Accueil', url: 'renovelec-paris.fr',
    html: buildBeforePage('home', `
      <div class="hero">
        <h2>Bienvenue sur notre site</h2>
        <p>Nous sommes une entreprise d'électricité basée à Paris. Nous faisons des travaux électriques de toutes sortes. N'hésitez pas à nous contacter pour un devis.</p>
        <p style="font-size:11px;margin-top:8px;color:#888">Nos services incluent l'installation, la rénovation et le dépannage électrique.</p>
      </div>
      <div class="content">
        <h3 class="section-title">Nos services</h3>
        <div class="services">
          <div class="service-box">Installation</div>
          <div class="service-box">Rénovation</div>
          <div class="service-box">Dépannage</div>
          <div class="service-box">Éclairage</div>
        </div>
        <p style="font-size:11px;color:#555;line-height:1.6;margin-top:10px">Nous intervenons pour tous vos travaux électriques. Notre équipe est disponible pour répondre à vos besoins.</p>
      </div>
    `),
  },
  services: {
    label: 'Services', url: 'renovelec-paris.fr/services',
    html: buildBeforePage('services', `
      <div class="hero">
        <h2>Nos services</h2>
        <p>Découvrez nos différentes prestations électriques.</p>
      </div>
      <div class="content">
        <h3 class="section-title">Ce que nous faisons</h3>
        <div class="services">
          <div class="service-box">Installation électrique</div>
          <div class="service-box">Dépannage urgent</div>
          <div class="service-box">Tableau électrique</div>
          <div class="service-box">Mise aux normes</div>
          <div class="service-box">VMC</div>
          <div class="service-box">Éclairage LED</div>
        </div>
        <p style="font-size:11px;color:#555;line-height:1.6;margin-top:14px">Pour plus d'informations sur nos services, contactez-nous par téléphone ou par email. Nous vous répondrons dans les meilleurs délais.</p>
        <p style="font-size:11px;color:#888;margin-top:8px">Nous intervenons sur Paris et toute l'Île-de-France.</p>
      </div>
    `),
  },
  tarifs: {
    label: 'Tarifs', url: 'renovelec-paris.fr/tarifs',
    html: buildBeforePage('tarifs', `
      <div class="hero">
        <h2>Nos tarifs</h2>
        <p>Grille tarifaire indicative. Contactez-nous pour un devis précis.</p>
      </div>
      <div class="content">
        <h3 class="section-title">Grille de prix</h3>
        <table>
          <tr><th>Prestation</th><th>Prix indicatif</th></tr>
          <tr><td>Déplacement</td><td>Sur devis</td></tr>
          <tr><td>Installation prise</td><td>Sur devis</td></tr>
          <tr><td>Tableau électrique</td><td>Sur devis</td></tr>
          <tr><td>Dépannage urgent</td><td>Sur devis</td></tr>
          <tr><td>Mise aux normes</td><td>Sur devis</td></tr>
          <tr><td>VMC</td><td>Sur devis</td></tr>
        </table>
        <p style="font-size:10px;color:#888;margin-top:12px">* Les prix sont donnés à titre indicatif et peuvent varier selon la complexité des travaux. Devis gratuit sur demande.</p>
      </div>
    `),
  },
  contact: {
    label: 'Contact', url: 'renovelec-paris.fr/contact',
    html: buildBeforePage('contact', `
      <div class="hero">
        <h2>Contactez-nous</h2>
        <p>Pour toute demande de devis ou d'intervention, utilisez le formulaire ci-dessous.</p>
      </div>
      <div class="content">
        <div class="contact-section">
          <h3 style="font-size:13px;color:#003366;margin-bottom:8px;">Formulaire de contact</h3>
          <label style="font-size:11px">Nom :</label>
          <input type="text" placeholder="Votre nom" />
          <label style="font-size:11px;margin-top:8px;display:block">Email :</label>
          <input type="email" placeholder="votre@email.com" />
          <label style="font-size:11px;margin-top:8px;display:block">Message :</label>
          <textarea rows="4" placeholder="Décrivez vos travaux..."></textarea>
          <button class="contact-btn">Envoyer</button>
        </div>
        <p style="font-size:11px;color:#555;margin-top:14px">Téléphone : disponible sur demande</p>
        <p style="font-size:11px;color:#555;margin-top:4px">Email : contact@electricien-paris.fr</p>
        <p style="font-size:11px;color:#888;margin-top:4px">Nous vous répondrons sous 48h.</p>
      </div>
    `),
  },
}

type Device = 'desktop' | 'mobile'
type View = 'before' | 'after' | 'split'

export function BeforeAfterDemo() {
  const [view, setView] = useState<View>('split')
  const [device, setDevice] = useState<Device>('desktop')
  const [afterPage, setAfterPage] = useState<AfterPage>('home')
  const [beforePage, setBeforePage] = useState<BeforePage>('home')
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Listen for postMessage from both iframes
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const after = e.data?.rivallqNav
      if (after === 'home' || after === 'services' || after === 'contact') {
        setAfterPage(after as AfterPage)
      }
      const before = e.data?.rivallqBeforeNav
      if (before === 'home' || before === 'services' || before === 'tarifs' || before === 'contact') {
        setBeforePage(before as BeforePage)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // On small screens split doesn't work — fall back to 'after'
  const effectiveView: View = isSmallScreen && view === 'split' ? 'after' : view
  const isSplit = effectiveView === 'split'

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">

        {/* Mobile: simple 2-tab toggle */}
        <div className="flex md:hidden w-full">
          <button
            onClick={() => setView('before')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-l-xl border transition-colors ${
              effectiveView === 'before'
                ? 'bg-red-500/20 border-red-500/40 text-red-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            ← Avant
          </button>
          <button
            onClick={() => setView('after')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-r-xl border-t border-b border-r transition-colors ${
              effectiveView === 'after'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
          >
            Après →
          </button>
        </div>

        {/* Desktop: 3-tab toggle + device switcher */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          {(['before', 'split', 'after'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${view === v ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              {v === 'split' ? (
                <span className="flex items-center gap-1.5"><ArrowLeftRight className="h-3 w-3" />Côte à côte</span>
              ) : v === 'before' ? '← Avant' : 'Après →'}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          <button onClick={() => setDevice('desktop')} className={`p-2 rounded-lg transition-colors ${device === 'desktop' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}><Monitor className="h-3.5 w-3.5" /></button>
          <button onClick={() => setDevice('mobile')} className={`p-2 rounded-lg transition-colors ${device === 'mobile' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}><Smartphone className="h-3.5 w-3.5" /></button>
        </div>
      </div>

      {/* Page tabs — Avant + Après in split, or the active one solo */}
      {(effectiveView === 'before' || effectiveView === 'split') && (
        <div className={`flex items-center gap-1.5 flex-wrap ${effectiveView === 'split' ? 'justify-start' : 'justify-center'}`}>
          <span className="text-xs text-zinc-600 mr-1">Avant :</span>
          {(Object.keys(BEFORE_PAGES) as BeforePage[]).map((page) => (
            <button
              key={page}
              onClick={() => setBeforePage(page)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                beforePage === page
                  ? 'bg-red-500/20 border-red-500/40 text-red-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {beforePage === page && <ChevronRight className="h-3 w-3" />}
              {BEFORE_PAGES[page].label}
            </button>
          ))}
        </div>
      )}
      {(effectiveView === 'after' || effectiveView === 'split') && (
        <div className={`flex items-center gap-1.5 flex-wrap ${effectiveView === 'split' ? 'justify-end' : 'justify-center'}`}>
          <span className="text-xs text-zinc-600 mr-1">Après :</span>
          {(Object.keys(AFTER_PAGES) as AfterPage[]).map((page) => (
            <button
              key={page}
              onClick={() => setAfterPage(page)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-medium transition-all border ${
                afterPage === page
                  ? 'bg-violet-600/20 border-violet-500/40 text-violet-300'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              {afterPage === page && <ChevronRight className="h-3 w-3" />}
              {AFTER_PAGES[page].label}
            </button>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isSplit ? (
          <m.div key="split" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 p-3"
          >
            {/* Labels flottants */}
            <SiteFrame
              key={`avant-split-${beforePage}`}
              label={`Avant — ${BEFORE_PAGES[beforePage].label}`}
              badge="bg-red-500/20 text-red-400 border-red-500/30"
              url={BEFORE_PAGES[beforePage].url}
              html={BEFORE_PAGES[beforePage].html}
              device={device}
              split
            />
            <SiteFrame
              key={`apres-split-${afterPage}`}
              label={`Après — ${AFTER_PAGES[afterPage].label}`}
              badge="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              url={AFTER_PAGES[afterPage].url}
              html={AFTER_PAGES[afterPage].html}
              device={device}
              split
              isAfter
            />
          </m.div>
        ) : effectiveView === 'before' ? (
          <m.div key={`before-${beforePage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SiteFrame
              label={`Avant — ${BEFORE_PAGES[beforePage].label}`}
              badge="bg-red-500/20 text-red-400 border-red-500/30"
              url={BEFORE_PAGES[beforePage].url}
              html={BEFORE_PAGES[beforePage].html}
              device={isSmallScreen ? 'desktop' : device}
              split={false}
            />
          </m.div>
        ) : (
          <m.div key={`after-${afterPage}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SiteFrame
              label={`Après — ${AFTER_PAGES[afterPage].label}`}
              badge="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              url={AFTER_PAGES[afterPage].url}
              html={AFTER_PAGES[afterPage].html}
              device={isSmallScreen ? 'desktop' : device}
              split={false}
              isAfter
            />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SiteFrame = memo(function SiteFrame({
  label, badge, url, html, device, split, isAfter = false,
}: {
  label: string
  badge: string
  url: string
  html: string
  device: Device
  split: boolean
  isAfter?: boolean
}) {
  const isMobile = device === 'mobile'
  const MOBILE_W = 375
  const DESK_SCALE = 0.65
  const frameH = isMobile ? 560 : split ? 560 : 680

  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900 flex flex-col">
      {/* Barre navigateur */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-zinc-800 bg-zinc-800/60 flex-shrink-0">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-2 rounded-md bg-zinc-700/50 flex items-center px-2.5 h-6 gap-1.5 min-w-0">
          <Globe className="h-2.5 w-2.5 text-zinc-500 flex-shrink-0" />
          <span className="text-[10px] text-zinc-400 truncate font-mono">{url}</span>
        </div>
        {isMobile && <Smartphone className="h-3 w-3 text-zinc-500" />}
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${badge}`}>
          {label}
        </span>
        {isAfter && (
          <a
            href={`https://${url.split('/')[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 transition-colors"
            aria-label="Ouvrir le site"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Iframe — toujours srcDoc pour garantir l'affichage */}
      {isMobile ? (
        <div className="overflow-hidden bg-zinc-950 flex justify-center flex-1" style={{ height: frameH }}>
          <div style={{ width: MOBILE_W, height: frameH / DESK_SCALE, transform: `scale(${DESK_SCALE})`, transformOrigin: 'top center', flexShrink: 0 }}>
            <iframe
              srcDoc={html}
              sandbox="allow-scripts allow-same-origin allow-forms"
              style={{ width: MOBILE_W, height: frameH / DESK_SCALE, border: 0, display: 'block' }}
              title={label}
            />
          </div>
        </div>
      ) : (
        <div className={`overflow-hidden flex-1 ${isAfter ? 'bg-zinc-950' : 'bg-white'}`} style={{ height: frameH }}>
          <iframe
            srcDoc={html}
            sandbox="allow-scripts allow-same-origin allow-forms"
            style={{ width: `${100 / DESK_SCALE}%`, height: frameH / DESK_SCALE, transform: `scale(${DESK_SCALE})`, transformOrigin: 'top left', border: 0, display: 'block' }}
            title={label}
          />
        </div>
      )}
    </div>
  )
})
