import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/mode-toggle'

const geistSans = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ClicSalud login',
  description: 'Hecho con amor por Alan',
  robots: {
    index: false,
  },
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
          Home
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
