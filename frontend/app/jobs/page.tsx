// app/jobs/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Container, Typography, Grid, Paper, Box, Button, Chip, Divider,
  TextField, MenuItem, Dialog, DialogTitle, DialogContent, Alert,
  Stepper, Step, StepLabel, IconButton, Skeleton, InputAdornment,
  Card, CardContent, Pagination, LinearProgress,
} from '@mui/material'
import {
  LocationOn, Work, AttachMoney, Business, CalendarToday,
  Close, Upload, Search, CheckCircle, ArrowBack, ArrowForward,
} from '@mui/icons-material'
import Link from 'next/link'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface Job {
  _id: string
  title: string
  slug?: string
  company: string
  location: string
  jobType: string
  category: string
  salary: { min: number; max: number; currency: string }
  experience: { min: number; max: number }
  skills: string[]
  description: string
  deadline: string
  positions: number
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ search: '', jobType: '', location: '' })

  useEffect(() => { fetchJobs() }, [page, filters])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/jobs`, {
        params: { ...filters, page, limit: 9 },
      })
      setJobs(res.data.data)
      setTotalPages(res.data.pages)
      setTotal(res.data.total)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }

  return (
    <>
      <NextSeo
        title="Latest Job Openings - Apply Now for Top Companies | Eminance Advice"
        description="Find your dream job with Eminance Advice. Browse latest job openings across IT, HR, Finance, Sales, Digital Marketing, and more. Apply now for internships and full-time positions."
        canonical="https://eminenceadvice.com/jobs"
        openGraph={{
          url: 'https://eminenceadvice.com/jobs',
          title: 'Latest Job Openings - Apply Now | Eminance Advice',
          description: 'Browse and apply for latest job vacancies across multiple industries. Find your dream job today!',
          images: [
            {
              url: 'https://eminenceadvice.com/jobs-og.jpg',
              width: 1200,
              height: 630,
              alt: 'Eminance Advice Jobs',
            },
          ],
        }}
        additionalMetaTags={[
          { name: 'keywords', content: 'job openings, latest jobs, career opportunities, job vacancies, IT jobs, HR jobs, finance jobs, sales jobs, digital marketing jobs, internship opportunities, placement jobs' },
          { name: 'author', content: 'Eminance Advice' },
          { name: 'publisher', content: 'Eminance Advice' },
          { name: 'robots', content: 'index, follow' },
        ]}
      />

      <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#fafafa' }}>
        {/* Hero */}
        <Box sx={{ bgcolor: '#ff6b35', py: 6, mb: 4 }}>
          <Container maxWidth="lg">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: '#fff', textAlign: 'center', mb: 1 }}>
                Find Your Dream Job
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', mb: 4 }}>
                {total > 0 ? `${total} opportunities waiting for you` : 'Browse latest job openings from top companies'}
              </Typography>

              {/* Search Bar */}
              <Paper sx={{ p: 2, borderRadius: 3, maxWidth: 800, mx: 'auto' }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={5}>
                    <TextField fullWidth placeholder="Job title, skills, or company"
                      value={filters.search} onChange={e => handleFilter('search', e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: '#ff6b35' }} /></InputAdornment> }}
                      variant="standard" sx={{ '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:after': { borderBottom: 'none' } }}
                    />
                  </Grid>
                  <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
                  <Grid item xs={12} md={3}>
                    <TextField fullWidth placeholder="Location"
                      value={filters.location} onChange={e => handleFilter('location', e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><LocationOn sx={{ color: '#ff6b35' }} /></InputAdornment> }}
                      variant="standard" sx={{ '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:after': { borderBottom: 'none' } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField fullWidth select value={filters.jobType}
                      onChange={e => handleFilter('jobType', e.target.value)}
                      variant="standard" sx={{ '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:after': { borderBottom: 'none' } }}>
                      <MenuItem value="">All Job Types</MenuItem>
                      {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'].map(t =>
                        <MenuItem key={t} value={t}>{t}</MenuItem>)}
                    </TextField>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <Skeleton variant="rectangular" height={280} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          ) : jobs.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Work sx={{ fontSize: 64, color: '#ddd', mb: 2 }} />
              <Typography variant="h6" color="textSecondary">No jobs found. Try different filters.</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {jobs.map((job, i) => (
                  <Grid item xs={12} md={6} lg={4} key={job._id}>
                    <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.07 }} whileHover={{ y: -4 }}>
                      <Card sx={{
                        height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 3,
                        border: '1px solid #f0f0f0', transition: 'all 0.3s ease',
                        '&:hover': { boxShadow: '0 8px 24px rgba(255,107,53,0.15)', borderColor: '#ff6b35' }
                      }}>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          {/* Header */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Chip label={job.jobType} size="small"
                              sx={{ bgcolor: '#fff5f0', color: '#ff6b35', fontWeight: 600 }} />
                            <Chip label={job.category} size="small" variant="outlined" />
                          </Box>

                          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: '#1a1a1a' }}>
                            {job.title}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Business sx={{ fontSize: 15, mr: 0.5, color: '#ff6b35' }} />
                            <Typography variant="body2" color="textSecondary">{job.company}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <LocationOn sx={{ fontSize: 15, mr: 0.5, color: '#ff6b35' }} />
                            <Typography variant="body2" color="textSecondary">{job.location}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <AttachMoney sx={{ fontSize: 15, mr: 0.5, color: '#ff6b35' }} />
                            <Typography variant="body2" color="textSecondary">
                              {job.salary?.currency} {job.salary?.min?.toLocaleString()} - {job.salary?.max?.toLocaleString()} / yr
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <CalendarToday sx={{ fontSize: 15, mr: 0.5, color: '#ff6b35' }} />
                            <Typography variant="body2" color="textSecondary">
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </Typography>
                          </Box>

                          <Box sx={{ mb: 2 }}>
                            {job.skills?.slice(0, 3).map(skill => (
                              <Chip key={skill} label={skill} size="small"
                                sx={{ mr: 0.5, mb: 0.5, bgcolor: '#f5f5f5' }} />
                            ))}
                          </Box>

                          <Typography variant="body2" color="textSecondary" sx={{
                            mb: 2, overflow: 'hidden', textOverflow: 'ellipsis',
                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                          }}>
                            {job.description}
                          </Typography>

                          <Button
                            component={Link}
                            href={`/jobs/${job.slug || job._id}`}
                            variant="contained"
                            fullWidth
                            sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2, fontWeight: 600 }}>
                            View & Apply
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                  <Pagination count={totalPages} page={page} onChange={(_, v) => setPage(v)} size="large"
                    sx={{ '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#ff6b35', color: '#fff' } }} />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </>
  )
}