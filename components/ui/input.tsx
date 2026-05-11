import * as React from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, type = 'text', ...props }, ref) => {
    const inputId = id ?? React.useId()

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-zinc-300"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-400" aria-label="required">*</span>
            )}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 flex items-center pointer-events-none text-zinc-500">
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              'w-full rounded-xl border bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500',
              'transition-all duration-200 outline-none',
              'border-zinc-700 hover:border-zinc-600',
              'focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'autofill:bg-zinc-900',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 flex items-center text-zinc-500">
              {rightIcon}
            </span>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-400 flex items-center gap-1" role="alert">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}

        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-zinc-500">{hint}</p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
