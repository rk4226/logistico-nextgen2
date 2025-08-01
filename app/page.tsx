'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Brain } from 'lucide-react'
import { useState, useEffect } from 'react'

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

// Floating dots component with smooth connecting lines
const FloatingDots = () => {
  const [connections, setConnections] = useState<Array<{from: number, to: number, opacity: number, id: string}>>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Fixed dot positions that don't change
  const [dots] = useState(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // Keep dots away from edges
      y: Math.random() * 90 + 5,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 3 // Longer, more stable blinking
    }))
  )

  useEffect(() => {
    const createNewConnections = () => {
      const newConnections = []
      const numConnections = Math.floor(Math.random() * 4) + 4 // 4-7 connections
      
      for (let i = 0; i < numConnections; i++) {
        const from = Math.floor(Math.random() * dots.length)
        let to = Math.floor(Math.random() * dots.length)
        
        // Ensure we don't connect to self and avoid duplicate connections
        while (to === from || newConnections.some(conn => 
          (conn.from === from && conn.to === to) || 
          (conn.from === to && conn.to === from)
        )) {
          to = Math.floor(Math.random() * dots.length)
        }
        
        newConnections.push({
          from,
          to,
          opacity: Math.random() * 0.25 + 0.2, // 0.2 to 0.45 opacity
          id: `${from}-${to}-${Date.now()}-${i}`
        })
      }
      
      return newConnections
    }

    // Initial connections after a short delay
    setTimeout(() => {
      setConnections(createNewConnections())
    }, 1000)

    const interval = setInterval(() => {
      // Start transition - fade out current lines
      setIsTransitioning(true)
      
      // After lines completely fade out, create new constellation
      setTimeout(() => {
        setConnections(createNewConnections())
        setIsTransitioning(false)
      }, 1200) // Longer fade out time
      
    }, 5000) // Slower changes every 5 seconds

    return () => clearInterval(interval)
  }, [dots])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* SVG for drawing lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection) => {
          const fromDot = dots[connection.from]
          const toDot = dots[connection.to]
          
          return (
            <motion.line
              key={connection.id}
              x1={`${fromDot.x}%`}
              y1={`${fromDot.y}%`}
              x2={`${toDot.x}%`}
              y2={`${toDot.y}%`}
              stroke="white"
              strokeWidth="0.5"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ 
                opacity: isTransitioning ? 0 : connection.opacity,
                pathLength: isTransitioning ? 0 : 1
              }}
              transition={{ 
                pathLength: {
                  duration: isTransitioning ? 1.2 : 2.5,
                  ease: "easeInOut",
                  delay: isTransitioning ? 0 : 0.3
                },
                opacity: {
                  duration: isTransitioning ? 1.2 : 2,
                  ease: "easeInOut"
                }
              }}
            />
          )
        })}
      </svg>
      
      {/* Fixed position dots with gentle blinking */}
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Floating dots background effect */}
      <FloatingDots />
      
      {/* Clean background */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-950 to-black -z-10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 via-transparent to-orange-950/20" />
      </div>

      {/* Clean Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-medium text-white">Logistico.AI</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Features
              </a>
              <a href="#strategy" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Strategy
              </a>
              <a href="#technology" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
                Technology
              </a>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

            {/* Hero Section - Clean and Minimal */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex items-center z-10">
        <div className="max-w-6xl mx-auto text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-light text-white leading-tight">
                <TypewriterText text="Logistico" delay={500} />
                <span className="block bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent font-normal">
                  Federal Procurement
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                AI-driven internal platform automating the full lifecycle of federal procurement solicitations. 
                Processing 2,500+ opportunities daily with intelligent classification and strategic bidding.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Platform
              </button>
              <button className="border border-gray-600 text-gray-300 px-8 py-3 rounded-full font-medium hover:border-gray-500 hover:text-white transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

            {/* Stats Section - Clean Grid */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,500+", label: "Daily Solicitations" },
              { value: "30,000+", label: "Monthly Opportunities" },
              { value: "95%", label: "Automation Rate" },
              { value: "$600B+", label: "Federal Market" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-light text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Clean and Spacious */}
      <section id="features" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-6">
              Strategic AI-Powered Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              End-to-end automation for federal procurement with intelligent decision-making and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              {
                number: "01",
                title: "AI Classification Engine",
                description: "Intelligent categorization of COTS vs custom requirements with 95% accuracy using advanced NLP models."
              },
              {
                number: "02",
                title: "Multi-Source Integration",
                description: "Real-time data ingestion from SAM.gov, DIBBS, GovWin, and other federal procurement sources."
              },
              {
                number: "03",
                title: "Vendor Matching",
                description: "Advanced NSN matching and supplier discovery with historical performance analytics."
              },
              {
                number: "04",
                title: "Pricing Optimization",
                description: "Dynamic pricing algorithms with competitive intelligence and margin optimization."
              },
              {
                number: "05",
                title: "Automated Bidding",
                description: "Intelligent bid compilation and submission with compliance validation and risk assessment."
              },
              {
                number: "06",
                title: "Odoo ERP Integration",
                description: "Seamless handoff to fulfillment with automatic PO generation and inventory management."
              }
            ].map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="text-6xl font-light text-white/20 mb-4 group-hover:text-white/40 transition-colors">
                  {feature.number}
                </div>
                <h3 className="text-xl font-medium text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* Strategy Section - Minimal and Direct */}
      <section id="strategy" className="relative py-32 px-6 bg-gray-950/50 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
                Strategic Government Focus
              </h2>
              <div className="space-y-4">
                {[
                  "AI-driven internal platform for federal procurement automation",
                  "Strategic positioning in the $600B+ federal contracting market",
                  "No B2B or B2C distractions - pure government focus",
                  "Riding the AI transformation wave in government procurement",
                  "Secure, compliant, and scalable enterprise solution"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-medium text-white mb-6">Strategic Advantages</h3>
              <div className="space-y-4">
                {[
                  "Market Intelligence & Analytics",
                  "AI-Powered Decision Making", 
                  "Government Security Standards",
                  "Federal Compliance Expertise"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-white rounded-full flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section - Simplified */}
      <section id="technology" className="relative py-32 px-6 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Advanced Technology Stack
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-16">
            Built with modern technologies for scalability, security, and performance in government environments.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { name: "Next.js", description: "React Framework" },
              { name: "Python", description: "AI/ML Backend" },
              { name: "Odoo", description: "ERP Integration" },
              { name: "AWS", description: "Cloud Infrastructure" }
            ].map((tech, index) => (
              <div key={index} className="text-center">
                <h3 className="text-2xl font-light text-white mb-2">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Clean and Direct */}
      <section className="relative py-32 px-6 bg-white/5 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
            Ready to Transform Federal Procurement?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join the next generation of government contracting with AI-powered automation and strategic intelligence.
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
            Schedule a Demo
          </button>
        </div>
      </section>

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
              <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
              <a href="#strategy" className="text-gray-400 hover:text-white transition-colors text-sm">Strategy</a>
              <a href="#technology" className="text-gray-400 hover:text-white transition-colors text-sm">Technology</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">&copy; 2024 Logistico.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 