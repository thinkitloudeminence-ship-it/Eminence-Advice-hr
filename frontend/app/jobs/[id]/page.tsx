'use client'

import { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from '@mui/material'
import {
  LocationOn,
  Work,
  AttachMoney,
  Business,
  CalendarToday,
  Close,
  Upload,
} from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const applicationSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  experienceType: z.enum(['fresher', 'experienced']),
  experienceDetails: z.object({
    years: z.number().optional(),
    months: z.number().optional(),
    currentCompany: z.string().optional(),
    currentRole: z.string().optional(),
  }).optional(),
  qualification: z.object({
    degree: z.string(),
    institution: z.string(),
    yearOfPassing: z.number(),
    percentage: z.number(),
  }),
  skills: z.string(),
  preferredJobRole: z.string(),
  currentLocation: z.string(),
  linkedinProfile: z.string().url().optional(),
  portfolioUrl: z.string().url().optional(),
  message: z.string().optional(),
})

type ApplicationForm = z.infer<typeof applicationSchema>

export default function JobDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const { control, handleSubmit, formState: { errors } } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      experienceType: 'fresher',
      skills: '',
    },
  })

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`)
      setJob(response.data.data)
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: ApplicationForm) => {
    if (!resumeFile) {
      alert('Please upload your resume')
      return
    }

    setSubmitting(true)
    const formData = new FormData()
    formData.append('job', id as string)
    formData.append('fullName', data.fullName)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('experienceType', data.experienceType)
    formData.append('skills', data.skills.split(',').map(s => s.trim()))
    formData.append('preferredJobRole', data.preferredJobRole)
    formData.append('currentLocation', data.currentLocation)
    formData.append('qualification', JSON.stringify(data.qualification))
    if (data.linkedinProfile) formData.append('linkedinProfile', data.linkedinProfile)
    if (data.portfolioUrl) formData.append('portfolioUrl', data.portfolioUrl)
    if (data.message) formData.append('message', data.message)
    if (data.experienceType === 'experienced' && data.experienceDetails) {
      formData.append('experienceDetails', JSON.stringify(data.experienceDetails))
    }
    formData.append('resume', resumeFile)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/applications`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setSuccess(true)
      setTimeout(() => {
        setOpenDialog(false)
        router.push('/jobs')
      }, 2000)
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container sx={{ pt: 12, pb: 8 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  if (!job) {
    return (
      <Container sx={{ pt: 12, pb: 8 }}>
        <Typography>Job not found</Typography>
      </Container>
    )
  }

  return (
    <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Paper sx={{ p: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  {job.title}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                  <Chip icon={<Business />} label={job.company} />
                  <Chip icon={<LocationOn />} label={job.location} />
                  <Chip icon={<Work />} label={job.jobType} />
                  <Chip
                    icon={<AttachMoney />}
                    label={`${job.salary.currency} ${job.salary.min} - ${job.salary.max}`}
                  />
                  <Chip
                    icon={<CalendarToday />}
                    label={`Deadline: ${new Date(job.deadline).toLocaleDateString()}`}
                  />
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Job Description
            </Typography>
            <Typography paragraph>{job.description}</Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Responsibilities
            </Typography>
            <ul>
              {job.responsibilities?.map((item: string, index: number) => (
                <li key={index}>
                  <Typography>{item}</Typography>
                </li>
              ))}
            </ul>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Requirements
            </Typography>
            <ul>
              {job.requirements?.map((item: string, index: number) => (
                <li key={index}>
                  <Typography>{item}</Typography>
                </li>
              ))}
            </ul>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Required Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.skills?.map((skill: string) => (
                <Chip key={skill} label={skill} color="primary" variant="outlined" />
              ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setOpenDialog(true)}
                sx={{ px: 6, py: 1.5 }}
              >
                Apply Now
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>

      {/* Application Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => !submitting && setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Job Application</Typography>
            <IconButton onClick={() => setOpenDialog(false)} disabled={submitting}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          {success ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Application submitted successfully! We will contact you soon.
            </Alert>
          ) : (
            <form id="application-form" onSubmit={handleSubmit(onSubmit)}>
              <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
                <Step>
                  <StepLabel>Personal Info</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Education & Skills</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Additional Info</StepLabel>
                </Step>
              </Stepper>

              {activeStep === 0 && (
                <Box>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Full Name"
                        margin="normal"
                        error={!!errors.fullName}
                        helperText={errors.fullName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Email"
                        type="email"
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Phone Number"
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                      />
                    )}
                  />
                  <Controller
                    name="experienceType"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        select
                        label="Experience Type"
                        margin="normal"
                        error={!!errors.experienceType}
                        helperText={errors.experienceType?.message}
                      >
                        <MenuItem value="fresher">Fresher</MenuItem>
                        <MenuItem value="experienced">Experienced</MenuItem>
                      </TextField>
                    )}
                  />
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => setActiveStep(1)}
                    >
                      Next
                    </Button>
                  </Box>
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <Controller
                    name="qualification.degree"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Degree"
                        margin="normal"
                      />
                    )}
                  />
                  <Controller
                    name="qualification.institution"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Institution"
                        margin="normal"
                      />
                    )}
                  />
                  <Controller
                    name="qualification.yearOfPassing"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="number"
                        label="Year of Passing"
                        margin="normal"
                      />
                    )}
                  />
                  <Controller
                    name="skills"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Skills (comma-separated)"
                        placeholder="React, Node.js, Python"
                        margin="normal"
                      />
                    )}
                  />
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button variant="outlined" onClick={() => setActiveStep(0)}>
                      Back
                    </Button>
                    <Button variant="contained" onClick={() => setActiveStep(2)}>
                      Next
                    </Button>
                  </Box>
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <Controller
                    name="preferredJobRole"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Preferred Job Role"
                        margin="normal"
                      />
                    )}
                  />
                  <Controller
                    name="currentLocation"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Current Location"
                        margin="normal"
                      />
                    )}
                  />
                  <Controller
                    name="linkedinProfile"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="LinkedIn Profile URL"
                        margin="normal"
                      />
                    )}
                  />
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Resume (PDF/DOC)
                    </Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<Upload />}
                    >
                      Upload Resume
                      <input
                        type="file"
                        hidden
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      />
                    </Button>
                    {resumeFile && (
                      <Typography variant="caption" sx={{ ml: 2 }}>
                        {resumeFile.name}
                      </Typography>
                    )}
                  </Box>

                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label="Additional Message (Optional)"
                        margin="normal"
                      />
                    )}
                  />

                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button variant="outlined" onClick={() => setActiveStep(1)}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={submitting || !resumeFile}
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </Box>
                </Box>
              )}
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}