'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft } from 'lucide-react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
      })
      setSent(true)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      if (code === 'auth/user-not-found') {
        // Don't reveal if email exists — show success anyway
        setSent(true)
      } else {
        setError('Une erreur est survenue. Vérifiez votre email.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="w-full max-w-md">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-8 shadow-xl">
        {sent ? (
          <div className="text-center py-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-zinc-100 mb-2">Email envoyé !</h2>
            <p className="text-sm text-zinc-500 mb-6">
              Un lien de réinitialisation a été envoyé à <strong className="text-zinc-300">{email}</strong>.
              Vérifiez vos spams si vous ne le voyez pas.
            </p>
            <Button variant="outline" asChild>
              <Link href="/login" className="gap-2 inline-flex items-center">
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mb-6">
                <ArrowLeft className="h-3 w-3" /> Retour à la connexion
              </Link>
              <h1 className="text-2xl font-bold text-zinc-100 mb-1">Mot de passe oublié</h1>
              <p className="text-sm text-zinc-500">Entrez votre email pour recevoir un lien de réinitialisation.</p>
            </div>
            <form onSubmit={handleReset} className="flex flex-col gap-4">
              <Input label="Email" type="email" placeholder="vous@exemple.fr" value={email}
                onChange={(e) => setEmail(e.target.value)} required autoFocus autoComplete="email"
                leftIcon={<Mail className="h-4 w-4" />} error={error} />
              <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full">
                Envoyer le lien
              </Button>
            </form>
          </>
        )}
      </div>
    </motion.div>
  )
}
