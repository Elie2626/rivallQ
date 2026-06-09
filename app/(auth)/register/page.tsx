'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, Globe } from 'lucide-react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button'
import { toast } from 'sonner'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefilledUrl = searchParams.get('url') ?? ''

  const [form, setForm] = useState({ fullName: '', email: '', password: '', websiteUrl: prefilledUrl })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fullName.trim()) e.fullName = 'Votre nom est requis'
    if (!form.email.trim()) e.email = "L'email est requis"
    if (form.password.length < 8) e.password = 'Minimum 8 caractères'
    return e
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const validation = validate()
    if (Object.keys(validation).length > 0) { setErrors(validation); return }
    setErrors({})
    setLoading(true)

    try {
      const credential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      await updateProfile(credential.user, { displayName: form.fullName })
      const idToken = await credential.user.getIdToken()

      await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken, userData: { full_name: form.fullName } }),
      })

      toast.success('Compte créé !')
      router.push(form.websiteUrl ? `/audit/new?url=${encodeURIComponent(form.websiteUrl)}` : '/dashboard')
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      if (code === 'auth/email-already-in-use') {
        setErrors({ general: 'Cet email est déjà utilisé.' })
      } else {
        setErrors({ general: 'Une erreur est survenue. Réessayez.' })
      }
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="w-full max-w-md">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-100 mb-1">Créer votre compte</h1>
          <p className="text-sm text-zinc-500">
            Déjà inscrit ?{' '}
            <Link href="/login" className="text-violet-600 hover:text-violet-500 font-medium transition-colors">
              Se connecter
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-zinc-800">
          {['Audit à 4,99€', 'Résultats en 60s', 'Remboursé si insatisfait'].map(t => (
            <span key={t} className="text-[11px] text-zinc-600">{t}</span>
          ))}
        </div>

        {/* Google */}
        <GoogleSignInButton
          redirectTo={prefilledUrl ? `/audit/new?url=${encodeURIComponent(prefilledUrl)}` : '/dashboard'}
          label="S'inscrire avec Google"
        />

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800" /></div>
          <div className="relative flex justify-center"><span className="bg-zinc-900 px-3 text-xs text-zinc-600">ou par email</span></div>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4" noValidate>
          <Input label="Nom complet" placeholder="Marie Dupont" value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })} required
            autoComplete="name" autoFocus leftIcon={<User className="h-4 w-4" />} error={errors.fullName} />

          <Input label="Email" type="email" placeholder="vous@exemple.fr" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} required
            autoComplete="email" leftIcon={<Mail className="h-4 w-4" />} error={errors.email} />

          <Input label="Mot de passe" type={showPassword ? 'text' : 'password'} placeholder="Minimum 8 caractères"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required
            autoComplete="new-password" leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="hover:text-zinc-300 transition-colors"
                aria-label={showPassword ? 'Masquer' : 'Afficher'}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            } error={errors.password} />

          {prefilledUrl && (
            <Input label="URL de votre site" type="url" value={form.websiteUrl}
              onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
              leftIcon={<Globe className="h-4 w-4" />} hint="Votre premier audit sera lancé automatiquement" />
          )}

          {errors.general && <p className="text-sm text-red-500 text-center" role="alert">{errors.general}</p>}

          <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full mt-2">
            {prefilledUrl ? 'Créer mon compte & auditer' : 'Créer mon compte'}
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-zinc-600 mt-6">
        En créant un compte, vous acceptez nos{' '}
        <Link href="/terms" className="hover:text-zinc-400 transition-colors">CGU</Link>
        {' '}et notre{' '}
        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Politique de confidentialité</Link>.
      </p>
    </motion.div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md h-[600px] rounded-2xl border border-zinc-800 bg-zinc-900/60 animate-pulse" />}>
      <RegisterForm />
    </Suspense>
  )
}
