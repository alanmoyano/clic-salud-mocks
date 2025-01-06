import { Button, ButtonProps } from '@/components/ui/button'
import { Environment } from '@/lib/types'
import { ArrowUpRight } from 'lucide-react'

interface LoginButtonProps extends ButtonProps {
  environment: Environment
  local?: boolean
  children?: React.ReactNode
}

export function LoginButton({
  environment,
  local,
  children,
  ...props
}: LoginButtonProps) {
  return (
    <Button {...props}>
      <span className='flex items-center gap-1'>
        <ArrowUpRight />
        {children ? (
          children
        ) : (
          <>
            Iniciar sesión en{' '}
            <strong>
              {environment} {local ? 'local' : 'desplegado'}
            </strong>
          </>
        )}
      </span>
    </Button>
  )
}
