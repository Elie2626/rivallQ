import { NextRequest, NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase/admin'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elieamar2007@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { name, email, phone, message, siteType, pages, features, maintenance, delay, estimatedPrice } = data

    if (!name || !email) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // 1. Sauvegarde Firestore
    const db = getAdminDb()
    await db.collection('devis').add({
      name,
      email,
      phone: phone || '',
      message: message || '',
      siteType,
      pages,
      features,
      maintenance,
      delay,
      estimatedPrice,
      read: false,
      createdAt: new Date().toISOString(),
    })

    // 2. Email de notification
    if (process.env.GMAIL_APP_PASSWORD) {
      const siteLabels: Record<string, string> = {
        simple: 'Site Vitrine Simple (500 €)',
        complet: 'Site Vitrine Complet (1 000 €)',
        premium: 'Site Premium 3D (1 500 €)',
      }
      const delayLabels: Record<string, string> = {
        standard: 'Standard (3-4 semaines)',
        rapide: 'Rapide (2 semaines, +200 €)',
        express: 'Express (1 semaine, +500 €)',
      }

      const transporter = createTransporter()
      await transporter.sendMail({
        from: '"RivallQ" <elieamar2007@gmail.com>',
        to: 'elieamar2007@gmail.com',
        replyTo: `"${name}" <${email}>`,
        subject: `[RivallQ Devis] ${name} — ${estimatedPrice} €`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto">
            <h2 style="color:#7c3aed">🎯 Nouvelle demande de devis</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:120px">Nom</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:8px 0;color:#6b7280">Téléphone</td><td style="padding:8px 0">${phone}</td></tr>` : ''}
            </table>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
            <h3 style="color:#374151;margin-bottom:12px">Détails du projet</h3>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:6px 0;color:#6b7280">Type de site</td><td style="padding:6px 0;font-weight:600">${siteLabels[siteType] ?? siteType}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280">Nombre de pages</td><td style="padding:6px 0">${pages}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280">Fonctionnalités</td><td style="padding:6px 0">${features?.length ? features.join(', ') : 'Aucune'}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280">Maintenance</td><td style="padding:6px 0">${maintenance ? 'Oui — 50 €/mois' : 'Non'}</td></tr>
              <tr><td style="padding:6px 0;color:#6b7280">Délai</td><td style="padding:6px 0">${delayLabels[delay] ?? delay}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#7c3aed;border-radius:8px;text-align:center">
              <p style="margin:0;color:#e9d5ff;font-size:12px">Estimation totale</p>
              <p style="margin:4px 0 0;color:#fff;font-size:28px;font-weight:900">${estimatedPrice.toLocaleString('fr-FR')} €</p>
              ${maintenance ? '<p style="margin:4px 0 0;color:#c4b5fd;font-size:13px">+ 50 €/mois maintenance</p>' : ''}
            </div>
            ${message ? `<div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;white-space:pre-wrap">${message}</div>` : ''}
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/devis]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
