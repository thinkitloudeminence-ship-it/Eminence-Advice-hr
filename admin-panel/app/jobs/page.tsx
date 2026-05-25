'use client'

import { useState, useEffect } from 'react'
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
} from '@mui/material'
import { Add, Edit, Delete, Visibility } from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'

const zodResolver = (schema: z.ZodTypeAny) => async (values: any) => {
  const parsed = schema.safeParse(values)

  if (parsed.success) {
    return { values: parsed.data, errors: {} }
  }

  const fieldErrors = parsed.error.formErrors.fieldErrors
  const errors = Object.keys(fieldErrors).reduce((acc, key) => {
    const messages = fieldErrors[key as keyof typeof fieldErrors]
    if (messages && messages.length) {
      acc[key] = { type: 'validation', message: messages[0] }
    }
    return acc
  }, {} as Record<string, { type: string; message: string }>)

  return { values: {}, errors }
}

const jobSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid']),
  category: z.enum(['IT', 'HR', 'Finance', 'Sales', 'Marketing', 'BDE', 'Other']),
  experience: z.object({
    min: z.number(),
    max: z.number(),
  }),
  salary: z.object({
    min: z.number(),
    max: z.number(),
    currency: z.string(),
  }),
  skills: z.string(),
  description: z.string(),
  positions: z.number(),
  deadline: z.string(),
  status: z.enum(['active', 'closed', 'draft']),
})

type JobForm = z.infer<typeof jobSchema>

export default function JobsManagement() {
  const [openDialog, setOpenDialog] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const queryClient = useQueryClient()

  const { data: jobs, isLoading } = useQuery('jobs', async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data.data
  })

  const { control, handleSubmit, reset, setValue } = useForm<JobForm>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobType: 'Full-time',
      category: 'IT',
      status: 'active',
      currency: 'INR',
    },
  })

  const createMutation = useMutation(
    async (data: any) => {
      const token = localStorage.getItem('token')
      const formData = { ...data, skills: data.skills.split(',').map(s => s.trim()) }
      return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs')
        setOpenDialog(false)
        reset()
      },
    }
  )

  const updateMutation = useMutation(
    async ({ id, data }: any) => {
      const token = localStorage.getItem('token')
      return axios.put(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs')
        setOpenDialog(false)
        setEditingJob(null)
        reset()
      },
    }
  )

  const deleteMutation = useMutation(
    async (id: string) => {
      const token = localStorage.getItem('token')
      return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobs')
      },
    }
  )

  const onSubmit = (data: JobForm) => {
    if (editingJob) {
      updateMutation.mutate({ id: editingJob._id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const handleEdit = (job: any) => {
    setEditingJob(job)
    setValue('title', job.title)
    setValue('company', job.company)
    setValue('location', job.location)
    setValue('jobType', job.jobType)
    setValue('category', job.category)
    setValue('experience', job.experience)
    setValue('salary', job.salary)
    setValue('skills', job.skills.join(', '))
    setValue('description', job.description)
    setValue('positions', job.positions)
    setValue('deadline', job.deadline.split('T')[0])
    setValue('status', job.status)
    setOpenDialog(true)
  }

  if (isLoading) return <Typography>Loading...</Typography>

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Jobs Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setEditingJob(null)
            reset()
            setOpenDialog(true)
          }}
        >
          Add Job
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Applications</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Deadline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs?.map((job: any) => (
              <TableRow key={job._id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.jobType}</TableCell>
                <TableCell>{job.applications}</TableCell>
                <TableCell>
                  <Chip
                    label={job.status}
                    color={job.status === 'active' ? 'success' : job.status === 'closed' ? 'error' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(job.deadline).toLocaleDateString()}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEdit(job)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteMutation.mutate(job._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Job Title" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Company" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Location" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="jobType"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Job Type">
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Part-time">Part-time</MenuItem>
                      <MenuItem value="Contract">Contract</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                      <MenuItem value="Remote">Remote</MenuItem>
                      <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Category">
                      <MenuItem value="IT">IT</MenuItem>
                      <MenuItem value="HR">HR</MenuItem>
                      <MenuItem value="Finance">Finance</MenuItem>
                      <MenuItem value="Sales">Sales</MenuItem>
                      <MenuItem value="Marketing">Marketing</MenuItem>
                      <MenuItem value="BDE">BDE</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select fullWidth label="Status">
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="skills"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Skills (comma-separated)" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} multiline rows={4} fullWidth label="Description" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="positions"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="number" fullWidth label="Number of Positions" />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="deadline"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} type="date" fullWidth label="Deadline" />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editingJob ? 'Update' : 'Create'}
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  )
}