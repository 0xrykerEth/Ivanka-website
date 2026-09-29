'use client'
import { useMemo, useState, useCallback, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import Filter, { MIN_PRICE, MAX_PRICE } from '../../Components/Filter/Filter'
import './module.Fleet.css'

import astonMartinLogo from '../../Components/Navbar/Brands/AstonMartin.svg'
import audiLogo        from '../../Components/Navbar/Brands/Audi.svg'
import bentleyLogo     from '../../Components/Navbar/Brands/Bentley.svg'
import bmwLogo         from '../../Components/Navbar/Brands/BMW.svg'
import cadillacLogo    from '../../Components/Navbar/Brands/Cadillac.svg'
import chevroletLogo   from '../../Components/Navbar/Brands/Chevrolet.svg'
import rollsRoyceLogo  from '../../Components/Navbar/Brands/RollsRoyals.svg'
import dodgeLogo       from '../../Components/Navbar/Brands/dodge-seeklogo_1024.svg'
import ferrariLogo     from '../../Components/Navbar/Brands/Ferrari.svg'
import gmcLogo         from '../../Components/Navbar/Brands/gmc-seeklogo.svg'
import jaguarLogo      from '../../Components/Navbar/Brands/Jaguar_2001_wordmark.svg'
import lamborghiniLogo from '../../Components/Navbar/Brands/Lamborghini.svg'
import maseratiLogo    from '../../Components/Navbar/Brands/maserati-seeklogo_1024.svg'
import mclarenLogo     from '../../Components/Navbar/Brands/McLaren.svg'
import mercedesLogo    from '../../Components/Navbar/Brands/Mercedes.svg'
import miniLogo        from '../../Components/Navbar/Brands/mini-cooper-seeklogo_1024.svg'
import porscheLogo     from '../../Components/Navbar/Brands/Porsche.svg'
import toyotaLogo      from '../../Components/Navbar/Brands/Toyota.svg'
import rangeRoverLogo  from '../../Components/Navbar/Brands/RangeRover.svg'

const waUrl = (carName) =>
  `https://wa.me/971507578678?text=${encodeURIComponent(`Hi I want to rent the ${carName}`)}`

const AM = astonMartinLogo
const AU = audiLogo
const BE = bentleyLogo
const BM = bmwLogo
const CA = cadillacLogo
const CH = chevroletLogo
const RR = rollsRoyceLogo
const DO = dodgeLogo
const FE = ferrariLogo
const GM = gmcLogo
const JA = jaguarLogo
const LA = lamborghiniLogo
const MA = maseratiLogo
const MC = mclarenLogo
const ME = mercedesLogo
const MI = miniLogo
const PO = porscheLogo
const TO = toyotaLogo
const RA = rangeRoverLogo

const CARS = [
  { id: 1,  name: 'Aston Martin DBX', variant: 'DBX',               brand: 'Aston Martin', logo: AM, bodyType: 'Luxury SUV',   images: ['/cars/aston-martin/aston-martin-1.webp','/cars/aston-martin/aston-martin-2.webp','/cars/aston-martin/aston-martin-3.webp','/cars/aston-martin/aston-martin-4.webp','/cars/aston-martin/aston-martin-5.webp','/cars/aston-martin/aston-martin-6.webp','/cars/aston-martin/aston-martin-7.webp','/cars/aston-martin/aston-martin-8.webp'] },
  { id: 2,  name: 'Audi A6',          variant: 'A6 T99869 2021',    brand: 'Audi',         logo: AU, bodyType: 'Luxury Sedan', images: ['/cars/audi/a6-white/1.webp','/cars/audi/a6-white/2.webp','/cars/audi/a6-white/3.webp','/cars/audi/a6-white/4.webp','/cars/audi/a6-white/5.webp','/cars/audi/a6-white/6.webp','/cars/audi/a6-white/7.webp'] },
  { id: 3,  name: 'Audi Q3',          variant: 'Q3 L99571 2022',    brand: 'Audi',         logo: AU, bodyType: 'Luxury SUV',   images: ['/cars/audi/q3-grey/1.webp','/cars/audi/q3-grey/2.webp','/cars/audi/q3-grey/3.webp','/cars/audi/q3-grey/4.webp','/cars/audi/q3-grey/5.webp','/cars/audi/q3-grey/6.webp','/cars/audi/q3-grey/7.webp','/cars/audi/q3-grey/8.webp'] },
  { id: 4,  name: 'Audi Q7',          variant: 'Q7 A95047 2022',    brand: 'Audi',         logo: AU, bodyType: 'Luxury SUV',   images: ['/cars/audi/q7-blue/1.webp','/cars/audi/q7-blue/2.webp','/cars/audi/q7-blue/3.webp','/cars/audi/q7-blue/4.webp','/cars/audi/q7-blue/5.webp','/cars/audi/q7-blue/6.webp','/cars/audi/q7-blue/7.webp'] },
  { id: 5,  name: 'Audi Q7',          variant: 'Q7 Q5098 BEIGH',    brand: 'Audi',         logo: AU, bodyType: 'Luxury SUV',   images: ['/cars/audi/q7-beige/1.webp','/cars/audi/q7-beige/2.webp','/cars/audi/q7-beige/3.webp','/cars/audi/q7-beige/4.webp','/cars/audi/q7-beige/5.webp','/cars/audi/q7-beige/6.webp','/cars/audi/q7-beige/7.webp','/cars/audi/q7-beige/8.webp'] },
  { id: 6,  name: 'Audi R8',          variant: 'R8 AA24710 2022',   brand: 'Audi',         logo: AU, bodyType: 'Supercar',     images: ['/cars/audi/r8-green/1.webp','/cars/audi/r8-green/2.webp','/cars/audi/r8-green/3.webp','/cars/audi/r8-green/4.webp','/cars/audi/r8-green/5.webp','/cars/audi/r8-green/6.webp','/cars/audi/r8-green/7.webp','/cars/audi/r8-green/8.webp'] },
  { id: 7,  name: 'Audi RS Q3',       variant: 'RSQ3 L98216',       brand: 'Audi',         logo: AU, bodyType: 'Luxury SUV',   images: ['/cars/audi/rsq3-black/1.webp','/cars/audi/rsq3-black/2.webp','/cars/audi/rsq3-black/3.webp','/cars/audi/rsq3-black/4.webp','/cars/audi/rsq3-black/5.webp','/cars/audi/rsq3-black/6.webp','/cars/audi/rsq3-black/7.webp','/cars/audi/rsq3-black/8.webp'] },
  { id: 8,  name: 'Audi RS Q3',       variant: 'RSQ3 T99443',       brand: 'Audi',         logo: AU, bodyType: 'Luxury SUV',   images: ['/cars/audi/rsq3-grey/1.webp','/cars/audi/rsq3-grey/2.webp','/cars/audi/rsq3-grey/3.webp','/cars/audi/rsq3-grey/4.webp','/cars/audi/rsq3-grey/5.webp','/cars/audi/rsq3-grey/6.webp','/cars/audi/rsq3-grey/7.webp','/cars/audi/rsq3-grey/8.webp'] },
  { id: 9,  name: 'Audi RS Q8',       variant: 'RSQ8 M61561 2021',  brand: 'Audi',         logo: AU, bodyType: 'Supercar',     images: ['/cars/audi/rsq8-grey/1.webp','/cars/audi/rsq8-grey/2.webp','/cars/audi/rsq8-grey/3.webp','/cars/audi/rsq8-grey/4.webp','/cars/audi/rsq8-grey/5.webp','/cars/audi/rsq8-grey/6.webp','/cars/audi/rsq8-grey/7.webp','/cars/audi/rsq8-grey/8.webp'] },
  { id: 10, name: 'Audi RS Q8',       variant: 'RSQ8 U99446 2021',  brand: 'Audi',         logo: AU, bodyType: 'Supercar',     images: ['/cars/audi/rsq8-black/1.webp','/cars/audi/rsq8-black/2.webp','/cars/audi/rsq8-black/3.webp','/cars/audi/rsq8-black/4.webp','/cars/audi/rsq8-black/5.webp'] },
  // ── BMW (7 cars) ──
  { id: 28, name: 'BMW 7 Series 730i', variant: '730I K73030 2024 Blue',            brand: 'BMW', logo: BM, bodyType: 'Luxury Sedan', images: ['/cars/bmw/bmw-1/1.webp','/cars/bmw/bmw-1/2.webp','/cars/bmw/bmw-1/3.webp','/cars/bmw/bmw-1/4.webp','/cars/bmw/bmw-1/5.webp','/cars/bmw/bmw-1/6.webp','/cars/bmw/bmw-1/7.webp','/cars/bmw/bmw-1/8.webp'] },
  { id: 29, name: 'BMW 7 Series 735i', variant: '735I R73030 2023 Gray',            brand: 'BMW', logo: BM, bodyType: 'Luxury Sedan', images: ['/cars/bmw/bmw-2/1.webp','/cars/bmw/bmw-2/2.webp','/cars/bmw/bmw-2/3.webp','/cars/bmw/bmw-2/4.webp','/cars/bmw/bmw-2/5.webp','/cars/bmw/bmw-2/6.webp','/cars/bmw/bmw-2/7.webp','/cars/bmw/bmw-2/8.webp'] },
  { id: 30, name: 'BMW 8 Series 850',  variant: '850 T4816 2019 Blue',              brand: 'BMW', logo: BM, bodyType: 'Luxury Sedan', images: ['/cars/bmw/bmw-3/1.webp','/cars/bmw/bmw-3/2.webp','/cars/bmw/bmw-3/3.webp','/cars/bmw/bmw-3/4.webp','/cars/bmw/bmw-3/5.webp','/cars/bmw/bmw-3/6.webp','/cars/bmw/bmw-3/7.webp','/cars/bmw/bmw-3/8.webp'] },
  { id: 31, name: 'BMW 8 Series 850i', variant: '850i EE14379 Black',               brand: 'BMW', logo: BM, bodyType: 'Luxury Sedan', images: ['/cars/bmw/bmw-4/1.webp','/cars/bmw/bmw-4/2.webp','/cars/bmw/bmw-4/3.webp','/cars/bmw/bmw-4/4.webp','/cars/bmw/bmw-4/5.webp','/cars/bmw/bmw-4/6.webp','/cars/bmw/bmw-4/7.webp'] },
  { id: 32, name: 'BMW M4 Convertible',variant: 'M430I Convertible AA78183 White',  brand: 'BMW', logo: BM, bodyType: 'Convertible',  images: ['/cars/bmw/bmw-5/1.webp','/cars/bmw/bmw-5/2.webp','/cars/bmw/bmw-5/3.webp','/cars/bmw/bmw-5/4.webp','/cars/bmw/bmw-5/5.webp','/cars/bmw/bmw-5/6.webp','/cars/bmw/bmw-5/7.webp','/cars/bmw/bmw-5/8.webp'] },
  { id: 33, name: 'BMW M4 430i',       variant: 'M430I T4835 2019 Black',           brand: 'BMW', logo: BM, bodyType: 'Luxury Sedan', images: ['/cars/bmw/bmw-6/1.webp','/cars/bmw/bmw-6/2.webp','/cars/bmw/bmw-6/3.webp','/cars/bmw/bmw-6/4.webp','/cars/bmw/bmw-6/5.webp','/cars/bmw/bmw-6/6.webp','/cars/bmw/bmw-6/7.webp','/cars/bmw/bmw-6/8.webp'] },
  { id: 34, name: 'BMW M4 440i',       variant: 'M440I S92020 White',               brand: 'BMW', logo: BM, bodyType: 'Luxury Sedan', images: ['/cars/bmw/bmw-7/1.webp','/cars/bmw/bmw-7/2.webp','/cars/bmw/bmw-7/3.webp','/cars/bmw/bmw-7/4.webp','/cars/bmw/bmw-7/5.webp','/cars/bmw/bmw-7/6.webp','/cars/bmw/bmw-7/7.webp','/cars/bmw/bmw-7/8.webp'] },
  // ── Chevrolet (14 cars) ──
  { id: 42, name: 'Chevrolet Camaro',   variant: 'SS CC67964 Black',      brand: 'Chevrolet', logo: CH, bodyType: 'Sports Car',   images: ['/cars/chevrolet/chevrolet-1/1.webp','/cars/chevrolet/chevrolet-1/2.webp','/cars/chevrolet/chevrolet-1/3.webp','/cars/chevrolet/chevrolet-1/4.webp','/cars/chevrolet/chevrolet-1/5.webp','/cars/chevrolet/chevrolet-1/6.webp','/cars/chevrolet/chevrolet-1/7.webp','/cars/chevrolet/chevrolet-1/8.webp'] },
  { id: 43, name: 'Chevrolet Camaro',   variant: 'T62276 Black',          brand: 'Chevrolet', logo: CH, bodyType: 'Sports Car',   images: ['/cars/chevrolet/chevrolet-2/1.webp','/cars/chevrolet/chevrolet-2/2.webp','/cars/chevrolet/chevrolet-2/3.webp','/cars/chevrolet/chevrolet-2/4.webp','/cars/chevrolet/chevrolet-2/5.webp','/cars/chevrolet/chevrolet-2/6.webp','/cars/chevrolet/chevrolet-2/7.webp','/cars/chevrolet/chevrolet-2/8.webp'] },
  { id: 44, name: 'Chevrolet Corvette', variant: 'J93030 Black',          brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-3/1.webp','/cars/chevrolet/chevrolet-3/2.webp','/cars/chevrolet/chevrolet-3/3.webp','/cars/chevrolet/chevrolet-3/4.webp','/cars/chevrolet/chevrolet-3/5.webp','/cars/chevrolet/chevrolet-3/6.webp'] },
  { id: 45, name: 'Chevrolet Corvette', variant: 'T69090 2023 White',     brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-4/1.webp','/cars/chevrolet/chevrolet-4/2.webp','/cars/chevrolet/chevrolet-4/3.webp','/cars/chevrolet/chevrolet-4/4.webp','/cars/chevrolet/chevrolet-4/5.webp','/cars/chevrolet/chevrolet-4/6.webp','/cars/chevrolet/chevrolet-4/7.webp'] },
  { id: 46, name: 'Chevrolet Corvette', variant: 'T83030 Red',            brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-5/1.webp','/cars/chevrolet/chevrolet-5/2.webp','/cars/chevrolet/chevrolet-5/3.webp','/cars/chevrolet/chevrolet-5/4.webp','/cars/chevrolet/chevrolet-5/5.webp','/cars/chevrolet/chevrolet-5/6.webp','/cars/chevrolet/chevrolet-5/7.webp','/cars/chevrolet/chevrolet-5/8.webp'] },
  { id: 47, name: 'Chevrolet Corvette', variant: 'U63030 2022 Blue',      brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-6/1.webp','/cars/chevrolet/chevrolet-6/2.webp','/cars/chevrolet/chevrolet-6/3.webp','/cars/chevrolet/chevrolet-6/4.webp','/cars/chevrolet/chevrolet-6/5.webp','/cars/chevrolet/chevrolet-6/6.webp','/cars/chevrolet/chevrolet-6/7.webp','/cars/chevrolet/chevrolet-6/8.webp'] },
  { id: 48, name: 'Chevrolet Corvette', variant: 'U69090 2023 Yellow',    brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-7/1.webp','/cars/chevrolet/chevrolet-7/2.webp','/cars/chevrolet/chevrolet-7/3.webp','/cars/chevrolet/chevrolet-7/4.webp','/cars/chevrolet/chevrolet-7/5.webp','/cars/chevrolet/chevrolet-7/6.webp','/cars/chevrolet/chevrolet-7/7.webp','/cars/chevrolet/chevrolet-7/8.webp'] },
  { id: 49, name: 'Chevrolet Corvette', variant: 'U83030 2022 Blue',      brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-8/1.webp','/cars/chevrolet/chevrolet-8/2.webp','/cars/chevrolet/chevrolet-8/3.webp','/cars/chevrolet/chevrolet-8/4.webp','/cars/chevrolet/chevrolet-8/5.webp','/cars/chevrolet/chevrolet-8/6.webp','/cars/chevrolet/chevrolet-8/7.webp','/cars/chevrolet/chevrolet-8/8.webp'] },
  { id: 50, name: 'Chevrolet Corvette', variant: 'V30305 2023 Brown',     brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-9/1.webp','/cars/chevrolet/chevrolet-9/2.webp','/cars/chevrolet/chevrolet-9/3.webp','/cars/chevrolet/chevrolet-9/4.webp','/cars/chevrolet/chevrolet-9/5.webp','/cars/chevrolet/chevrolet-9/6.webp','/cars/chevrolet/chevrolet-9/7.webp','/cars/chevrolet/chevrolet-9/8.webp'] },
  { id: 51, name: 'Chevrolet Corvette', variant: 'Y24950 2022 Gray',      brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-10/1.webp','/cars/chevrolet/chevrolet-10/2.webp','/cars/chevrolet/chevrolet-10/3.webp','/cars/chevrolet/chevrolet-10/4.webp','/cars/chevrolet/chevrolet-10/5.webp','/cars/chevrolet/chevrolet-10/6.webp','/cars/chevrolet/chevrolet-10/7.webp','/cars/chevrolet/chevrolet-10/8.webp'] },
  { id: 52, name: 'Chevrolet Corvette', variant: 'Y24954 2022 Brown',     brand: 'Chevrolet', logo: CH, bodyType: 'Supercar',     images: ['/cars/chevrolet/chevrolet-11/1.webp','/cars/chevrolet/chevrolet-11/2.webp','/cars/chevrolet/chevrolet-11/3.webp','/cars/chevrolet/chevrolet-11/4.webp','/cars/chevrolet/chevrolet-11/5.webp','/cars/chevrolet/chevrolet-11/6.webp','/cars/chevrolet/chevrolet-11/7.webp'] },
  { id: 53, name: 'Chevrolet Tahoe',    variant: 'P25733 2021 White',     brand: 'Chevrolet', logo: CH, bodyType: 'Luxury SUV',   images: ['/cars/chevrolet/chevrolet-12/1.webp','/cars/chevrolet/chevrolet-12/2.webp','/cars/chevrolet/chevrolet-12/3.webp','/cars/chevrolet/chevrolet-12/4.webp','/cars/chevrolet/chevrolet-12/5.webp','/cars/chevrolet/chevrolet-12/6.webp','/cars/chevrolet/chevrolet-12/7.webp','/cars/chevrolet/chevrolet-12/8.webp'] },
  { id: 54, name: 'Chevrolet Tahoe',    variant: 'R98621 2022 Black',     brand: 'Chevrolet', logo: CH, bodyType: 'Luxury SUV',   images: ['/cars/chevrolet/chevrolet-13/1.webp','/cars/chevrolet/chevrolet-13/2.webp','/cars/chevrolet/chevrolet-13/3.webp','/cars/chevrolet/chevrolet-13/4.webp','/cars/chevrolet/chevrolet-13/5.webp','/cars/chevrolet/chevrolet-13/6.webp','/cars/chevrolet/chevrolet-13/7.webp','/cars/chevrolet/chevrolet-13/8.webp'] },
  { id: 55, name: 'Chevrolet Tahoe',    variant: 'Z71 P27326 Brown',      brand: 'Chevrolet', logo: CH, bodyType: 'Luxury SUV',   images: ['/cars/chevrolet/chevrolet-14/1.webp','/cars/chevrolet/chevrolet-14/2.webp','/cars/chevrolet/chevrolet-14/3.webp','/cars/chevrolet/chevrolet-14/4.webp','/cars/chevrolet/chevrolet-14/5.webp','/cars/chevrolet/chevrolet-14/6.webp','/cars/chevrolet/chevrolet-14/7.webp','/cars/chevrolet/chevrolet-14/8.webp'] },
  // ── Cadillac Escalade (7 cars) ──
  { id: 35, name: 'Cadillac Escalade', variant: 'EE36304 Black',          brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-1/1.webp','/cars/cadillac/cadillac-1/2.webp','/cars/cadillac/cadillac-1/3.webp','/cars/cadillac/cadillac-1/4.webp','/cars/cadillac/cadillac-1/5.webp'] },
  { id: 36, name: 'Cadillac Escalade', variant: 'L5036 2021 Golden',       brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-2/1.webp','/cars/cadillac/cadillac-2/2.webp','/cars/cadillac/cadillac-2/3.webp','/cars/cadillac/cadillac-2/4.webp','/cars/cadillac/cadillac-2/5.webp','/cars/cadillac/cadillac-2/6.webp','/cars/cadillac/cadillac-2/7.webp','/cars/cadillac/cadillac-2/8.webp'] },
  { id: 37, name: 'Cadillac Escalade', variant: 'Q63030 Black',            brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-3/1.webp','/cars/cadillac/cadillac-3/2.webp','/cars/cadillac/cadillac-3/3.webp','/cars/cadillac/cadillac-3/4.webp','/cars/cadillac/cadillac-3/5.webp','/cars/cadillac/cadillac-3/6.webp','/cars/cadillac/cadillac-3/7.webp','/cars/cadillac/cadillac-3/8.webp'] },
  { id: 38, name: 'Cadillac Escalade', variant: 'S4835 2022 Black',        brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-4/1.webp','/cars/cadillac/cadillac-4/2.webp','/cars/cadillac/cadillac-4/3.webp','/cars/cadillac/cadillac-4/4.webp','/cars/cadillac/cadillac-4/5.webp','/cars/cadillac/cadillac-4/6.webp','/cars/cadillac/cadillac-4/7.webp','/cars/cadillac/cadillac-4/8.webp'] },
  { id: 39, name: 'Cadillac Escalade', variant: 'SP T92533 Black',         brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-5/1.webp','/cars/cadillac/cadillac-5/2.webp','/cars/cadillac/cadillac-5/3.webp','/cars/cadillac/cadillac-5/4.webp','/cars/cadillac/cadillac-5/5.webp','/cars/cadillac/cadillac-5/6.webp','/cars/cadillac/cadillac-5/7.webp','/cars/cadillac/cadillac-5/8.webp'] },
  { id: 40, name: 'Cadillac Escalade', variant: 'Sport AA78075 2024 Black',brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-6/1.webp','/cars/cadillac/cadillac-6/2.webp','/cars/cadillac/cadillac-6/3.webp','/cars/cadillac/cadillac-6/4.webp','/cars/cadillac/cadillac-6/5.webp','/cars/cadillac/cadillac-6/6.webp','/cars/cadillac/cadillac-6/7.webp','/cars/cadillac/cadillac-6/8.webp'] },
  { id: 41, name: 'Cadillac Escalade', variant: 'V83030 2023 White',       brand: 'Cadillac', logo: CA, bodyType: 'Luxury SUV', images: ['/cars/cadillac/cadillac-7/1.webp','/cars/cadillac/cadillac-7/2.webp','/cars/cadillac/cadillac-7/3.webp','/cars/cadillac/cadillac-7/4.webp','/cars/cadillac/cadillac-7/5.webp','/cars/cadillac/cadillac-7/6.webp','/cars/cadillac/cadillac-7/7.webp','/cars/cadillac/cadillac-7/8.webp'] },
  // ── Bentley Bentayga (8 cars) ──
  { id: 11, name: 'Bentley Bentayga',        variant: 'Bentayga AA65215 2024', brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-1/1.webp','/cars/bentley/bentley-1/2.webp','/cars/bentley/bentley-1/3.webp','/cars/bentley/bentley-1/4.webp','/cars/bentley/bentley-1/5.webp','/cars/bentley/bentley-1/6.webp','/cars/bentley/bentley-1/7.webp','/cars/bentley/bentley-1/8.webp'] },
  { id: 12, name: 'Bentley Bentayga',        variant: 'Bentayga AA65220 2024', brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-2/1.webp','/cars/bentley/bentley-2/2.webp','/cars/bentley/bentley-2/3.webp','/cars/bentley/bentley-2/4.webp','/cars/bentley/bentley-2/5.webp','/cars/bentley/bentley-2/6.webp','/cars/bentley/bentley-2/7.webp','/cars/bentley/bentley-2/8.webp'] },
  { id: 13, name: 'Bentley Bentayga',        variant: 'Bentayga K99445 2022',  brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-3/1.webp','/cars/bentley/bentley-3/2.webp','/cars/bentley/bentley-3/3.webp','/cars/bentley/bentley-3/4.webp','/cars/bentley/bentley-3/5.webp','/cars/bentley/bentley-3/6.webp','/cars/bentley/bentley-3/7.webp','/cars/bentley/bentley-3/8.webp'] },
  { id: 14, name: 'Bentley Bentayga',        variant: 'Bentayga P8164 2024',   brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-4/1.webp','/cars/bentley/bentley-4/2.webp','/cars/bentley/bentley-4/3.webp','/cars/bentley/bentley-4/4.webp','/cars/bentley/bentley-4/5.webp','/cars/bentley/bentley-4/6.webp','/cars/bentley/bentley-4/7.webp','/cars/bentley/bentley-4/8.webp'] },
  { id: 15, name: 'Bentley Bentayga',        variant: 'Bentayga S66447 2022',  brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-5/1.webp','/cars/bentley/bentley-5/2.webp','/cars/bentley/bentley-5/3.webp','/cars/bentley/bentley-5/4.webp','/cars/bentley/bentley-5/5.webp','/cars/bentley/bentley-5/6.webp','/cars/bentley/bentley-5/7.webp','/cars/bentley/bentley-5/8.webp'] },
  { id: 16, name: 'Bentley Bentayga',        variant: 'Bentayga S8453 2023',   brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-6/1.webp','/cars/bentley/bentley-6/2.webp','/cars/bentley/bentley-6/3.webp','/cars/bentley/bentley-6/4.webp','/cars/bentley/bentley-6/5.webp','/cars/bentley/bentley-6/6.webp','/cars/bentley/bentley-6/7.webp','/cars/bentley/bentley-6/8.webp'] },
  { id: 17, name: 'Bentley Bentayga',        variant: 'Bentayga T8453 2023',   brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-7/1.webp','/cars/bentley/bentley-7/2.webp','/cars/bentley/bentley-7/3.webp','/cars/bentley/bentley-7/4.webp','/cars/bentley/bentley-7/5.webp','/cars/bentley/bentley-7/6.webp','/cars/bentley/bentley-7/7.webp','/cars/bentley/bentley-7/8.webp'] },
  { id: 18, name: 'Bentley Bentayga',        variant: 'Bentayga U66443',       brand: 'Bentley', logo: BE, bodyType: 'Luxury SUV',   images: ['/cars/bentley/bentley-8/1.webp','/cars/bentley/bentley-8/2.webp','/cars/bentley/bentley-8/3.webp','/cars/bentley/bentley-8/4.webp','/cars/bentley/bentley-8/5.webp','/cars/bentley/bentley-8/6.webp','/cars/bentley/bentley-8/7.webp','/cars/bentley/bentley-8/8.webp'] },
  // ── Bentley Continental GT (4 cars) ──
  { id: 19, name: 'Bentley Continental GT',  variant: 'GT U4825 2019',         brand: 'Bentley', logo: BE, bodyType: 'Luxury Sedan', images: ['/cars/bentley/bentley-9/1.webp','/cars/bentley/bentley-9/2.webp','/cars/bentley/bentley-9/3.webp','/cars/bentley/bentley-9/4.webp','/cars/bentley/bentley-9/5.webp','/cars/bentley/bentley-9/6.webp','/cars/bentley/bentley-9/7.webp','/cars/bentley/bentley-9/8.webp'] },
  { id: 20, name: 'Bentley Continental GT',  variant: 'GT U8430 2019',         brand: 'Bentley', logo: BE, bodyType: 'Luxury Sedan', images: ['/cars/bentley/bentley-10/1.webp','/cars/bentley/bentley-10/2.webp','/cars/bentley/bentley-10/3.webp','/cars/bentley/bentley-10/4.webp','/cars/bentley/bentley-10/5.webp','/cars/bentley/bentley-10/6.webp'] },
  { id: 21, name: 'Bentley Continental GT',  variant: 'GT U8435 2020',         brand: 'Bentley', logo: BE, bodyType: 'Luxury Sedan', images: ['/cars/bentley/bentley-11/1.webp','/cars/bentley/bentley-11/2.webp','/cars/bentley/bentley-11/3.webp','/cars/bentley/bentley-11/4.webp','/cars/bentley/bentley-11/5.webp','/cars/bentley/bentley-11/6.webp','/cars/bentley/bentley-11/7.webp','/cars/bentley/bentley-11/8.webp'] },
  { id: 22, name: 'Bentley Continental GT',  variant: 'GT V8 Q4835',           brand: 'Bentley', logo: BE, bodyType: 'Luxury Sedan', images: ['/cars/bentley/bentley-12/1.webp','/cars/bentley/bentley-12/2.webp','/cars/bentley/bentley-12/3.webp','/cars/bentley/bentley-12/4.webp','/cars/bentley/bentley-12/5.webp','/cars/bentley/bentley-12/6.webp','/cars/bentley/bentley-12/7.webp','/cars/bentley/bentley-12/8.webp'] },
  // ── Bentley Continental GTC (3 cars) ──
  { id: 23, name: 'Bentley Continental GTC', variant: 'GTC T4825',             brand: 'Bentley', logo: BE, bodyType: 'Convertible',  images: ['/cars/bentley/bentley-13/1.webp','/cars/bentley/bentley-13/2.webp','/cars/bentley/bentley-13/3.webp','/cars/bentley/bentley-13/4.webp','/cars/bentley/bentley-13/5.webp','/cars/bentley/bentley-13/6.webp','/cars/bentley/bentley-13/7.webp','/cars/bentley/bentley-13/8.webp'] },
  { id: 24, name: 'Bentley Continental GTC', variant: 'GTC T66443 2022',       brand: 'Bentley', logo: BE, bodyType: 'Convertible',  images: ['/cars/bentley/bentley-14/1.webp','/cars/bentley/bentley-14/2.webp','/cars/bentley/bentley-14/3.webp','/cars/bentley/bentley-14/4.webp','/cars/bentley/bentley-14/5.webp','/cars/bentley/bentley-14/6.webp','/cars/bentley/bentley-14/7.webp','/cars/bentley/bentley-14/8.webp'] },
  { id: 25, name: 'Bentley Continental GTC', variant: 'GTC Y24958 2022',       brand: 'Bentley', logo: BE, bodyType: 'Convertible',  images: ['/cars/bentley/bentley-15/1.webp','/cars/bentley/bentley-15/2.webp','/cars/bentley/bentley-15/3.webp','/cars/bentley/bentley-15/4.webp','/cars/bentley/bentley-15/5.webp','/cars/bentley/bentley-15/6.webp','/cars/bentley/bentley-15/7.webp','/cars/bentley/bentley-15/8.webp'] },
  // ── Bentley Flying Spur (2 cars) ──
  { id: 26, name: 'Bentley Flying Spur',     variant: 'Flying Spur A4798 2024',brand: 'Bentley', logo: BE, bodyType: 'Luxury Sedan', images: ['/cars/bentley/bentley-16/1.webp','/cars/bentley/bentley-16/2.webp','/cars/bentley/bentley-16/3.webp','/cars/bentley/bentley-16/4.webp','/cars/bentley/bentley-16/5.webp','/cars/bentley/bentley-16/6.webp','/cars/bentley/bentley-16/7.webp','/cars/bentley/bentley-16/8.webp'] },
  { id: 27, name: 'Bentley Flying Spur',     variant: 'Flying Spur D9048 2024',brand: 'Bentley', logo: BE, bodyType: 'Luxury Sedan', images: ['/cars/bentley/bentley-17/1.webp','/cars/bentley/bentley-17/2.webp','/cars/bentley/bentley-17/3.webp','/cars/bentley/bentley-17/4.webp','/cars/bentley/bentley-17/5.webp','/cars/bentley/bentley-17/6.webp','/cars/bentley/bentley-17/7.webp','/cars/bentley/bentley-17/8.webp'] },
  // ── Rolls Royce (3 cars) ──
  { id: 56, name: 'Rolls Royce Cullinan', variant: 'Cullinan', brand: 'Rolls Royce', logo: RR, bodyType: 'Luxury SUV',   images: ['/cars/rolls-royce/cullinan/1.webp'] },
  { id: 57, name: 'Rolls Royce Ghost',    variant: 'Ghost',    brand: 'Rolls Royce', logo: RR, bodyType: 'Luxury Sedan', images: ['/cars/rolls-royce/ghost/1.webp'] },
  { id: 58, name: 'Rolls Royce Phantom',  variant: 'Phantom',  brand: 'Rolls Royce', logo: RR, bodyType: 'Luxury Sedan', images: ['/cars/rolls-royce/phantom/1.webp'] },
  // ── Dodge (1 car) ──
  { id: 59, name: 'Dodge Challenger', variant: 'Challenger', brand: 'Dodge', logo: DO, bodyType: 'Sports Car', images: ['/cars/dodge/dodge-1/1.webp','/cars/dodge/dodge-1/2.webp','/cars/dodge/dodge-1/3.webp','/cars/dodge/dodge-1/4.webp','/cars/dodge/dodge-1/5.webp','/cars/dodge/dodge-1/6.webp','/cars/dodge/dodge-1/7.webp','/cars/dodge/dodge-1/8.webp'] },
  // ── Ferrari (10 cars) ──
  { id: 60, name: 'Ferrari F8 Coupe',      variant: 'Q7507',     brand: 'Ferrari', logo: FE, bodyType: 'Supercar',   images: ['/cars/ferrari/ferrari-1/1.webp','/cars/ferrari/ferrari-1/2.webp','/cars/ferrari/ferrari-1/3.webp','/cars/ferrari/ferrari-1/4.webp','/cars/ferrari/ferrari-1/5.webp','/cars/ferrari/ferrari-1/6.webp','/cars/ferrari/ferrari-1/7.webp'] },
  { id: 61, name: 'Ferrari F8 Tributo',    variant: 'K66606',    brand: 'Ferrari', logo: FE, bodyType: 'Supercar',   images: ['/cars/ferrari/ferrari-2/1.webp','/cars/ferrari/ferrari-2/2.webp','/cars/ferrari/ferrari-2/3.webp','/cars/ferrari/ferrari-2/4.webp','/cars/ferrari/ferrari-2/5.webp','/cars/ferrari/ferrari-2/6.webp','/cars/ferrari/ferrari-2/7.webp'] },
  { id: 62, name: 'Ferrari GTC4 Lusso',    variant: 'S45302',    brand: 'Ferrari', logo: FE, bodyType: 'Sports Car', images: ['/cars/ferrari/ferrari-3/1.webp','/cars/ferrari/ferrari-3/2.webp','/cars/ferrari/ferrari-3/3.webp','/cars/ferrari/ferrari-3/4.webp','/cars/ferrari/ferrari-3/5.webp','/cars/ferrari/ferrari-3/6.webp','/cars/ferrari/ferrari-3/7.webp','/cars/ferrari/ferrari-3/8.webp'] },
  { id: 63, name: 'Ferrari Portofino M',   variant: 'DD32548',   brand: 'Ferrari', logo: FE, bodyType: 'Convertible', images: ['/cars/ferrari/ferrari-4/1.webp','/cars/ferrari/ferrari-4/2.webp','/cars/ferrari/ferrari-4/3.webp','/cars/ferrari/ferrari-4/4.webp','/cars/ferrari/ferrari-4/5.webp','/cars/ferrari/ferrari-4/6.webp','/cars/ferrari/ferrari-4/7.webp','/cars/ferrari/ferrari-4/8.webp'] },
  { id: 64, name: 'Ferrari Purosangue',    variant: 'S77776',    brand: 'Ferrari', logo: FE, bodyType: 'Luxury SUV', images: ['/cars/ferrari/ferrari-5/1.webp','/cars/ferrari/ferrari-5/2.webp','/cars/ferrari/ferrari-5/3.webp','/cars/ferrari/ferrari-5/4.webp','/cars/ferrari/ferrari-5/5.webp','/cars/ferrari/ferrari-5/6.webp','/cars/ferrari/ferrari-5/7.webp','/cars/ferrari/ferrari-5/8.webp'] },
  { id: 65, name: 'Ferrari Roma',          variant: 'S4825',     brand: 'Ferrari', logo: FE, bodyType: 'Sports Car', images: ['/cars/ferrari/ferrari-6/1.webp','/cars/ferrari/ferrari-6/2.webp','/cars/ferrari/ferrari-6/3.webp','/cars/ferrari/ferrari-6/4.webp','/cars/ferrari/ferrari-6/5.webp','/cars/ferrari/ferrari-6/6.webp'] },
  { id: 66, name: 'Ferrari Roma',          variant: 'U8425',     brand: 'Ferrari', logo: FE, bodyType: 'Sports Car', images: ['/cars/ferrari/ferrari-7/1.webp','/cars/ferrari/ferrari-7/2.webp','/cars/ferrari/ferrari-7/3.webp','/cars/ferrari/ferrari-7/4.webp','/cars/ferrari/ferrari-7/5.webp','/cars/ferrari/ferrari-7/6.webp','/cars/ferrari/ferrari-7/7.webp','/cars/ferrari/ferrari-7/8.webp'] },
  { id: 67, name: 'Ferrari SF90 Stradale', variant: 'Q4810',     brand: 'Ferrari', logo: FE, bodyType: 'Supercar',   images: ['/cars/ferrari/ferrari-8/1.webp','/cars/ferrari/ferrari-8/2.webp','/cars/ferrari/ferrari-8/3.webp','/cars/ferrari/ferrari-8/4.webp','/cars/ferrari/ferrari-8/5.webp','/cars/ferrari/ferrari-8/6.webp','/cars/ferrari/ferrari-8/7.webp','/cars/ferrari/ferrari-8/8.webp'] },
  { id: 68, name: 'Ferrari SF90 Stradale', variant: 'U4812',     brand: 'Ferrari', logo: FE, bodyType: 'Supercar',   images: ['/cars/ferrari/ferrari-9/1.webp','/cars/ferrari/ferrari-9/2.webp','/cars/ferrari/ferrari-9/3.webp','/cars/ferrari/ferrari-9/4.webp','/cars/ferrari/ferrari-9/5.webp','/cars/ferrari/ferrari-9/6.webp','/cars/ferrari/ferrari-9/7.webp','/cars/ferrari/ferrari-9/8.webp'] },
  { id: 69, name: 'Ferrari SF90 Stradale', variant: 'U9879',     brand: 'Ferrari', logo: FE, bodyType: 'Supercar',   images: ['/cars/ferrari/ferrari-10/1.webp','/cars/ferrari/ferrari-10/2.webp','/cars/ferrari/ferrari-10/3.webp','/cars/ferrari/ferrari-10/4.webp','/cars/ferrari/ferrari-10/5.webp','/cars/ferrari/ferrari-10/6.webp','/cars/ferrari/ferrari-10/7.webp','/cars/ferrari/ferrari-10/8.webp'] },
  // ── GMC (3 cars) ──
  { id: 70, name: 'GMC Yukon', variant: 'F36118 2024 Black', brand: 'GMC', logo: GM, bodyType: 'Luxury SUV', images: ['/cars/gmc/gmc-1/1.webp','/cars/gmc/gmc-1/2.webp','/cars/gmc/gmc-1/3.webp','/cars/gmc/gmc-1/4.webp','/cars/gmc/gmc-1/5.webp','/cars/gmc/gmc-1/6.webp','/cars/gmc/gmc-1/7.webp','/cars/gmc/gmc-1/8.webp'] },
  { id: 71, name: 'GMC Yukon', variant: 'J45694 2021 Black', brand: 'GMC', logo: GM, bodyType: 'Luxury SUV', images: ['/cars/gmc/gmc-2/1.webp','/cars/gmc/gmc-2/2.webp','/cars/gmc/gmc-2/3.webp','/cars/gmc/gmc-2/4.webp','/cars/gmc/gmc-2/5.webp','/cars/gmc/gmc-2/6.webp','/cars/gmc/gmc-2/7.webp','/cars/gmc/gmc-2/8.webp'] },
  { id: 72, name: 'GMC Yukon', variant: 'J86671 2022 White', brand: 'GMC', logo: GM, bodyType: 'Luxury SUV', images: ['/cars/gmc/gmc-3/1.webp','/cars/gmc/gmc-3/2.webp','/cars/gmc/gmc-3/3.webp','/cars/gmc/gmc-3/4.webp','/cars/gmc/gmc-3/5.webp','/cars/gmc/gmc-3/6.webp','/cars/gmc/gmc-3/7.webp','/cars/gmc/gmc-3/8.webp'] },
  // ── Jaguar (2 cars) ──
  { id: 73, name: 'Jaguar F-Pace', variant: 'Red',   brand: 'Jaguar', logo: JA, bodyType: 'Luxury SUV', images: ['/cars/jaguar/jaguar-1/1.webp','/cars/jaguar/jaguar-1/2.webp','/cars/jaguar/jaguar-1/3.webp','/cars/jaguar/jaguar-1/4.webp','/cars/jaguar/jaguar-1/5.webp'] },
  { id: 74, name: 'Jaguar F-Pace', variant: 'White', brand: 'Jaguar', logo: JA, bodyType: 'Luxury SUV', images: ['/cars/jaguar/jaguar-2/1.webp','/cars/jaguar/jaguar-2/2.webp','/cars/jaguar/jaguar-2/3.webp','/cars/jaguar/jaguar-2/4.webp','/cars/jaguar/jaguar-2/5.webp','/cars/jaguar/jaguar-2/6.webp','/cars/jaguar/jaguar-2/7.webp','/cars/jaguar/jaguar-2/8.webp'] },
  // ── Lamborghini (21 cars) ──
  { id: 75, name: 'Lamborghini Aventador', variant: 'L30306 2021',        brand: 'Lamborghini', logo: LA, bodyType: 'Supercar',    images: ['/cars/lamborghini/lamborghini-1/1.webp','/cars/lamborghini/lamborghini-1/2.webp','/cars/lamborghini/lamborghini-1/3.webp','/cars/lamborghini/lamborghini-1/4.webp','/cars/lamborghini/lamborghini-1/5.webp','/cars/lamborghini/lamborghini-1/6.webp','/cars/lamborghini/lamborghini-1/7.webp','/cars/lamborghini/lamborghini-1/8.webp'] },
  { id: 76, name: 'Lamborghini Huracan EVO',         variant: 'L3605 2021',  brand: 'Lamborghini', logo: LA, bodyType: 'Supercar',    images: ['/cars/lamborghini/lamborghini-2/1.webp','/cars/lamborghini/lamborghini-2/2.webp','/cars/lamborghini/lamborghini-2/3.webp','/cars/lamborghini/lamborghini-2/4.webp','/cars/lamborghini/lamborghini-2/5.webp','/cars/lamborghini/lamborghini-2/6.webp','/cars/lamborghini/lamborghini-2/7.webp'] },
  { id: 77, name: 'Lamborghini Huracan EVO',         variant: 'Q71912 2021', brand: 'Lamborghini', logo: LA, bodyType: 'Supercar',    images: ['/cars/lamborghini/lamborghini-3/1.webp','/cars/lamborghini/lamborghini-3/2.webp','/cars/lamborghini/lamborghini-3/3.webp','/cars/lamborghini/lamborghini-3/4.webp','/cars/lamborghini/lamborghini-3/5.webp','/cars/lamborghini/lamborghini-3/6.webp','/cars/lamborghini/lamborghini-3/7.webp','/cars/lamborghini/lamborghini-3/8.webp'] },
  { id: 78, name: 'Lamborghini Huracan EVO',         variant: 'S4829 2021',  brand: 'Lamborghini', logo: LA, bodyType: 'Supercar',    images: ['/cars/lamborghini/lamborghini-4/1.webp','/cars/lamborghini/lamborghini-4/2.webp','/cars/lamborghini/lamborghini-4/3.webp','/cars/lamborghini/lamborghini-4/4.webp','/cars/lamborghini/lamborghini-4/5.webp','/cars/lamborghini/lamborghini-4/6.webp','/cars/lamborghini/lamborghini-4/7.webp','/cars/lamborghini/lamborghini-4/8.webp'] },
  { id: 79, name: 'Lamborghini Huracan EVO Spyder',  variant: 'T8430 2022',  brand: 'Lamborghini', logo: LA, bodyType: 'Convertible', images: ['/cars/lamborghini/lamborghini-5/1.webp','/cars/lamborghini/lamborghini-5/2.webp','/cars/lamborghini/lamborghini-5/3.webp','/cars/lamborghini/lamborghini-5/4.webp','/cars/lamborghini/lamborghini-5/5.webp','/cars/lamborghini/lamborghini-5/6.webp','/cars/lamborghini/lamborghini-5/7.webp'] },
  { id: 80, name: 'Lamborghini Huracan EVO Spyder',  variant: 'V4816 2024',  brand: 'Lamborghini', logo: LA, bodyType: 'Convertible', images: ['/cars/lamborghini/lamborghini-6/1.webp','/cars/lamborghini/lamborghini-6/2.webp','/cars/lamborghini/lamborghini-6/3.webp','/cars/lamborghini/lamborghini-6/4.webp','/cars/lamborghini/lamborghini-6/5.webp','/cars/lamborghini/lamborghini-6/6.webp','/cars/lamborghini/lamborghini-6/7.webp','/cars/lamborghini/lamborghini-6/8.webp'] },
  { id: 81, name: 'Lamborghini Huracan EVO Spyder',  variant: 'V4816 2024 B',brand: 'Lamborghini', logo: LA, bodyType: 'Convertible', images: ['/cars/lamborghini/lamborghini-7/1.webp','/cars/lamborghini/lamborghini-7/2.webp','/cars/lamborghini/lamborghini-7/3.webp','/cars/lamborghini/lamborghini-7/4.webp','/cars/lamborghini/lamborghini-7/5.webp'] },
  { id: 82, name: 'Lamborghini Huracan EVO',         variant: 'O5016',       brand: 'Lamborghini', logo: LA, bodyType: 'Supercar',    images: ['/cars/lamborghini/lamborghini-8/1.webp','/cars/lamborghini/lamborghini-8/2.webp','/cars/lamborghini/lamborghini-8/3.webp','/cars/lamborghini/lamborghini-8/4.webp','/cars/lamborghini/lamborghini-8/5.webp','/cars/lamborghini/lamborghini-8/6.webp','/cars/lamborghini/lamborghini-8/7.webp','/cars/lamborghini/lamborghini-8/8.webp'] },
  { id: 83, name: 'Lamborghini Revuelto',             variant: 'L6458 2025',  brand: 'Lamborghini', logo: LA, bodyType: 'Supercar',    images: ['/cars/lamborghini/lamborghini-9/1.webp','/cars/lamborghini/lamborghini-9/2.webp','/cars/lamborghini/lamborghini-9/3.webp','/cars/lamborghini/lamborghini-9/4.webp','/cars/lamborghini/lamborghini-9/5.webp','/cars/lamborghini/lamborghini-9/6.webp','/cars/lamborghini/lamborghini-9/7.webp','/cars/lamborghini/lamborghini-9/8.webp'] },
  { id: 84, name: 'Lamborghini STO',                 variant: 'N90905 2022', brand: 'Lamborghini', logo: LA, bodyType: 'Race Car',    images: ['/cars/lamborghini/lamborghini-10/1.webp','/cars/lamborghini/lamborghini-10/2.webp','/cars/lamborghini/lamborghini-10/3.webp','/cars/lamborghini/lamborghini-10/4.webp','/cars/lamborghini/lamborghini-10/5.webp','/cars/lamborghini/lamborghini-10/6.webp','/cars/lamborghini/lamborghini-10/7.webp','/cars/lamborghini/lamborghini-10/8.webp'] },
  { id: 85, name: 'Lamborghini Urus',                variant: 'N63030 2022', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-11/1.webp','/cars/lamborghini/lamborghini-11/2.webp','/cars/lamborghini/lamborghini-11/3.webp','/cars/lamborghini/lamborghini-11/4.webp','/cars/lamborghini/lamborghini-11/5.webp','/cars/lamborghini/lamborghini-11/6.webp','/cars/lamborghini/lamborghini-11/7.webp'] },
  { id: 86, name: 'Lamborghini Urus',                variant: 'O62020 2021', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-12/1.webp','/cars/lamborghini/lamborghini-12/2.webp','/cars/lamborghini/lamborghini-12/3.webp','/cars/lamborghini/lamborghini-12/4.webp','/cars/lamborghini/lamborghini-12/5.webp','/cars/lamborghini/lamborghini-12/6.webp','/cars/lamborghini/lamborghini-12/7.webp','/cars/lamborghini/lamborghini-12/8.webp'] },
  { id: 87, name: 'Lamborghini Urus',                variant: 'P9879',       brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-13/1.webp','/cars/lamborghini/lamborghini-13/2.webp','/cars/lamborghini/lamborghini-13/3.webp','/cars/lamborghini/lamborghini-13/4.webp','/cars/lamborghini/lamborghini-13/5.webp','/cars/lamborghini/lamborghini-13/6.webp','/cars/lamborghini/lamborghini-13/7.webp','/cars/lamborghini/lamborghini-13/8.webp'] },
  { id: 88, name: 'Lamborghini Urus Performante',    variant: 'U4823 2024',  brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-14/1.webp','/cars/lamborghini/lamborghini-14/2.webp','/cars/lamborghini/lamborghini-14/3.webp','/cars/lamborghini/lamborghini-14/4.webp','/cars/lamborghini/lamborghini-14/5.webp','/cars/lamborghini/lamborghini-14/6.webp','/cars/lamborghini/lamborghini-14/7.webp','/cars/lamborghini/lamborghini-14/8.webp'] },
  { id: 89, name: 'Lamborghini Urus',                variant: 'Q30306 2021', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-15/1.webp','/cars/lamborghini/lamborghini-15/2.webp','/cars/lamborghini/lamborghini-15/3.webp','/cars/lamborghini/lamborghini-15/4.webp','/cars/lamborghini/lamborghini-15/5.webp','/cars/lamborghini/lamborghini-15/6.webp','/cars/lamborghini/lamborghini-15/7.webp','/cars/lamborghini/lamborghini-15/8.webp'] },
  { id: 90, name: 'Lamborghini Urus',                variant: 'Q62020 2021', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-16/1.webp','/cars/lamborghini/lamborghini-16/2.webp','/cars/lamborghini/lamborghini-16/3.webp','/cars/lamborghini/lamborghini-16/4.webp','/cars/lamborghini/lamborghini-16/5.webp','/cars/lamborghini/lamborghini-16/6.webp','/cars/lamborghini/lamborghini-16/7.webp','/cars/lamborghini/lamborghini-16/8.webp'] },
  { id: 91, name: 'Lamborghini Urus',                variant: 'Q90905 2022', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-17/1.webp','/cars/lamborghini/lamborghini-17/2.webp','/cars/lamborghini/lamborghini-17/3.webp','/cars/lamborghini/lamborghini-17/4.webp','/cars/lamborghini/lamborghini-17/5.webp','/cars/lamborghini/lamborghini-17/6.webp','/cars/lamborghini/lamborghini-17/7.webp','/cars/lamborghini/lamborghini-17/8.webp'] },
  { id: 92, name: 'Lamborghini Urus',                variant: 'R62020',      brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-18/1.webp','/cars/lamborghini/lamborghini-18/2.webp','/cars/lamborghini/lamborghini-18/3.webp','/cars/lamborghini/lamborghini-18/4.webp','/cars/lamborghini/lamborghini-18/5.webp','/cars/lamborghini/lamborghini-18/6.webp','/cars/lamborghini/lamborghini-18/7.webp'] },
  { id: 93, name: 'Lamborghini Urus',                variant: 'U30306 2022', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-19/1.webp','/cars/lamborghini/lamborghini-19/2.webp','/cars/lamborghini/lamborghini-19/3.webp','/cars/lamborghini/lamborghini-19/4.webp','/cars/lamborghini/lamborghini-19/5.webp','/cars/lamborghini/lamborghini-19/6.webp','/cars/lamborghini/lamborghini-19/7.webp'] },
  { id: 94, name: 'Lamborghini Urus',                variant: 'U82020',      brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-20/1.webp','/cars/lamborghini/lamborghini-20/2.webp','/cars/lamborghini/lamborghini-20/3.webp','/cars/lamborghini/lamborghini-20/4.webp','/cars/lamborghini/lamborghini-20/5.webp','/cars/lamborghini/lamborghini-20/6.webp','/cars/lamborghini/lamborghini-20/7.webp','/cars/lamborghini/lamborghini-20/8.webp'] },
  { id: 95, name: 'Lamborghini Urus',                variant: 'U90905 2022', brand: 'Lamborghini', logo: LA, bodyType: 'Luxury SUV',  images: ['/cars/lamborghini/lamborghini-21/1.webp','/cars/lamborghini/lamborghini-21/2.webp','/cars/lamborghini/lamborghini-21/3.webp','/cars/lamborghini/lamborghini-21/4.webp','/cars/lamborghini/lamborghini-21/5.webp','/cars/lamborghini/lamborghini-21/6.webp','/cars/lamborghini/lamborghini-21/7.webp'] },
  // ── Maserati (1 car) ──
  { id: 96, name: 'Maserati Quattroporte', variant: 'Black', brand: 'Maserati', logo: MA, bodyType: 'Luxury Sedan', images: ['/cars/maserati/maserati-1/1.webp','/cars/maserati/maserati-1/2.webp','/cars/maserati/maserati-1/3.webp','/cars/maserati/maserati-1/4.webp','/cars/maserati/maserati-1/5.webp','/cars/maserati/maserati-1/6.webp','/cars/maserati/maserati-1/7.webp','/cars/maserati/maserati-1/8.webp'] },
  // ── McLaren (6 cars) ──
  { id: 97,  name: 'McLaren Artura',        variant: 'CC59379', brand: 'McLaren', logo: MC, bodyType: 'Supercar',    images: ['/cars/mclaren/mclaren-1/1.webp','/cars/mclaren/mclaren-1/2.webp','/cars/mclaren/mclaren-1/3.webp','/cars/mclaren/mclaren-1/4.webp','/cars/mclaren/mclaren-1/5.webp','/cars/mclaren/mclaren-1/6.webp','/cars/mclaren/mclaren-1/7.webp','/cars/mclaren/mclaren-1/8.webp'] },
  { id: 98,  name: 'McLaren Artura',        variant: 'CC59381', brand: 'McLaren', logo: MC, bodyType: 'Supercar',    images: ['/cars/mclaren/mclaren-2/1.webp','/cars/mclaren/mclaren-2/2.webp','/cars/mclaren/mclaren-2/3.webp','/cars/mclaren/mclaren-2/4.webp','/cars/mclaren/mclaren-2/5.webp','/cars/mclaren/mclaren-2/6.webp','/cars/mclaren/mclaren-2/7.webp','/cars/mclaren/mclaren-2/8.webp'] },
  { id: 99,  name: 'McLaren Artura Spider', variant: 'U99883', brand: 'McLaren', logo: MC, bodyType: 'Convertible', images: ['/cars/mclaren/mclaren-3/1.webp','/cars/mclaren/mclaren-3/2.webp','/cars/mclaren/mclaren-3/3.webp','/cars/mclaren/mclaren-3/4.webp','/cars/mclaren/mclaren-3/5.webp','/cars/mclaren/mclaren-3/6.webp','/cars/mclaren/mclaren-3/7.webp','/cars/mclaren/mclaren-3/8.webp'] },
  { id: 100, name: 'McLaren Artura Spider', variant: 'V66442', brand: 'McLaren', logo: MC, bodyType: 'Convertible', images: ['/cars/mclaren/mclaren-4/1.webp','/cars/mclaren/mclaren-4/2.webp','/cars/mclaren/mclaren-4/3.webp','/cars/mclaren/mclaren-4/4.webp','/cars/mclaren/mclaren-4/5.webp','/cars/mclaren/mclaren-4/6.webp','/cars/mclaren/mclaren-4/7.webp','/cars/mclaren/mclaren-4/8.webp'] },
  { id: 101, name: 'McLaren Artura Spider', variant: 'V66445', brand: 'McLaren', logo: MC, bodyType: 'Convertible', images: ['/cars/mclaren/mclaren-5/1.webp','/cars/mclaren/mclaren-5/2.webp','/cars/mclaren/mclaren-5/3.webp','/cars/mclaren/mclaren-5/4.webp','/cars/mclaren/mclaren-5/5.webp','/cars/mclaren/mclaren-5/6.webp','/cars/mclaren/mclaren-5/7.webp'] },
  { id: 102, name: 'McLaren GT',            variant: 'CC59380', brand: 'McLaren', logo: MC, bodyType: 'Sports Car', images: ['/cars/mclaren/mclaren-6/1.webp','/cars/mclaren/mclaren-6/2.webp','/cars/mclaren/mclaren-6/3.webp','/cars/mclaren/mclaren-6/4.webp','/cars/mclaren/mclaren-6/5.webp','/cars/mclaren/mclaren-6/6.webp','/cars/mclaren/mclaren-6/7.webp'] },
  // ── Mercedes-Benz (39 cars) ──
  { id: 103, name: 'Mercedes-Benz AMG GT 63', variant: 'AA78182 2022', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Sports Car',   images: ['/cars/mercedes/mercedes-1/1.webp','/cars/mercedes/mercedes-1/2.webp','/cars/mercedes/mercedes-1/3.webp','/cars/mercedes/mercedes-1/4.webp','/cars/mercedes/mercedes-1/5.webp','/cars/mercedes/mercedes-1/6.webp','/cars/mercedes/mercedes-1/7.webp','/cars/mercedes/mercedes-1/8.webp'] },
  { id: 104, name: 'Mercedes-Benz AMG GT 63', variant: 'J5036 2021',   brand: 'Mercedes-Benz', logo: ME, bodyType: 'Sports Car',   images: ['/cars/mercedes/mercedes-2/1.webp','/cars/mercedes/mercedes-2/2.webp','/cars/mercedes/mercedes-2/3.webp','/cars/mercedes/mercedes-2/4.webp','/cars/mercedes/mercedes-2/5.webp','/cars/mercedes/mercedes-2/6.webp','/cars/mercedes/mercedes-2/7.webp','/cars/mercedes/mercedes-2/8.webp'] },
  { id: 105, name: 'Mercedes-Benz AMG GT',    variant: 'T50509 2021',  brand: 'Mercedes-Benz', logo: ME, bodyType: 'Sports Car',   images: ['/cars/mercedes/mercedes-3/1.webp','/cars/mercedes/mercedes-3/2.webp','/cars/mercedes/mercedes-3/3.webp','/cars/mercedes/mercedes-3/4.webp','/cars/mercedes/mercedes-3/5.webp','/cars/mercedes/mercedes-3/6.webp','/cars/mercedes/mercedes-3/7.webp','/cars/mercedes/mercedes-3/8.webp'] },
  { id: 106, name: 'Mercedes-Benz AMG S63',   variant: 'V32965',       brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-4/1.webp','/cars/mercedes/mercedes-4/2.webp','/cars/mercedes/mercedes-4/3.webp','/cars/mercedes/mercedes-4/4.webp','/cars/mercedes/mercedes-4/5.webp','/cars/mercedes/mercedes-4/6.webp','/cars/mercedes/mercedes-4/7.webp','/cars/mercedes/mercedes-4/8.webp'] },
  { id: 107, name: 'Mercedes-Benz C300 Coupe', variant: 'V8435',       brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-5/1.webp','/cars/mercedes/mercedes-5/2.webp','/cars/mercedes/mercedes-5/3.webp','/cars/mercedes/mercedes-5/4.webp','/cars/mercedes/mercedes-5/5.webp','/cars/mercedes/mercedes-5/6.webp'] },
  { id: 108, name: 'Mercedes-Benz CLE200',     variant: 'B67019 2024', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-6/1.webp','/cars/mercedes/mercedes-6/2.webp','/cars/mercedes/mercedes-6/3.webp','/cars/mercedes/mercedes-6/4.webp','/cars/mercedes/mercedes-6/5.webp','/cars/mercedes/mercedes-6/6.webp','/cars/mercedes/mercedes-6/7.webp','/cars/mercedes/mercedes-6/8.webp','/cars/mercedes/mercedes-6/9.webp'] },
  { id: 109, name: 'Mercedes-Benz CLE200',     variant: 'H72866',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-7/1.webp','/cars/mercedes/mercedes-7/2.webp','/cars/mercedes/mercedes-7/3.webp','/cars/mercedes/mercedes-7/4.webp','/cars/mercedes/mercedes-7/5.webp','/cars/mercedes/mercedes-7/6.webp','/cars/mercedes/mercedes-7/7.webp','/cars/mercedes/mercedes-7/8.webp'] },
  { id: 110, name: 'Mercedes-Benz E-Class E400', variant: 'X50038',    brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-8/1.webp','/cars/mercedes/mercedes-8/2.webp','/cars/mercedes/mercedes-8/3.webp','/cars/mercedes/mercedes-8/4.webp','/cars/mercedes/mercedes-8/5.webp','/cars/mercedes/mercedes-8/6.webp','/cars/mercedes/mercedes-8/7.webp','/cars/mercedes/mercedes-8/8.webp'] },
  { id: 111, name: 'Mercedes-Benz E-Class',    variant: 'U66445',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-9/1.webp','/cars/mercedes/mercedes-9/2.webp','/cars/mercedes/mercedes-9/3.webp','/cars/mercedes/mercedes-9/4.webp','/cars/mercedes/mercedes-9/5.webp','/cars/mercedes/mercedes-9/6.webp','/cars/mercedes/mercedes-9/7.webp','/cars/mercedes/mercedes-9/8.webp'] },
  { id: 112, name: 'Mercedes-Benz G-Class',    variant: 'U50503',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV',  images: ['/cars/mercedes/mercedes-10/1.webp','/cars/mercedes/mercedes-10/2.webp','/cars/mercedes/mercedes-10/3.webp','/cars/mercedes/mercedes-10/4.webp','/cars/mercedes/mercedes-10/5.webp','/cars/mercedes/mercedes-10/6.webp','/cars/mercedes/mercedes-10/7.webp','/cars/mercedes/mercedes-10/8.webp'] },
  { id: 113, name: 'Mercedes-Benz G-Class 4x4', variant: 'AA78084 2022', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-11/1.webp','/cars/mercedes/mercedes-11/2.webp','/cars/mercedes/mercedes-11/3.webp','/cars/mercedes/mercedes-11/4.webp','/cars/mercedes/mercedes-11/5.webp','/cars/mercedes/mercedes-11/6.webp','/cars/mercedes/mercedes-11/7.webp','/cars/mercedes/mercedes-11/8.webp'] },
  { id: 114, name: 'Mercedes-Benz G-Class 4x4', variant: 'T4865 2022',  brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-12/1.webp','/cars/mercedes/mercedes-12/2.webp','/cars/mercedes/mercedes-12/3.webp','/cars/mercedes/mercedes-12/4.webp','/cars/mercedes/mercedes-12/5.webp','/cars/mercedes/mercedes-12/6.webp','/cars/mercedes/mercedes-12/7.webp','/cars/mercedes/mercedes-12/8.webp'] },
  { id: 115, name: 'Mercedes-Benz G-Class Brabus', variant: 'AA18277 2023', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-13/1.webp','/cars/mercedes/mercedes-13/2.webp','/cars/mercedes/mercedes-13/3.webp','/cars/mercedes/mercedes-13/4.webp','/cars/mercedes/mercedes-13/5.webp','/cars/mercedes/mercedes-13/6.webp','/cars/mercedes/mercedes-13/7.webp','/cars/mercedes/mercedes-13/8.webp'] },
  { id: 116, name: 'Mercedes-Benz G-Class Brabus', variant: 'P66063 2021', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-14/1.webp','/cars/mercedes/mercedes-14/2.webp','/cars/mercedes/mercedes-14/3.webp','/cars/mercedes/mercedes-14/4.webp','/cars/mercedes/mercedes-14/5.webp','/cars/mercedes/mercedes-14/6.webp','/cars/mercedes/mercedes-14/7.webp','/cars/mercedes/mercedes-14/8.webp'] },
  { id: 117, name: 'Mercedes-Benz G-Class',    variant: 'CC51629 2025', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-15/1.webp','/cars/mercedes/mercedes-15/2.webp','/cars/mercedes/mercedes-15/3.webp','/cars/mercedes/mercedes-15/4.webp','/cars/mercedes/mercedes-15/5.webp','/cars/mercedes/mercedes-15/6.webp','/cars/mercedes/mercedes-15/7.webp','/cars/mercedes/mercedes-15/8.webp'] },
  { id: 118, name: 'Mercedes-Benz G-Class',    variant: 'CC53552 2025', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-16/1.webp','/cars/mercedes/mercedes-16/2.webp','/cars/mercedes/mercedes-16/3.webp','/cars/mercedes/mercedes-16/4.webp','/cars/mercedes/mercedes-16/5.webp','/cars/mercedes/mercedes-16/6.webp','/cars/mercedes/mercedes-16/7.webp'] },
  { id: 119, name: 'Mercedes-Benz G-Class',    variant: 'F50066 2021',  brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-17/1.webp','/cars/mercedes/mercedes-17/2.webp','/cars/mercedes/mercedes-17/3.webp','/cars/mercedes/mercedes-17/4.webp','/cars/mercedes/mercedes-17/5.webp','/cars/mercedes/mercedes-17/6.webp','/cars/mercedes/mercedes-17/7.webp'] },
  { id: 120, name: 'Mercedes-Benz G-Class',    variant: 'K50509 2022',  brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-18/1.webp','/cars/mercedes/mercedes-18/2.webp','/cars/mercedes/mercedes-18/3.webp','/cars/mercedes/mercedes-18/4.webp','/cars/mercedes/mercedes-18/5.webp','/cars/mercedes/mercedes-18/6.webp','/cars/mercedes/mercedes-18/7.webp'] },
  { id: 121, name: 'Mercedes-Benz G-Class Keyvany', variant: 'U52140 2023', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-19/1.webp','/cars/mercedes/mercedes-19/2.webp','/cars/mercedes/mercedes-19/3.webp','/cars/mercedes/mercedes-19/4.webp','/cars/mercedes/mercedes-19/5.webp','/cars/mercedes/mercedes-19/6.webp','/cars/mercedes/mercedes-19/7.webp','/cars/mercedes/mercedes-19/8.webp'] },
  { id: 122, name: 'Mercedes-Benz G-Class',    variant: 'M5506 2025',   brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-20/1.webp','/cars/mercedes/mercedes-20/2.webp','/cars/mercedes/mercedes-20/3.webp','/cars/mercedes/mercedes-20/4.webp','/cars/mercedes/mercedes-20/5.webp','/cars/mercedes/mercedes-20/6.webp','/cars/mercedes/mercedes-20/7.webp','/cars/mercedes/mercedes-20/8.webp'] },
  { id: 123, name: 'Mercedes-Benz G-Class',    variant: 'P3529',        brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-21/1.webp','/cars/mercedes/mercedes-21/2.webp','/cars/mercedes/mercedes-21/3.webp','/cars/mercedes/mercedes-21/4.webp','/cars/mercedes/mercedes-21/5.webp','/cars/mercedes/mercedes-21/6.webp','/cars/mercedes/mercedes-21/7.webp','/cars/mercedes/mercedes-21/8.webp'] },
  { id: 124, name: 'Mercedes-Benz G-Class',    variant: 'Q8430 2022',   brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-22/1.webp','/cars/mercedes/mercedes-22/2.webp','/cars/mercedes/mercedes-22/3.webp','/cars/mercedes/mercedes-22/4.webp','/cars/mercedes/mercedes-22/5.webp','/cars/mercedes/mercedes-22/6.webp'] },
  { id: 125, name: 'Mercedes-Benz G-Class',    variant: 'R7877 2022',   brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-23/1.webp','/cars/mercedes/mercedes-23/2.webp','/cars/mercedes/mercedes-23/3.webp','/cars/mercedes/mercedes-23/4.webp','/cars/mercedes/mercedes-23/5.webp','/cars/mercedes/mercedes-23/6.webp','/cars/mercedes/mercedes-23/7.webp','/cars/mercedes/mercedes-23/8.webp'] },
  { id: 126, name: 'Mercedes-Benz G-Class',    variant: 'U4813 2023',   brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-24/1.webp','/cars/mercedes/mercedes-24/2.webp','/cars/mercedes/mercedes-24/3.webp','/cars/mercedes/mercedes-24/4.webp','/cars/mercedes/mercedes-24/5.webp','/cars/mercedes/mercedes-24/6.webp','/cars/mercedes/mercedes-24/7.webp','/cars/mercedes/mercedes-24/8.webp'] },
  { id: 127, name: 'Mercedes-Benz G-Class Nardo', variant: 'U9879 2025', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-25/1.webp','/cars/mercedes/mercedes-25/2.webp','/cars/mercedes/mercedes-25/3.webp','/cars/mercedes/mercedes-25/4.webp','/cars/mercedes/mercedes-25/5.webp','/cars/mercedes/mercedes-25/6.webp','/cars/mercedes/mercedes-25/7.webp','/cars/mercedes/mercedes-25/8.webp'] },
  { id: 128, name: 'Mercedes-Benz G63 AMG',    variant: 'H8115',        brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-26/1.webp','/cars/mercedes/mercedes-26/2.webp','/cars/mercedes/mercedes-26/3.webp','/cars/mercedes/mercedes-26/4.webp','/cars/mercedes/mercedes-26/5.webp','/cars/mercedes/mercedes-26/6.webp','/cars/mercedes/mercedes-26/7.webp','/cars/mercedes/mercedes-26/8.webp'] },
  { id: 129, name: 'Mercedes-Benz G63 AMG',    variant: 'V4813',        brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-27/1.webp','/cars/mercedes/mercedes-27/2.webp','/cars/mercedes/mercedes-27/3.webp','/cars/mercedes/mercedes-27/4.webp','/cars/mercedes/mercedes-27/5.webp','/cars/mercedes/mercedes-27/6.webp','/cars/mercedes/mercedes-27/7.webp','/cars/mercedes/mercedes-27/8.webp'] },
  { id: 130, name: 'Mercedes-Benz G800 Brabus', variant: 'T4813',       brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-28/1.webp','/cars/mercedes/mercedes-28/2.webp','/cars/mercedes/mercedes-28/3.webp','/cars/mercedes/mercedes-28/4.webp','/cars/mercedes/mercedes-28/5.webp','/cars/mercedes/mercedes-28/6.webp','/cars/mercedes/mercedes-28/7.webp','/cars/mercedes/mercedes-28/8.webp'] },
  { id: 131, name: 'Mercedes-Benz G800',        variant: 'U99448',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-29/1.webp','/cars/mercedes/mercedes-29/2.webp','/cars/mercedes/mercedes-29/3.webp','/cars/mercedes/mercedes-29/4.webp','/cars/mercedes/mercedes-29/5.webp','/cars/mercedes/mercedes-29/6.webp'] },
  { id: 132, name: 'Mercedes-Benz GLB',         variant: 'Z47562',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-30/1.webp','/cars/mercedes/mercedes-30/2.webp','/cars/mercedes/mercedes-30/3.webp','/cars/mercedes/mercedes-30/4.webp','/cars/mercedes/mercedes-30/5.webp','/cars/mercedes/mercedes-30/6.webp','/cars/mercedes/mercedes-30/7.webp'] },
  { id: 133, name: 'Mercedes-Benz GLE 53',      variant: 'C81779 2022', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-31/1.webp','/cars/mercedes/mercedes-31/2.webp','/cars/mercedes/mercedes-31/3.webp','/cars/mercedes/mercedes-31/4.webp','/cars/mercedes/mercedes-31/5.webp','/cars/mercedes/mercedes-31/6.webp','/cars/mercedes/mercedes-31/7.webp','/cars/mercedes/mercedes-31/8.webp'] },
  { id: 134, name: 'Mercedes-Benz GLE',         variant: 'L5038',       brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-32/1.webp','/cars/mercedes/mercedes-32/2.webp','/cars/mercedes/mercedes-32/3.webp','/cars/mercedes/mercedes-32/4.webp','/cars/mercedes/mercedes-32/5.webp','/cars/mercedes/mercedes-32/6.webp','/cars/mercedes/mercedes-32/7.webp','/cars/mercedes/mercedes-32/8.webp'] },
  { id: 135, name: 'Mercedes-Benz GLE',         variant: 'U99882 2021', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-33/1.webp','/cars/mercedes/mercedes-33/2.webp','/cars/mercedes/mercedes-33/3.webp','/cars/mercedes/mercedes-33/4.webp','/cars/mercedes/mercedes-33/5.webp','/cars/mercedes/mercedes-33/6.webp'] },
  { id: 136, name: 'Mercedes-Benz GLS 600',     variant: 'N50509 2022', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV', images: ['/cars/mercedes/mercedes-34/1.webp','/cars/mercedes/mercedes-34/2.webp','/cars/mercedes/mercedes-34/3.webp','/cars/mercedes/mercedes-34/4.webp','/cars/mercedes/mercedes-34/5.webp','/cars/mercedes/mercedes-34/6.webp','/cars/mercedes/mercedes-34/7.webp','/cars/mercedes/mercedes-34/8.webp'] },
  { id: 137, name: 'Mercedes-Benz S-Class',     variant: 'S99443',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-35/1.webp','/cars/mercedes/mercedes-35/2.webp','/cars/mercedes/mercedes-35/3.webp','/cars/mercedes/mercedes-35/4.webp','/cars/mercedes/mercedes-35/5.webp','/cars/mercedes/mercedes-35/6.webp','/cars/mercedes/mercedes-35/7.webp','/cars/mercedes/mercedes-35/8.webp'] },
  { id: 138, name: 'Mercedes-Benz S-Class',     variant: 'S99772',      brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-36/1.webp','/cars/mercedes/mercedes-36/2.webp','/cars/mercedes/mercedes-36/3.webp','/cars/mercedes/mercedes-36/4.webp','/cars/mercedes/mercedes-36/5.webp','/cars/mercedes/mercedes-36/6.webp','/cars/mercedes/mercedes-36/7.webp','/cars/mercedes/mercedes-36/8.webp'] },
  { id: 139, name: 'Mercedes-Benz S-Class 580', variant: 'AA65217',     brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-37/1.webp','/cars/mercedes/mercedes-37/2.webp','/cars/mercedes/mercedes-37/3.webp','/cars/mercedes/mercedes-37/4.webp','/cars/mercedes/mercedes-37/5.webp','/cars/mercedes/mercedes-37/6.webp','/cars/mercedes/mercedes-37/7.webp','/cars/mercedes/mercedes-37/8.webp'] },
  { id: 140, name: 'Mercedes-Benz S500',        variant: 'F50077 2021', brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury Sedan', images: ['/cars/mercedes/mercedes-38/1.webp','/cars/mercedes/mercedes-38/2.webp','/cars/mercedes/mercedes-38/3.webp','/cars/mercedes/mercedes-38/4.webp','/cars/mercedes/mercedes-38/5.webp','/cars/mercedes/mercedes-38/6.webp','/cars/mercedes/mercedes-38/7.webp','/cars/mercedes/mercedes-38/8.webp'] },
  { id: 141, name: 'Mercedes-Benz V-Class',     variant: 'AA10750',     brand: 'Mercedes-Benz', logo: ME, bodyType: 'Luxury SUV',  images: ['/cars/mercedes/mercedes-39/1.webp','/cars/mercedes/mercedes-39/2.webp','/cars/mercedes/mercedes-39/3.webp','/cars/mercedes/mercedes-39/4.webp','/cars/mercedes/mercedes-39/5.webp','/cars/mercedes/mercedes-39/6.webp','/cars/mercedes/mercedes-39/7.webp','/cars/mercedes/mercedes-39/8.webp'] },
  // ── Mini Cooper (1 car) ──
  { id: 142, name: 'Mini Cooper', variant: 'Mini Cooper', brand: 'Mini Cooper', logo: MI, bodyType: 'Sports Car', images: ['/cars/mini/mini-1/1.webp','/cars/mini/mini-1/2.webp','/cars/mini/mini-1/3.webp','/cars/mini/mini-1/4.webp','/cars/mini/mini-1/5.webp','/cars/mini/mini-1/6.webp','/cars/mini/mini-1/7.webp','/cars/mini/mini-1/8.webp'] },
  // ── Porsche (10 cars) ──
  { id: 143, name: 'Porsche 911 Carrera',   variant: 'C61845 2025',   brand: 'Porsche', logo: PO, bodyType: 'Sports Car', images: ['/cars/porsche/porsche-1/1.webp','/cars/porsche/porsche-1/2.webp','/cars/porsche/porsche-1/3.webp','/cars/porsche/porsche-1/4.webp','/cars/porsche/porsche-1/5.webp','/cars/porsche/porsche-1/6.webp','/cars/porsche/porsche-1/7.webp','/cars/porsche/porsche-1/8.webp'] },
  { id: 144, name: 'Porsche 911 GT3 RS',    variant: 'I28045',        brand: 'Porsche', logo: PO, bodyType: 'Race Car',    images: ['/cars/porsche/porsche-2/1.webp','/cars/porsche/porsche-2/2.webp','/cars/porsche/porsche-2/3.webp','/cars/porsche/porsche-2/4.webp','/cars/porsche/porsche-2/5.webp','/cars/porsche/porsche-2/6.webp','/cars/porsche/porsche-2/7.webp','/cars/porsche/porsche-2/8.webp'] },
  { id: 145, name: 'Porsche 911',            variant: 'J68808 2022',   brand: 'Porsche', logo: PO, bodyType: 'Sports Car', images: ['/cars/porsche/porsche-3/1.webp','/cars/porsche/porsche-3/2.webp','/cars/porsche/porsche-3/3.webp','/cars/porsche/porsche-3/4.webp','/cars/porsche/porsche-3/5.webp','/cars/porsche/porsche-3/6.webp','/cars/porsche/porsche-3/7.webp','/cars/porsche/porsche-3/8.webp'] },
  { id: 146, name: 'Porsche 911 Turbo S',   variant: 'AA85982 2023',  brand: 'Porsche', logo: PO, bodyType: 'Supercar',   images: ['/cars/porsche/porsche-4/1.webp','/cars/porsche/porsche-4/2.webp','/cars/porsche/porsche-4/3.webp','/cars/porsche/porsche-4/4.webp','/cars/porsche/porsche-4/5.webp','/cars/porsche/porsche-4/6.webp','/cars/porsche/porsche-4/7.webp','/cars/porsche/porsche-4/8.webp'] },
  { id: 147, name: 'Porsche Cayenne',        variant: 'C82634 2022',   brand: 'Porsche', logo: PO, bodyType: 'Luxury SUV', images: ['/cars/porsche/porsche-5/1.webp','/cars/porsche/porsche-5/2.webp','/cars/porsche/porsche-5/3.webp','/cars/porsche/porsche-5/4.webp','/cars/porsche/porsche-5/5.webp','/cars/porsche/porsche-5/6.webp'] },
  { id: 148, name: 'Porsche Cayenne',        variant: 'U99445 2021',   brand: 'Porsche', logo: PO, bodyType: 'Luxury SUV', images: ['/cars/porsche/porsche-6/1.webp','/cars/porsche/porsche-6/2.webp','/cars/porsche/porsche-6/3.webp','/cars/porsche/porsche-6/4.webp','/cars/porsche/porsche-6/5.webp','/cars/porsche/porsche-6/6.webp','/cars/porsche/porsche-6/7.webp','/cars/porsche/porsche-6/8.webp'] },
  { id: 149, name: 'Porsche Macan',          variant: 'S99445 2021',   brand: 'Porsche', logo: PO, bodyType: 'Luxury SUV', images: ['/cars/porsche/porsche-7/1.webp','/cars/porsche/porsche-7/2.webp','/cars/porsche/porsche-7/3.webp','/cars/porsche/porsche-7/4.webp','/cars/porsche/porsche-7/5.webp','/cars/porsche/porsche-7/6.webp','/cars/porsche/porsche-7/7.webp','/cars/porsche/porsche-7/8.webp'] },
  { id: 150, name: 'Porsche Panamera',       variant: 'DD89316 2025',  brand: 'Porsche', logo: PO, bodyType: 'Luxury Sedan', images: ['/cars/porsche/porsche-8/1.webp','/cars/porsche/porsche-8/2.webp','/cars/porsche/porsche-8/3.webp','/cars/porsche/porsche-8/4.webp','/cars/porsche/porsche-8/5.webp','/cars/porsche/porsche-8/6.webp','/cars/porsche/porsche-8/7.webp','/cars/porsche/porsche-8/8.webp'] },
  { id: 151, name: 'Porsche Panamera',       variant: 'U8423 2022',    brand: 'Porsche', logo: PO, bodyType: 'Luxury Sedan', images: ['/cars/porsche/porsche-9/1.webp','/cars/porsche/porsche-9/2.webp','/cars/porsche/porsche-9/3.webp','/cars/porsche/porsche-9/4.webp','/cars/porsche/porsche-9/5.webp','/cars/porsche/porsche-9/6.webp','/cars/porsche/porsche-9/7.webp','/cars/porsche/porsche-9/8.webp'] },
  { id: 152, name: 'Porsche Taycan 4S',      variant: 'S8425 2022',    brand: 'Porsche', logo: PO, bodyType: 'Luxury Sedan', images: ['/cars/porsche/porsche-10/1.webp','/cars/porsche/porsche-10/2.webp','/cars/porsche/porsche-10/3.webp','/cars/porsche/porsche-10/4.webp','/cars/porsche/porsche-10/5.webp','/cars/porsche/porsche-10/6.webp','/cars/porsche/porsche-10/7.webp','/cars/porsche/porsche-10/8.webp'] },
  // ── Toyota (1 car) ──
  { id: 153, name: 'Toyota Land Cruiser', variant: 'Land Cruiser', brand: 'Toyota', logo: TO, bodyType: 'Luxury SUV', images: ['/cars/toyota/toyota-1/1.webp'] },
  // ── Range Rover (4 cars) ──
  { id: 154, name: 'Range Rover',     variant: '2024',   brand: 'Range Rover', logo: RA, bodyType: 'Luxury SUV', images: ['/cars/range-rover/range-rover-1/1.webp'] },
  { id: 155, name: 'Range Rover',     variant: '2025',   brand: 'Range Rover', logo: RA, bodyType: 'Luxury SUV', images: ['/cars/range-rover/range-rover-2/1.webp'] },
  { id: 156, name: 'Range Rover HSE', variant: 'HSE',    brand: 'Range Rover', logo: RA, bodyType: 'Luxury SUV', images: ['/cars/range-rover/range-rover-3/1.webp'] },
  { id: 157, name: 'Range Rover SVR', variant: 'SVR',    brand: 'Range Rover', logo: RA, bodyType: 'Luxury SUV', images: ['/cars/range-rover/range-rover-4/1.webp'] },
]


const ChevronLeft = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

function Lightbox({ images, carName, onClose }) {
  const [idx, setIdx] = useState(0)
  const total = images.length
  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [prev, next, onClose])

  return (
    <div className="lb-overlay" onClick={onClose}>
      <button className="lb-close" onClick={onClose} aria-label="Close">✕</button>
      {total > 1 && (
        <button className="lb-arrow lb-arrow--left" onClick={e => { e.stopPropagation(); prev() }} aria-label="Previous">
          <ChevronLeft />
        </button>
      )}
      <div className="lb-img-wrap" onClick={e => e.stopPropagation()}>
        <img src={images[idx]} alt={`${carName} ${idx + 1}`} className="lb-img" />
      </div>
      {total > 1 && (
        <button className="lb-arrow lb-arrow--right" onClick={e => { e.stopPropagation(); next() }} aria-label="Next">
          <ChevronRight />
        </button>
      )}
      {total > 1 && <div className="lb-counter">{idx + 1} / {total}</div>}
    </div>
  )
}

function CarCard({ car }) {
  const images = car.images || [car.img]
  const [idx, setIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const prev = useCallback((e) => {
    e.stopPropagation()
    setIdx(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback((e) => {
    e.stopPropagation()
    setIdx(i => (i + 1) % images.length)
  }, [images.length])

  return (
    <>
      {lightbox && <Lightbox images={images} carName={car.name} onClose={() => setLightbox(false)} />}
      <div className="fcard">
      <div className="fcard__img" onClick={() => setLightbox(true)} style={{ cursor: 'zoom-in' }}>
        <img
          key={idx}
          src={images[idx]}
          alt={`${car.name} — photo ${idx + 1}`}
          className="fcard__photo"
          loading="lazy"
        />
        <div className="fcard__img-gradient" />

        {images.length > 1 && (
          <>
            <button className="fcard__arrow fcard__arrow--left" onClick={prev} aria-label="Previous image">
              <ChevronLeft />
            </button>
            <button className="fcard__arrow fcard__arrow--right" onClick={next} aria-label="Next image">
              <ChevronRight />
            </button>
            <div className="fcard__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`fcard__dot${i === idx ? ' fcard__dot--on' : ''}`}
                  onClick={e => { e.stopPropagation(); setIdx(i) }}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="fcard__body">
        <div className="fcard__top-row">
          <div className="fcard__name-group">
            <img src={car.logo} alt={car.brand} className="fcard__brand-icon" />
            <span className="fcard__name">{car.name}</span>
          </div>
        </div>

        <div className="fcard__bottom-row">
          <span className="fcard__body-type">
            {car.variant ?? car.name.replace(car.brand + ' ', '')} · {car.bodyType}
          </span>
          <a
            href={waUrl(car.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="fcard__cta"
          >
            Rent Now
          </a>
        </div>
      </div>
    </div>
    </>
  )
}

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6"  x2="20" y2="6"  />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
)

const CARS_PER_PAGE = 12

export default function Fleet() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [page, setPage]   = useState(1)

  // ── Derive all filter state directly from URL ──
  const activeBrands    = searchParams.getAll('brand')
  const activeBodyTypes = searchParams.getAll('type')
  const priceMin        = Number(searchParams.get('minPrice')) || MIN_PRICE
  const priceMax        = Number(searchParams.get('maxPrice')) || MAX_PRICE

  // Toggle a multi-value param (adds if absent, removes if present)
  const toggleParam = (key, value) => {
    const p = new URLSearchParams(searchParams)
    const current = p.getAll(key)
    p.delete(key)
    if (current.includes(value)) {
      current.filter(v => v !== value).forEach(v => p.append(key, v))
    } else {
      current.forEach(v => p.append(key, v))
      p.append(key, value)
    }
    router.replace('?' + p.toString())
  }

  const toggleBrand    = (key) => toggleParam('brand', key)
  const toggleBodyType = (key) => toggleParam('type', key)

  const setPriceMin = (v) => {
    const p = new URLSearchParams(searchParams)
    v === MIN_PRICE ? p.delete('minPrice') : p.set('minPrice', v)
    router.replace('?' + p.toString())
  }

  const setPriceMax = (v) => {
    const p = new URLSearchParams(searchParams)
    v === MAX_PRICE ? p.delete('maxPrice') : p.set('maxPrice', v)
    router.replace('?' + p.toString())
  }

  const activeFilterCount =
    activeBrands.length +
    activeBodyTypes.length +
    (priceMin !== MIN_PRICE || priceMax !== MAX_PRICE ? 1 : 0)

  // ── Dynamic body type counts ──
  const bodyTypeCounts = useMemo(() => {
    const m = {}
    CARS.forEach(c => { m[c.bodyType] = (m[c.bodyType] || 0) + 1 })
    return m
  }, [])

  // ── Filtered cars ──
  const filteredCars = useMemo(() => {
    const q = query.trim().toLowerCase()
    return CARS.filter(car => {
      if (car.price < priceMin || car.price > priceMax)                      return false
      if (activeBrands.length    && !activeBrands.includes(car.brand))       return false
      if (activeBodyTypes.length && !activeBodyTypes.includes(car.bodyType)) return false
      if (q && !`${car.name} ${car.brand} ${car.variant ?? ''}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [priceMin, priceMax, activeBrands, activeBodyTypes, query])

  // ── Reset to page 1 + scroll to top when filters/search change ──
  useEffect(() => {
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [priceMin, priceMax, activeBrands.join(','), activeBodyTypes.join(','), query])

  // ── Pagination ──
  const totalPages  = Math.max(1, Math.ceil(filteredCars.length / CARS_PER_PAGE))
  const safePage    = Math.min(page, totalPages)
  const pageStart   = (safePage - 1) * CARS_PER_PAGE
  const pageCars    = filteredCars.slice(pageStart, pageStart + CARS_PER_PAGE)

  const goTo = (p) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Navbar />

      <div className="fleet-page">
        <Filter
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
          activeBrands={activeBrands}
          onBrandToggle={toggleBrand}
          activeBodyTypes={activeBodyTypes}
          onBodyTypeToggle={toggleBodyType}
          bodyCounts={bodyTypeCounts}
          mobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        <main className="fleet-main">
          {/* Mobile filter trigger bar — hidden on desktop */}
          <div className="fleet-filter-bar">
            <button
              className="fleet-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
            >
              <FilterIcon />
              Filters
              {activeFilterCount > 0 && (
                <span className="fleet-filter-badge">{activeFilterCount}</span>
              )}
            </button>
            <span className="fleet-filter-count">{filteredCars.length} cars</span>
          </div>

          {/* Search bar */}
          <div className="fleet-search">
            <svg className="fleet-search__icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="fleet-search__input"
              type="text"
              placeholder="Search by brand, model or variant…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              spellCheck={false}
            />
            {query && (
              <button className="fleet-search__clear" onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          {pageCars.length > 0 ? (
            <>
              <div className="fleet-grid">
                {pageCars.map(car => <CarCard key={car.id} car={car} />)}
              </div>

              {totalPages > 1 && (
                <div className="fleet-pagination">
                  <button className="fleet-page-arrow" onClick={() => goTo(safePage - 1)} disabled={safePage === 1} aria-label="Previous page">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <span className="fleet-page-info">{safePage} / {totalPages}</span>
                  <button className="fleet-page-arrow" onClick={() => goTo(safePage + 1)} disabled={safePage === totalPages} aria-label="Next page">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="fleet-empty">No cars match your filters.</p>
          )}
        </main>
      </div>

      <Footer />
    </>
  )
}
