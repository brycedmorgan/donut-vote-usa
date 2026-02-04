import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Donut Vote USA 🍩 | America\'s Favorite Donut, Decided by You',
  description: 'Vote for your favorite donuts and donut shops across all 50 states. Every 2,000th vote wins a $5 DoorDash gift card! Live leaderboards updated in real-time.',
  keywords: 'donuts, donut voting, best donuts, donut shops, America, contest, DoorDash, food voting',
  openGraph: {
    title: 'Donut Vote USA 🍩',
    description: 'Vote for America\'s favorite donut! Every 2,000th vote wins a $5 DoorDash gift card.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Donut Vote USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Donut Vote USA 🍩',
    description: 'Vote for America\'s favorite donut! Every 2,000th vote wins.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
