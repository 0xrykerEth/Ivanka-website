'use client'
import { useRef } from 'react'
import './module.Filter.css'

import astonMartinLogo from '../Navbar/Brands/AstonMartin.svg'
import rollsRoyceLogo  from '../Navbar/Brands/RollsRoyals.svg'
import porscheLogo     from '../Navbar/Brands/Porsche.svg'
import cadillacLogo    from '../Navbar/Brands/Cadillac.svg'
import mercedesLogo    from '../Navbar/Brands/Mercedes.svg'
import toyotaLogo      from '../Navbar/Brands/Toyota.svg'
import bmwLogo         from '../Navbar/Brands/BMW.svg'
import ferrariLogo     from '../Navbar/Brands/Ferrari.svg'
import lamborghiniLogo from '../Navbar/Brands/Lamborghini.svg'
import bentleyLogo     from '../Navbar/Brands/Bentley.svg'
import maseratiLogo    from '../Navbar/Brands/maserati-seeklogo_1024.svg'
import miniLogo        from '../Navbar/Brands/mini-cooper-seeklogo_1024.svg'
import mclarenLogo     from '../Navbar/Brands/McLaren.svg'
import rangeRoverLogo  from '../Navbar/Brands/RangeRover.svg'
import landRoverLogo   from '../Navbar/Brands/LandRover.svg'
import chevroletLogo   from '../Navbar/Brands/Chevrolet.svg'
import audiLogo        from '../Navbar/Brands/Audi.svg'
import dodgeLogo       from '../Navbar/Brands/dodge-seeklogo_1024.svg'
import gmcLogo         from '../Navbar/Brands/gmc-seeklogo.svg'
import jaguarLogo      from '../Navbar/Brands/Jaguar_2001_wordmark.svg'

export const MIN_PRICE = 500
export const MAX_PRICE = 5000

export const FILTER_BRANDS = [
  { key: 'Aston Martin',  logo: astonMartinLogo },
  { key: 'Rolls Royce',   logo: rollsRoyceLogo  },
  { key: 'Porsche',       logo: porscheLogo     },
  { key: 'Cadillac',      logo: cadillacLogo    },
  { key: 'Mercedes-Benz', logo: mercedesLogo    },
  { key: 'Toyota',        logo: toyotaLogo      },
  { key: 'BMW',           logo: bmwLogo         },
  { key: 'Ferrari',       logo: ferrariLogo     },
  { key: 'Lamborghini',   logo: lamborghiniLogo },
  { key: 'Bentley',       logo: bentleyLogo     },
  { key: 'Maserati',      logo: maseratiLogo    },
  { key: 'Mini Cooper',   logo: miniLogo        },
  { key: 'McLaren',       logo: mclarenLogo     },
  { key: 'Range Rover',   logo: rangeRoverLogo  },
  { key: 'Land Rover',    logo: landRoverLogo   },
  { key: 'Chevrolet',     logo: chevroletLogo   },
  { key: 'Audi',          logo: audiLogo        },
  { key: 'Dodge',         logo: dodgeLogo       },
  { key: 'GMC',           logo: gmcLogo         },
  { key: 'Jaguar',        logo: jaguarLogo      },
]

export const BODY_TYPES = [
  { key: 'Supercar'     },
  { key: 'Race Car'     },
  { key: 'Sports Car'   },
  { key: 'Luxury Sedan' },
  { key: 'Luxury SUV'   },
  { key: 'Convertible'  },
]


const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

function FilterContent({
  priceMin, priceMax, onPriceMinChange, onPriceMaxChange,
  activeBrands, onBrandToggle,
  activeBodyTypes, onBodyTypeToggle,
  bodyCounts = {},
}) {
  const minRef = useRef(null)
  const maxRef = useRef(null)

  const minPct = ((priceMin - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100
  const maxPct = ((priceMax - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100

  return (
    <>
      {/* ── Price per day ── */}
      <div className="filter__section">
        <h3 className="filter__label">Price per day</h3>
        <p className="filter__price-range">
          AED {priceMin.toLocaleString()} – AED {priceMax.toLocaleString()}
        </p>
        <div className="filter__slider-wrap">
          <div className="filter__track">
            <div className="filter__fill" style={{ left: `${minPct}%`, width: `${maxPct - minPct}%` }} />
          </div>
          <input
            ref={minRef}
            type="range" min={MIN_PRICE} max={MAX_PRICE} step={100} value={priceMin}
            onChange={e => onPriceMinChange(Math.min(Number(e.target.value), priceMax - 100))}
            className="filter__range filter__range--min"
            style={{ zIndex: priceMin > MAX_PRICE - 100 ? 5 : 3 }}
          />
          <input
            ref={maxRef}
            type="range" min={MIN_PRICE} max={MAX_PRICE} step={100} value={priceMax}
            onChange={e => onPriceMaxChange(Math.max(Number(e.target.value), priceMin + 100))}
            className="filter__range filter__range--max"
            style={{ zIndex: 4 }}
          />
        </div>
      </div>

      {/* ── Brand ── */}
      <div className="filter__section">
        <h3 className="filter__label">Brand</h3>
        <div className="filter__brands">
          {FILTER_BRANDS.map(b => (
            <button
              key={b.key}
              onClick={() => onBrandToggle(b.key)}
              className={`filter__brand-btn${activeBrands.includes(b.key) ? ' filter__brand-btn--active' : ''}`}
              title={b.key}
            >
              <div className="filter__brand-circle">
                <img src={b.logo} alt={b.key} className="filter__brand-logo" />
              </div>
              <span className="filter__brand-name">{b.key}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Body type ── */}
      <div className="filter__section">
        <h3 className="filter__label">Body type</h3>
        <div className="filter__chips">
          {BODY_TYPES.map(bt => (
            <button
              key={bt.key}
              onClick={() => onBodyTypeToggle(bt.key)}
              className={`filter__chip${activeBodyTypes.includes(bt.key) ? ' filter__chip--active' : ''}`}
            >
              {bt.key}<span className="filter__chip-count"> {bodyCounts[bt.key] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

    </>
  )
}

export default function Filter({
  priceMin, priceMax, onPriceMinChange, onPriceMaxChange,
  activeBrands, onBrandToggle,
  activeBodyTypes, onBodyTypeToggle,
  bodyCounts,
  mobileOpen, onMobileClose,
}) {
  const contentProps = {
    priceMin, priceMax, onPriceMinChange, onPriceMaxChange,
    activeBrands, onBrandToggle,
    activeBodyTypes, onBodyTypeToggle,
    bodyCounts,
  }

  return (
    <>
      {/* ── Desktop sidebar (hidden on mobile via CSS) ── */}
      <aside className="filter filter--desktop">
        <FilterContent {...contentProps} />
      </aside>

      {/* ── Mobile bottom-sheet ── */}
      <>
        {/* Backdrop */}
        <div
          className={`filter-backdrop${mobileOpen ? ' filter-backdrop--open' : ''}`}
          onClick={onMobileClose}
        />

        {/* Sheet */}
        <div className={`filter-sheet${mobileOpen ? ' filter-sheet--open' : ''}`}>
          <div className="filter-sheet__handle" />
          <div className="filter-sheet__header">
            <span className="filter-sheet__title">Filters</span>
            <button className="filter-sheet__close" onClick={onMobileClose} aria-label="Close filters">
              <CloseIcon />
            </button>
          </div>
          <div className="filter-sheet__body">
            <FilterContent {...contentProps} />
          </div>
        </div>
      </>
    </>
  )
}
