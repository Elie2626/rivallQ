import Image from 'next/image'

interface LogoSphereProps {
  size?: number
  className?: string
}

export function LogoSphere({ size = 36, className = '' }: LogoSphereProps) {
  return (
    <Image
      src="/logo.svg"
      alt="RivallQ"
      width={size}
      height={size}
      className={`flex-shrink-0 ${className}`}
      priority
    />
  )
}
