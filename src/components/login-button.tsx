'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Environment } from '@/lib/types'
import { ArrowUpRight, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

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
    <HoverCard openDelay={500}>
      <HoverCardTrigger asChild>
        <Button
          {...props}
          asChild
          onContextMenu={e => {
            e.preventDefault()
            console.log({ event: e })
            navigator.clipboard.writeText(href)
            toast.success('URL copiada al portapapeles')
          }}
        >
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
      </HoverCardTrigger>
      <HoverCardContent className='w-full'>
        <span className='flex items-center gap-2'>
          <strong className='flex items-center gap-2'>
            <SparklesIcon />
            <p>Tip</p>
          </strong>
          <p>Puedes usar click derecho para copiar la URL</p>
        </span>
        <code>{href}</code>
      </HoverCardContent>
    </HoverCard>
  )
}
