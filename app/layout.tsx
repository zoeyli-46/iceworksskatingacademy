import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Snowfall } from '@/components/snowfall'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'block',
  weight: ['400', '500', '600', '700'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'block',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Ice Works Skating Academy | Skating Lessons in Richmond Hill Ontario',
  description:
    'Skating lessons for all ages at Elvis Stojko Arena in Richmond Hill Ontario and the GTA. Figure skating, learn-to-skate & adult skate, power skate programs. Fall 2026 registration open.',
  generator: 'v0.app',
  icons: {
    icon: [{ url: '/images/ice-works-logo.png', type: 'image/png' }],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1e3a8a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Snowfall />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
