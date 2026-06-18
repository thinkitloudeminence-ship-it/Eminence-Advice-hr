// frontend/app/metadata.ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eminance Advice - Career Counseling, Training & Placement Services Since 2009',
  description: 'Transform your career with expert guidance. 10,000+ students placed successfully.',
  openGraph: {
    title: 'Eminance Advice - Career Counseling & Placement Services Since 2009',
    description: 'Career counseling, training, internships, placements, recruitment, and HR support services.',
    url: 'https://eminenceadvice.com',
    siteName: 'Eminance Advice',
    images: [
      {
        url: 'https://eminenceadvice.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eminance Advice - Career Guidance',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eminance Advice - Career Guidance',
    description: 'Transform your career with expert guidance',
    site: '@eminenceadvice',
    creator: '@eminenceadvice',
  },
  robots: 'index, follow',
  keywords: 'career counseling, job placement, HR services, training, internship, recruitment',
}