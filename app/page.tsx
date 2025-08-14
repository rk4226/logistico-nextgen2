'use client'

import { motion } from 'framer-motion'
import { Brain } from 'lucide-react'
import { useState, useEffect } from 'react'
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
              <a href="#what" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                What we do
              </a>
              <a href="#how" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                How it works
              </a>
              <a href="#who" className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                Who it's for
              </a>
              <a href="/contact" className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

            {/* Hero Section - Clean and Minimal */}
      <section className="relative isolate pt-32 pb-20 px-6 min-h-screen flex items-center z-30">
        {/* Section-scoped video background */}
        <VideoBackground variant="section" className="-z-10 opacity-100" />
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
            
            <div className="flex justify-center items-center">
              <a href="#showcase" className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Platform
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Post-hero wrapper with dynamic visuals */}
      <div className="relative z-0 -mt-16">
        {/* Replace map with stock image showcase */}
        <StockShowcase />

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
              <a href="#what" className="text-white/80 hover:text-white transition-colors text-sm">What we do</a>
              <a href="#how" className="text-white/80 hover:text-white transition-colors text-sm">How it works</a>
              <a href="#who" className="text-white/80 hover:text-white transition-colors text-sm">Who it's for</a>
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