'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import './NotifyModal.css'

export default function NotifyModal({ onClose }) {
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus]   = useState('idle') // idle | loading | success | error
  const overlayRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email && !phone) return
    // Honeypot: bots fill hidden fields, real users don't
    if (honeypot) { setStatus('success'); return }
    setStatus('loading')

    // Duplicate check: skip insert if email already exists
    if (email) {
      const { data } = await supabase
        .from('leads')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .limit(1)
      if (data && data.length > 0) { setStatus('success'); return }
    }

    const { error } = await supabase.from('leads').insert({
      email: email.toLowerCase().trim() || null,
      phone: phone.trim() || null,
    })

    if (error) {
      console.error(error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div className="nm-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="nm-modal" role="dialog" aria-modal="true" aria-label="Get notified">
        <button className="nm-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="3" x2="15" y2="15" />
            <line x1="15" y1="3" x2="3" y2="15" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="nm-success">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="22" cy="22" r="21" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              <polyline points="13,22 19,28 31,16" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <h3 className="nm-success__heading">You're on the list</h3>
            <p className="nm-success__sub">We'll reach out when Ivanka launches.</p>
            <button className="nm-submit" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <p className="nm-eyebrow">Early access</p>
            <h2 className="nm-heading">Get notified on launch</h2>
            <p className="nm-sub">Leave your details and we'll be in touch when Ivanka goes live.</p>

            <form className="nm-form" onSubmit={handleSubmit} noValidate>
              {/* Honeypot — hidden from real users, bots fill it in */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="nm-field">
                <label className="nm-label" htmlFor="nm-email">Email</label>
                <input
                  id="nm-email"
                  className="nm-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="nm-field">
                <label className="nm-label" htmlFor="nm-phone">Phone number</label>
                <input
                  id="nm-phone"
                  className="nm-input"
                  type="tel"
                  placeholder="+971 50 000 0000"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>

              {status === 'error' && (
                <p className="nm-error">Something went wrong. Please try again.</p>
              )}

              <button
                className="nm-submit"
                type="submit"
                disabled={status === 'loading' || (!email && !phone)}
              >
                {status === 'loading' ? 'Submitting…' : 'Notify me'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
