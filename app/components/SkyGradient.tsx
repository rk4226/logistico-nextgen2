'use client'

import { useEffect, useState } from 'react'

interface SkyColors {
  zenith: string
  horizon: string
  sun: string
  clouds: string
}

interface SkyGradientProps {
  className?: string
}

export default function SkyGradient({ className = '' }: SkyGradientProps) {
  const [skyColors, setSkyColors] = useState<SkyColors>({
    zenith: '#1e3a8a',
    horizon: '#fbbf24',
    sun: '#f59e0b',
    clouds: '#ffffff'
  })

  // Calculate sky colors based on time of day
  const calculateSkyColors = (date: Date): SkyColors => {
    const hour = date.getHours()
    const minute = date.getMinutes()
    const timeOfDay = hour + minute / 60

    // Dawn: 5:00 - 7:00
    if (timeOfDay >= 5 && timeOfDay < 7) {
      const progress = (timeOfDay - 5) / 2
      return {
        zenith: interpolateColor('#0f172a', '#1e40af', progress),
        horizon: interpolateColor('#fbbf24', '#f59e0b', progress),
        sun: interpolateColor('#fbbf24', '#f59e0b', progress),
        clouds: interpolateColor('#f3f4f6', '#ffffff', progress)
      }
    }
    
    // Morning: 7:00 - 12:00
    if (timeOfDay >= 7 && timeOfDay < 12) {
      const progress = (timeOfDay - 7) / 5
      return {
        zenith: interpolateColor('#1e40af', '#3b82f6', progress),
        horizon: interpolateColor('#f59e0b', '#60a5fa', progress),
        sun: interpolateColor('#f59e0b', '#fbbf24', progress),
        clouds: interpolateColor('#ffffff', '#f8fafc', progress)
      }
    }
    
    // Afternoon: 12:00 - 17:00
    if (timeOfDay >= 12 && timeOfDay < 17) {
      const progress = (timeOfDay - 12) / 5
      return {
        zenith: interpolateColor('#3b82f6', '#1e40af', progress),
        horizon: interpolateColor('#60a5fa', '#f59e0b', progress),
        sun: interpolateColor('#fbbf24', '#f59e0b', progress),
        clouds: interpolateColor('#f8fafc', '#f3f4f6', progress)
      }
    }
    
    // Dusk: 17:00 - 19:00
    if (timeOfDay >= 17 && timeOfDay < 19) {
      const progress = (timeOfDay - 17) / 2
      return {
        zenith: interpolateColor('#1e40af', '#7c2d12', progress),
        horizon: interpolateColor('#f59e0b', '#dc2626', progress),
        sun: interpolateColor('#f59e0b', '#dc2626', progress),
        clouds: interpolateColor('#f3f4f6', '#fca5a5', progress)
      }
    }
    
    // Night: 19:00 - 5:00
    return {
      zenith: '#0f172a',
      horizon: '#1e293b',
      sun: '#475569',
      clouds: '#334155'
    }
  }

  // Helper function to interpolate between colors
  const interpolateColor = (color1: string, color2: string, factor: number): string => {
    const hex1 = color1.replace('#', '')
    const hex2 = color2.replace('#', '')
    
    const r1 = parseInt(hex1.substr(0, 2), 16)
    const g1 = parseInt(hex1.substr(2, 2), 16)
    const b1 = parseInt(hex1.substr(4, 2), 16)
    
    const r2 = parseInt(hex2.substr(0, 2), 16)
    const g2 = parseInt(hex2.substr(2, 2), 16)
    const b2 = parseInt(hex2.substr(4, 2), 16)
    
    const r = Math.round(r1 + (r2 - r1) * factor)
    const g = Math.round(g1 + (g2 - g1) * factor)
    const b = Math.round(b1 + (b2 - b1) * factor)
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  // Update sky colors every minute
  useEffect(() => {
    const updateSky = () => {
      setSkyColors(calculateSkyColors(new Date()))
    }

    // Update immediately
    updateSky()

    // Update every minute
    const interval = setInterval(updateSky, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      className={`fixed inset-0 -z-20 transition-all duration-1000 ease-in-out ${className}`}
      style={{
        background: `
          radial-gradient(ellipse at center top, ${skyColors.zenith} 0%, ${skyColors.horizon} 70%, ${skyColors.horizon} 100%),
          radial-gradient(ellipse at center 40%, ${skyColors.sun}20 0%, transparent 50%),
          radial-gradient(ellipse at center 60%, ${skyColors.clouds}10 0%, transparent 40%)
        `
      }}
    >
      {/* Sun position based on time */}
      <div 
        className="absolute w-32 h-32 rounded-full opacity-80 blur-sm transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle, ${skyColors.sun}, transparent)`,
          left: '50%',
          top: `${getSunPosition(new Date())}%`,
          transform: 'translateX(-50%)',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Subtle cloud-like elements */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, ${skyColors.clouds}15 0%, transparent 40%),
            radial-gradient(ellipse at 80% 40%, ${skyColors.clouds}10 0%, transparent 35%),
            radial-gradient(ellipse at 40% 70%, ${skyColors.clouds}20 0%, transparent 45%)
          `
        }}
      />
    </div>
  )
}

// Calculate sun position based on time
function getSunPosition(date: Date): number {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const timeOfDay = hour + minute / 60
  
  // Sun rises at 6:00, peaks at 12:00, sets at 18:00
  if (timeOfDay < 6) return 90 // Below horizon
  if (timeOfDay > 18) return 90 // Below horizon
  
  if (timeOfDay <= 12) {
    // Morning: 6:00 to 12:00 (rise to peak)
    const progress = (timeOfDay - 6) / 6
    return 90 - (progress * 60) // 90% to 30%
  } else {
    // Afternoon: 12:00 to 18:00 (peak to set)
    const progress = (timeOfDay - 12) / 6
    return 30 + (progress * 60) // 30% to 90%
  }
}
