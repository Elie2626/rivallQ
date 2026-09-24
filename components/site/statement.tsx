import { ScrollWords } from '@/components/ui/apple-motion'

export function Statement() {
  return (
    <section className="bg-canvas px-4 py-32 sm:px-6 lg:py-48">
      <div className="mx-auto max-w-5xl">
        <ScrollWords
          className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg sm:text-5xl lg:text-[3.5rem]"
          text="Un site qui inspire confiance. Une application que vos clients adorent. Un logiciel qui fait gagner des heures à vos équipes. Chaque projet est pensé pour une seule chose : faire grandir votre activité."
        />
      </div>
    </section>
  )
}
