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
  Divider,
  Stack,
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
  Send,
  CheckCircle,
} from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { motion } from 'framer-motion'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

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
  { 
    icon: Phone, 
    title: 'Phone', 
    details: ['098266 67279', '7773002495'],
    action: 'tel:9826667279',
    color: '#ff6b35'
  },
  { 
    icon: Email, 
    title: 'Email', 
    details: ['info@eminenceadvice.com', 'support@eminenceadvice.com'],
    action: 'mailto:info@eminenceadvice.com',
    color: '#ff6b35'
  },
  { 
    icon: LocationOn, 
    title: 'Address', 
    details: ['Near Hotel Amrit, Chhoti Gwaltoli, Indore, Madhya Pradesh 452001'],
    action: 'https://www.google.com/maps?q=near+Hotel+Amrit,+Chhoti+Gwaltoli,+Indore,+Madhya+Pradesh+452001',
    color: '#ff6b35'
  },
  { 
    icon: AccessTime, 
    title: 'Business Hours', 
    details: ['Monday - Friday: 9:00 AM - 7:00 PM', 'Saturday: 10:00 AM - 5:00 PM'],
    color: '#ff6b35'
  },
]

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/eminenceadvice/', bgcolor: '#1877f2' },
  { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/eminenceadvice/', bgcolor: '#e4405f' },
  { icon: LinkedIn, name: 'LinkedIn', url: 'https://in.linkedin.com/in/eminence-advice-ab630637a', bgcolor: '#0077b5' },
  { icon: WhatsApp, name: 'WhatsApp', url: 'https://wa.me/919826667279', bgcolor: '#25d366' },
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

  const openGoogleMap = () => {
    window.open('https://www.google.com/maps?q=near+Hotel+Amrit,+Chhoti+Gwaltoli,+Indore,+Madhya+Pradesh+452001', '_blank')
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
      <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                component="span"
                sx={{
                  bgcolor: '#fff5f0',
                  color: '#ff6b35',
                  px: 2,
                  py: 0.5,
                  borderRadius: 20,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-block',
                  mb: 2,
                }}
              >
                Get in Touch
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 2,
                  color: '#1a1a1a',
                }}
              >
                Contact{' '}
                <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
                  Us
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: '#666',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                Have questions? We're here to help. Reach out to us for any inquiries.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Left Side - Contact Info */}
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                    Get in Touch
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#666', mb: 4 }}>
                    We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                  </Typography>

                  {contactInfo.map((info, index) => (
                    <Card 
                      key={index} 
                      sx={{ 
                        mb: 2, 
                        borderRadius: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 5px 15px rgba(255,107,53,0.1)',
                          transform: 'translateX(5px)',
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: 1, mr: 2 }}>
                            <info.icon sx={{ fontSize: 24, color: '#ff6b35' }} />
                          </Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                            {info.title}
                          </Typography>
                        </Box>
                        {info.details.map((detail, idx) => (
                          info.action ? (
                            <Link
                              key={idx}
                              href={info.action}
                              target={info.title === 'Address' ? '_blank' : undefined}
                              style={{ textDecoration: 'none' }}
                            >
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: '#666', 
                                  mb: 0.5, 
                                  '&:hover': { color: '#ff6b35' },
                                  display: 'block',
                                  cursor: 'pointer'
                                }}
                              >
                                {detail}
                              </Typography>
                            </Link>
                          ) : (
                            <Typography key={idx} variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                              {detail}
                            </Typography>
                          )
                        ))}
                      </CardContent>
                    </Card>
                  ))}

                  {/* Social Links */}
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 2 }}>
                      Follow Us
                    </Typography>
                    <Stack direction="row" spacing={1.5}>
                      {socialLinks.map((social, index) => (
                        <IconButton
                          key={index}
                          component={Link}
                          href={social.url}
                          target="_blank"
                          sx={{
                            bgcolor: social.bgcolor,
                            color: 'white',
                            width: 45,
                            height: 45,
                            '&:hover': {
                              transform: 'translateY(-3px)',
                              boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <social.icon />
                        </IconButton>
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>

              {/* Right Side - Contact Form */}
              <Grid item xs={12} md={7}>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#1a1a1a', mb: 3 }}>
                      Send Us a Message
                    </Typography>

                    {success && (
                      <Alert 
                        icon={<CheckCircle fontSize="inherit" />} 
                        severity="success" 
                        sx={{ mb: 3, borderRadius: 2 }}
                      >
                        Thank you for contacting us! We'll get back to you soon.
                      </Alert>
                    )}

                    {error && (
                      <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                        {error}
                      </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Controller
                            name="fullName"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Full Name"
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Email"
                                type="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                label="Phone Number"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            )}
                          />
                        </Grid>

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
                                error={!!errors.currentStatus}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Controller
                            name="serviceRequired"
                            control={control}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                fullWidth
                                select
                                label="Service Required"
                                error={!!errors.serviceRequired}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                        </Grid>

                        <Grid item xs={12}>
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
                                error={!!errors.message}
                                helperText={errors.message?.message}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid>

                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        endIcon={<Send />}
                        sx={{
                          mt: 3,
                          bgcolor: '#ff6b35',
                          '&:hover': { bgcolor: '#e55a2b' },
                          borderRadius: 2,
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 'bold',
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </>
  )
}