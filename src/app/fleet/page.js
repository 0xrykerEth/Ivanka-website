import FleetClient from '@/Pages/Fleet/Fleet.jsx'

export const metadata = {
  title: "Our Fleet | Ivanka Rent a Car Dubai",
  description: "Browse our full fleet of luxury and exotic rental cars in Dubai — Lamborghini, Ferrari, Rolls Royce, Mercedes G-Class, Porsche and more.",
  alternates: { canonical: "https://ivankarentacar.ae/fleet" },
}

const fleetSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Ivanka Rent a Car — Full Fleet",
  "description": "Luxury and exotic cars available for rent in Dubai, UAE",
  "url": "https://ivankarentacar.ae/fleet",
  "numberOfItems": 157,
  "itemListElement": [
    { "@type": "ListItem", "position": 1,  "name": "Aston Martin DBX — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 2,  "name": "Audi A6 — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 3,  "name": "Audi Q3 — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 4,  "name": "Audi Q7 — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 5,  "name": "Audi R8 — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 6,  "name": "Bentley Bentayga — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 7,  "name": "Bentley Continental GT — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 8,  "name": "BMW 7 Series — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 9,  "name": "BMW X5 — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 10, "name": "Cadillac Escalade — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 11, "name": "Chevrolet Camaro — Sports Car rental Dubai" },
    { "@type": "ListItem", "position": 12, "name": "Chevrolet Corvette — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 13, "name": "Chevrolet Tahoe — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 14, "name": "Dodge Challenger — Muscle Car rental Dubai" },
    { "@type": "ListItem", "position": 15, "name": "Dodge Charger — Muscle Car rental Dubai" },
    { "@type": "ListItem", "position": 16, "name": "Ferrari 488 — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 17, "name": "Ferrari F8 — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 18, "name": "Ferrari Roma — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 19, "name": "GMC Yukon — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 20, "name": "Jaguar F-Pace — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 21, "name": "Lamborghini Huracan — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 22, "name": "Lamborghini Urus — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 23, "name": "Maserati Ghibli — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 24, "name": "McLaren 720S — Supercar rental Dubai" },
    { "@type": "ListItem", "position": 25, "name": "Mercedes-Benz G-Class — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 26, "name": "Mercedes-Benz S-Class — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 27, "name": "Mini Cooper — Sports Car rental Dubai" },
    { "@type": "ListItem", "position": 28, "name": "Porsche 911 — Sports Car rental Dubai" },
    { "@type": "ListItem", "position": 29, "name": "Porsche Cayenne — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 30, "name": "Porsche Panamera — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 31, "name": "Rolls Royce Ghost — Luxury Sedan rental Dubai" },
    { "@type": "ListItem", "position": 32, "name": "Rolls Royce Cullinan — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 33, "name": "Toyota Land Cruiser — Luxury SUV rental Dubai" },
    { "@type": "ListItem", "position": 34, "name": "Range Rover — Luxury SUV rental Dubai" },
  ]
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetSchema) }}
      />
      <FleetClient />
    </>
  )
}
