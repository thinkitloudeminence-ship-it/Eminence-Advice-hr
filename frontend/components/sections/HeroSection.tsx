'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { ArrowForward, Work, School, TrendingUp } from '@mui/icons-material'

export default function HeroSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'white',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 10, md: 0 },
      }}
    >
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          bgcolor: '#fff5f0',
          clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  component="span"
                  sx={{
                    bgcolor: '#fff5f0',
                    color: '#ff6b35',
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'inline-block',
                    mb: 2,
                  }}
                >
                  🚀 Welcome to Eminance Advice
                </Typography>
              </Box>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem', lg: '3.8rem' },
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Transform Your Career & Workforce with{' '}
                <Typography
                  component="span"
                  sx={{
                    color: '#ff6b35',
                    display: 'inline-block',
                  }}
                >
                  Expert Guidance
                </Typography>
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: '#666',
                  mb: 4,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6,
                }}
              >
                Eminance Advice helps students, freshers, professionals, and companies with 
                career counseling, training, internships, placements, recruitment, and HR support services.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  component={Link}
                  href="/services"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: '#ff6b35',
                    color: 'white',
                    '&:hover': { 
                      bgcolor: '#e55a2b',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  component={Link}
                  href="/jobs"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#ff6b35',
                    color: '#ff6b35',
                    '&:hover': { 
                      borderColor: '#e55a2b',
                      color: '#e55a2b',
                      bgcolor: 'rgba(255,107,53,0.05)',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Apply for Jobs
                </Button>
                
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: '#ddd',
                    color: '#666',
                    '&:hover': { 
                      borderColor: '#ff6b35',
                      color: '#ff6b35',
                      bgcolor: 'rgba(255,107,53,0.05)',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us
                </Button>
              </Box>
              
              {/* Trust Badges */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mt: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp sx={{ color: '#ff6b35', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    5000+ Students Placed
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Work sx={{ color: '#ff6b35', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    200+ Companies
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <School sx={{ color: '#ff6b35', fontSize: 20 }} />
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    10+ Years Experience
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  component="img"
                  src="/hero-illustration.svg"
                  alt="Career Growth"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/500x400?text=Career+Growth'
                  }}
                  sx={{
                    width: '100%',
                    maxWidth: 450,
                    display: 'block',
                    margin: '0 auto',
                  }}
                />
                
                {/* Floating Elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: '#fff5f0',
                    zIndex: -1,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    bgcolor: '#fff5f0',
                    zIndex: -1,
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}