// app/page.tsx
'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/sections/HeroSection'
import AboutOverview from '@/components/sections/AboutOverview'
import ServicesHighlights from '@/components/sections/ServicesHighlights'
import InternshipDomains from '@/components/sections/InternshipDomains'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Testimonials from '@/components/sections/Testimonials'
import { NextSeo } from 'next-seo'

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Eminance Advice - Career Counseling, Training & Placement Services Since 2009"
        description="Transform your career with Eminance Advice. Get expert career counseling, soft skills training, placement assistance, resume building, and recruitment services. 10,000+ students placed successfully. Start your journey today!"
        canonical="https://eminenceadvice.com/"
        openGraph={{
          url: 'https://eminenceadvice.com/',
          title: 'Eminance Advice - Career Counseling, Training & Placement Services Since 2009',
          description: 'Transform your career with expert guidance and placement assistance. 10,000+ students placed successfully.',
          images: [
            {
              url: 'https://eminenceadvice.com/og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Eminance Advice - Career Counseling & Placement',
            },
          ],
        }}
        additionalMetaTags={[
          { name: 'keywords', content: 'career counseling, job placement, HR services, training, internship, recruitment, placement assistance, soft skills training, resume building, interview preparation, freelancing support, career guidance, Eminance Advice' },
          { name: 'author', content: 'Eminance Advice' },
          { name: 'publisher', content: 'Eminance Advice' },
          { name: 'robots', content: 'index, follow' },
        ]}
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
      </motion.div>
    </>
  )
}


