'use client'

import { useState } from 'react'
import {
  Box, Typography, Paper, Button, TextField, Grid, Alert,
  CircularProgress, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Card, CardContent, Stack, Tab, Tabs,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Switch, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions,
} from '@mui/material'
import { Save, Delete, Add, Edit, Work } from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const emptyForm = {
  title: '', company: '', location: '', jobType: 'Full-time',
  category: 'IT', description: '', positions: 1,
  deadline: '', status: 'active',
  salary: { min: 0, max: 0, currency: 'INR' },
  experience: { min: 0, max: 0 },
  skills: '', responsibilities: '', requirements: '', benefits: '',
}

export default function JobsManagement() {
  const [activeTab, setActiveTab] = useState(0)
  const [formData, setFormData] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: jobs, isLoading } = useQuery({
    queryKey: ['adminJobs'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${API_URL}/jobs/admin/list`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data.data
    }
  })

  const saveMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      const payload = {
        ...formData,
        skills: typeof formData.skills === 'string'
          ? formData.skills.split(',').map(s => s.trim()).filter(Boolean)
          : formData.skills,
        responsibilities: typeof formData.responsibilities === 'string'
          ? formData.responsibilities.split('\n').map(s => s.trim()).filter(Boolean)
          : formData.responsibilities,
        requirements: typeof formData.requirements === 'string'
          ? formData.requirements.split('\n').map(s => s.trim()).filter(Boolean)
          : formData.requirements,
        benefits: typeof formData.benefits === 'string'
          ? formData.benefits.split('\n').map(s => s.trim()).filter(Boolean)
          : formData.benefits,
      }
      if (editId) {
        return axios.put(`${API_URL}/jobs/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      return axios.post(`${API_URL}/jobs`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] })
      setSuccess(editId ? 'Job updated!' : 'Job created!')
      setFormData(emptyForm)
      setEditId(null)
      setActiveTab(0)
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to save job')
      setTimeout(() => setError(''), 3000)
    }
  })

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const token = localStorage.getItem('token')
      return axios.put(`${API_URL}/jobs/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['adminJobs'] })
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token')
      return axios.delete(`${API_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminJobs'] })
      setDeleteDialogId(null)
      setSuccess('Job deleted!')
      setTimeout(() => setSuccess(''), 3000)
    }
  })

  const handleEdit = (job: any) => {
    setEditId(job._id)
    setFormData({
      title: job.title || '',
      company: job.company || '',
      location: job.location || '',
      jobType: job.jobType || 'Full-time',
      category: job.category || 'IT',
      description: job.description || '',
      positions: job.positions || 1,
      deadline: job.deadline ? job.deadline.split('T')[0] : '',
      status: job.status || 'active',
      salary: job.salary || { min: 0, max: 0, currency: 'INR' },
      experience: job.experience || { min: 0, max: 0 },
      skills: job.skills?.join(', ') || '',
      responsibilities: job.responsibilities?.join('\n') || '',
      requirements: job.requirements?.join('\n') || '',
      benefits: job.benefits?.join('\n') || '',
    })
    setActiveTab(1)
  }

  const set = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }))
  const setSalary = (field: string, value: any) => setFormData(prev => ({ ...prev, salary: { ...prev.salary, [field]: value } }))
  const setExp = (field: string, value: any) => setFormData(prev => ({ ...prev, experience: { ...prev.experience, [field]: value } }))

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>Jobs Management</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
          <Tab label="All Jobs" />
          <Tab label={editId ? 'Edit Job' : 'Post New Job'} />
        </Tabs>

        {/* ── ALL JOBS TAB ── */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="contained" startIcon={<Add />}
                onClick={() => { setFormData(emptyForm); setEditId(null); setActiveTab(1) }}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}>
                Post New Job
              </Button>
            </Box>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress sx={{ color: '#ff6b35' }} />
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#fff5f0' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Deadline</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobs?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} align="center">No jobs found</TableCell>
                      </TableRow>
                    )}
                    {jobs?.map((job: any) => (
                      <TableRow key={job._id} hover>
                        <TableCell>
                          <Typography fontWeight={600}>{job.title}</Typography>
                          <Typography variant="caption" color="textSecondary">{job.category}</Typography>
                        </TableCell>
                        <TableCell>{job.company}</TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell><Chip label={job.jobType} size="small" /></TableCell>
                        <TableCell>{job.deadline ? new Date(job.deadline).toLocaleDateString() : '-'}</TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={job.status === 'active'}
                                onChange={() => toggleStatusMutation.mutate({
                                  id: job._id,
                                  status: job.status === 'active' ? 'closed' : 'active'
                                })}
                                color="success"
                              />
                            }
                            label={
                              <Chip
                                label={job.status}
                                size="small"
                                color={job.status === 'active' ? 'success' : 'default'}
                              />
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={() => handleEdit(job)} sx={{ color: '#ff6b35' }}>
                            <Edit />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => setDeleteDialogId(job._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}

        {/* ── POST / EDIT JOB TAB ── */}
        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#ff6b35', mb: 3 }}>
              {editId ? 'Edit Job' : 'Post New Job'}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Job Title *" value={formData.title}
                  onChange={e => set('title', e.target.value)} required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Company *" value={formData.company}
                  onChange={e => set('company', e.target.value)} required />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Location *" value={formData.location}
                  onChange={e => set('location', e.target.value)} required />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Job Type</InputLabel>
                  <Select value={formData.jobType} label="Job Type" onChange={e => set('jobType', e.target.value)}>
                    {['Full-time','Part-time','Contract','Internship','Remote','Hybrid'].map(t =>
                      <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={formData.category} label="Category" onChange={e => set('category', e.target.value)}>
                    {['IT','HR','Finance','Sales','Marketing','BDE','Other'].map(c =>
                      <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              {/* Salary */}
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Salary Min" type="number"
                  value={formData.salary.min} onChange={e => setSalary('min', Number(e.target.value))} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Salary Max" type="number"
                  value={formData.salary.max} onChange={e => setSalary('max', Number(e.target.value))} />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select value={formData.salary.currency} label="Currency"
                    onChange={e => setSalary('currency', e.target.value)}>
                    <MenuItem value="INR">INR</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Experience */}
              <Grid item xs={12} md={3}>
                <TextField fullWidth label="Exp Min (years)" type="number"
                  value={formData.experience.min} onChange={e => setExp('min', Number(e.target.value))} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth label="Exp Max (years)" type="number"
                  value={formData.experience.max} onChange={e => setExp('max', Number(e.target.value))} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth label="Positions *" type="number"
                  value={formData.positions} onChange={e => set('positions', Number(e.target.value))} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth label="Deadline *" type="date"
                  value={formData.deadline} onChange={e => set('deadline', e.target.value)}
                  InputLabelProps={{ shrink: true }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={formData.status} label="Status" onChange={e => set('status', e.target.value)}>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                    <MenuItem value="draft">Draft</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Skills (comma separated)"
                  value={formData.skills} onChange={e => set('skills', e.target.value)}
                  placeholder="React, Node.js, MongoDB" />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Description *"
                  value={formData.description} onChange={e => set('description', e.target.value)} required />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth multiline rows={4} label="Responsibilities (one per line)"
                  value={formData.responsibilities} onChange={e => set('responsibilities', e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth multiline rows={4} label="Requirements (one per line)"
                  value={formData.requirements} onChange={e => set('requirements', e.target.value)} />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth multiline rows={4} label="Benefits (one per line)"
                  value={formData.benefits} onChange={e => set('benefits', e.target.value)} />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button onClick={() => { setActiveTab(0); setEditId(null); setFormData(emptyForm) }}>Cancel</Button>
              <Button variant="contained" startIcon={<Save />}
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}>
                {saveMutation.isPending ? <CircularProgress size={24} /> : editId ? 'Update Job' : 'Post Job'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Delete Confirm Dialog */}
      <Dialog open={!!deleteDialogId} onClose={() => setDeleteDialogId(null)}>
        <DialogTitle>Delete Job?</DialogTitle>
        <DialogContent>Yeh job permanently delete ho jaegi. Sure ho?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogId(null)}>Cancel</Button>
          <Button color="error" variant="contained"
            onClick={() => deleteDialogId && deleteMutation.mutate(deleteDialogId)}
            disabled={deleteMutation.isPending}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}