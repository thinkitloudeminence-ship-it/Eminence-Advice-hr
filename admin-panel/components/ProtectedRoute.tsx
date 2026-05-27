'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress, Box } from '@mui/material'
import Cookies from 'js-cookie'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
      // ✅ Clear cookie too on unauthorized
      Cookies.remove('token')
      router.push('/login')
      return
    }

    try {
      const userData = JSON.parse(user)
      if (userData.role === 'admin' || userData.role === 'super_admin') {
        setIsAuthorized(true)
      } else {
        Cookies.remove('token')
        router.push('/login')
      }
    } catch (e) {
      Cookies.remove('token')
      router.push('/login')
    }

    setIsLoading(false)
  }, [router, mounted])

  if (!mounted || isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    )
  }

  // ✅ Only render children if authorized
  if (!isAuthorized) return null

  return <>{children}</>
}