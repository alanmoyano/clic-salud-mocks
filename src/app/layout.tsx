import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'

import { ThemeProvider } from '@/components/theme-provider'

import { NavBar } from '@/components/navbar'

import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
})

const geistMonoSans = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Mocks ClicSalud',
  description: 'Hecho con amor por Alan',
  creator: 'Alan Moyano',
  metadataBase: new URL('https://clic-salud-mocks.vercel.app'),
  openGraph: {
    type: 'website',
    title: 'Mocks ClicSalud',
    description: 'Hecho con amor por Alan',
    url: 'https://clic-salud-mocks.vercel.app',
    siteName: 'Mocks ClicSalud',
    images: [
      {
        url: '/og.webp',
        width: 1200,
        height: 630,
        alt: 'Mocks ClicSalud',
      },
    ],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${geistMonoSans.variable} antialiased`}
      >
        <ThemeProvider defaultTheme='dark' attribute='class' enableSystem>
          <NavBar />
          <main>{children}</main>
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
