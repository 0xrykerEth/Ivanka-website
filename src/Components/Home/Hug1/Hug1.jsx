'use client'
import { useEffect, useRef, useState } from 'react'
import tapImg from './tap.svg'
import NotifyModal from '../../NotifyModal/NotifyModal'
import './module.Hug1.css'

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max)
}

function easeOut(t) {
  return 1 - (1 - t) * (1 - t)
}

export default function Hug1() {
  const [modalOpen, setModalOpen] = useState(false)
  const sectionRef = useRef(null)
  const mockupRef = useRef(null)
  const textGroupRef = useRef(null)
  const ctaRef = useRef(null)
  const rafRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    const mockup = mockupRef.current
    const textGroup = textGroupRef.current
    const cta = ctaRef.current
    if (!section || !mockup || !textGroup || !cta) return

    function applyStyles(progress) {
      const mobile = window.innerWidth <= 768

      // mockup slides from left (or fades up on mobile)
      const p0 = easeOut(clamp(progress, 0, 1))
      mockup.style.opacity = p0
      mockup.style.transform = mobile
        ? `translateY(${(1 - p0) * 30}px)`
        : `translateX(${(1 - p0) * -70}px)`

      // text group: slight stagger
      const p1 = easeOut(clamp((progress - 0.12) / 0.88, 0, 1))
      textGroup.style.opacity = p1
      textGroup.style.transform = mobile
        ? `translateY(${(1 - p1) * 24}px)`
        : `translateX(${(1 - p1) * 70}px)`

      // cta: more stagger
      const p2 = easeOut(clamp((progress - 0.25) / 0.75, 0, 1))
      cta.style.opacity = p2
      cta.style.transform = mobile
        ? `translateY(${(1 - p2) * 18}px)`
        : `translateX(${(1 - p2) * 70}px)`
    }

    // init hidden
    applyStyles(0)

    function tick() {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // progress: 0 when top of section at bottom of viewport, 1 when section 350px in
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
    <section className="hug1" ref={sectionRef}>
      <div className="hug1__mockup-wrap" ref={mockupRef}>
        <img src={tapImg} alt="Ivanka app on phone" className="hug1__mockup" />
      </div>

      <div className="hug1__content">
        <div className="hug1__text-group" ref={textGroupRef}>
          <p className="hug1__eyebrow">App experience</p>
          <h2 className="hug1__heading">Control? Comfort? One App!</h2>
          <p className="hug1__body">
            Our mobile app is crafted to make luxury feel effortless.<br />
            From browsing the fleet to managing your booking,<br />
            everything is designed to work in a few, deliberate steps.
          </p>
        </div>

        <div className="hug1__cta-wrap" ref={ctaRef}>
          <button className="hug1__cta" onClick={() => setModalOpen(true)}>Get Notified on Launch</button>
        </div>
      </div>

      {modalOpen && <NotifyModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
