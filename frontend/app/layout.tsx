// 'use client'

// import { Inter } from 'next/font/google'
// import './globals.css'
// import { ThemeProvider } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
// import theme from '../theme'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { Providers } from '@/redux/provider'
// import ScrollToTop from '@/components/common/ScrollToTop'
// import Script from 'next/script'
// import dynamic from 'next/dynamic'

// // Dynamically import to avoid SSR issues
// const StructuredData = dynamic(() => import('@/components/StructuredData'), { ssr: false })
// const BreadcrumbSchema = dynamic(() => import('@/components/BreadcrumbSchema'), { ssr: false })

// const inter = Inter({ subsets: ['latin'] })

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link rel="icon" href="/favicon.ico" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="theme-color" content="#ff6b35" />
//         <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
//         <meta name="description" content="Professional HR services, career counseling, training, placement assistance, and recruitment platform for students, freshers, professionals, and companies." />
//         <meta name="keywords" content="career counseling, job placement, HR services, training, internship, recruitment, placement assistance" />
//         <meta property="og:title" content="Eminance Advice - Transform Your Career & Workforce with Expert Guidance" />
//         <meta property="og:description" content="Professional HR services, career counseling, training, placement assistance, and recruitment platform." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://eminenceadvice.com" />
//         <meta property="og:image" content="https://eminenceadvice.com/og-image.jpg" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="Eminance Advice - Career Guidance" />
//         <meta name="twitter:description" content="Transform your career with expert guidance" />
//         <title>Eminance Advice - Transform Your Career & Workforce with Expert Guidance</title>
//       </head>
//       <body className={inter.className}>
//         {/* Google Tag Manager - Script */}
//         <Script
//           src="https://www.googletagmanager.com/gtm.js?id=GTM-NMSPJSS5"
//           strategy="afterInteractive"
//         />

//         {/* Google Tag Manager - Noscript fallback */}
//         <noscript>
//           <iframe 
//             src="https://www.googletagmanager.com/ns.html?id=GTM-NMSPJSS5"
//             height="0" 
//             width="0" 
//             style={{ display: 'none', visibility: 'hidden' }}
//           />
//         </noscript>

//         <StructuredData />
//         <BreadcrumbSchema />

//         <Providers>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Navbar />
//             <main className="min-h-screen">{children}</main>
//             <Footer />
//             <ScrollToTop />
//           </ThemeProvider>
//         </Providers>
//       </body>
//     </html>
//   )
// }


'use client'

import { Inter } from 'next/font/google'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from '@/redux/provider'
import ScrollToTop from '@/components/common/ScrollToTop'
import Script from 'next/script'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

const StructuredData = dynamic(() => import('@/components/StructuredData'), { ssr: false })
const BreadcrumbSchema = dynamic(() => import('@/components/BreadcrumbSchema'), { ssr: false })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StructuredData />
        <BreadcrumbSchema />

        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </Providers>

        {/* Scripts */}
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NMSPJSS5"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}