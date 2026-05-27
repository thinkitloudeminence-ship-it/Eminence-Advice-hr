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

export default function LeadsManagement() {
  const [statusFilter, setStatusFilter] = useState('all')
  const queryClient = useQueryClient()

  const { data: leads, isLoading } = useQuery({
    queryKey: ['leads', statusFilter],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const params = statusFilter !== 'all' ? { status: statusFilter } : {}
      const response = await axios.get(`${API_URL}/contact`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.data
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const token = localStorage.getItem('token')
      return axios.put(`${API_URL}/contact/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] })
    },
  })

  const exportLeads = () => {
    // Implement CSV export
    alert('Export feature coming soon')
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
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>Contact Leads</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Leads</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="contacted">Contacted</MenuItem>
            <MenuItem value="converted">Converted</MenuItem>
            <MenuItem value="lost">Lost</MenuItem>
          </Select>
          <Button variant="outlined" startIcon={<Download />} onClick={exportLeads} sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}>
            Export
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#fff5f0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Service Required</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Submitted Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leads?.map((lead: any) => (
              <TableRow key={lead._id}>
                <TableCell>{lead.fullName}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.serviceRequired}</TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onChange={(e) => updateStatusMutation.mutate({ id: lead._id, status: e.target.value })}
                    size="small"
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="contacted">Contacted</MenuItem>
                    <MenuItem value="converted">Converted</MenuItem>
                    <MenuItem value="lost">Lost</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small">
                    <Visibility sx={{ color: '#ff6b35' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}