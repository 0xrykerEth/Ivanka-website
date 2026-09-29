'use client'
import { useState } from 'react'
import './module.FAQ.css'

const FAQS = [
  {
    n: '01',
    q: 'What is over limit charges?',
    a: `Over limit charges apply when you exceed the mileage limit specified in your rental agreement. The specific rate per kilometer is detailed in your contract.`,
  },
  {
    n: '02',
    q: 'Does Ivanka deliver the rental car anywhere in UAE?',
    a: `Free delivery in Dubai, Sharjah & Ajman. Airport pickup available for just AED 100.\n\nFor Abu Dhabi, Ras Al Khaimah, Fujairah & Umm Al Quwain:\n– Minimum 1-week booking or AED 500\n– Extra charges apply for shorter durations`,
  },
  {
    n: '03',
    q: 'How much are the fines in UAE?',
    a: `Traffic fines in the UAE vary depending on the violation. As a renter, you are responsible for paying any fines incurred during your rental period plus an administrative fee.`,
  },
  {
    n: '04',
    q: "What's the maximum number of days we can rent a car?",
    a: `You can rent a car for as long as you need, from a single day to several months. We offer special rates for long-term rentals exceeding 30 days.`,
  },
  {
    n: '05',
    q: 'Can I rent a car with a chauffeur?',
    a: `Absolutely. We offer professional chauffeur services for business travel, special events, airport transfers, and more. Contact us for personalized chauffeur packages.`,
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
