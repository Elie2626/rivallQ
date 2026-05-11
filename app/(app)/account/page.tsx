'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Camera, Save } from 'lucide-react'
import { auth } from '@/lib/firebase/client'
import { updateProfile } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

interface ProfileData {
  full_name?: string
  email?: string
  plan?: string
}

const planLabel: Record<string, string> = {
  audit: 'Audit', rebuild: 'Site optimisé', installation: 'Done For You', subscription: 'Pro mensuel',
}

export default function AccountPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    setEmail(user.email ?? '')
    setFullName(user.displayName ?? '')
    setLoading(false)

    // Load profile from API
    fetch(`/api/profile`)
      .then(r => r.json())
      .then(data => {
        if (data.profile) {
          setProfile(data.profile)
          setFullName(data.profile.full_name ?? user.displayName ?? '')
        }
      })
      .catch(() => {})
  }, [])

  const handleSave = async () => {
    const user = auth.currentUser
    if (!user) return
    setSaving(true)
    try {
      await updateProfile(user, { displayName: fullName })
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName }),
      })
      if (!res.ok) throw new Error()
      toast.success('Profil mis à jour')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const initials = (fullName || email).slice(0, 2).toUpperCase()

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 rounded-2xl bg-zinc-800 animate-pulse" />)}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-100">Mon compte</h1>
        <p className="text-zinc-500 mt-1">Gérez vos informations personnelles.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
        className="flex flex-col gap-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex items-center gap-5">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl select-none">
              {initials}
            </div>
            <button className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-zinc-700 border border-zinc-600 flex items-center justify-center hover:bg-zinc-600 transition-colors"
              aria-label="Changer la photo" onClick={() => toast.info('Bientôt disponible')}>
              <Camera className="h-3 w-3 text-zinc-300" />
            </button>
          </div>
          <div>
            <p className="font-semibold text-zinc-100">{fullName || 'Sans nom'}</p>
            <p className="text-sm text-zinc-500">{email}</p>
            {profile?.plan && (
              <span className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/20">
                {planLabel[profile.plan] ?? profile.plan}
              </span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-base font-semibold text-zinc-100 mb-5">Informations personnelles</h2>
          <div className="flex flex-col gap-4">
            <Input label="Nom complet" value={fullName} onChange={(e) => setFullName(e.target.value)}
              placeholder="Marie Dupont" leftIcon={<User className="h-4 w-4" />} autoComplete="name" />
            <Input label="Email" value={email} disabled leftIcon={<Mail className="h-4 w-4" />}
              hint="L'email ne peut pas être modifié depuis cette interface" />
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="gradient" onClick={handleSave} loading={saving} leftIcon={<Save className="h-4 w-4" />}>
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
          <h2 className="text-base font-semibold text-zinc-100 mb-1">Abonnement</h2>
          <p className="text-sm text-zinc-500 mb-4">Votre plan actuel et informations de facturation.</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-200">
                {profile?.plan ? planLabel[profile.plan] : 'Aucun plan actif'}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href="/billing">Gérer la facturation</a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
