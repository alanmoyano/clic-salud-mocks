'use client'

import { ModeToggle } from '@/components/mode-toggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavBar() {
  const path = usePathname()

  return (
    <div className='flex items-center justify-between px-4 py-2 shadow-lg'>
      <nav className='flex gap-4'>
        <Link href='/' className='text-xl font-bold lg:text-2xl'>
          Mocks ClicSalud
        </Link>
        <div className='flex items-center justify-center gap-4'>
          <Link
            href='/demo'
            className={path === '/demo' ? 'text-lg font-semibold' : ''}
          >
            Demo
          </Link>
          <Link
            href='/test'
            className={path === '/test' ? 'text-lg font-semibold' : ''}
          >
            Test
          </Link>
          <Link
            href='/dev'
            className={path === '/dev' ? 'text-lg font-semibold' : ''}
          >
            Dev
          </Link>
        </div>
      </nav>
      <ModeToggle />
    </div>
  )
}
