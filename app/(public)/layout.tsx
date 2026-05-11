import { PublicNavbar } from '@/components/layouts/public-navbar'
import { PublicFooter } from '@/components/layouts/public-footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <PublicFooter />
    </>
  )
}
