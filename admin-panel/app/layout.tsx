'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { Providers } from '@/redux/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('../components/AdminSidebar'), { ssr: false })
const Navbar = dynamic(() => import('../components/AdminNavbar'), { ssr: false })
const ProtectedRoute = dynamic(() => import('../components/ProtectedRoute'), { ssr: false })

const theme = createTheme({
  palette: {
    primary: { main: '#ff6b35' },
  },
})

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Login page - no sidebar, no protected route
  if (pathname === '/login') {
    return (
      <html lang="en">
        <body>
          <Providers>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Providers>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <ProtectedRoute>
                <Box sx={{ display: 'flex' }}>
                  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <Box sx={{ flexGrow: 1, height: '100vh', overflow: 'auto', bgcolor: '#f5f5f5' }}>
                    <Navbar open={sidebarOpen} setOpen={setSidebarOpen} />
                    <Box sx={{ p: 3 }}>{children}</Box>
                  </Box>
                </Box>
              </ProtectedRoute>
            </ThemeProvider>
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  )
}