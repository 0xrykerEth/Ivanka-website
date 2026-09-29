'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import calendarImg from './calendar.svg'
import './module.Hug2.css'

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max)
}

function easeOut(t) {
  return 1 - (1 - t) * (1 - t)
}

export default function Hug2() {
  const router = useRouter()
  const sectionRef = useRef(null)
  const textGroupRef = useRef(null)
  const ctaRef = useRef(null)
  const mockupRef = useRef(null)
  const rafRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const textGroup = textGroupRef.current
    const cta = ctaRef.current
    const mockup = mockupRef.current
    if (!section || !textGroup || !cta || !mockup) return

    function applyStyles(progress) {
      // text group slides from left
      const p0 = easeOut(clamp(progress, 0, 1))
      textGroup.style.opacity = p0
      textGroup.style.transform = `translateX(${(1 - p0) * -70}px)`

      // cta: slight stagger, also from left
      const p1 = easeOut(clamp((progress - 0.12) / 0.88, 0, 1))
      cta.style.opacity = p1
      cta.style.transform = `translateX(${(1 - p1) * -70}px)`

      // mockup slides from right
      const p2 = easeOut(clamp((progress - 0.08) / 0.92, 0, 1))
      mockup.style.opacity = p2
      mockup.style.transform = `translateX(${(1 - p2) * 70}px)`
    }

    applyStyles(0)

    function tick() {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = (vh - rect.top) / (vh * 0.6)
      const target = clamp(raw, 0, 1)
      const current = progressRef.current + (target - progressRef.current) * 0.1
      progressRef.current = current
      applyStyles(current)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section className="hug2" ref={sectionRef}>
      <div className="hug2__content">
        <div className="hug2__text-group" ref={textGroupRef}>
          <p className="hug2__eyebrow">Long-term rentals</p>
          <h2 className="hug2__heading">Dates that fit your plans</h2>
          <p className="hug2__body">
            Pick your days and times, from a weekend to a month.
            Change them whenever you need.
          </p>
        </div>

        <div className="hug2__cta-wrap" ref={ctaRef}>
          <button className="hug2__cta" onClick={() => router.push('/fleet')}>
            Explore available cars
            <span className="hug2__cta-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="hug2__mockup-wrap" ref={mockupRef}>
        <img src={calendarImg} alt="Calendar booking UI" className="hug2__mockup" />
      </div>
    </section>
  )
}
