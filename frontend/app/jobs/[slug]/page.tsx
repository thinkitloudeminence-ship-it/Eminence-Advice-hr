// app/jobs/[slug]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Container, Typography, Grid, Paper, Box, Button, Chip, Divider,
  TextField, MenuItem, Dialog, DialogTitle, DialogContent, Alert,
  Stepper, Step, StepLabel, IconButton, CircularProgress,
} from '@mui/material'
import {
  LocationOn, Work, AttachMoney, Business, CalendarToday,
  Close, ArrowBack, ArrowForward, CheckCircle,
} from '@mui/icons-material'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const steps = ['Personal Info', 'Education & Skills', 'Submit Application']

const emptyForm = {
  fullName: '', email: '', phone: '', experienceType: 'fresher',
  expYears: '', expMonths: '', currentCompany: '', currentRole: '',
  degree: '', institution: '', yearOfPassing: '', percentage: '',
  skills: '', preferredJobRole: '', currentLocation: '',
  linkedinProfile: '', portfolioUrl: '', message: '',
}

export default function JobDetailPage() {
  const params = useParams()
  const slug = params.slug
  const router = useRouter()
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState(emptyForm)
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (slug) fetchJob()
  }, [slug])

  const fetchJob = async () => {
    try {
      const res = await axios.get(`${API_URL}/jobs/slug/${slug}`)
      setJob(res.data.data)
    } catch (e) {
      console.error(e)
      router.push('/jobs')
    } finally {
      setLoading(false)
    }
  }

  const set = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: '' }))
  }

  const validateStep = () => {
    const e: any = {}
    if (activeStep === 0) {
      if (!formData.fullName) e.fullName = 'Name required'
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email required'
      if (!formData.phone || formData.phone.length < 10) e.phone = 'Valid phone required'
    }
    if (activeStep === 1) {
      if (!formData.degree) e.degree = 'Degree required'
      if (!formData.institution) e.institution = 'Institution required'
      if (!formData.yearOfPassing) e.yearOfPassing = 'Year required'
      if (!formData.skills) e.skills = 'Skills required'
      if (!formData.preferredJobRole) e.preferredJobRole = 'Preferred role required'
      if (!formData.currentLocation) e.currentLocation = 'Location required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep()) setActiveStep(prev => prev + 1)
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('job', job._id)
      fd.append('fullName', formData.fullName)
      fd.append('email', formData.email)
      fd.append('phone', formData.phone)
      fd.append('experienceType', formData.experienceType)
      fd.append('preferredJobRole', formData.preferredJobRole)
      fd.append('currentLocation', formData.currentLocation)
      fd.append('skills', JSON.stringify(formData.skills.split(',').map(s => s.trim()).filter(Boolean)))
      fd.append('qualification', JSON.stringify({
        degree: formData.degree,
        institution: formData.institution,
        yearOfPassing: Number(formData.yearOfPassing),
        percentage: Number(formData.percentage) || 0,
      }))
      if (formData.experienceType === 'experienced') {
        fd.append('experienceDetails', JSON.stringify({
          years: Number(formData.expYears) || 0,
          months: Number(formData.expMonths) || 0,
          currentCompany: formData.currentCompany,
          currentRole: formData.currentRole,
        }))
      }
      if (formData.linkedinProfile) fd.append('linkedinProfile', formData.linkedinProfile)
      if (formData.portfolioUrl) fd.append('portfolioUrl', formData.portfolioUrl)
      if (formData.message) fd.append('message', formData.message)

      await axios.post(`${API_URL}/applications`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setSuccess(true)
      setTimeout(() => { setOpenDialog(false); router.push('/jobs') }, 3000)
    } catch (e: any) {
      setErrors({ submit: e.response?.data?.message || 'Submission failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  const openApply = () => {
    setFormData(emptyForm)
    setErrors({})
    setActiveStep(0)
    setSuccess(false)
    setOpenDialog(true)
  }

  if (loading) return (
    <Container sx={{ pt: 12, pb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    </Container>
  )

  if (!job) return (
    <Container sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>Job not found</Typography>
      <Button variant="contained" href="/jobs" sx={{ bgcolor: '#ff6b35' }}>Back to Jobs</Button>
    </Container>
  )

  return (
    <>
      <NextSeo
        title={`${job.title} - Apply Now | Eminance Advice Job Portal`}
        description={`Apply for ${job.title} position at ${job.company}. View job details, requirements, skills, and apply online. Join top companies through Eminance Advice placement assistance.`}
        canonical={`https://eminenceadvice.com/jobs/${slug}`}
        openGraph={{
          url: `https://eminenceadvice.com/jobs/${slug}`,
          title: `${job.title} - Apply Now | Eminance Advice`,
          description: `Apply for ${job.title} position at ${job.company}. View job details and apply online.`,
          images: [
            {
              url: 'https://eminenceadvice.com/job-og.jpg',
              width: 1200,
              height: 630,
              alt: job.title,
            },
          ],
        }}
        additionalMetaTags={[
          { name: 'keywords', content: `${job.title}, ${job.company} jobs, job application, career opportunity, job vacancy, ${job.skills?.join(', ')}, recruitment, placement` },
          { name: 'author', content: 'Eminance Advice' },
          { name: 'publisher', content: 'Eminance Advice' },
          { name: 'robots', content: 'index, follow' },
        ]}
      />

      <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Button startIcon={<ArrowBack />} onClick={() => router.back()}
              sx={{ mb: 3, color: '#ff6b35' }}>Back to Jobs</Button>

            <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ bgcolor: '#ff6b35', p: 4, color: '#fff' }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>{job.title}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  <Chip icon={<Business sx={{ color: '#fff !important' }} />} label={job.company}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                  <Chip icon={<LocationOn sx={{ color: '#fff !important' }} />} label={job.location}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                  <Chip icon={<Work sx={{ color: '#fff !important' }} />} label={job.jobType}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                  <Chip icon={<AttachMoney sx={{ color: '#fff !important' }} />}
                    label={`${job.salary?.currency} ${job.salary?.min?.toLocaleString()} - ${job.salary?.max?.toLocaleString()}`}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                  <Chip icon={<CalendarToday sx={{ color: '#fff !important' }} />}
                    label={`Deadline: ${new Date(job.deadline).toLocaleDateString()}`}
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff' }} />
                </Box>
              </Box>

              <Box sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff6b35', mb: 1 }}>Description</Typography>
                    <Typography sx={{ color: '#444', lineHeight: 1.8, mb: 3 }}>{job.description}</Typography>

                    {job.responsibilities?.length > 0 && <>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff6b35', mb: 1 }}>Responsibilities</Typography>
                      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                        {job.responsibilities.map((r: string, i: number) => (
                          <Box component="li" key={i} sx={{ mb: 0.5 }}>
                            <Typography sx={{ color: '#444' }}>{r}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </>}

                    {job.requirements?.length > 0 && <>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff6b35', mb: 1 }}>Requirements</Typography>
                      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                        {job.requirements.map((r: string, i: number) => (
                          <Box component="li" key={i} sx={{ mb: 0.5 }}>
                            <Typography sx={{ color: '#444' }}>{r}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </>}

                    {job.benefits?.length > 0 && <>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff6b35', mb: 1 }}>Benefits</Typography>
                      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                        {job.benefits.map((b: string, i: number) => (
                          <Box component="li" key={i} sx={{ mb: 0.5 }}>
                            <Typography sx={{ color: '#444' }}>{b}</Typography>
                          </Box>
                        ))}
                      </Box>
                    </>}
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #f0f0f0', mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Job Details</Typography>
                      {[
                        { label: 'Category', value: job.category },
                        { label: 'Experience', value: `${job.experience?.min}-${job.experience?.max} years` },
                        { label: 'Positions', value: job.positions },
                        { label: 'Status', value: job.status },
                      ].map(({ label, value }) => (
                        <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, pb: 1.5, borderBottom: '1px solid #f5f5f5' }}>
                          <Typography variant="body2" color="textSecondary">{label}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>{value}</Typography>
                        </Box>
                      ))}
                    </Paper>

                    {job.skills?.length > 0 && (
                      <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #f0f0f0', mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>Required Skills</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {job.skills.map((s: string) => (
                            <Chip key={s} label={s} size="small"
                              sx={{ bgcolor: '#fff5f0', color: '#ff6b35', fontWeight: 600 }} />
                          ))}
                        </Box>
                      </Paper>
                    )}

                    <Button variant="contained" fullWidth size="large" onClick={openApply}
                      sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2, py: 1.5, fontWeight: 700, fontSize: '1rem' }}>
                      Apply Now
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </motion.div>
        </Container>
      </Box>

      {/* Apply Dialog */}
      <Dialog open={openDialog} onClose={() => !submitting && setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#ff6b35', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Apply for {job.title}</Typography>
          <IconButton onClick={() => setOpenDialog(false)} disabled={submitting} sx={{ color: '#fff' }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 3 }}>
          {success ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <CheckCircle sx={{ fontSize: 80, color: '#4caf50', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Application Submitted!</Typography>
              <Typography color="textSecondary">Our team will contact you shortly on your registered phone number.</Typography>
            </Box>
          ) : (
            <Box>
              <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 1 }}>
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {errors.submit && <Alert severity="error" sx={{ mb: 2 }}>{errors.submit}</Alert>}

              {activeStep === 0 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Full Name *" value={formData.fullName}
                      onChange={e => set('fullName', e.target.value)}
                      error={!!errors.fullName} helperText={errors.fullName} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email *" type="email" value={formData.email}
                      onChange={e => set('email', e.target.value)}
                      error={!!errors.email} helperText={errors.email} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Phone *" value={formData.phone}
                      onChange={e => set('phone', e.target.value)}
                      error={!!errors.phone} helperText={errors.phone} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth select label="Experience Type *" value={formData.experienceType}
                      onChange={e => set('experienceType', e.target.value)}>
                      <MenuItem value="fresher">Fresher</MenuItem>
                      <MenuItem value="experienced">Experienced</MenuItem>
                    </TextField>
                  </Grid>
                  {formData.experienceType === 'experienced' && <>
                    <Grid item xs={6} md={3}>
                      <TextField fullWidth label="Exp Years" type="number" value={formData.expYears}
                        onChange={e => set('expYears', e.target.value)} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField fullWidth label="Exp Months" type="number" value={formData.expMonths}
                        onChange={e => set('expMonths', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="Current Company" value={formData.currentCompany}
                        onChange={e => set('currentCompany', e.target.value)} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="Current Role" value={formData.currentRole}
                        onChange={e => set('currentRole', e.target.value)} />
                    </Grid>
                  </>}
                </Grid>
              )}

              {activeStep === 1 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Degree *" value={formData.degree}
                      onChange={e => set('degree', e.target.value)}
                      error={!!errors.degree} helperText={errors.degree} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Institution *" value={formData.institution}
                      onChange={e => set('institution', e.target.value)}
                      error={!!errors.institution} helperText={errors.institution} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Year of Passing *" type="number" value={formData.yearOfPassing}
                      onChange={e => set('yearOfPassing', e.target.value)}
                      error={!!errors.yearOfPassing} helperText={errors.yearOfPassing} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Percentage / CGPA" type="number" value={formData.percentage}
                      onChange={e => set('percentage', e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Skills * (comma separated)" value={formData.skills}
                      onChange={e => set('skills', e.target.value)}
                      error={!!errors.skills} helperText={errors.skills} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Preferred Job Role *" value={formData.preferredJobRole}
                      onChange={e => set('preferredJobRole', e.target.value)}
                      error={!!errors.preferredJobRole} helperText={errors.preferredJobRole} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Current Location *" value={formData.currentLocation}
                      onChange={e => set('currentLocation', e.target.value)}
                      error={!!errors.currentLocation} helperText={errors.currentLocation} />
                  </Grid>
                </Grid>
              )}

              {activeStep === 2 && (
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="LinkedIn Profile URL" value={formData.linkedinProfile}
                      onChange={e => set('linkedinProfile', e.target.value)} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Portfolio URL" value={formData.portfolioUrl}
                      onChange={e => set('portfolioUrl', e.target.value)} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth multiline rows={4} label="Additional Information"
                      value={formData.message} onChange={e => set('message', e.target.value)} />
                  </Grid>
                </Grid>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button onClick={() => setActiveStep(p => p - 1)} disabled={activeStep === 0}
                  startIcon={<ArrowBack />} sx={{ color: '#ff6b35' }}>Back</Button>
                {activeStep < 2 ? (
                  <Button variant="contained" onClick={handleNext} endIcon={<ArrowForward />}
                    sx={{ bgcolor: '#ff6b35' }}>Next</Button>
                ) : (
                  <Button variant="contained" onClick={handleSubmit} disabled={submitting}
                    sx={{ bgcolor: '#ff6b35' }}>
                    {submitting ? <CircularProgress size={22} /> : 'Submit Application'}
                  </Button>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}