'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { EASE_APPLE, Reveal, useBlur, useScrollMap } from '@/components/ui/apple-motion'

const TYPES = ['Site web', 'Application mobile', 'SaaS', 'Logiciel sur mesure', 'Autre'] as const

type Fields = { name: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Fields | 'type', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(field: keyof Fields, value: string): string | undefined {
  if (field === 'name' && !value.trim()) return 'Indiquez votre nom pour que l’on sache à qui répondre.'
  if (field === 'email') {
    if (!value.trim()) return 'Indiquez votre email pour recevoir notre réponse.'
    if (!EMAIL_RE.test(value)) return 'Cet email semble incomplet — vérifiez le « @ » et le domaine.'
  }
  if (field === 'message' && value.trim().length < 10) return 'Décrivez votre projet en quelques mots (10 caractères minimum).'
  return undefined
}

const inputClass =
  'w-full rounded-2xl bg-white/[0.04] px-4 py-3.5 text-base text-fg ring-1 ring-hairline placeholder:text-fg-subtle transition-[box-shadow,background-color] duration-300 hover:ring-hairline-strong focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-fg aria-[invalid=true]:ring-danger/70'

function Field({
  id, label, required, error, children,
}: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg-muted">
        {label}{required && <span className="text-fg-subtle" aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-2 text-sm text-danger">{error}</p>}
    </div>
  )
}

function ContactForm() {
  const [type, setType] = useState<string>('')
  const [fields, setFields] = useState<Fields>({ name: '', email: '', company: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const update = (field: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: validate(field, e.target.value) }))
  }
  const blur = (field: keyof Fields) => () => setErrors(er => ({ ...er, [field]: validate(field, fields[field]) }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const next: Errors = {
      type: type ? undefined : 'Choisissez le type de projet.',
      name: validate('name', fields.name),
      email: validate('email', fields.email),
      message: validate('message', fields.message),
    }
    setErrors(next)
    const firstError = (['type', 'name', 'email', 'message'] as const).find(k => next[k])
    if (firstError) {
      document.getElementById(firstError === 'type' ? 'type-0' : firstError)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          subject: `Nouveau projet — ${type}`,
          message: fields.company.trim()
            ? `Entreprise : ${fields.company.trim()}\n\n${fields.message.trim()}`
            : fields.message.trim(),
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative rounded-[2rem] bg-surface p-6 ring-1 ring-hairline sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'sent' ? (
          <m.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: EASE_APPLE }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid size-16 place-items-center rounded-full bg-fg">
              <Check className="size-7 text-canvas" aria-hidden="true" />
            </span>
            <p className="mt-6 text-2xl font-semibold tracking-tight text-fg">Message envoyé.</p>
            <p className="mt-2 max-w-sm text-fg-muted">Merci ! Nous étudions votre projet et revenons vers vous rapidement.</p>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={submit}
            noValidate
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)', transition: { duration: 0.3, ease: 'easeIn' } }}
            className="space-y-6"
          >
            <fieldset>
              <legend className="mb-3 text-sm font-medium text-fg-muted">
                Votre projet<span className="text-fg-subtle" aria-hidden="true"> *</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t, i) => (
                  <label key={t} className="cursor-pointer">
                    <input
                      id={`type-${i}`}
                      type="radio"
                      name="type"
                      value={t}
                      checked={type === t}
                      onChange={() => { setType(t); setErrors(er => ({ ...er, type: undefined })) }}
                      className="peer sr-only"
                      aria-describedby={errors.type ? 'type-error' : undefined}
                    />
                    <span className="inline-flex h-11 items-center rounded-full px-4 text-sm text-fg-muted ring-1 ring-hairline transition-[background-color,color,box-shadow] duration-300 ease-apple hover:ring-hairline-strong peer-checked:bg-fg peer-checked:text-canvas peer-checked:ring-fg peer-focus-visible:ring-2 peer-focus-visible:ring-fg">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
              {errors.type && <p id="type-error" className="mt-2 text-sm text-danger">{errors.type}</p>}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field id="name" label="Nom" required error={errors.name}>
                <input
                  id="name" type="text" autoComplete="name" value={fields.name}
                  onChange={update('name')} onBlur={blur('name')}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass}
                />
              </Field>
              <Field id="email" label="Email" required error={errors.email}>
                <input
                  id="email" type="email" inputMode="email" autoComplete="email" value={fields.email}
                  onChange={update('email')} onBlur={blur('email')}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field id="company" label="Entreprise">
              <input
                id="company" type="text" autoComplete="organization" value={fields.company}
                onChange={update('company')}
                className={inputClass}
              />
            </Field>

            <Field id="message" label="Parlez-nous de votre projet" required error={errors.message}>
              <textarea
                id="message" rows={5} value={fields.message}
                onChange={update('message')} onBlur={blur('message')}
                placeholder="Objectifs, fonctionnalités, délais, budget…"
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClass} resize-none`}
              />
            </Field>

            {status === 'error' && (
              <p role="alert" className="rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger ring-1 ring-danger/30">
                L’envoi n’a pas abouti, probablement un souci de connexion. Vos informations sont conservées : réessayez dans un instant.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-fg px-7 text-[15px] font-medium text-canvas transition-[background-color,transform,opacity] duration-300 ease-apple hover:bg-white/85 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <ArrowRight className="size-4 transition-transform duration-300 ease-apple group-hover:translate-x-0.5" aria-hidden="true" />
                </>
              )}
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] })
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  const opacity = useScrollMap(scrollYProgress, [0, 1], [0.15, 1])
  const filter = useBlur(useTransform(scrollYProgress, [0, 1], [12, 0]))

  return (
    <section id="contact" ref={ref} className="bg-canvas px-4 pb-32 pt-24 sm:px-6 lg:pb-40">
      <div className="mx-auto max-w-6xl">
        <m.div style={reduced ? undefined : { scale, opacity, filter }} className="origin-bottom text-center">
          <h2 className="text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.04em] text-fg sm:text-7xl lg:text-8xl">
            Parlons de<br />votre projet.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-fg-muted">
            Décrivez votre idée en quelques lignes. Vous recevez une première réponse et une estimation, sans engagement.
          </p>
        </m.div>

        <Reveal className="mx-auto mt-16 max-w-3xl" y={48}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
