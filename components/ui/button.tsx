'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer touch-manipulation select-none',
  {
    variants: {
      variant: {
        default:
          'bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-700 hover:shadow-violet-500/40',
        secondary:
          'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700',
        outline:
          'border border-zinc-700 bg-transparent text-zinc-200 hover:bg-zinc-800/60 hover:border-zinc-600',
        ghost:
          'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/20',
        gradient:
          'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:to-indigo-700 hover:shadow-violet-500/50',
        success:
          'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/20',
        link:
          'text-violet-400 underline-offset-4 hover:underline hover:text-violet-300 p-0 h-auto',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-lg',
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-10 px-5',
        lg: 'h-12 px-7 text-base',
        xl: 'h-14 px-9 text-lg rounded-2xl',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8 rounded-lg',
        'icon-lg': 'h-12 w-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLButtonElement>}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
