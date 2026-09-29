import HomeClient from '@/Pages/Home.jsx'

export const metadata = {
  title: "Ivanka Rent a Car | Luxury Car Rental Dubai UAE",
  description: "Rent luxury and exotic cars in Dubai — Ferrari, Lamborghini, Rolls Royce, Mercedes, Porsche and more. Premium car rental service in UAE.",
  alternates: { canonical: "https://ivankarentacar.ae" },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ivanka Rent a Car",
  "description": "Premium luxury and exotic car rental service in Dubai, UAE. Rent Ferrari, Lamborghini, Rolls Royce, Mercedes, Porsche and more.",
  "url": "https://ivankarentacar.ae",
  "telephone": "+971507578678",
  "email": "info@ivanka.ae",
  "image": "https://ivankarentacar.ae/cars/aston-martin/aston-martin-1.webp",
  "priceRange": "AED 500 - AED 5000 per day",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.instagram.com/ivankarentacar.ae/"
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HomeClient />
    </>
  )
}
