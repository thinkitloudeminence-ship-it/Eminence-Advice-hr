import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eminance Advice - Transform Your Career & Workforce with Expert Guidance',
  description: 'Professional HR services, career counseling, training, placement assistance, internship, recruitment, and freelancing support for students, freshers, professionals, and companies.',
  keywords: 'career counseling, job placement, HR services, training, internship, recruitment, placement assistance, career guidance, job search, freelancing support',
  authors: [{ name: 'Eminance Advice' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Eminance Advice - Transform Your Career & Workforce with Expert Guidance',
    description: 'Professional HR services, career counseling, training, placement assistance, and recruitment platform.',
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
    site: '@eminanceadvice',
    creator: '@eminanceadvice',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://eminenceadvice.com',
  },
}