'use client'
import Link from 'next/link'
import ivLogo from './assets/ivanka_logo.svg'
import twitterLogo from './assets/twitter_logo.svg'
import instagramLogo from './assets/instagram_logo.svg'
import './module.footer.css'

function PhoneIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.97-.85a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      {/* ── Top row ── */}
      <div className="footer__top">
        <div className="footer__brand">
          <img src={ivLogo} alt="Ivanka Rent a Car" className="footer__logo" />
        </div>

        <div className="footer__contact">
          <p className="footer__contact-heading">Contact Us</p>
          <ul className="footer__contact-list">
            <li className="footer__contact-item">
              <span className="footer__contact-icon"><PhoneIcon /></span>
              <span>Call Us:&nbsp; +971 50 757 8678</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-icon"><MailIcon /></span>
              <span>Mail Us:&nbsp; info@ivanka.ae</span>
            </li>
            <li className="footer__contact-item">
              <span className="footer__contact-icon"><LocationIcon /></span>
              <span>Location: Dubai, UAE</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom row ── */}
      <div className="footer__bottom">
        <div className="footer__legal">
          <span>© 2026 Ivanka Rent A Car L.L.C</span>
          <Link href="/privacy-policy" className="footer__link">Privacy Policy</Link>
          <Link href="/terms-of-service" className="footer__link">Terms of Use</Link>
          <Link href="/blog" className="footer__link">Blog</Link>
        </div>

        <div className="footer__socials">
          <a href="#" className="footer__social-link" aria-label="X / Twitter">
            <img src={twitterLogo} alt="X" className="footer__social-icon" />
          </a>
          <a href="https://www.instagram.com/ivankarentacar.ae/" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
            <img src={instagramLogo} alt="Instagram" className="footer__social-icon footer__social-icon--lg" />
          </a>
        </div>
      </div>

      {/* ── Sub-footer bar ── */}
      <div className="footer__subbar">
        <span>© 2026 Ivanka Rent A Car. All rights reserved.</span>
        <span>
          Crafted with passion by <strong className="footer__subbar-brand">Syntellite Innovations</strong>, Bangalore.
        </span>
        <div className="footer__subbar-links">
          <Link href="/terms-of-service" className="footer__subbar-link">Terms</Link>
          <Link href="/privacy-policy" className="footer__subbar-link">Privacy</Link>
          <Link href="/blog" className="footer__subbar-link">Blog</Link>
        </div>
      </div>
    </footer>
  )
}
