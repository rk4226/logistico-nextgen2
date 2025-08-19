import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import VideoBackground from './components/VideoBackground'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
  description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations. Strategic, secure, and scalable government contracting solutions.',
  keywords: 'federal procurement, AI automation, government contracting, SAM.gov, DIBBS, Odoo integration, NSN matching, bid automation',
  authors: [{ name: 'Logistico.AI' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.png?v=2', type: 'image/png' },
    ],
    apple: '/favicon.png?v=2',
    shortcut: '/favicon.png?v=2',
  },
  openGraph: {
    title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
    description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/favicon.png?v=2',
        width: 32,
        height: 32,
        alt: 'Logistico.AI - Logistics and Delivery Icon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
    description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations.',
    images: ['/favicon.png?v=2'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <VideoBackground variant="fixed" />
        {children}
        {/* Overlay removed; handled inside VideoBackground to avoid dimming text */}
      </body>
    </html>
  )
} 