'use client'

import { useEffect } from 'react'

export default function StructuredData() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Eminance Advice",
      "url": "https://eminenceadvice.com",
      "logo": "https://eminenceadvice.com/logo.png",
      "description": "Professional HR services, career counseling, training, and placement assistance platform.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indore",
        "addressRegion": "Madhya Pradesh",
        "addressCountry": "India"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9826667279",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.facebook.com/eminenceadvice",
        "https://www.twitter.com/eminenceadvice",
        "https://www.linkedin.com/company/eminenceadvice",
        "https://www.instagram.com/eminenceadvice"
      ]
    })
    document.head.appendChild(script)
  }, [])

  return null
}