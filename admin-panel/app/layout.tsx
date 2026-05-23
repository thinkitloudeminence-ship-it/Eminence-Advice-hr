'use client'

import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import AdminNavbar from '@/components/AdminNavbar'
import AdminSidebar from '@/components/AdminSidebar'
import { Providers } from '@/redux/provider'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <Box sx={{ display: 'flex' }}>
                <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    bgcolor: '#f5f5f5',
                  }}
                >
                  <AdminNavbar open={sidebarOpen} setOpen={setSidebarOpen} />
                  <Box sx={{ p: 3 }}>
                    {children}
                  </Box>
                </Box>
              </Box>
            </LocalizationProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}