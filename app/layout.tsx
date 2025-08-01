import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
  description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations. Strategic, secure, and scalable government contracting solutions.',
  keywords: 'federal procurement, AI automation, government contracting, SAM.gov, DIBBS, Odoo integration, NSN matching, bid automation',
  authors: [{ name: 'Logistico.AI' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
    description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logistico.AI - Next-Generation Federal Procurement Automation',
    description: 'AI-driven internal platform automating the full lifecycle of federal procurement solicitations.',
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
      </body>
    </html>
  )
} 