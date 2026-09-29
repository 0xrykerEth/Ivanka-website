'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import ivLogo from './IV_icon.svg'
import BrandsDropdown from './BrandsDropdown'
import CarTypeDropdown from './CarTypeDropdown'
import { CAR_TYPE_TO_BODY } from '../../utils/fleetParams'
import './Navbar.css'

const WHATSAPP_URL = 'https://wa.me/971507578678?text=Hi%20i%20need%20a%20car'

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const HamburgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6"  />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6"  x2="6"  y2="18" />
    <line x1="6"  y1="6"  x2="18" y2="18" />
  </svg>
)

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [brandsOpen, setBrandsOpen]     = useState(false)
  const [carTypeOpen, setCarTypeOpen]   = useState(false)
  const [mobileOpen, setMobileOpen]     = useState(false)
  const [mobileBrands, setMobileBrands] = useState(false)
  const [mobileCarType, setMobileCarType] = useState(false)
  const brandsTimer  = useRef(null)
  const carTypeTimer = useRef(null)

  const goToBrand = (name) => {
    setMobileOpen(false)
    router.push(`/fleet?brand=${encodeURIComponent(name)}`)
  }

  const goToType = (name) => {
    const bodyType = CAR_TYPE_TO_BODY[name]
    setMobileOpen(false)
    if (bodyType) router.push(`/fleet?type=${encodeURIComponent(bodyType)}`)
  }

  const openBrands   = () => { clearTimeout(brandsTimer.current);  setBrandsOpen(true)   }
  const closeBrands  = () => { brandsTimer.current  = setTimeout(() => setBrandsOpen(false),  120) }
  const openCarType  = () => { clearTimeout(carTypeTimer.current); setCarTypeOpen(true)  }
  const closeCarType = () => { carTypeTimer.current = setTimeout(() => setCarTypeOpen(false), 120) }

  const toggleMobile = () => {
    setMobileOpen(o => !o)
    setMobileBrands(false)
    setMobileCarType(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link href="/" aria-label="Home"><img src={ivLogo} alt="Ivanka" className="navbar__logo" /></Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li>
            <Link href="/" className={`navbar__link${pathname === '/' ? ' navbar__link--active' : ''}`}>Home</Link>
          </li>
          <li
            className="navbar__dropdown-trigger"
            onMouseEnter={openBrands}
            onMouseLeave={closeBrands}
          >
            <button className="navbar__link">
              Brands <ChevronDown />
            </button>
            {brandsOpen && (
              <BrandsDropdown onMouseEnter={openBrands} onMouseLeave={closeBrands} />
            )}
          </li>
          <li
            className="navbar__dropdown-trigger"
            onMouseEnter={openCarType}
            onMouseLeave={closeCarType}
          >
            <button className="navbar__link">
              Car Types <ChevronDown />
            </button>
            {carTypeOpen && (
              <CarTypeDropdown onMouseEnter={openCarType} onMouseLeave={closeCarType} />
            )}
          </li>
          <li>
            <Link href="/fleet" className={`navbar__link${pathname === '/fleet' ? ' navbar__link--active' : ''}`}>Our Fleet</Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="navbar__cta navbar__cta--desktop">
          Contact us <ArrowRight />
        </a>

        {/* Hamburger — mobile only */}
        <button className="navbar__hamburger" onClick={toggleMobile} aria-label="Toggle menu">
          {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="navbar__mobile-drawer">
          <ul className="navbar__mobile-links">
            <li><Link href="/" className={`navbar__mobile-link${pathname === '/' ? ' navbar__mobile-link--active' : ''}`}>Home</Link></li>

            <li>
              <button
                className="navbar__mobile-link navbar__mobile-link--expand"
                onClick={() => setMobileBrands(o => !o)}
              >
                Brands
                <span className={`navbar__mobile-chevron${mobileBrands ? ' navbar__mobile-chevron--open' : ''}`}>
                  <ChevronDown />
                </span>
              </button>

              {mobileBrands && (
                <div className="navbar__mobile-brands">
                  {['Rolls Royce','Porsche','Cadillac','Mercedes-Benz','Toyota',
                    'BMW','Ferrari','Lamborghini','Bentley','McLaren',
                    'Range Rover','Land Rover','Chevrolet','Audi'].map(name => (
                    <button key={name} className="navbar__mobile-brand" onClick={() => goToBrand(name)}>{name}</button>
                  ))}
                </div>
              )}
            </li>

            <li>
              <button
                className="navbar__mobile-link navbar__mobile-link--expand"
                onClick={() => setMobileCarType(o => !o)}
              >
                Car Types
                <span className={`navbar__mobile-chevron${mobileCarType ? ' navbar__mobile-chevron--open' : ''}`}>
                  <ChevronDown />
                </span>
              </button>

              {mobileCarType && (
                <div className="navbar__mobile-brands">
                  {['Convertible','Sedan','SUVs','Sports SUV','Race Car','Sports Car'].map(name => (
                    <button key={name} className="navbar__mobile-brand" onClick={() => goToType(name)}>{name}</button>
                  ))}
                </div>
              )}
            </li>
            <li><Link href="/fleet" className={`navbar__mobile-link${pathname === '/fleet' ? ' navbar__mobile-link--active' : ''}`}>Our Fleet</Link></li>
          </ul>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="navbar__cta navbar__cta--mobile">
            Contact us <ArrowRight />
          </a>
        </div>
      )}
    </nav>
  )
}
