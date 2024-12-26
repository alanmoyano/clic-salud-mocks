import type { Metadata } from 'next'
import Link from 'next/link'
import { Geist } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'

import { ModeToggle } from '@/components/ui/mode-toggle'

import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mocks ClicSalud',
  description: 'Hecho con amor por Alan',
  creator: 'Alan Moyano',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider defaultTheme='dark' attribute='class' enableSystem>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

function NavBar() {
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
