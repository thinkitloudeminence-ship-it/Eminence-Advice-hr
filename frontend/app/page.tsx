'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import AboutOverview from '@/components/sections/AboutOverview'
import ServicesHighlights from '@/components/sections/ServicesHighlights'
import InternshipDomains from '@/components/sections/InternshipDomains'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import CTASection from '@/components/sections/CTASection'
import { NextSeo } from 'next-seo'

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Eminance Advice - Transform Your Career & Workforce with Expert Guidance"
        description="Get expert career counseling, training, placement assistance, and recruitment services. 5000+ students placed, 200+ corporate partners. Start your career journey today!"
        canonical="https://eminenceadvice.com/"
        openGraph={{
          url: 'https://eminenceadvice.com/',
          title: 'Eminance Advice - Career Counseling & Placement Services',
          description: 'Expert career guidance, training, and placement assistance for your professional growth.',
        }}
      />
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
    </>
  )
}