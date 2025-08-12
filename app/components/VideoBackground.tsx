'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  className?: string
  variant?: 'fixed' | 'section'
}

export default function VideoBackground({ className = '', variant = 'fixed' }: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Array of video sources from the videos folder
  const videos = [
    '/videos/videoplayback.mp4',
    '/videos/videoplayback-1.mp4',
    '/videos/videoplayback-2.mp4',
  ]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    console.log('Setting up video:', videos[currentVideoIndex])

    const handleVideoEnd = () => {
      console.log('Video ended, moving to next')
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }

    const handleVideoError = (e: Event) => {
      console.error('Video error:', e)
      // Try next video on error
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
      }, 1000)
    }

    const handleCanPlay = () => {
      console.log('Video can play, attempting to play')
      video.play().catch((error) => {
        console.error('Video play failed:', error)
      })
    }

    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('error', handleVideoError)
    video.addEventListener('canplay', handleCanPlay)
    
    // Set the video source and load
    video.src = videos[currentVideoIndex]
    video.load()

    return () => {
      video.removeEventListener('ended', handleVideoEnd)
      video.removeEventListener('error', handleVideoError)
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [currentVideoIndex, videos])

  return (
    <div className={`${variant === 'fixed' ? 'fixed inset-0' : 'absolute inset-0'} z-0 overflow-hidden ${className}`}>
      {/* Fallback gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
        style={{
          background: `
            radial-gradient(ellipse at center top, #1e3a8a 0%, #7c3aed 70%, #000000 100%),
            radial-gradient(ellipse at center 40%, #3b82f620 0%, transparent 50%)
          `
        }}
      />
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop={false}
        playsInline
        preload="metadata"
        autoPlay
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Global wash - slightly darker to compensate for overlay removal */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Scrims to ensure nav and hero text readability regardless of frame */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top scrim under the nav */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
        {/* Bottom scrim to protect CTAs/footer */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  )
}
