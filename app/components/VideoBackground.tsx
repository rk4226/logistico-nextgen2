'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  className?: string
  variant?: 'fixed' | 'section'
}

export default function VideoBackground({ className = '', variant = 'fixed' }: VideoBackgroundProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Array of video sources from the public/videos folder (current .mp4 set)
  const videos = [
    '/videos/10410822-uhd_4096_2160_24fps.mp4',
    '/videos/12103315-uhd_3840_2160_24fps.mp4',
    '/videos/5882849-hd_1920_1080_30fps.mp4',
    '/videos/6841064-hd_1920_1080_30fps.mp4',
    '/videos/6841065-hd_1920_1080_30fps.mp4',
    '/videos/7467746-hd_1920_1080_30fps.mp4',
    '/videos/8178345-uhd_2560_1440_24fps.mp4',
    '/videos/855121-hd_1920_1080_30fps.mp4',
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
      // Prevent brief flash by ensuring frame is ready
      if (video.readyState >= 2) {
        video.play().catch((error) => {
          console.error('Video play failed:', error)
        })
      }
    }

    video.addEventListener('ended', handleVideoEnd)
    video.addEventListener('error', handleVideoError)
    video.addEventListener('canplay', handleCanPlay)
    
    // Set the video source and load with crossfade
    const currentSrc = videos[currentVideoIndex]
    video.style.opacity = '0'
    video.src = currentSrc
    video.load()

    const onLoadedData = () => {
      video.style.transition = 'opacity 300ms ease'
      video.style.opacity = '1'
    }
    video.addEventListener('loadeddata', onLoadedData)

    return () => {
      video.removeEventListener('ended', handleVideoEnd)
      video.removeEventListener('error', handleVideoError)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadeddata', onLoadedData)
    }
  }, [currentVideoIndex, videos])

  return (
    <div className={`${variant === 'fixed' ? 'fixed inset-0' : 'absolute inset-0'} z-0 overflow-hidden ${className}`}>
      {/* Neutral fallback background (removes purple flash between videos) */}
      <div className="absolute inset-0 bg-black" />
      
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop={false}
        playsInline
        preload="auto"
        autoPlay
      />
      
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
