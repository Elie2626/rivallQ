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
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // 1. Sauvegarde dans Firestore
    const db = getAdminDb()
    await db.collection('contacts').add({
      name,
      email,
      subject,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    })

    // 2. Email de notification via Gmail
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = createTransporter()
      await transporter.sendMail({
        from: '"RivallQ" <elieamar2007@gmail.com>',
        to: 'elieamar2007@gmail.com',
        replyTo: `"${name}" <${email}>`,
        subject: `[RivallQ Contact] ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:auto">
            <h2 style="color:#7c3aed">Nouveau message de contact</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;color:#6b7280;width:80px">Nom</td>
                <td style="padding:8px 0;font-weight:600">${name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280">Email</td>
                <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6b7280">Sujet</td>
                <td style="padding:8px 0">${subject}</td>
              </tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;white-space:pre-wrap;font-size:14px">${message}</div>
            <p style="margin-top:16px;font-size:12px;color:#9ca3af">
              Réponds directement à cet email pour répondre à ${name}.
            </p>
          </div>
        `,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[/api/contact]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
