'use client'
import { useRef, useEffect } from 'react'
const heroVideo = '/HeroIV.mp4'
import './module.Frame.css'

const LERP = 0.12

// Scroll-progress thresholds (0 → 1)
const VIDEO_END   = 0.55  // video finishes scrubbing
const TEXT_IN_END = 0.63  // text fully visible at center
const TEXT_HOLD   = 0.68  // hold at center, then start rising
const TEXT_AT_TOP = 0.88  // text locked at top — holds until sticky releases → FAQ

export default function Frame() {
  const sectionRef   = useRef(null)
  const videoRef     = useRef(null)
  const overlayRef   = useRef(null)
  const textRef      = useRef(null)
  const targetTime   = useRef(0)
  const animatedTime = useRef(0)
  const rafId        = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    const overlay = overlayRef.current
    const text    = textRef.current
    if (!section || !video || !overlay || !text) return

    video.pause()
    video.muted   = true
    video.preload = 'auto'

    const NAVBAR = 64
    // start hidden at center of the visible panel (below navbar)
    text.style.opacity   = '0'
    text.style.transform = `translateY(${(window.innerHeight - NAVBAR) * 0.5 - 60}px)`

    const tick = () => {
      const diff = targetTime.current - animatedTime.current
      if (Math.abs(diff) > 0.001) {
        animatedTime.current += diff * LERP
        if (video.readyState >= 2) {
          video.currentTime = animatedTime.current
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    const onScroll = () => {
      const scrolled     = -section.getBoundingClientRect().top
      const scrollHeight = section.offsetHeight - window.innerHeight
      const progress     = Math.max(0, Math.min(1, scrolled / scrollHeight))

      // ── Video scrubbing ──
      if (video.duration) {
        targetTime.current = Math.min(progress / VIDEO_END, 1) * video.duration
      }

      // ── Black overlay fades out faster on mobile ──
      const overlayEnd = window.innerWidth <= 768 ? 0.08 : 0.20
      overlay.style.opacity = Math.max(0, 1 - progress / overlayEnd)

      // ── Text: center → top ──
      const vh      = window.innerHeight
      const NAVBAR  = 64
      const centerY = (vh - NAVBAR) * 0.5 - 60  // center of visible panel
      const topY    = 20                          // near top of panel (clear of navbar)

      let opacity    = 0
      let translateY = centerY

      if (progress >= VIDEO_END && progress <= TEXT_IN_END) {
        // pop in at center
        const p = (progress - VIDEO_END) / (TEXT_IN_END - VIDEO_END)
        opacity    = p
        translateY = centerY
      } else if (progress > TEXT_IN_END && progress <= TEXT_HOLD) {
        // hold at center
        opacity    = 1
        translateY = centerY
      } else if (progress > TEXT_HOLD && progress <= TEXT_AT_TOP) {
        // rise from center to top
        const p    = (progress - TEXT_HOLD) / (TEXT_AT_TOP - TEXT_HOLD)
        opacity    = 1
        translateY = centerY + (topY - centerY) * p
      } else if (progress > TEXT_AT_TOP) {
        // locked at top — sticky holds here until runway ends → FAQ
        opacity    = 1
        translateY = topY
      }

      text.style.opacity   = opacity
      text.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="frame-scroll" ref={sectionRef}>
      <div className="frame-sticky">
        <video
          ref={videoRef}
          className="frame-video"
          muted
          playsInline
          preload="auto"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="frame-overlay" ref={overlayRef} />

        <div className="frame-text" ref={textRef}>
          <h2 className="frame-text__heading">Delivered to your doorstep</h2>
          <p className="frame-text__sub">
            Anywhere across the seven emirates. Brought to you, collected from you.
          </p>
        </div>
      </div>
    </div>
  )
}
