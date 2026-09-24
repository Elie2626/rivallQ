import { Bell, Calendar, Check, Home, LayoutGrid, Search, User } from 'lucide-react'

export function BrowserFrame({
  src, url, className = '', priority = false,
}: { src: string; url: string; className?: string; priority?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-elevated ring-1 ring-hairline-strong shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-hairline px-3">
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="size-2.5 rounded-full bg-fg-subtle/40" />
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-3 py-0.5 text-[10px] text-fg-subtle">{url}</span>
      </div>
      <img
        src={src}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        className="aspect-[1200/630] w-full object-cover object-top"
      />
    </div>
  )
}

export function PhoneMock({ className = '' }: { className?: string }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[2.6rem] bg-elevated p-[6px] ring-1 ring-hairline-strong shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.2rem] bg-canvas px-4 pt-3">
        <div className="absolute left-1/2 top-2 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black ring-1 ring-hairline" />
        <div className="flex justify-between px-2 text-[10px] font-semibold text-fg">
          <span>9:41</span>
          <span className="tracking-widest">•••</span>
        </div>

        <p className="mt-6 text-[11px] text-fg-subtle">Mardi 14 mai</p>
        <p className="text-lg font-semibold tracking-tight text-fg">Bonjour Léa</p>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-elevated p-3.5">
          <svg viewBox="0 0 36 36" className="size-12 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-white/10" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="26" className="text-fg" />
          </svg>
          <div>
            <p className="text-[10px] text-fg-subtle">Objectif de la semaine</p>
            <p className="text-base font-semibold text-fg">72 %</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {['Séances', 'Progrès'].map((label, i) => (
            <div key={label} className="rounded-2xl bg-elevated p-3">
              <p className="text-[10px] text-fg-subtle">{label}</p>
              <p className="text-sm font-semibold text-fg">{i ? '+12' : '8'}</p>
              <div className="mt-2 flex h-6 items-end gap-0.5">
                {[40, 65, 50, 80, 60, 90, 75].map((h, j) => (
                  <span key={j} className="flex-1 rounded-sm bg-fg/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-2">
          {['Mathématiques', 'Anglais'].map(t => (
            <div key={t} className="flex items-center gap-2.5 rounded-xl bg-elevated px-3 py-2.5">
              <span className="grid size-6 place-items-center rounded-lg bg-white/10"><Calendar className="size-3 text-fg" /></span>
              <span className="text-[11px] font-medium text-fg">{t}</span>
              <span className="ml-auto text-[10px] text-fg-subtle">14:00</span>
            </div>
          ))}
        </div>

        <div className="mt-auto -mx-4 flex justify-around border-t border-hairline bg-canvas/80 px-4 pb-5 pt-3 text-fg-subtle">
          <Home className="size-4 text-fg" /><Search className="size-4" /><Bell className="size-4" /><User className="size-4" />
        </div>
      </div>
    </div>
  )
}

const ROWS = [
  { client: 'Durand & Fils', status: 'Terminé', date: '12 mai' },
  { client: 'Atelier Morel', status: 'En cours', date: '13 mai' },
  { client: 'Société Lemaire', status: 'Planifié', date: '14 mai' },
  { client: 'Boulangerie Petit', status: 'En cours', date: '14 mai' },
  { client: 'Garage Faure', status: 'Planifié', date: '15 mai' },
]

export function SoftwareMock({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-elevated ring-1 ring-hairline-strong shadow-[0_40px_80px_-20px_rgb(0_0_0/0.9)] ${className}`}>
      <div className="flex">
        <aside className="hidden w-36 shrink-0 border-r border-hairline p-3 sm:block">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-fg">
            <LayoutGrid className="size-3.5" /> Opérations
          </p>
          {['Tableau de bord', 'Interventions', 'Clients', 'Factures', 'Équipe'].map((item, i) => (
            <p key={item} className={`mb-1 rounded-md px-2 py-1.5 text-[10px] ${i === 1 ? 'bg-white/10 text-fg' : 'text-fg-subtle'}`}>{item}</p>
          ))}
        </aside>
        <div className="min-w-0 flex-1 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-fg">Interventions</p>
            <span className="rounded-full bg-fg px-2.5 py-1 text-[10px] font-medium text-canvas">+ Nouvelle</span>
          </div>
          <div className="mb-3 grid grid-cols-3 gap-2">
            {[['Cette semaine', '24'], ['En cours', '7'], ['Délai moyen', '1,8 j']].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-white/5 p-2">
                <p className="text-[9px] text-fg-subtle">{k}</p>
                <p className="text-sm font-semibold text-fg tabular-nums">{v}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-lg ring-1 ring-hairline">
            {ROWS.map(r => (
              <div key={r.client} className="flex items-center gap-2 border-b border-hairline px-3 py-2 text-[10px] last:border-0">
                <span className="flex-1 truncate text-fg">{r.client}</span>
                <span className={`rounded-full px-2 py-0.5 ${r.status === 'Terminé' ? 'bg-fg text-canvas' : 'bg-white/10 text-fg-muted'}`}>{r.status}</span>
                <span className="w-12 text-right text-fg-subtle tabular-nums">{r.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FloatingCard({ title, subtitle, className = '' }: { title: string; subtitle: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-elevated/80 px-4 py-3 ring-1 ring-hairline-strong backdrop-blur-xl shadow-[0_30px_60px_-15px_rgb(0_0_0/0.9)] ${className}`}>
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-fg">
        <Check className="size-4 text-canvas" />
      </span>
      <div>
        <p className="text-xs font-semibold text-fg">{title}</p>
        <p className="text-[11px] text-fg-subtle">{subtitle}</p>
      </div>
    </div>
  )
}
