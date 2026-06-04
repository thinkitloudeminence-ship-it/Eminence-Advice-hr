'use client'

import { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Divider,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material'
import {
  PhoneAndroid,
  Verified,
  AssignmentInd,
  Email,
  Phone,
  Shield,
  Security,
  SupportAgent,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { NextSeo } from 'next-seo'


const steps = ['Personal Info', 'Payment', 'Confirmation']

// Validation Schema
const userSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .max(50, 'Name too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name should contain only letters'),
  email: z.string()
    .email('Please enter a valid email address')
    .min(5, 'Email is required'),
  phone: z.string()
    .length(10, 'Phone number must be exactly 10 digits')
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number (starts with 6-9)'),
})

type UserFormData = z.infer<typeof userSchema>

export default function PaymentPage() {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { control, handleSubmit, formState: { errors, isValid }, trigger } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    }
  })

  const plan = {
    name: 'Career Guidance Plan',
    price: 99,
    originalPrice: 499,
    features: [
      'Career Counseling Session',
      'Resume Review & Optimization',
      'Interview Preparation Tips',
      'Job Alerts on WhatsApp',
      'LinkedIn Profile Guidance',
      '7 Days Support'
    ],
  }

  const gst = 17.82
  const totalAmount = plan.price + gst

  const handleNext = async () => {
    const isNameValid = await trigger('name')
    const isEmailValid = await trigger('email')
    const isPhoneValid = await trigger('phone')
    
    if (isNameValid && isEmailValid && isPhoneValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const initiatePayment = async (data: UserFormData) => {
    setLoading(true)
    setError('')

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-order`, {
        amount: plan.price,
        name: data.name,
        email: data.email,
        phone: data.phone,
        plan: 'basic',
        paymentMethod: 'phonepay',
      })

      window.location.href = response.data.paymentUrl
    } catch (err: any) {
      setError(err.response?.data?.message || 'Payment initiation failed')
      setLoading(false)
    }
  }

  const onSubmit = (data: UserFormData) => {
    initiatePayment(data)
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: '#1a1a1a' }}>
              Enter Your Details
            </Typography>
            
            <Card sx={{ mb: 4, position: 'relative', overflow: 'hidden', borderRadius: 3, boxShadow: '0 10px 30px rgba(255,107,53,0.15)' }}>
              <Box sx={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, bgcolor: '#ff6b35', opacity: 0.1, borderRadius: '0 0 0 100%' }} />
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
                  <Box>
                    <Chip label="BEST VALUE" size="small" sx={{ bgcolor: '#ff6b35', color: 'white', fontWeight: 'bold', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>{plan.name}</Typography>
                    <Stack direction="row" alignItems="baseline" sx={{ mt: 1 }}>
                      <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#ff6b35' }}>₹{plan.price}</Typography>
                      <Typography variant="body2" sx={{ textDecoration: 'line-through', ml: 1, color: '#999' }}>₹{plan.originalPrice}</Typography>
                      <Chip label={`Save ${Math.round((plan.originalPrice - plan.price) / plan.originalPrice * 100)}%`} size="small" sx={{ ml: 1, bgcolor: '#4caf50', color: 'white' }} />
                    </Stack>
                  </Box>
                  <Box sx={{ bgcolor: '#ff6b35', px: 2, py: 1, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>Limited Time Offer</Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={1}>
                  {plan.features.map((feature, idx) => (
                    <Grid item xs={12} sm={6} key={idx}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Verified sx={{ fontSize: 16, color: '#4caf50' }} />
                        <Typography variant="body2" sx={{ color: '#666' }}>{feature}</Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
            
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 3, color: '#1a1a1a' }}>Contact Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Full Name"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        placeholder="Enter your full name"
                        InputProps={{ startAdornment: <AssignmentInd sx={{ mr: 1, color: '#ff6b35' }} /> }}
                        required
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
                        placeholder="you@example.com"
                        InputProps={{ startAdornment: <Email sx={{ mr: 1, color: '#ff6b35' }} /> }}
                        required
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
                        helperText={errors.phone?.message || 'Enter 10 digit mobile number'}
                        placeholder="9876543210"
                        inputProps={{ maxLength: 10 }}
                        InputProps={{ startAdornment: <Phone sx={{ mr: 1, color: '#ff6b35' }} /> }}
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Shield sx={{ color: '#ff6b35' }} />
                  <Typography variant="caption" color="textSecondary">Your information is secure with us. We never share your data.</Typography>
                </Stack>
              </Box>
            </Paper>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button variant="contained" onClick={handleNext} disabled={!isValid} sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, px: 5, py: 1.5, borderRadius: 2 }}>
                Proceed to Payment
              </Button>
            </Box>
          </Box>
        )

      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3, color: '#1a1a1a' }}>Payment Summary</Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <Paper sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Order Summary</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography color="textSecondary">{plan.name}</Typography>
                      <Typography fontWeight="bold">₹{plan.price}</Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                      <Typography color="textSecondary">GST (18%)</Typography>
                      <Typography fontWeight="bold">₹{gst}</Typography>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
                      <Typography variant="h6" fontWeight="bold">Total Amount</Typography>
                      <Typography variant="h5" sx={{ color: '#ff6b35', fontWeight: 'bold' }}>₹{Math.round(totalAmount)}</Typography>
                    </Stack>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Security sx={{ fontSize: 16 }} /> 100% Secure Payment
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SupportAgent sx={{ fontSize: 16 }} /> 24/7 Customer Support
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={5}>
                <Paper sx={{ p: 3, borderRadius: 3, bgcolor: '#fff5f0', height: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Payment Method</Typography>
                  <Paper sx={{ p: 2, bgcolor: 'white', borderRadius: 2, cursor: 'pointer', border: '2px solid #ff6b35' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <PhoneAndroid sx={{ fontSize: 40, color: '#6c63ff' }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>PhonePe</Typography>
                        <Typography variant="caption" color="textSecondary">UPI, QR Code, Wallet</Typography>
                      </Box>
                    </Stack>
                  </Paper>
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>You will be redirected to PhonePe secure payment page</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button variant="outlined" onClick={handleBack} sx={{ px: 4, py: 1, borderRadius: 2 }}>Back</Button>
              <Button variant="contained" onClick={handleSubmit(onSubmit)} disabled={loading} sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, px: 5, py: 1.5, borderRadius: 2 }}>
                {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : `Pay ₹${Math.round(totalAmount)}`}
              </Button>
            </Box>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>
        )

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            {success ? (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                  <Verified sx={{ fontSize: 60, color: 'white' }} />
                </Box>
                <Typography variant="h3" gutterBottom sx={{ color: '#4caf50', fontWeight: 'bold' }}>Payment Successful! 🎉</Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#666' }}>Thank you for your payment. A confirmation email has been sent to your registered email address.</Typography>
                <Box sx={{ p: 3, bgcolor: '#fff5f0', borderRadius: 2, maxWidth: 400, mx: 'auto', mb: 3 }}>
                  <Typography variant="body2" color="textSecondary">Our team will contact you within 24 hours to schedule your career counseling session.</Typography>
                </Box>
                <Button variant="contained" onClick={() => router.push('/')} sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, px: 4, py: 1.5, borderRadius: 2 }}>Back to Home</Button>
              </motion.div>
            ) : (
              <Box>
                <CircularProgress sx={{ color: '#ff6b35', size: 60 }} />
                <Typography variant="h6" sx={{ mt: 3, color: '#666' }}>Processing your payment...</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>Please do not close this window</Typography>
              </Box>
            )}
          </Box>
        )

      default:
        return null
    }
  }

  return (
    <>
       
      <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, background: 'linear-gradient(135deg, #ff6b35 0%, #ff8f5e 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Unlock Your Career Growth
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', maxWidth: 600, mx: 'auto' }}>Get expert guidance, placement assistance, and career support at an unbeatable price</Typography>
            </Box>

            <Paper sx={{ p: 1, mb: 4, borderRadius: 5, bgcolor: '#f5f5f5', display: 'inline-flex', width: '100%' }}>
              <Stepper activeStep={activeStep} sx={{ width: '100%' }}>
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={(props) => {
                      const icons = { 0: '📝', 1: '💳', 2: '✅' }
                      return (
                        <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: props.active || props.completed ? '#ff6b35' : '#e0e0e0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                          {icons[index as keyof typeof icons]}
                        </Box>
                      )
                    }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            <Paper sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              {renderStepContent()}
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  )
}