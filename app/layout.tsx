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
      { url: '/favicon.jpg', type: 'image/jpeg' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: '/favicon.jpg',
    shortcut: '/favicon.jpg',
  },
  openGraph: {
    title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
    description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/favicon.jpg',
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
    images: ['/favicon.jpg'],
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
        {children}
        {/* Overlay removed; handled inside VideoBackground to avoid dimming text */}
      </body>
    </html>
  )
} 