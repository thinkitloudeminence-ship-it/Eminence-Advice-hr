'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import AboutOverview from '@/components/sections/AboutOverview'
import ServicesHighlights from '@/components/sections/ServicesHighlights'
import InternshipDomains from '@/components/sections/InternshipDomains'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutOverview />
      <ServicesHighlights />
      <InternshipDomains />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </motion.div>
  )
}