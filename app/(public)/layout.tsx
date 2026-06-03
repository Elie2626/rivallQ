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
      <script src="https://www.botexpress.fr/widget.js" data-chatbot-id="59072eac-39dd-458c-811c-4044fae9a0c0" data-api-url="https://agentai-23tt.onrender.com"></script>
    </>
  )
}
