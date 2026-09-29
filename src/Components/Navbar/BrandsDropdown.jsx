'use client'
import { useRouter } from 'next/navigation'
import './BrandsDropdown.css'

import rollsRoyce  from './Brands/RollsRoyals.svg'
import porsche     from './Brands/Porsche.svg'
import cadillac    from './Brands/Cadillac.svg'
import mercedes    from './Brands/Mercedes.svg'
import toyota      from './Brands/Toyota.svg'
import bmw         from './Brands/BMW.svg'
import ferrari     from './Brands/Ferrari.svg'
import lamborghini from './Brands/Lamborghini.svg'
import bentley     from './Brands/Bentley.svg'
import mclaren     from './Brands/McLaren.svg'
import rangeRover  from './Brands/RangeRover.svg'
import landRover   from './Brands/LandRover.svg'
import chevrolet   from './Brands/Chevrolet.svg'
import audi        from './Brands/Audi.svg'

const brands = [
  { name: 'Rolls Royce',   logo: rollsRoyce  },
  { name: 'Porsche',       logo: porsche     },
  { name: 'Cadillac',      logo: cadillac    },
  { name: 'Mercedes-Benz', logo: mercedes    },
  { name: 'Toyota',        logo: toyota      },
  { name: 'BMW',           logo: bmw         },
  { name: 'Ferrari',       logo: ferrari     },
  { name: 'Lamborghini',   logo: lamborghini },
  { name: 'Bentley',       logo: bentley     },
  { name: 'McLaren',       logo: mclaren     },
  { name: 'Range Rover',   logo: rangeRover  },
  { name: 'Land Rover',    logo: landRover   },
  { name: 'Chevrolet',     logo: chevrolet   },
  { name: 'Audi',          logo: audi        },
]

export default function BrandsDropdown({ onMouseEnter, onMouseLeave }) {
  const router = useRouter()

  const handleBrand = (name) => {
    router.push(`/fleet?brand=${encodeURIComponent(name)}`)
  }

  return (
    <div className="brands-dropdown" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {brands.map(({ name, logo }) => (
        <button key={name} className="brands-dropdown__card" onClick={() => handleBrand(name)}>
          <img src={logo} alt={name} className="brands-dropdown__logo" />
        </button>
      ))}

      <button className="brands-dropdown__card brands-dropdown__card--more" onClick={() => router.push('/fleet')}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        <span className="brands-dropdown__more-label">Many more</span>
      </button>
    </div>
  )
}
