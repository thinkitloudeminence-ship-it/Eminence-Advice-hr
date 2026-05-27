'use client'

import { useState } from 'react'
import {
  Container, Paper, TextField, Button,
  Typography, Box, Alert, CircularProgress,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@eminanceadvice.com')
  const [password, setPassword] = useState('Admin@123456')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      const { token, data } = response.data

      if (data?.user?.role === 'admin' || data?.user?.role === 'super_admin') {
        // ✅ Cookie for middleware, localStorage for API calls
        Cookies.set('token', token, { expires: 7 })
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/')
      } else {
        setError('Unauthorized access. Admin privileges required.')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#ff6b35', fontWeight: 'bold' }}>
            Admin Login
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 4 }}>
            Eminance Advice Admin Panel
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} margin="normal" required />
            <TextField fullWidth label="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} margin="normal" required />
            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading}
              sx={{ mt: 3, bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}>
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}