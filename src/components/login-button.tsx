import { Button, ButtonProps } from '@/components/ui/button'
import { Environment } from '@/lib/types'
import { ArrowUpRight } from 'lucide-react'

interface LoginButtonProps extends ButtonProps {
  environment: Environment
  local?: boolean
}

export function LoginButton({
  environment,
  local,
  ...props
}: LoginButtonProps) {
  return (
    <Button {...props}>
      <span className='flex items-center gap-1'>
        <ArrowUpRight />
        Iniciar sesión en{' '}
        <strong>
          {environment} {local ? 'local' : 'desplegado'}
        </strong>
      </span>
    </Button>
  )
}
