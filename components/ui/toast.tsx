'use client'

// We use Sonner for toasts — this is the provider wrapper
import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#18181b',
          border: '1px solid #3f3f46',
          color: '#f4f4f5',
          borderRadius: '12px',
        },
        classNames: {
          success: 'border-emerald-500/30 text-emerald-300',
          error: 'border-red-500/30 text-red-300',
          warning: 'border-yellow-500/30 text-yellow-300',
        },
      }}
    />
  )
}

// Re-export toast function from sonner for convenience
export { toast } from 'sonner'
