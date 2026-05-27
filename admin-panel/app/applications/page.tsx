'use client'

import { useState } from 'react'
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Button,
} from '@mui/material'
import { Visibility, Download } from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function ApplicationsManagement() {
  const [statusFilter, setStatusFilter] = useState('all')
  const queryClient = useQueryClient()

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', statusFilter],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const params = statusFilter !== 'all' ? { status: statusFilter } : {}
      const response = await axios.get(`${API_URL}/applications`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.data
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const token = localStorage.getItem('token')
      return axios.put(`${API_URL}/applications/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] })
    },
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'shortlisted': return 'success'
      case 'rejected': return 'error'
      case 'selected': return 'info'
      default: return 'default'
    }
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>Applications Management</Typography>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          size="small"
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All Applications</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="shortlisted">Shortlisted</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="selected">Selected</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#fff5f0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Job</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Experience</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Applied Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((app: any) => (
              <TableRow key={app._id}>
                <TableCell>{app.fullName}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>{app.job?.title || 'N/A'}</TableCell>
                <TableCell>{app.experienceType}</TableCell>
                <TableCell>
                  <Select
                    value={app.status}
                    onChange={(e) => updateStatusMutation.mutate({ id: app._id, status: e.target.value })}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="shortlisted">Shortlisted</MenuItem>
                    <MenuItem value="rejected">Rejected</MenuItem>
                    <MenuItem value="selected">Selected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Visibility sx={{ color: '#ff6b35' }} />
                  </IconButton>
                  {app.resume?.url && (
                    <IconButton size="small" href={app.resume.url} target="_blank">
                      <Download sx={{ color: '#ff6b35' }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}