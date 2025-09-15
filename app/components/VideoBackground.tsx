'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoBackgroundProps {
  className?: string
  variant?: 'fixed' | 'section'
}

export default function VideoBackground({ className = '', variant = 'fixed' }: VideoBackgroundProps) {
  // Which video index is currently being displayed
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  // Which buffer is active on screen: 0 or 1
  const [activeBuffer, setActiveBuffer] = useState<0 | 1>(0)

  // Two video elements for double-buffering
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)] as const
  // Track readiness of each buffer without causing re-renders
  const bufferReadyRef = useRef<[boolean, boolean]>([false, false])
  // Refs to avoid stale closures in event handlers
  const activeBufferRef = useRef<0 | 1>(0)
  const currentIndexRef = useRef<number>(0)

  // Array of video sources from the public/videos folder (keep in-sync with files present)
  const videos = [
    '/videos/12103315-uhd_3840_2160_24fps.mp4',
    '/videos/13721788-hd_1920_1080_60fps.mp4',
    '/videos/16234911-hd_1920_1080_30fps.mp4',
    '/videos/6853964-hd_1920_1080_30fps.mp4',
    '/videos/7467746-hd_1920_1080_30fps.mp4',
    '/videos/8178345-uhd_2560_1440_24fps.mp4',
    '/videos/855121-hd_1920_1080_30fps.mp4',
  ]

  const getNextIndex = (index: number) => (index + 1) % videos.length

  // Preload a source into the specified buffer without showing it
  const preloadIntoBuffer = (buffer: 0 | 1, src: string) => {
    const el = videoRefs[buffer].current
    if (!el) return

    bufferReadyRef.current[buffer] = false
    el.src = src
    el.preload = 'auto'

    const onCanPlay = () => {
      bufferReadyRef.current[buffer] = true
      el.removeEventListener('canplay', onCanPlay)
    }
    const onError = () => {
      // Mark as not ready and try again shortly (advance to next later)
      bufferReadyRef.current[buffer] = false
      el.removeEventListener('error', onError)
    }

    el.addEventListener('canplay', onCanPlay)
    el.addEventListener('error', onError)
    el.load()
  }

  // Swap display to the other buffer instantly once it's ready
  const swapBuffers = (nextIndex: number) => {
    const current = videoRefs[activeBufferRef.current].current
    const nextBuffer = (activeBufferRef.current === 0 ? 1 : 0) as 0 | 1
    const nextEl = videoRefs[nextBuffer].current
    if (!current || !nextEl) return

    // Ensure next is ready before swapping
    if (!bufferReadyRef.current[nextBuffer] || nextEl.readyState < 2) {
      const onCanPlayNext = () => {
        nextEl.removeEventListener('canplay', onCanPlayNext)
        swapBuffers(nextIndex)
      }
      nextEl.addEventListener('canplay', onCanPlayNext)
      return
    }

    // Start next, then instantly swap visibility
    nextEl.currentTime = 0
    nextEl.play().catch(() => {})

    current.pause()
    // Instant swap with no fade
    current.style.opacity = '0'
    nextEl.style.opacity = '1'
    activeBufferRef.current = nextBuffer
    setActiveBuffer(nextBuffer)
    currentIndexRef.current = nextIndex
    setCurrentVideoIndex(nextIndex)

    // Preload the following video into the now-idle buffer
    const followingIndex = getNextIndex(nextIndex)
    const idleBuffer = (activeBufferRef.current === 0 ? 1 : 0) as 0 | 1
    preloadIntoBuffer(idleBuffer, videos[followingIndex])
  }

  useEffect(() => {
    const buffer0 = videoRefs[0].current
    const buffer1 = videoRefs[1].current
    if (!buffer0 || !buffer1) return

    // Initial visibility
    buffer0.style.opacity = '1'
    buffer1.style.opacity = '0'

    // Keep refs in sync initially
    activeBufferRef.current = 0
    currentIndexRef.current = currentVideoIndex

    // Load first video into buffer 0 and play when ready
    const onCanPlayInitial = () => {
      bufferReadyRef.current[0] = true
      buffer0.play().catch(() => {})
      buffer0.removeEventListener('canplay', onCanPlayInitial)
    }
    buffer0.addEventListener('canplay', onCanPlayInitial)
    preloadIntoBuffer(0 as 0 | 1, videos[currentVideoIndex])

    // Preload next video into buffer 1 ahead of time
    const nextIndex = getNextIndex(currentVideoIndex)
    preloadIntoBuffer(1, videos[nextIndex])

    // Attach ended handlers to both buffers; compute next index at runtime
    const handleEnded0 = () => {
      const runtimeNextIndex = getNextIndex(currentIndexRef.current)
      swapBuffers(runtimeNextIndex)
    }
    const handleEnded1 = () => {
      const runtimeNextIndex = getNextIndex(currentIndexRef.current)
      swapBuffers(runtimeNextIndex)
    }
    buffer0.addEventListener('ended', handleEnded0)
    buffer1.addEventListener('ended', handleEnded1)

    return () => {
      buffer0.removeEventListener('ended', handleEnded0)
      buffer1.removeEventListener('ended', handleEnded1)
    }
    // We only want this to run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${variant === 'fixed' ? 'fixed inset-0' : 'absolute inset-0'} z-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-black" />

      {/* Double-buffered video elements stacked */}
      <video
        ref={videoRefs[0]}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop={false}
        playsInline
        preload="auto"
        autoPlay
        style={{ opacity: 0, transition: 'none' }}
      />
      <video
        ref={videoRefs[1]}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        loop={false}
        playsInline
        preload="auto"
        autoPlay
        style={{ opacity: 0, transition: 'none' }}
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  )
}
