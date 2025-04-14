import { Button, ButtonProps } from '@/components/ui/button'
import { Environment } from '@/lib/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

interface LoginButtonProps extends ButtonProps {
  environment: Environment
  local?: boolean
  href: string
}

export function LoginButton({
  environment,
  local,
  href,
  ...props
}: LoginButtonProps) {
  return (
    <Button {...props} asChild>
      <Link
        href={href}
        target='_blank'
        rel='noreferrer'
        className='flex items-center gap-1'
      >
        <ArrowUpRight />
        <p>
          Iniciar sesión en{' '}
          <strong>
            {environment} {local ? 'local' : 'desplegado'}
          </strong>
        </p>
      </Link>
    </Button>
  )
}
