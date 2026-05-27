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
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface Job {
  _id: string
  title: string
  company: string
  location: string
  jobType: string
  category: string
  skills: string[]
  description: string
  positions: number
  deadline: string
  status: string
  applications: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export default function JobsManagement() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: 'Full-time',
    category: 'IT',
    skills: '',
    description: '',
    positions: 1,
    deadline: '',
    status: 'active',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const queryClient = useQueryClient()

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.data
    },
  })

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const token = localStorage.getItem('token')
      const submitData = { ...data, skills: data.skills.split(',').map((s: string) => s.trim()) }
      return axios.post(`${API_URL}/jobs`, submitData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      setOpenDialog(false)
      resetForm()
      setSuccess('Job created successfully!')
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create job')
      setTimeout(() => setError(''), 3000)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const token = localStorage.getItem('token')
      const submitData = { ...data, skills: data.skills.split(',').map((s: string) => s.trim()) }
      return axios.put(`${API_URL}/jobs/${id}`, submitData, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      setOpenDialog(false)
      setEditingJob(null)
      resetForm()
      setSuccess('Job updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to update job')
      setTimeout(() => setError(''), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token')
      return axios.delete(`${API_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      setSuccess('Job deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to delete job')
      setTimeout(() => setError(''), 3000)
    },
  })

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      jobType: 'Full-time',
      category: 'IT',
      skills: '',
      description: '',
      positions: 1,
      deadline: '',
      status: 'active',
    })
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      jobType: job.jobType,
      category: job.category,
      skills: job.skills?.join(', ') || '',
      description: job.description,
      positions: job.positions,
      deadline: job.deadline ? job.deadline.split('T')[0] : '',
      status: job.status,
    })
    setOpenDialog(true)
  }

  const handleSubmit = () => {
    if (editingJob) {
      updateMutation.mutate({ id: editingJob._id, data: formData })
    } else {
      createMutation.mutate(formData)
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
        <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>Jobs Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingJob(null)
            resetForm()
            setOpenDialog(true)
          }}
          sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2 }}
        >
          Add Job
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#fff5f0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Applications</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Deadline</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs?.map((job: Job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.applications || 0}</TableCell>
                <TableCell>
                  <Chip
                    label={job.status}
                    size="small"
                    color={job.status === 'active' ? 'success' : job.status === 'closed' ? 'error' : 'default'}
                  />
                </TableCell>
                <TableCell>{job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(job)}>
                    <Edit sx={{ color: '#ff6b35' }} />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteMutation.mutate(job._id)}>
                    <Delete sx={{ color: '#ff6b35' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }}>
          {editingJob ? 'Edit Job' : 'Add New Job'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Job Type"
                value={formData.jobType}
                onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
              >
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="BDE">BDE</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Skills (comma-separated)"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="React, Node.js, Python, MongoDB"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Number of Positions"
                value={formData.positions}
                onChange={(e) => setFormData({ ...formData, positions: parseInt(e.target.value) || 1 })}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Application Deadline"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2 }}
            >
              {editingJob ? 'Update' : 'Create'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}