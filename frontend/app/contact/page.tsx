'use client'

import { useState } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  IconButton,
  Alert,
} from '@mui/material'
import {
  Phone,
  Email,
  LocationOn,
  AccessTime,
  WhatsApp,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'

const contactSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone number required'),
  currentStatus: z.enum(['student', 'fresher', 'professional', 'company']),
  experience: z.string().optional(),
  serviceRequired: z.enum(['career counseling', 'training', 'placement', 'recruitment', 'freelancing', 'other']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactForm = z.infer<typeof contactSchema>

const contactInfo = [
  { icon: Phone, title: 'Phone', details: ['+91 98765 43210', '+91 98765 43211'] },
  { icon: Email, title: 'Email', details: ['info@eminanceadvice.com', 'support@eminanceadvice.com'] },
  { icon: LocationOn, title: 'Address', details: ['123, Business Park, Andheri East, Mumbai - 400069'] },
  { icon: AccessTime, title: 'Business Hours', details: ['Monday - Friday: 9:00 AM - 7:00 PM', 'Saturday: 10:00 AM - 5:00 PM'] },
]

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { control, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      currentStatus: 'student',
      serviceRequired: 'career counseling',
    },
  })

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    setError('')
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact`, data)
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('Error submitting form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }


  return (
     <>
      <NextSeo
        title="Contact Us | Get in Touch with Career Experts"
        description="Have questions about career counseling, training, or placement? Contact Eminance Advice today. Our expert team is here to help you succeed in your career journey."
        canonical="https://eminenceadvice.com/contact"
        openGraph={{
          url: 'https://eminenceadvice.com/contact',
          title: 'Contact Eminance Advice - Career Guidance Experts',
          description: 'Reach out to us for career counseling and placement assistance.',
        }}
      />
    <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
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
              textAlign: 'center',
              mb: 2,
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: '#666',
              maxWidth: 600,
              mx: 'auto',
              mb: 6,
            }}
          >
            Have questions? We're here to help. Reach out to us for any inquiries.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography variant="h4" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: '#666', mb: 4 }}>
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </Typography>

              {contactInfo.map((info, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <info.icon sx={{ fontSize: 28, color: 'primary.main', mr: 2 }} />
                      <Typography variant="h6">{info.title}</Typography>
                    </Box>
                    {info.details.map((detail, idx) => (
                      <Typography key={idx} variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                        {detail}
                      </Typography>
                    ))}
                  </CardContent>
                </Card>
              ))}

              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton sx={{ bgcolor: '#1877f2', color: 'white' }}>
                    <Facebook />
                  </IconButton>
                  <IconButton sx={{ bgcolor: '#1da1f2', color: 'white' }}>
                    <Twitter />
                  </IconButton>
                  <IconButton sx={{ bgcolor: '#0077b5', color: 'white' }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton sx={{ bgcolor: '#e4405f', color: 'white' }}>
                    <Instagram />
                  </IconButton>
                  <IconButton sx={{ bgcolor: '#25d366', color: 'white' }}>
                    <WhatsApp />
                  </IconButton>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Send Us a Message
                </Typography>

                {success && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Thank you for contacting us! We'll get back to you soon.
                  </Alert>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
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

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="currentStatus"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            select
                            label="Current Status"
                            margin="normal"
                            error={!!errors.currentStatus}
                          >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="fresher">Fresher</MenuItem>
                            <MenuItem value="professional">Professional</MenuItem>
                            <MenuItem value="company">Company</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name="experience"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Experience (if any)"
                            margin="normal"
                          />
                        )}
                      />
                    </Grid>
                  </Grid>

                  <Controller
                    name="serviceRequired"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        select
                        label="Service Required"
                        margin="normal"
                        error={!!errors.serviceRequired}
                      >
                        <MenuItem value="career counseling">Career Counseling</MenuItem>
                        <MenuItem value="training">Training</MenuItem>
                        <MenuItem value="placement">Placement Assistance</MenuItem>
                        <MenuItem value="recruitment">Recruitment Support</MenuItem>
                        <MenuItem value="freelancing">Freelancing Guidance</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        margin="normal"
                        error={!!errors.message}
                        helperText={errors.message?.message}
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    sx={{ mt: 3 }}
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
     </>
  )
}