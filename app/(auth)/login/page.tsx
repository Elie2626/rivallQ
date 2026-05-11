'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GoogleSignInButton } from '@/components/auth/google-sign-in-button'
import { toast } from 'sonner'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await credential.user.getIdToken()

      const res = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })

      if (!res.ok) throw new Error('Session creation failed')

      toast.success('Connexion réussie !')
      router.push(redirect)
      router.refresh()
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
        setError('Email ou mot de passe incorrect.')
      } else if (code === 'auth/operation-not-allowed') {
        setError('Connexion par email désactivée. Activez-la dans Firebase Console → Authentication → Sign-in method.')
      } else if (code === 'auth/too-many-requests') {
        setError('Trop de tentatives. Réessayez dans quelques minutes.')
      } else if (code === 'auth/network-request-failed') {
        setError('Erreur réseau. Vérifiez votre connexion.')
      } else {
        setError(`Erreur : ${code ?? 'inconnue'}. Réessayez.`)
      }
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-zinc-100 mb-1">Content de vous revoir</h1>
          <p className="text-sm text-zinc-500">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-violet-600 hover:text-violet-500 font-medium transition-colors">
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Google */}
        <GoogleSignInButton redirectTo={redirect} label="Continuer avec Google" />

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-800" /></div>
          <div className="relative flex justify-center"><span className="bg-zinc-900 px-3 text-xs text-zinc-600">ou par email</span></div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          <Input label="Email" type="email" placeholder="vous@exemple.fr" value={email}
            onChange={(e) => setEmail(e.target.value)} required autoComplete="email" autoFocus
            leftIcon={<Mail className="h-4 w-4" />} />

          <Input label="Mot de passe" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
            value={password} onChange={(e) => setPassword(e.target.value)} required
            autoComplete="current-password" leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="hover:text-zinc-300 transition-colors"
                aria-label={showPassword ? 'Masquer' : 'Afficher'}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            }
            error={error} />

          <div className="flex justify-end">
            <Link href="/reset-password" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Mot de passe oublié ?
            </Link>
          </div>

          <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full mt-2">
            Se connecter
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-zinc-600 mt-6">
        En vous connectant, vous acceptez nos{' '}
        <Link href="/terms" className="hover:text-zinc-400 transition-colors">CGU</Link>
        {' '}et notre{' '}
        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Politique de confidentialité</Link>.
      </p>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md h-96 rounded-2xl border border-zinc-800 bg-zinc-900/60 animate-pulse" />}>
      <LoginForm />
    </Suspense>
  )
}
