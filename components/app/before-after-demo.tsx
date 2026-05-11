'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeftRight, Monitor, Smartphone } from 'lucide-react'

// ── HTML du site AVANT (mauvais) ─────────────────────────────────
const BEFORE_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Electricien Paris | Rénovation électrique</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: #fff; color: #333; font-size: 12px; }
    .header { background: #003366; color: white; padding: 10px 20px; }
    .header h1 { font-size: 18px; }
    .header p { font-size: 11px; color: #aac; }
    .nav { background: #004080; display: flex; gap: 0; }
    .nav a { color: white; text-decoration: none; padding: 8px 14px; font-size: 12px; display: block; border-right: 1px solid #005599; }
    .nav a:hover { background: #005599; }
    .hero { background: #f0f0f0; padding: 20px; border-bottom: 2px solid #ccc; }
    .hero h2 { font-size: 16px; color: #003366; margin-bottom: 8px; }
    .hero p { font-size: 12px; line-height: 1.5; color: #555; }
    .content { padding: 20px; }
    .services { display: flex; gap: 10px; flex-wrap: wrap; margin: 15px 0; }
    .service-box { border: 1px solid #ccc; padding: 10px; width: 120px; text-align: center; font-size: 11px; background: #fafafa; }
    .service-box img { width: 40px; height: 40px; margin-bottom: 5px; }
    .contact-section { background: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin-top: 20px; }
    .contact-btn { background: #003366; color: white; padding: 8px 16px; border: none; font-size: 12px; cursor: pointer; margin-top: 10px; }
    .footer { background: #222; color: #888; padding: 10px 20px; font-size: 10px; margin-top: 20px; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-top: 10px; }
    td, th { border: 1px solid #ddd; padding: 6px; text-align: left; }
    th { background: #eee; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Electricien Paris</h1>
    <p>Rénovation électrique - Paris et Île-de-France</p>
  </div>
  <div class="nav">
    <a href="#">Accueil</a>
    <a href="#">Services</a>
    <a href="#">Tarifs</a>
    <a href="#">Contact</a>
  </div>
  <div class="hero">
    <h2>Bienvenue sur notre site</h2>
    <p>Nous sommes une entreprise d'électricité basée à Paris. Nous faisons des travaux électriques de toutes sortes. N'hésitez pas à nous contacter pour un devis.</p>
  </div>
  <div class="content">
    <h3 style="font-size:14px; color:#003366; margin-bottom:10px;">Nos services</h3>
    <div class="services">
      <div class="service-box">⚡<br>Installation</div>
      <div class="service-box">🔧<br>Rénovation</div>
      <div class="service-box">🔌<br>Dépannage</div>
      <div class="service-box">💡<br>Éclairage</div>
    </div>
    <p style="font-size:11px; color:#555; line-height:1.6;">Nous intervenons pour tous vos travaux électriques. Notre équipe est disponible pour répondre à vos besoins. Nous travaillons dans le respect des normes en vigueur.</p>
    <h3 style="font-size:13px; color:#003366; margin:15px 0 8px;">Nos tarifs</h3>
    <table>
      <tr><th>Prestation</th><th>Prix</th></tr>
      <tr><td>Déplacement</td><td>Sur devis</td></tr>
      <tr><td>Installation prise</td><td>Sur devis</td></tr>
      <tr><td>Tableau électrique</td><td>Sur devis</td></tr>
    </table>
    <div class="contact-section">
      <h3 style="font-size:13px; color:#003366; margin-bottom:8px;">Contactez-nous</h3>
      <p style="font-size:11px;">Pour toute demande, remplissez le formulaire ci-dessous ou appelez-nous.</p>
      <p style="font-size:11px; margin-top:6px;">Tél : disponible sur demande</p>
      <button class="contact-btn">Contactez-nous</button>
    </div>
  </div>
  <div class="footer">
    <p>© 2024 Electricien Paris — Tous droits réservés — Mentions légales</p>
  </div>
</body>
</html>`

// ── HTML du site APRÈS (refait par l'IA) ─────────────────────────
const AFTER_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RénovElec Paris — Électricien certifié RGE · Intervention 2h</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --blue:#3b82f6;--blue-dark:#1d4ed8;--blue-glow:rgba(59,130,246,.18);
      --green:#22c55e;--green-bg:rgba(34,197,94,.12);--green-border:rgba(34,197,94,.25);
      --bg:#08090c;--bg2:#0d0f14;--card:#111318;--card2:#161922;
      --border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.04);
      --txt:#dde1ea;--muted:#5a6070;--muted2:#8892a4;
    }
    html{scroll-behavior:smooth}
    body{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--txt);-webkit-font-smoothing:antialiased;font-size:15px;line-height:1.6;overflow-x:hidden}
    a{color:inherit;text-decoration:none}
    svg{display:block;flex-shrink:0}

    /* ───── TOPBAR URGENCE ───── */
    .topbar{background:linear-gradient(90deg,#1d3a6b,#1e3a8a,#1d3a6b);padding:9px 20px;text-align:center;font-size:12px;font-weight:600;color:#93c5fd;letter-spacing:.2px;display:flex;align-items:center;justify-content:center;gap:8px}
    .topbar-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;flex-shrink:0;box-shadow:0 0 6px #4ade80;animation:blink 2s infinite}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}

    /* ───── HEADER ───── */
    .hdr{position:sticky;top:0;z-index:200;background:rgba(8,9,12,.9);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
    .hdr-in{max-width:1120px;margin:0 auto;padding:0 20px;height:58px;display:flex;align-items:center;gap:12px}
    .logo{display:flex;align-items:center;gap:9px;font-weight:800;font-size:15px;letter-spacing:-.3px;color:#fff;margin-right:auto}
    .logo-mark{width:32px;height:32px;border-radius:9px;background:var(--blue);display:flex;align-items:center;justify-content:center}
    .logo-mark svg{width:15px;height:15px;fill:#fff}
    .hdr-nav{display:flex;gap:0}
    .hdr-nav a{font-size:13px;font-weight:500;color:var(--muted2);padding:6px 12px;border-radius:8px;transition:color .15s}
    .hdr-nav a:hover{color:#fff}
    .hdr-pill{display:flex;align-items:center;gap:5px;background:var(--green-bg);border:1px solid var(--green-border);color:var(--green);font-size:11px;font-weight:600;padding:4px 10px;border-radius:100px;white-space:nowrap}
    .hdr-pill-dot{width:5px;height:5px;border-radius:50%;background:var(--green);animation:blink 2s infinite}
    .hdr-tel{display:flex;align-items:center;gap:7px;background:var(--blue);color:#fff;font-weight:700;font-size:12.5px;padding:8px 14px;border-radius:10px;white-space:nowrap;transition:background .15s}
    .hdr-tel:hover{background:var(--blue-dark)}
    .hdr-tel svg{width:12px;height:12px;fill:#fff}

    /* ───── HERO ───── */
    .hero{position:relative;overflow:hidden;padding:64px 20px 72px}
    .hero-orb1{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.14) 0%,transparent 70%);top:-200px;left:50%;transform:translateX(-50%);pointer-events:none}
    .hero-orb2{position:absolute;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,.08) 0%,transparent 70%);bottom:-80px;right:10%;pointer-events:none}
    .hero-in{position:relative;max-width:1120px;margin:0 auto;display:grid;grid-template-columns:1fr 320px;gap:48px;align-items:center}

    .hero-eyebrow{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(59,130,246,.35);background:rgba(59,130,246,.08);color:#60a5fa;font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:5px 11px;border-radius:100px;margin-bottom:22px}
    .hero-eyebrow svg{width:10px;height:10px;fill:#60a5fa}
    .hero h1{font-size:40px;font-weight:900;line-height:1.06;letter-spacing:-2px;color:#fff;margin-bottom:16px}
    .hero h1 span{background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .hero-desc{font-size:14px;color:var(--muted2);line-height:1.75;margin-bottom:26px;max-width:440px}
    .hero-btns{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:28px}
    .btn-p{display:inline-flex;align-items:center;gap:8px;background:var(--blue);color:#fff;font-weight:700;font-size:13px;padding:13px 20px;border-radius:12px;transition:background .15s,transform .15s;box-shadow:0 4px 20px rgba(59,130,246,.35)}
    .btn-p:hover{background:var(--blue-dark);transform:translateY(-1px)}
    .btn-p svg{width:14px;height:14px;fill:#fff}
    .btn-s{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);border:1px solid var(--border);color:var(--txt);font-weight:600;font-size:13px;padding:13px 20px;border-radius:12px;transition:background .15s}
    .btn-s:hover{background:rgba(255,255,255,.1)}
    .checks{display:flex;flex-direction:column;gap:8px}
    .check{display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--muted2)}
    .check-icon{width:18px;height:18px;border-radius:50%;background:var(--green-bg);border:1px solid var(--green-border);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .check-icon svg{width:9px;height:9px;stroke:var(--green);stroke-width:2.5;fill:none}

    /* ───── FORM CARD ───── */
    .form-wrap{background:var(--card2);border:1px solid rgba(59,130,246,.2);border-radius:22px;padding:26px;box-shadow:0 0 0 1px rgba(59,130,246,.06),0 32px 64px rgba(0,0,0,.6);position:relative;overflow:hidden}
    .form-wrap::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 120% 50% at 50% -10%,rgba(59,130,246,.08),transparent);pointer-events:none}
    .form-head{display:flex;align-items:center;gap:10px;margin-bottom:18px}
    .form-head-icon{width:38px;height:38px;border-radius:11px;background:linear-gradient(135deg,#3b82f6,#6366f1);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .form-head-icon svg{width:16px;height:16px;fill:#fff}
    .form-head-txt h3{font-size:14px;font-weight:700;color:#fff;line-height:1.2}
    .form-head-txt p{font-size:11px;color:var(--muted2);margin-top:2px}
    .form-urgency{display:flex;align-items:center;gap:6px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.18);border-radius:10px;padding:8px 12px;margin-bottom:14px;font-size:11px;color:var(--green);font-weight:600}
    .form-urgency svg{width:12px;height:12px;fill:var(--green)}
    .fld{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;color:var(--txt);width:100%;margin-bottom:8px;font-family:inherit;outline:none;transition:border-color .2s;-webkit-appearance:none;appearance:none}
    .fld::placeholder{color:var(--muted)}
    .fld:focus{border-color:rgba(59,130,246,.5);background:rgba(59,130,246,.04)}
    .fld option{background:#111318;color:var(--txt)}
    .form-btn{width:100%;background:linear-gradient(135deg,#3b82f6,#2563eb);color:#fff;font-weight:800;font-size:13px;padding:13px;border-radius:11px;border:none;cursor:pointer;font-family:inherit;margin-top:2px;box-shadow:0 4px 16px rgba(59,130,246,.4);letter-spacing:.2px}
    .form-footer{display:flex;align-items:center;justify-content:center;gap:5px;margin-top:10px;font-size:10px;color:var(--muted)}
    .form-footer svg{width:10px;height:10px;fill:var(--green)}

    /* ───── TRUST BAR ───── */
    .trust{background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 20px}
    .trust-in{max-width:1120px;margin:0 auto;display:flex;align-items:center;justify-content:center;gap:24px;flex-wrap:wrap}
    .trust-item{display:flex;align-items:center;gap:7px;font-size:11.5px;color:var(--muted2);font-weight:500}
    .trust-badge{font-size:9.5px;font-weight:800;padding:2px 6px;border-radius:5px;letter-spacing:.4px;text-transform:uppercase}
    .rge{background:rgba(34,197,94,.12);color:#4ade80;border:1px solid rgba(34,197,94,.2)}
    .ql{background:rgba(139,92,246,.12);color:#a78bfa;border:1px solid rgba(139,92,246,.2)}
    .stars{display:flex;gap:1px;color:#fbbf24;font-size:12px}
    .trust-sep{width:1px;height:16px;background:var(--border);flex-shrink:0}

    /* ───── STATS ───── */
    .stats{display:grid;grid-template-columns:repeat(4,1fr)}
    .stat{padding:28px 20px;text-align:center;border-right:1px solid var(--border);position:relative}
    .stat:last-child{border-right:none}
    .stat-n{font-size:30px;font-weight:900;letter-spacing:-1px;color:#fff;display:block;line-height:1}
    .stat-n span{color:var(--blue)}
    .stat-l{font-size:11px;color:var(--muted2);margin-top:5px;line-height:1.4}

    /* ───── SECTION ───── */
    .sec{padding:64px 20px}
    .sec-in{max-width:1120px;margin:0 auto}
    .sec-label{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
    .sec-label::before{content:'';width:16px;height:2px;background:var(--blue);border-radius:1px}
    .sec-title{font-size:26px;font-weight:800;letter-spacing:-.8px;color:#fff;line-height:1.15;margin-bottom:6px}
    .sec-sub{font-size:13px;color:var(--muted2);line-height:1.7}

    /* ───── SERVICES ───── */
    .srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:32px}
    .srv{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;transition:border-color .2s,transform .2s,background .2s;cursor:default}
    .srv:hover{border-color:rgba(59,130,246,.3);background:var(--card2);transform:translateY(-2px)}
    .srv-ico{width:38px;height:38px;border-radius:10px;background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(99,102,241,.1));border:1px solid rgba(59,130,246,.15);display:flex;align-items:center;justify-content:center;margin-bottom:14px}
    .srv-ico svg{width:17px;height:17px;stroke:var(--blue);stroke-width:1.7;fill:none;stroke-linecap:round;stroke-linejoin:round}
    .srv h4{font-size:13px;font-weight:700;color:#fff;margin-bottom:5px}
    .srv p{font-size:11.5px;color:var(--muted2);line-height:1.65}
    .srv-tag{display:inline-block;font-size:9.5px;font-weight:700;color:#4ade80;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.15);padding:2px 7px;border-radius:100px;margin-top:10px;letter-spacing:.3px}

    /* ───── PROCESS ───── */
    .process-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:18px;overflow:hidden;margin-top:32px}
    .process-step{background:var(--card);padding:24px;position:relative}
    .step-num{font-size:32px;font-weight:900;color:rgba(59,130,246,.15);letter-spacing:-2px;line-height:1;margin-bottom:12px}
    .step-num span{color:var(--blue);opacity:.6}
    .process-step h4{font-size:13px;font-weight:700;color:#fff;margin-bottom:6px}
    .process-step p{font-size:12px;color:var(--muted2);line-height:1.6}

    /* ───── REVIEWS ───── */
    .rev-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:28px}
    .rev-score{display:flex;align-items:center;gap:10px;background:var(--card2);border:1px solid var(--border);border-radius:14px;padding:12px 16px}
    .rev-score-num{font-size:28px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1}
    .rev-score-detail{display:flex;flex-direction:column;gap:3px}
    .rev-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .rev{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:12px}
    .rev-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
    .rev-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#6366f1);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:#fff;flex-shrink:0}
    .rev-name{font-size:12.5px;font-weight:700;color:#fff}
    .rev-loc{font-size:10.5px;color:var(--muted);margin-top:1px}
    .rev-google{width:14px;height:14px;flex-shrink:0;opacity:.6}
    .rev-text{font-size:12px;color:var(--muted2);line-height:1.7;font-style:italic;border-left:2px solid rgba(59,130,246,.3);padding-left:10px}
    .rev-date{font-size:10px;color:var(--muted);display:flex;align-items:center;gap:4px}

    /* ───── CTA BLOCK ───── */
    .cta-block{position:relative;overflow:hidden;border-radius:24px;background:linear-gradient(135deg,#0f1e3d,#0d1b35,#0a1628);border:1px solid rgba(59,130,246,.2);padding:52px 40px;text-align:center;margin:0 0 0 0}
    .cta-orb{position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
    .cta-inner{position:relative}
    .cta-block h2{font-size:28px;font-weight:900;letter-spacing:-1px;color:#fff;margin-bottom:10px;line-height:1.15}
    .cta-block h2 span{background:linear-gradient(135deg,#60a5fa,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .cta-block p{font-size:13px;color:var(--muted2);margin-bottom:28px;max-width:440px;margin-left:auto;margin-right:auto;line-height:1.7}
    .cta-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .cta-tel{display:inline-flex;align-items:center;gap:8px;background:white;color:#0a1628;font-weight:800;font-size:13.5px;padding:14px 24px;border-radius:12px;box-shadow:0 8px 24px rgba(59,130,246,.25);transition:transform .15s}
    .cta-tel:hover{transform:translateY(-1px)}
    .cta-tel svg{width:14px;height:14px;fill:#0a1628}

    /* ───── FOOTER ───── */
    .ftr{border-top:1px solid var(--border);padding:20px;text-align:center}
    .ftr p{font-size:11px;color:var(--muted);line-height:1.7}
    .ftr a{color:var(--muted);transition:color .15s}
    .ftr a:hover{color:var(--muted2)}

    /* ───── MOBILE ───── */
    @media(max-width:600px){
      .topbar{font-size:10.5px;padding:7px 12px}
      .hdr-in{padding:0 14px;height:52px}
      .hdr-nav,.trust-sep,.hdr-pill{display:none}
      .hdr-tel{font-size:11.5px;padding:7px 11px}
      .hero{padding:32px 14px 40px}
      .hero-in{grid-template-columns:1fr;gap:28px}
      .hero h1{font-size:28px;letter-spacing:-1.2px}
      .hero-desc{font-size:13px}
      .hero-btns{flex-direction:column;gap:8px}
      .btn-p,.btn-s{width:100%;justify-content:center;padding:13px 16px}
      .form-wrap{padding:18px}
      .trust-in{gap:10px;justify-content:flex-start}
      .trust-item{font-size:11px}
      .stats{grid-template-columns:repeat(2,1fr)}
      .stat{border-right:none!important;border-bottom:1px solid var(--border)}
      .stat:nth-child(odd){border-right:1px solid var(--border)!important}
      .stat:nth-last-child(-n+2){border-bottom:none}
      .stat-n{font-size:24px}
      .sec{padding:40px 14px}
      .sec-title{font-size:22px}
      .srv-grid{grid-template-columns:1fr;gap:8px}
      .srv{padding:16px}
      .process-grid{grid-template-columns:1fr;gap:0}
      .rev-grid{grid-template-columns:1fr;gap:8px}
      .rev-header{flex-direction:column;gap:12px}
      .cta-block{padding:36px 20px;border-radius:20px}
      .cta-block h2{font-size:22px}
      .cta-btns{flex-direction:column;align-items:stretch}
      .cta-tel,.btn-s{width:100%;justify-content:center}
    }
  </style>
</head>
<body>

  <!-- TOPBAR -->
  <div class="topbar">
    <span class="topbar-dot"></span>
    Disponible maintenant — Intervention garantie en 2h sur Paris &amp; Île-de-France
  </div>

  <!-- HEADER -->
  <header class="hdr">
    <div class="hdr-in">
      <div class="logo">
        <div class="logo-mark"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
        RénovElec<span style="color:var(--blue)">Paris</span>
      </div>
      <nav class="hdr-nav">
        <a href="#">Services</a>
        <a href="#">Tarifs</a>
        <a href="#">Avis</a>
        <a href="#">Contact</a>
      </nav>
      <div class="hdr-pill"><span class="hdr-pill-dot"></span>En ligne</div>
      <a href="tel:0187654321" class="hdr-tel">
        <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
        01 87 65 43 21
      </a>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-orb1"></div>
    <div class="hero-orb2"></div>
    <div class="hero-in">
      <div>
        <div class="hero-eyebrow">
          <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M12 3a9 9 0 110 18 9 9 0 010-18z"/></svg>
          RGE · Qualifelec · Assurance décennale
        </div>
        <h1>Électricien Paris<br><span>Intervention en 2h</span><br>7j/7, 24h/24</h1>
        <p class="hero-desc">Dépannage urgent, tableau électrique, mise aux normes NFC 15-100. Devis 100 % gratuit. Artisan certifié, garantie pièces &amp; main d'œuvre 2 ans.</p>
        <div class="hero-btns">
          <a href="tel:0187654321" class="btn-p">
            <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            Appel gratuit — Réponse immédiate
          </a>
          <a href="#devis" class="btn-s">Devis en ligne en 2 min →</a>
        </div>
        <div class="checks">
          <div class="check"><div class="check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>Devis 100 % gratuit, sans engagement</div>
          <div class="check"><div class="check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>Artisan local certifié RGE, assurance décennale</div>
          <div class="check"><div class="check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>Garantie 2 ans pièces &amp; main d'œuvre</div>
        </div>
      </div>
      <div class="form-wrap" id="devis">
        <div class="form-head">
          <div class="form-head-icon"><svg viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg></div>
          <div class="form-head-txt"><h3>Votre devis gratuit</h3><p>Réponse en moins de 30 minutes</p></div>
        </div>
        <div class="form-urgency">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          Technicien disponible — intervention possible aujourd'hui
        </div>
        <select class="fld">
          <option value="">Type de travaux…</option>
          <option>Dépannage urgent</option>
          <option>Tableau électrique</option>
          <option>Installation / prises</option>
          <option>Mise aux normes</option>
          <option>Éclairage / LED</option>
          <option>Domotique / IRVE</option>
        </select>
        <input class="fld" type="text" placeholder="Code postal (ex : 75011)" />
        <input class="fld" type="tel" placeholder="Votre téléphone" />
        <button class="form-btn">Obtenir mon devis gratuit →</button>
        <div class="form-footer">
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Sans engagement · Données confidentielles · Réponse sous 30 min
        </div>
      </div>
    </div>
  </section>

  <!-- TRUST BAR -->
  <div class="trust">
    <div class="trust-in">
      <div class="trust-item"><span class="trust-badge rge">RGE</span> Certifié RGE</div>
      <div class="trust-sep"></div>
      <div class="trust-item"><span class="trust-badge ql">QL</span> Qualifelec</div>
      <div class="trust-sep"></div>
      <div class="trust-item"><div class="stars">★★★★★</div>&nbsp;4,9/5 · 200+ avis Google</div>
      <div class="trust-sep"></div>
      <div class="trust-item">
        <svg style="width:13px;height:13px;fill:#4ade80" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        Assurance décennale
      </div>
      <div class="trust-sep"></div>
      <div class="trust-item">
        <svg style="width:13px;height:13px;fill:#60a5fa" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        Intervention en 2h garantie
      </div>
    </div>
  </div>

  <!-- STATS -->
  <div style="background:var(--card);border-bottom:1px solid var(--border)">
    <div style="max-width:1120px;margin:0 auto">
      <div class="stats">
        <div class="stat"><span class="stat-n"><span>2h</span></span><div class="stat-l">Délai d'intervention<br>garanti</div></div>
        <div class="stat"><span class="stat-n"><span>800</span>+</span><div class="stat-l">Clients satisfaits<br>à Paris</div></div>
        <div class="stat"><span class="stat-n"><span>4,9</span>/5</span><div class="stat-l">Note Google sur<br>200+ avis vérifiés</div></div>
        <div class="stat"><span class="stat-n"><span>12</span> ans</span><div class="stat-l">D'expérience en<br>électricité</div></div>
      </div>
    </div>
  </div>

  <!-- SERVICES -->
  <section class="sec">
    <div class="sec-in">
      <div class="sec-label">Prestations</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div>
          <div class="sec-title">Tous vos travaux électriques</div>
          <div class="sec-sub">Du dépannage d'urgence à la rénovation complète — toute l'Île-de-France.</div>
        </div>
        <a href="tel:0187654321" class="btn-p" style="flex-shrink:0;font-size:12px;padding:10px 16px">
          <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          Appeler maintenant
        </a>
      </div>
      <div class="srv-grid">
        <div class="srv">
          <div class="srv-ico"><svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="1.7"/></svg></div>
          <h4>Dépannage urgent</h4>
          <p>Panne totale, court-circuit, disjoncteur. Intervention 7j/7 dont jours fériés.</p>
          <span class="srv-tag">Disponible aujourd'hui</span>
        </div>
        <div class="srv">
          <div class="srv-ico"><svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 7h.01M12 7h.01M17 7h.01M7 12h.01M12 12h.01M17 12h.01M7 17h.01M12 17h.01"/></svg></div>
          <h4>Tableau électrique</h4>
          <p>Remplacement, mise aux normes, protection différentielle. Certificat Consuel inclus.</p>
          <span class="srv-tag">Certificat Consuel</span>
        </div>
        <div class="srv">
          <div class="srv-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg></div>
          <h4>Installation & éclairage</h4>
          <p>Prises, interrupteurs, spots LED, rails, goulottes. Finitions nettes.</p>
        </div>
        <div class="srv">
          <div class="srv-ico"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg></div>
          <h4>Mise aux normes</h4>
          <p>Conformité NFC 15-100, liaison équipotentielle, rapport Consuel.</p>
          <span class="srv-tag">NFC 15-100</span>
        </div>
        <div class="srv">
          <div class="srv-ico"><svg viewBox="0 0 24 24"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></div>
          <h4>VMC & ventilation</h4>
          <p>Installation, remplacement et entretien VMC simple et double flux. RT2020.</p>
        </div>
        <div class="srv">
          <div class="srv-ico"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div>
          <h4>Domotique & IRVE</h4>
          <p>Volets connectés, éclairage intelligent, alarme, borne recharge véhicule.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="sec" style="background:var(--card);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding-top:52px;padding-bottom:52px">
    <div class="sec-in">
      <div class="sec-label">Comment ça marche</div>
      <div class="sec-title">Intervention en 3 étapes</div>
      <div class="process-grid">
        <div class="process-step">
          <div class="step-num"><span>01</span></div>
          <h4>Appelez ou remplissez le formulaire</h4>
          <p>Nous répondons en moins de 30 minutes, 7j/7. Diagnostic rapide de votre situation.</p>
        </div>
        <div class="process-step">
          <div class="step-num"><span>02</span></div>
          <h4>Devis gratuit &amp; transparent</h4>
          <p>Prix fixe, pas de surprise. Devis détaillé envoyé par SMS ou email avant intervention.</p>
        </div>
        <div class="process-step">
          <div class="step-num"><span>03</span></div>
          <h4>Intervention &amp; garantie</h4>
          <p>Technicien certifié sur place en 2h. Travail soigné, garanti 2 ans pièces &amp; MO.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section class="sec">
    <div class="sec-in">
      <div class="rev-header">
        <div>
          <div class="sec-label">Avis clients</div>
          <div class="sec-title">Ils nous font confiance</div>
        </div>
        <div class="rev-score">
          <div class="rev-score-num">4,9</div>
          <div class="rev-score-detail">
            <div class="stars" style="font-size:13px">★★★★★</div>
            <div style="font-size:10.5px;color:var(--muted2);margin-top:3px">200+ avis Google vérifiés</div>
          </div>
        </div>
      </div>
      <div class="rev-grid">
        <div class="rev">
          <div class="rev-top">
            <div style="display:flex;align-items:center;gap:8px">
              <div class="rev-avatar">ML</div>
              <div><div class="rev-name">Marie L.</div><div class="rev-loc">Paris 11e · il y a 2 sem.</div></div>
            </div>
            <svg class="rev-google" viewBox="0 0 24 24" fill="none"><path d="M20.28 10.2H12v3.6h4.8c-.4 2.08-2.24 3.6-4.8 3.6A5.4 5.4 0 0112 6.6c1.44 0 2.72.56 3.68 1.48l2.56-2.56A8.97 8.97 0 0012 3a9 9 0 100 18c5.04 0 9-3.6 9-9 0-.6-.08-1.2-.2-1.8h.48z" fill="#8892a4"/></svg>
          </div>
          <div class="stars" style="font-size:12px">★★★★★</div>
          <p class="rev-text">"Panne totale un dimanche soir. Technicien en 1h30, problème résolu proprement. Très pro, tarif honnête. Je recommande sans hésiter."</p>
          <div class="rev-date">
            <svg viewBox="0 0 24 24" style="width:9px;height:9px;stroke:var(--muted);fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            il y a 2 semaines
          </div>
        </div>
        <div class="rev">
          <div class="rev-top">
            <div style="display:flex;align-items:center;gap:8px">
              <div class="rev-avatar" style="background:linear-gradient(135deg,#6366f1,#3b82f6)">TB</div>
              <div><div class="rev-name">Thomas B.</div><div class="rev-loc">Paris 17e · il y a 1 mois</div></div>
            </div>
            <svg class="rev-google" viewBox="0 0 24 24" fill="none"><path d="M20.28 10.2H12v3.6h4.8c-.4 2.08-2.24 3.6-4.8 3.6A5.4 5.4 0 0112 6.6c1.44 0 2.72.56 3.68 1.48l2.56-2.56A8.97 8.97 0 0012 3a9 9 0 100 18c5.04 0 9-3.6 9-9 0-.6-.08-1.2-.2-1.8h.48z" fill="#8892a4"/></svg>
          </div>
          <div class="stars" style="font-size:12px">★★★★★</div>
          <p class="rev-text">"Tableau électrique remplacé entièrement. Travail impeccable, finitions parfaites. Certificat Consuel reçu le lendemain. Excellent rapport qualité-prix."</p>
          <div class="rev-date">
            <svg viewBox="0 0 24 24" style="width:9px;height:9px;stroke:var(--muted);fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            il y a 1 mois
          </div>
        </div>
        <div class="rev">
          <div class="rev-top">
            <div style="display:flex;align-items:center;gap:8px">
              <div class="rev-avatar" style="background:linear-gradient(135deg,#22c55e,#3b82f6)">SM</div>
              <div><div class="rev-name">Sophie M.</div><div class="rev-loc">Boulogne · il y a 3 sem.</div></div>
            </div>
            <svg class="rev-google" viewBox="0 0 24 24" fill="none"><path d="M20.28 10.2H12v3.6h4.8c-.4 2.08-2.24 3.6-4.8 3.6A5.4 5.4 0 0112 6.6c1.44 0 2.72.56 3.68 1.48l2.56-2.56A8.97 8.97 0 0012 3a9 9 0 100 18c5.04 0 9-3.6 9-9 0-.6-.08-1.2-.2-1.8h.48z" fill="#8892a4"/></svg>
          </div>
          <div class="stars" style="font-size:12px">★★★★★</div>
          <p class="rev-text">"Prises et éclairage LED dans tout l'appart rénové. Équipe ponctuelle, devis respecté à l'euro. Aucune mauvaise surprise. Je referai appel à eux."</p>
          <div class="rev-date">
            <svg viewBox="0 0 24 24" style="width:9px;height:9px;stroke:var(--muted);fill:none;stroke-width:2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            il y a 3 semaines
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section class="sec" style="padding-top:0">
    <div class="sec-in">
      <div class="cta-block">
        <div class="cta-orb"></div>
        <div class="cta-inner">
          <div style="display:inline-flex;align-items:center;gap:5px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);color:#4ade80;font-size:11px;font-weight:700;padding:4px 11px;border-radius:100px;margin-bottom:18px">
            <span style="width:5px;height:5px;border-radius:50%;background:#4ade80;display:inline-block;animation:blink 2s infinite"></span>
            Disponible maintenant — 7j/7
          </div>
          <h2>Besoin d'un électricien<br>à <span>Paris</span> ?</h2>
          <p>Appelez-nous maintenant ou remplissez le formulaire. Réponse garantie en moins de 30 minutes, intervention le jour même.</p>
          <div class="cta-btns">
            <a href="tel:0187654321" class="cta-tel">
              <svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
              01 87 65 43 21 — Appel gratuit
            </a>
            <a href="#devis" class="btn-s" style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.15)">Devis en ligne →</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="ftr">
    <p>© 2025 RénovElec Paris — SIRET 123 456 789 00012 — Certifié RGE · Qualifelec · Assurance décennale</p>
    <p style="margin-top:5px"><a href="#">Mentions légales</a> · <a href="#">Confidentialité</a> · <a href="#">CGV</a></p>
  </footer>

</body>
</html>`

type Device = 'desktop' | 'mobile'
type View = 'before' | 'after' | 'split'

export function BeforeAfterDemo() {
  const [view, setView]     = useState<View>('split')
  const [device, setDevice] = useState<Device>('desktop')

  const isSplit = view === 'split'

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          {(['split', 'before', 'after'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                view === v ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {v === 'split' ? (
                <span className="flex items-center gap-1.5"><ArrowLeftRight className="h-3 w-3" />Côte à côte</span>
              ) : v === 'before' ? '← Avant' : 'Après →'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800">
          <button onClick={() => setDevice('desktop')} className={`p-2 rounded-lg transition-colors ${device === 'desktop' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Monitor className="h-3.5 w-3.5" />
          </button>
          <button onClick={() => setDevice('mobile')} className={`p-2 rounded-lg transition-colors ${device === 'mobile' ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
            <Smartphone className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isSplit ? (
          <motion.div key="split" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4">
            <SiteFrame label="Avant"                   badge="bg-red-500/20 text-red-400 border-red-500/30"     html={BEFORE_HTML} device={device} split />
            <SiteFrame label="Après — refait par l'IA" badge="bg-emerald-500/20 text-emerald-400 border-emerald-500/30" html={AFTER_HTML}  device={device} split />
          </motion.div>
        ) : (
          <motion.div key={view} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SiteFrame
              label={view === 'before' ? 'Avant' : "Après — refait par l'IA"}
              badge={view === 'before' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}
              html={view === 'before' ? BEFORE_HTML : AFTER_HTML}
              device={device}
              split={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SiteFrame({
  label, badge, html, device, split,
}: {
  label: string
  badge: string
  html: string
  device: Device
  split: boolean
}) {
  const isMobile = device === 'mobile'

  // Desktop : on affiche à 150 % et on réduit à 66,7 %
  // Mobile  : on affiche à 375 px et on réduit pour tenir dans le cadre
  const MOBILE_W   = 375
  const DESK_SCALE = 0.667          // 150 % × 0.667 = 100 %
  // En mode split chaque cadre fait ~50 % ; en plein écran ~100 %
  // On laisse l'iframe fixer sa propre hauteur interne
  const frameH = isMobile ? 580 : 520

  return (
    <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900">
      {/* Barre navigateur */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-800/60">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        {isMobile && <Smartphone className="h-3 w-3 text-zinc-500 ml-1" />}
        <span className={`ml-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge}`}>
          {label}
        </span>
      </div>

      {isMobile ? (
        /* ── Mobile : iframe 375 px centrée et réduite ────────────── */
        <div
          className="overflow-hidden bg-zinc-950 flex justify-center"
          style={{ height: frameH }}
        >
          <div style={{
            width: MOBILE_W,
            height: frameH / DESK_SCALE,
            transform: `scale(${DESK_SCALE})`,
            transformOrigin: 'top center',
            flexShrink: 0,
          }}>
            <iframe
              srcDoc={html}
              sandbox="allow-same-origin"
              style={{
                width: MOBILE_W,
                height: frameH / DESK_SCALE,
                border: 0,
                pointerEvents: 'none',
                display: 'block',
              }}
              title={label}
            />
          </div>
        </div>
      ) : (
        /* ── Desktop : iframe full-width réduite ──────────────────── */
        <div className="overflow-hidden bg-white" style={{ height: frameH }}>
          <iframe
            srcDoc={html}
            sandbox="allow-same-origin"
            style={{
              width: `${100 / DESK_SCALE}%`,
              height: frameH / DESK_SCALE,
              transform: `scale(${DESK_SCALE})`,
              transformOrigin: 'top left',
              border: 0,
              pointerEvents: 'none',
              display: 'block',
            }}
            title={label}
          />
        </div>
      )}
    </div>
  )
}
