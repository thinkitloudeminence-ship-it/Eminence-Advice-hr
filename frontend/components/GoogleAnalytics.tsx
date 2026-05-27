'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: { GA_MEASUREMENT_ID: string }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Add Google Analytics script
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.async = true
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function () {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
    })
  }, [GA_MEASUREMENT_ID])

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return
    window.gtag?.('config', GA_MEASUREMENT_ID, {
      page_path: pathname,
    })
  }, [GA_MEASUREMENT_ID, pathname])

  return null
}