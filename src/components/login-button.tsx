import { Button } from '@/components/ui/button'
import { Environment } from '@/lib/types'
import { ArrowUpRight } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  environment: Environment
}

export function LoginButton({ environment, ...props }: ButtonProps) {
  return (
    <Button {...props}>
      <span className='flex items-center gap-1'>
        <ArrowUpRight />
        Iniciar Sesión en <strong>{environment}</strong>
      </span>
    </Button>
  )
}
