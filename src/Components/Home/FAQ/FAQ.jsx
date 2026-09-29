'use client'
import { useState } from 'react'
import './module.FAQ.css'

const FAQS = [
  {
    n: '01',
    q: 'Does Ivanka deliver the rental car anywhere in UAE?',
    a: `Free delivery in Dubai, Sharjah & Ajman. Airport pickup available for just AED 100.\n\nFor Abu Dhabi, Ras Al Khaimah, Fujairah & Umm Al Quwain:\n– Minimum 1-week booking or AED 500\n– Extra charges apply for shorter durations`,
  },
  {
    n: '02',
    q: 'What documents do I need to rent a car with Ivanka?',
    a: `A valid UAE driving licence or an international driving permit is required. Tourists may rent with a passport and an international driving licence from their home country.\n\nAdditional identity verification may be requested at the time of delivery.`,
  },
  {
    n: '03',
    q: 'Can I extend my rental period after booking?',
    a: `Yes — extensions are easy. Contact us at least 24 hours before your rental ends and we'll adjust your booking and pricing accordingly.\n\nLast-minute extensions are subject to vehicle availability.`,
  },
  {
    n: '04',
    q: 'Is insurance included in the rental price?',
    a: `All vehicles come with comprehensive insurance as standard. This covers third-party liability and accidental damage.\n\nOptional premium coverage upgrades are available at checkout for complete peace of mind.`,
  },
  {
    n: '05',
    q: 'What happens if I return the car late?',
    a: `A grace period of 60 minutes applies. After that, an additional day rate is charged automatically.\n\nIf you know you'll be late, contact us in advance — we'll do our best to accommodate you without penalty.`,
  },
  {
    n: '06',
    q: 'Are there any mileage limits on the rentals?',
    a: `Most vehicles come with unlimited mileage within the UAE. Some exotic and ultra-luxury models may have a daily mileage cap.\n\nFull details are shown on each vehicle's listing page before you confirm your booking.`,
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="faq">
      <div className="faq__header">
        <p className="faq__eyebrow">FAQ</p>
        <h2 className="faq__heading">Your Questions Answered</h2>
      </div>

      <div className="faq__list">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div
              key={i}
              className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
            >
              <button
                className="faq__row"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span className="faq__num">{item.n}</span>
                <span className="faq__question">{item.q}</span>
                <span className="faq__icon" aria-hidden="true">
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <div className="faq__answer-wrap">
                <div className="faq__answer">
                  {item.a.split('\n').map((line, j) =>
                    line === '' ? <br key={j} /> : <p key={j}>{line}</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
