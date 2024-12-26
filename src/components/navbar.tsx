import { ModeToggle } from '@/components/ui/mode-toggle'
import Link from 'next/link'

export function NavBar() {
  return (
    <div className='flex items-center justify-between px-4 py-2 shadow-lg'>
      <nav className='flex gap-4'>
        <Link href='/' className='text-3xl font-bold'>
          Mocks ClicSalud
        </Link>
        <div className='flex items-center justify-center gap-4'>
          <Link href='/demo'>Demo</Link>
          <Link href='/test'>Test</Link>
          <Link href='/dev'>Dev</Link>
        </div>
      </nav>
      <ModeToggle />
    </div>
  )
}
