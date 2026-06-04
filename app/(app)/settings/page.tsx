'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Bell, Shield, Globe, Trash2, Save, Loader2 } from 'lucide-react'
import { auth } from '@/lib/firebase/client'
import { sendPasswordResetEmail, signOut } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const sections = [
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Sécurité', icon: Shield },
  { id: 'preferences', label: 'Préférences', icon: Globe },
  { id: 'danger', label: 'Zone de danger', icon: Trash2 },
]

interface Settings {
  notif_audit_complete: boolean
  notif_rebuild_complete: boolean
  notif_weekly_report: boolean
  notif_marketing: boolean
  lang: string
  currency: string
}

const DEFAULTS: Settings = {
  notif_audit_complete: true,
  notif_rebuild_complete: true,
  notif_weekly_report: false,
  notif_marketing: false,
  lang: 'fr',
  currency: 'eur',
}

export default function SettingsPage() {
  const [active, setActive] = useState('notifications')
  const [settings, setSettings] = useState<Settings>(DEFAULTS)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const loadSettings = useCallback(async () => {
    const user = auth.currentUser
    if (!user) return

    setUserEmail(user.email ?? '')

    const res = await fetch('/api/profile')
    const data = await res.json()
    if (data.profile?.settings) {
      setSettings({ ...DEFAULTS, ...data.profile.settings })
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadSettings() }, [loadSettings])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      if (!res.ok) throw new Error()
      toast.success('Paramètres sauvegardés')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!userEmail) return
    setResetLoading(true)
    try {
      await sendPasswordResetEmail(auth, userEmail)
      toast.success('Email de réinitialisation envoyé à ' + userEmail)
    } catch (err: unknown) {
      toast.error('Erreur : ' + (err instanceof Error ? err.message : 'Inconnue'))
    } finally {
      setResetLoading(false)
    }
  }

  const set = (key: keyof Settings, value: boolean | string) =>
    setSettings(s => ({ ...s, [key]: value }))

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Paramètres</h1>
        <p className="text-zinc-500 mt-1">Gérez vos préférences et la sécurité de votre compte.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar nav */}
        <nav className="w-52 shrink-0" aria-label="Sections des paramètres">
          <ul className="flex flex-col gap-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  onClick={() => setActive(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active === id
                      ? 'bg-violet-600/20 text-violet-400'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                  aria-current={active === id ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Panel */}
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
        >
          {/* ── Notifications ── */}
          {active === 'notifications' && (
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Notifications par email</h2>
              <p className="text-sm text-zinc-500 mb-6">Choisissez les emails que vous souhaitez recevoir.</p>

              <div className="flex flex-col gap-5">
                {([
                  { key: 'notif_audit_complete', label: 'Audit terminé', desc: 'Quand votre rapport SEO est prêt' },
                  { key: 'notif_rebuild_complete', label: 'Site reconstruit', desc: 'Quand votre nouveau site est généré par l\'IA' },
                  { key: 'notif_weekly_report', label: 'Rapport hebdomadaire', desc: 'Résumé de vos audits chaque lundi' },
                  { key: 'notif_marketing', label: 'Conseils & actualités', desc: 'Astuces SEO et nouveautés RivallQ' },
                ] as { key: keyof Settings; label: string; desc: string }[]).map(({ key, label, desc }) => (
                  <label key={key} className="flex items-center justify-between gap-4 cursor-pointer group">
                    <div>
                      <p className="text-sm font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{label}</p>
                      <p className="text-xs text-zinc-500">{desc}</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={settings[key] as boolean}
                      onClick={() => set(key, !(settings[key] as boolean))}
                      className={`relative flex-shrink-0 w-10 h-5 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:outline-none ${
                        settings[key] ? 'bg-violet-600' : 'bg-zinc-700'
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                        settings[key] ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="gradient" onClick={handleSave} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}

          {/* ── Sécurité ── */}
          {active === 'security' && (
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Sécurité</h2>
              <p className="text-sm text-zinc-500 mb-6">Gérez votre mot de passe et la sécurité de votre compte.</p>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Mot de passe</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Un email de réinitialisation sera envoyé à <span className="text-zinc-400">{userEmail}</span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    loading={resetLoading}
                    onClick={handlePasswordReset}
                  >
                    Modifier
                  </Button>
                </div>

                <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Sessions actives</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Déconnecte votre compte sur cet appareil</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      await signOut(auth)
                      await fetch('/api/auth/session', { method: 'DELETE' })
                      toast.success('Session révoquée')
                      window.location.href = '/login'
                    }}
                  >
                    Révoquer tout
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ── Préférences ── */}
          {active === 'preferences' && (
            <div>
              <h2 className="text-lg font-semibold text-zinc-100 mb-1">Préférences</h2>
              <p className="text-sm text-zinc-500 mb-6">Personnalisez votre expérience RivallQ.</p>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 p-4">
                  <label htmlFor="lang-select" className="block text-sm font-medium text-zinc-200 mb-2">Langue</label>
                  <select
                    id="lang-select"
                    value={settings.lang}
                    onChange={(e) => set('lang', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 p-4">
                  <label htmlFor="currency-select" className="block text-sm font-medium text-zinc-200 mb-2">Devise d&apos;affichage</label>
                  <select
                    id="currency-select"
                    value={settings.currency}
                    onChange={(e) => set('currency', e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="eur">EUR (€)</option>
                    <option value="usd">USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="gradient" onClick={handleSave} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
                  Sauvegarder
                </Button>
              </div>
            </div>
          )}

          {/* ── Zone de danger ── */}
          {active === 'danger' && (
            <div>
              <h2 className="text-lg font-semibold text-red-400 mb-1">Zone de danger</h2>
              <p className="text-sm text-zinc-500 mb-6">Ces actions sont irréversibles. Procédez avec précaution.</p>

              <div className="flex flex-col gap-4">
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Supprimer tous mes audits</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Efface tous vos rapports définitivement</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={async () => {
                      if (!confirm('Supprimer tous vos audits ? Cette action est irréversible.')) return
                      const res = await fetch('/api/audits/delete-all', { method: 'DELETE' })
                      if (res.ok) {
                        toast.success('Tous vos audits ont été supprimés')
                      } else {
                        toast.error('Erreur lors de la suppression')
                      }
                    }}
                  >
                    Supprimer
                  </Button>
                </div>

                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">Supprimer mon compte</p>
                    <p className="text-xs text-zinc-500 mt-0.5">Contactez le support pour supprimer définitivement votre compte</p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      window.location.href = 'mailto:elieamar2007@gmail.com?subject=Suppression de compte'
                    }}
                  >
                    Contacter le support
                  </Button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
