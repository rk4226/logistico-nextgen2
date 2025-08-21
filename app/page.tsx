'use client'

import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import VideoBackground from './components/VideoBackground'
import dynamic from 'next/dynamic'
const WorldMapBackground = dynamic(() => import('./components/WorldMapBackground'), { ssr: false })
import StockShowcase from './components/StockShowcase'

// Typewriter component with loop
const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const speed = isDeleting ? 50 : 80 // Faster typing and deleting
    
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < text.length) {
        // Typing forward
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      } else if (!isDeleting && currentIndex === text.length) {
        // Pause at end, then start deleting
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentIndex > 0) {
        // Deleting backward
        setDisplayText(prev => prev.slice(0, -1))
        setCurrentIndex(prev => prev - 1)
      } else if (isDeleting && currentIndex === 0) {
        // Start typing again
        setIsDeleting(false)
      }
    }, currentIndex === 0 && !isDeleting ? delay : speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, delay, isDeleting])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Removed FloatingDots background effect per request

export default function Home() {
  const pathname = usePathname()
  const isActiveTop = (prefix: string) => pathname.startsWith(prefix)
  const isActive = (path: string) => pathname === path
  const [openMenu, setOpenMenu] = useState<null | 'what' | 'how' | 'who'>(null)

  return (
    <div className="min-h-screen text-white relative">
      {/* Background effect removed */}
      


      {/* Clean Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-medium text-white">Logistico.AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {/* What we do */}
              <div className="relative group" onMouseLeave={() => setOpenMenu(null)}>
                <button type="button" onClick={() => setOpenMenu(openMenu === 'what' ? null : 'what')} className={`${isActiveTop('/what') ? 'text-white' : 'text-white/80 hover:text-white'} transition-colors text-sm font-medium`}>
                  What we do
                </button>
                <div className={`${openMenu === 'what' ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'} transition-opacity duration-150 absolute left-0 top-full mt-3 w-64 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl z-50`}>
                  <div className="py-2">
                    <a href="/what/procurement" className={`block px-4 py-2 text-sm ${isActive('/what/procurement') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Procurement automation</a>
                    <a href="/what/inventory" className={`block px-4 py-2 text-sm ${isActive('/what/inventory') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Inventory management</a>
                    <a href="/what/logistics" className={`block px-4 py-2 text-sm ${isActive('/what/logistics') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Logistics & distribution</a>
                    <a href="/what/odoo" className={`block px-4 py-2 text-sm ${isActive('/what/odoo') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Odoo ERP integration</a>
                  </div>
                </div>
              </div>

              {/* How it works */}
              <div className="relative group" onMouseLeave={() => setOpenMenu(null)}>
                <button type="button" onClick={() => setOpenMenu(openMenu === 'how' ? null : 'how')} className={`${isActiveTop('/how') ? 'text-white' : 'text-white/80 hover:text-white'} transition-colors text-sm font-medium`}>
                  How it works
                </button>
                <div className={`${openMenu === 'how' ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'} transition-opacity duration-150 absolute left-0 top-full mt-3 w-72 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl z-50`}>
                  <div className="py-2">
                    <a href="/how/ingestion" className={`block px-4 py-2 text-sm ${isActive('/how/ingestion') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Data ingestion</a>
                    <a href="/how/classification" className={`block px-4 py-2 text-sm ${isActive('/how/classification') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>AI classification</a>
                    <a href="/how/matching" className={`block px-4 py-2 text-sm ${isActive('/how/matching') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Vendor & NSN matching</a>
                    <a href="/how/pricing" className={`block px-4 py-2 text-sm ${isActive('/how/pricing') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Pricing engine</a>
                    <a href="/how/rfq" className={`block px-4 py-2 text-sm ${isActive('/how/rfq') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>RFQ automation</a>
                    <a href="/how/bid" className={`block px-4 py-2 text-sm ${isActive('/how/bid') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Bid compilation & submission</a>
                    <a href="/how/award" className={`block px-4 py-2 text-sm ${isActive('/how/award') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Award management</a>
                    <a href="/how/fulfillment" className={`block px-4 py-2 text-sm ${isActive('/how/fulfillment') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Delivery & invoicing</a>
                  </div>
                </div>
              </div>

              {/* Who it's for */}
              <div className="relative group" onMouseLeave={() => setOpenMenu(null)}>
                <button type="button" onClick={() => setOpenMenu(openMenu === 'who' ? null : 'who')} className={`${isActiveTop('/who') ? 'text-white' : 'text-white/80 hover:text-white'} transition-colors text-sm font-medium`}>
                  Who it's for
                </button>
                <div className={`${openMenu === 'who' ? 'visible opacity-100' : 'invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100'} transition-opacity duration-150 absolute left-0 top-full mt-3 w-72 rounded-xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-xl z-50`}>
                  <div className="py-2">
                    <a href="/who/capture" className={`block px-4 py-2 text-sm ${isActive('/who/capture') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Capture & proposal teams</a>
                    <a href="/who/analysts" className={`block px-4 py-2 text-sm ${isActive('/who/analysts') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Procurement analysts</a>
                    <a href="/who/ops" className={`block px-4 py-2 text-sm ${isActive('/who/ops') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Operations & logistics</a>
                    <a href="/who/executives" className={`block px-4 py-2 text-sm ${isActive('/who/executives') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>Executives & finance</a>
                    <a href="/who/it" className={`block px-4 py-2 text-sm ${isActive('/who/it') ? 'text-white bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'}`}>IT & Odoo admins</a>
                  </div>
                </div>
              </div>

              <a href="/contact" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Contact
              </a>
              <a href="/sign-in" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </nav>

            {/* Hero Section - Clean and Minimal */}
      <section className="relative isolate pt-32 pb-20 px-6 min-h-screen flex items-center z-30">
        {/* Neutral bottom fade (remove blue hue) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-black/40" />
        <div className="max-w-6xl mx-auto text-center w-full relative z-50">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4 mx-auto max-w-7xl px-6 py-6">
              <h1 className="text-6xl md:text-8xl font-light text-white leading-tight text-shadow">
                Procurement, handled.
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto leading-relaxed text-shadow">
                Logistico takes care of federal procurement so you can focus on building. Simple, compliant, fast.
              </p>
            </div>
            
            <div className="flex justify-center items-center gap-3">
              <a href="#showcase" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Platform
              </a>
              <a href="/sign-in" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Sign in
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Post-hero wrapper with dynamic visuals */}
      <div className="relative z-0 -mt-16">
        {/* Replace map with stock image showcase */}
        <StockShowcase />

        {/* Placeholder sections removed; now separate pages */}

      {/* Footer - Minimal */}
      <footer className="relative py-16 px-6 border-t border-white/10 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-medium text-white">Logistico.AI</span>
            </div>
            
            <div className="flex space-x-8">
              <a href="/what" className="text-white/80 hover:text-white transition-colors text-sm">What we do</a>
              <a href="/how" className="text-white/80 hover:text-white transition-colors text-sm">How it works</a>
              <a href="/who" className="text-white/80 hover:text-white transition-colors text-sm">Who it's for</a>
              <a href="/contact" className="text-white/80 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/70 text-sm">&copy; 2024 Logistico.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* End of post-hero wrapper */}
      </div>
    </div>
  )
} 