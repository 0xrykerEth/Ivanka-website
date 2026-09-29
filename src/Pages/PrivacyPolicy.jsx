import Navbar from '../Components/Navbar/Navbar'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="pp">
        <div className="pp__inner">
          <h1 className="pp__title">Privacy Policy</h1>
          <p className="pp__intro">
            At Ivanka Rent A Car, we are committed to protecting your privacy and ensuring
            that your personal information is handled in a safe and responsible manner. This
            Privacy Policy outlines how we collect, use, and safeguard your data.
          </p>

          <section className="pp__section">
            <h2 className="pp__heading">Information We Collect</h2>
            <p className="pp__text">We may collect the following personal information:</p>
            <ul className="pp__list">
              <li>Your name, contact details and email address</li>
              <li>Payment information (processed securely via third-party providers)</li>
              <li>Driving license details and identification documents</li>
              <li>Booking history and rental preferences</li>
              <li>Device and browsing information when you visit our website</li>
            </ul>
          </section>

          <section className="pp__section">
            <h2 className="pp__heading">How We Use Your Information</h2>
            <ul className="pp__list">
              <li>To process and manage your reservations</li>
              <li>To communicate with you regarding bookings, inquiries, and offers</li>
              <li>To improve our services and customize your user experience</li>
              <li>To comply with legal obligations and protect our fleet</li>
              <li>To prevent fraud and ensure the security of our services</li>
            </ul>
          </section>

          <section className="pp__section">
            <h2 className="pp__heading">Data Security</h2>
            <p className="pp__text">
              We implement industry-standard security measures including encryption, secure
              servers, and restricted access controls to protect your personal information.
              Your data is stored securely and is only accessible by authorized personnel.
            </p>
          </section>

          <section className="pp__section">
            <h2 className="pp__heading">Third-Party Sharing</h2>
            <p className="pp__text">
              We do not sell or rent your personal information. We may share data with trusted
              service providers (payment processors, insurance partners) strictly for the
              purpose of fulfilling your booking or as required by law.
            </p>
          </section>

          <section className="pp__section">
            <h2 className="pp__heading">Your Rights</h2>
            <ul className="pp__list">
              <li>Access your personal data we hold</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section className="pp__section">
            <h2 className="pp__heading">Contact Us</h2>
            <p className="pp__text">
              If you have any questions or concerns about our Privacy Policy, please contact
              us at{' '}
              <a className="pp__link" href="mailto:info@ivankacars.com">info@ivankacars.com</a>
              {' '}or call{' '}
              <a className="pp__link" href="tel:+971507578678">+971 50 757 8678</a>.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
