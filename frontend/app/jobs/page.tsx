'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Box,
  Chip,
  Pagination,
  Skeleton,
  InputAdornment,
  Paper,
} from '@mui/material'
import { Search, LocationOn, Work, AttachMoney, Business } from '@mui/icons-material'
import Link from 'next/link'
import axios from 'axios'
import { motion } from 'framer-motion'

interface Job {
  _id: string
  title: string
  company: string
  location: string
  jobType: string
  salary: { min: number; max: number; currency: string }
  skills: string[]
  description: string
  deadline: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    jobType: '',
    location: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [page, filters])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs`, {
        params: { ...filters, page, limit: 9 },
      })
      setJobs(response.data.data)
      setTotalPages(response.data.pages)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
    setPage(1)
  }

  return (
    <Box sx={{ pt: 12, pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Find Your Dream Job
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#666',
              mb: 6,
            }}
          >
            Browse through thousands of job opportunities from top companies
          </Typography>
        </motion.div>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by title, company, or skills"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                select
                label="Job Type"
                value={filters.jobType}
                onChange={(e) => handleFilterChange('jobType', e.target.value)}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="Full-time">Full-time</MenuItem>
                <MenuItem value="Part-time">Part-time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                placeholder="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Job Listings */}
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid item xs={12} md={6} lg={4} key={item}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <>
            <Grid container spacing={3}>
              {jobs.map((job, index) => (
                <Grid item xs={12} md={6} lg={4} key={job._id}>
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {job.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Business sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.company}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Work sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.jobType}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <AttachMoney sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.salary.currency} {job.salary.min} - {job.salary.max} / year
                          </Typography>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          {job.skills.slice(0, 3).map((skill) => (
                            <Chip
                              key={skill}
                              label={skill}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 2,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {job.description}
                        </Typography>
                        <Button
                          component={Link}
                          href={`/jobs/${job._id}`}
                          variant="contained"
                          fullWidth
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  )
}