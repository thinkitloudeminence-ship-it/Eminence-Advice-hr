'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../theme'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from '@/redux/provider'
import ScrollToTop from '@/components/common/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <title>Eminance Advice - Transform Your Career & Workforce with Expert Guidance</title>
        <meta name="description" content="Professional HR services, career counseling, training, placement assistance, and recruitment platform for students, freshers, professionals, and companies." />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}