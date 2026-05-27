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
        title="Home | Eminance Advice - Career Counseling & Job Placement"
        description="Start your career journey with Eminance Advice. Get expert career counseling, training, placement assistance, and recruitment services. 5000+ students placed successfully."
        canonical="https://eminenceadvice.com/"
        openGraph={{
          url: 'https://eminenceadvice.com/',
          title: 'Eminance Advice - Career Counseling & Placement Services',
          description: 'Start your career journey with expert guidance and placement assistance.',
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