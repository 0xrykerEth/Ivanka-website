'use client'
import { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './TermsOfService.css'

export default function TermsOfService() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <>
      <Navbar />
      <main className="tos">
        <div className="tos__inner">
          <h1 className="tos__title">Terms of Service</h1>
          <p className="tos__intro">
            Welcome to Ivanka Rent A Car. By accessing or using our services, you agree to
            comply with and be bound by the following terms and conditions. Please read them
            carefully before booking.
          </p>

          <section className="tos__section">
            <h2 className="tos__heading">Rental Requirements</h2>
            <ul className="tos__list">
              <li>All drivers must hold a valid driving license.</li>
              <li>International renters must present a valid passport along with their driving license.</li>
              <li>International Driving Permit (IDP) may be required depending on nationality.</li>
              <li>Minimum age requirements apply based on vehicle category (21 for standard, 25 for luxury/exotic).</li>
              <li>Drivers must have at least 1 year of driving experience.</li>
            </ul>
          </section>

          <section className="tos__section">
            <h2 className="tos__heading">Booking & Payment</h2>
            <ul className="tos__list">
              <li>Reservations are subject to vehicle availability.</li>
              <li>We offer a zero-deposit policy — security deposits are not required.</li>
              <li>Rental fees are confirmed and paid in full at the time of vehicle handover.</li>
              <li>Accepted payment methods: major credit cards, bank transfers, and cash.</li>
              <li>Pricing is per 24-hour period unless otherwise agreed in writing.</li>
            </ul>
          </section>

          <section className="tos__section">
            <h2 className="tos__heading">Vehicle Usage</h2>
            <ul className="tos__list">
              <li>Vehicles must be used responsibly and in accordance with UAE traffic laws.</li>
              <li>Off-road driving (where not permitted by terrain), racing, and reckless driving are strictly prohibited.</li>
              <li>Subleasing or transferring the vehicle to a third party is not allowed.</li>
              <li>The renter is responsible for any traffic fines, tolls (Salik/Darb), or damages incurred during the rental period.</li>
              <li>Smoking is not permitted in any of our vehicles; a cleaning fee applies for violations.</li>
              <li>Pets are allowed in select vehicles only with prior approval.</li>
            </ul>
          </section>

          <section className="tos__section">
            <h2 className="tos__heading">Mileage & Fuel</h2>
            <ul className="tos__list">
              <li>Each rental includes a daily mileage allowance (specified per vehicle).</li>
              <li>Excess mileage charges apply per kilometre beyond the limit.</li>
              <li>Vehicles are delivered with a full tank and must be returned with a full tank.</li>
            </ul>
          </section>

          <section className="tos__section">
            <h2 className="tos__heading">Modifications & Cancellations</h2>
            <p className="tos__text">
              Please contact our support team as early as possible if you need to modify or
              cancel your reservation.
            </p>
            <ul className="tos__list">
              <li>Cancellations made 48+ hours before pickup: full refund / no penalty.</li>
              <li>Cancellations within 24–48 hours: a small administrative fee may apply.</li>
              <li>No-shows or last-minute cancellations may be charged the first day's rental.</li>
            </ul>
          </section>

          <section className="tos__section">
            <h2 className="tos__heading">Insurance & Liability</h2>
            <p className="tos__text">
              All vehicles are covered with comprehensive insurance. The renter remains liable
              for damages caused by negligence, traffic violations, or breach of these terms.
              Insurance excess may apply in case of an accident.
            </p>
          </section>

          <section className="tos__section">
            <h2 className="tos__heading">Contact</h2>
            <p className="tos__text">
              For questions regarding these terms, please reach out to{' '}
              <a className="tos__link" href="mailto:info@ivankacars.com">info@ivankacars.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
