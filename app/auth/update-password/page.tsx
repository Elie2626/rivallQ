'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { updatePassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return }
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas.'); return }

    setLoading(true)
    try {
      const user = auth.currentUser
      if (!user) throw new Error('Non connecté')
      await updatePassword(user, password)
      toast.success('Mot de passe mis à jour !')
      router.push('/dashboard')
    } catch {
      setError('Session expirée. Veuillez vous reconnecter et réessayer.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="w-full max-w-md">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="h-14 w-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-6 w-6 text-violet-400" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-100 mb-1">Nouveau mot de passe</h1>
            <p className="text-sm text-zinc-500">Choisissez un mot de passe sécurisé (8 caractères minimum).</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <Input label="Nouveau mot de passe" type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 caractères" value={password}
              onChange={(e) => setPassword(e.target.value)} required autoFocus autoComplete="new-password"
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-zinc-300 transition-colors"
                  aria-label={showPassword ? 'Masquer' : 'Afficher'}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              } />

            <Input label="Confirmer le mot de passe" type={showPassword ? 'text' : 'password'}
              placeholder="Répétez le mot de passe" value={confirm}
              onChange={(e) => setConfirm(e.target.value)} required autoComplete="new-password"
              leftIcon={<Lock className="h-4 w-4" />} error={error} />

            <Button type="submit" variant="gradient" size="lg" loading={loading} className="w-full mt-2">
              Mettre à jour le mot de passe
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
