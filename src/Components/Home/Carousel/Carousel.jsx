import porsche from './assets/Porsche SVG from C Collection 3.svg'
import rollsRoyce from './assets/Rolls Royce 3.svg'
import mercedes from './assets/Mercedes Benz Alt 2.svg'
import bmw from './assets/BMW Logo 2.svg'
import bentley from './assets/Bentley Car Logo 4.svg'
import ferrari from './assets/Ferrari Logo 6.svg'
import lamborghini from './assets/Lamborghini Alt 4.svg'
import landRover from './assets/Land Rover SVG from SVG Repo 4.svg'
import toyota from './assets/Toyota Logo 4.svg'
import mclaren from './assets/McLaren Alt 4.svg'
import headingSvg from './assets/text.svg'
import './module.Carousel.css'

const BRANDS = [
  { src: porsche,     alt: 'Porsche' },
  { src: rollsRoyce,  alt: 'Rolls Royce' },
  { src: mercedes,    alt: 'Mercedes Benz' },
  { src: bmw,         alt: 'BMW' },
  { src: bentley,     alt: 'Bentley' },
  { src: ferrari,     alt: 'Ferrari' },
  { src: lamborghini, alt: 'Lamborghini' },
  { src: landRover,   alt: 'Land Rover' },
  { src: toyota,      alt: 'Toyota' },
  { src: mclaren,     alt: 'McLaren' },
]

export default function Carousel() {
  return (
    <section className="carousel-section">
      <img
        src={headingSvg}
        alt="A curated fleet of the world's finest cars"
        className="carousel-section__heading"
      />

      <div className="carousel-section__track-wrapper">
        <div className="carousel-section__track">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="carousel-section__logo-wrap">
              <img src={brand.src} alt={brand.alt} className="carousel-section__logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
