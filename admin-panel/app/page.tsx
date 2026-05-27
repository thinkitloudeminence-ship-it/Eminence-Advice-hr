'use client'

import { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material'
import {
  TrendingUp,
  People,
  Work,
  Article,
  ContactMail,
  Visibility,
  Download,
} from '@mui/icons-material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const fetchDashboardData = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data
}

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardData'],
    queryFn: fetchDashboardData,
    retry: false,
  })

  const stats = [
    { title: 'Total Jobs', value: data?.totalJobs || 0, icon: Work, color: '#ff6b35', change: '+12%' },
    { title: 'Applications', value: data?.totalApplications || 0, icon: People, color: '#ff6b35', change: '+23%' },
    { title: 'Blogs', value: data?.totalBlogs || 0, icon: Article, color: '#ff6b35', change: '+5%' },
    { title: 'Contact Leads', value: data?.totalLeads || 0, icon: ContactMail, color: '#ff6b35', change: '+18%' },
  ]

  const chartData = [
    { month: 'Jan', applications: 65, jobs: 28 },
    { month: 'Feb', applications: 75, jobs: 32 },
    { month: 'Mar', applications: 85, jobs: 35 },
    { month: 'Apr', applications: 95, jobs: 40 },
    { month: 'May', applications: 110, jobs: 45 },
    { month: 'Jun', applications: 120, jobs: 48 },
  ]

  const recentApplications = data?.recentApplications || []

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                      {stat.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 14, color: 'success.main', mr: 0.5 }} />
                      <Typography variant="caption" color="success.main">
                        {stat.change}
                      </Typography>
                      <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                        vs last month
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: `${stat.color}20`,
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                    }}
                  >
                    <stat.icon sx={{ color: stat.color }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Applications Overview
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#ff6b35" strokeWidth={2} />
                  <Line type="monotone" dataKey="jobs" stroke="#2e7d32" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Recent Activity
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {recentApplications.length === 0 ? (
                  <Typography color="textSecondary" align="center" sx={{ py: 3 }}>
                    No recent applications
                  </Typography>
                ) : (
                  recentApplications.map((app: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 2,
                        pb: 2,
                        borderBottom: index !== recentApplications.length - 1 ? '1px solid #e0e0e0' : 'none',
                      }}
                    >
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {app.fullName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Applied for {app.jobTitle}
                        </Typography>
                      </Box>
                      <Chip
                        label={app.status}
                        size="small"
                        color={app.status === 'pending' ? 'warning' : app.status === 'shortlisted' ? 'success' : app.status === 'rejected' ? 'error' : 'info'}
                      />
                    </Box>
                  ))
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Recent Applications
            </Typography>
            <Button variant="outlined" size="small" startIcon={<Download />} sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}>
              Export
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#fff5f0' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Job Applied</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Experience</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Applied Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  recentApplications.slice(0, 5).map((app: any) => (
                    <TableRow key={app._id}>
                      <TableCell>{app.fullName}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{app.jobTitle}</TableCell>
                      <TableCell>{app.experienceType}</TableCell>
                      <TableCell>
                        <Chip
                          label={app.status}
                          size="small"
                          color={app.status === 'pending' ? 'warning' : app.status === 'shortlisted' ? 'success' : app.status === 'rejected' ? 'error' : 'info'}
                        />
                      </TableCell>
                      <TableCell>{app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <Visibility sx={{ color: '#ff6b35' }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}