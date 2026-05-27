'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function BreadcrumbSchema() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment)

  useEffect(() => {
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://eminenceadvice.com"
      }
    ]

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": index + 2,
        "name": name,
        "item": `https://eminenceadvice.com${currentPath}`
      })
    })

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems
    })
    document.head.appendChild(script)
  }, [pathname])

  return null
}