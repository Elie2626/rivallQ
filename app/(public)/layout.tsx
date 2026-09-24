import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/site-footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
