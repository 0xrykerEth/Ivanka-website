'use client'
import { useState, useEffect, useRef } from 'react'
import textSvg from './text.svg'
import './module.Hero.css'

export default function Hero() {
  const [textVisible, setTextVisible] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    // Force play in case browser blocked autoplay
    const vid = videoRef.current
    if (vid) {
      vid.muted = true
      vid.play().catch(() => {})
    }

    const timer = setTimeout(() => setTextVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero">
      <div className="hero__video-wrap">
        <video
          ref={videoRef}
          className="hero__video"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/black_sedan.mp4" type="video/mp4" />
        </video>
        <div className="hero__edge hero__edge--left" />
        <div className="hero__edge hero__edge--right" />
      </div>

      <div className={`hero__text${textVisible ? ' hero__text--visible' : ''}`}>
        <img src={textSvg} alt="IVANKA — Drive the World's Finest Cars" className="hero__svg" />
      </div>
    </section>
  )
}
