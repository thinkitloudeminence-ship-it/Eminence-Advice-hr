// app/layout.tsx - Server Component
import { Inter } from 'next/font/google'

// ✅ SAHI PATH - file app folder ke andar hai, isliye './globals.css'
import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Providers } from '../redux/provider'
import ScrollToTop from '../components/common/ScrollToTop'
import Script from 'next/script'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

const StructuredData = dynamic(() => import('../components/StructuredData'), { ssr: false })
const BreadcrumbSchema = dynamic(() => import('../components/BreadcrumbSchema'), { ssr: false })

export const metadata = {
  title: 'Eminance Advice - Career Counseling, Training & Placement Services',
  description: 'Transform your career with expert guidance. 10,000+ students placed successfully.',
  verification: {
    google: 'uvWsOIv6Az0M82lxlAd6B4azFEsxGh1I70pNNFPoIL0',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="uvWsOIv6Az0M82lxlAd6B4azFEsxGh1I70pNNFPoIL0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
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

        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-NMSPJSS5"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}