'use client'

import { useState } from 'react'
import { Mail, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { HeroBackground } from '@/components/ui/hero-background'

export function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      toast.success('Message envoyé ! On vous répond sous 24h.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Erreur lors de l\'envoi. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center py-16 relative overflow-hidden">
          <HeroBackground />
          <div className="relative z-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">Contact</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-100 mb-4">On est là pour vous</h1>
            <p className="text-zinc-400 max-w-md mx-auto">
              Une question, un problème technique ou un partenariat ? Écrivez-nous.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              { icon: Mail, label: 'Email', value: 'elieamar2007@gmail.com', sub: 'Réponse sous 24h ouvrées' },
              { icon: Phone, label: 'Téléphone', value: '06 95 12 77 28', sub: 'Disponible 9h–18h CET' },
              { icon: Clock, label: 'Délai', value: '< 24 heures', sub: 'Temps de réponse moyen' },
            ].map(({ icon: Icon, label, value, sub }) => (
              <div key={label} className="flex items-start gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
                <div className="h-10 w-10 rounded-xl bg-violet-600/20 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-violet-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-zinc-200">{value}</p>
                  <p className="text-xs text-zinc-600">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Nom"
                placeholder="Marie Dupont"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
              />
              <Input
                label="Email"
                type="email"
                placeholder="marie@exemple.fr"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
            </div>
            <Input
              label="Sujet"
              placeholder="Question sur mon audit..."
              required
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-zinc-300" htmlFor="message">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={6}
                placeholder="Décrivez votre question ou votre problème..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all resize-none hover:border-zinc-600"
              />
            </div>
            <Button type="submit" variant="gradient" loading={loading} className="self-end">
              Envoyer le message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
