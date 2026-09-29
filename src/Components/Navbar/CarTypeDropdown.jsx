'use client'
import { useRouter } from 'next/navigation'
import { CAR_TYPE_TO_BODY } from '../../utils/fleetParams'
import './CarTypeDropdown.css'

import convertible from './CarType/Convertible.svg'
import sedan       from './CarType/Sedan.svg'
import suvs        from './CarType/Suvs.svg'
import sportsSuv   from './CarType/SportsSuv.svg'
import raceCar     from './CarType/RaceCar.svg'
import sportsCar   from './CarType/SportsCar.svg'

const CAR_TYPES = [
  { name: 'Convertible', img: convertible },
  { name: 'Sedan',       img: sedan       },
  { name: 'SUVs',        img: suvs        },
  { name: 'Sports SUV',  img: sportsSuv   },
  { name: 'Race Car',    img: raceCar     },
  { name: 'Sports Car',  img: sportsCar   },
]

export default function CarTypeDropdown({ onMouseEnter, onMouseLeave }) {
  const router = useRouter()

  const handleType = (name) => {
    const bodyType = CAR_TYPE_TO_BODY[name]
    if (bodyType) router.push(`/fleet?type=${encodeURIComponent(bodyType)}`)
  }

  return (
    <div className="cartype-dropdown" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {CAR_TYPES.map(({ name, img }) => (
        <button key={name} className="cartype-dropdown__card" onClick={() => handleType(name)}>
          <img src={img} alt={name} className="cartype-dropdown__img" />
          <span className="cartype-dropdown__label">{name}</span>
        </button>
      ))}
    </div>
  )
}
