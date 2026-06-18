// app/page.tsx
'use client'

import { motion } from 'framer-motion'
import HeroSection from '../components/sections/HeroSection'
import AboutOverview from '../components/sections/AboutOverview'
import ServicesHighlights from '../components/sections/ServicesHighlights'
import InternshipDomains from '../components/sections/InternshipDomains'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Testimonials from '../components/sections/Testimonials'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutOverview />
      <ServicesHighlights />
      <InternshipDomains />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}


