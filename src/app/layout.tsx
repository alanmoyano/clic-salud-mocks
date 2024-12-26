'use cache'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { Analytics } from '@vercel/analytics/next'

import { ThemeProvider } from '@/components/theme-provider'

import { NavBar } from '@/components/navbar'

import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mocks ClicSalud',
  description: 'Hecho con amor por Alan',
  creator: 'Alan Moyano',
}

export default async function RootLayout({
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
          <Analytics mode='production' />
        </ThemeProvider>
      </body>
    </html>
  )
}
