import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/ui/apple-motion'
import { PROJECTS, type Project } from './projects'

function Card({ project, hidden = false }: { project: Project; hidden?: boolean }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${project.name} — ${project.category} (s’ouvre dans un nouvel onglet)`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="group block"
    >
      <div className="sheen aspect-[1200/630] overflow-hidden rounded-2xl bg-elevated ring-1 ring-hairline transition-[box-shadow] duration-500 group-hover:ring-hairline-strong">
        <img
          src={project.shot}
          alt={`Page d’accueil du site ${project.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="size-9 shrink-0 overflow-hidden rounded-[23%] ring-1 ring-hairline" style={{ background: project.logoBg }}>
          <img src={project.logo} alt="" className="h-full w-full object-cover" style={{ transform: `scale(${project.logoZoom ?? 1})` }} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-fg">{project.name}</p>
          <p className="truncate text-xs text-fg-subtle">{project.category}</p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-fg" aria-hidden="true" />
      </div>
    </a>
  )
}

/** One column drifting upward forever: the list is rendered twice so the loop is seamless. */
function Column({ projects, duration }: { projects: Project[]; duration: number }) {
  return (
    <div className="overflow-hidden">
      <div className="animate-scroll-up flex flex-col hover:[animation-play-state:paused]" style={{ ['--duration' as string]: `${duration}s` }}>
        {[0, 1].map(copy => (
          <div key={copy} className="flex flex-col gap-8 pb-8">
            {projects.map(p => <Card key={p.name} project={p} hidden={copy === 1} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

const columns = (count: number) =>
  Array.from({ length: count }, (_, c) => PROJECTS.filter((_, i) => i % count === c))

const DURATIONS = [38, 46, 42]

export function Work() {
  return (
    <section id="realisations" className="bg-canvas py-24 lg:py-32">
      <Reveal className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-medium text-fg-subtle">Réalisations</p>
        <h2 className="text-shine mt-2 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Des projets en ligne,<br />utilisés chaque jour.
        </h2>
      </Reveal>

      <div className="mx-auto mt-12 h-[85vh] max-w-7xl overflow-hidden px-4 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] sm:px-6">
        <div className="h-full lg:hidden">
          <Column projects={PROJECTS} duration={60} />
        </div>
        <div className="hidden h-full grid-cols-2 gap-8 lg:grid">
          {columns(2).map((list, c) => <Column key={c} projects={list} duration={DURATIONS[c]} />)}
        </div>
      </div>
    </section>
  )
}
