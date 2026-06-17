'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Grid, useTheme } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

// Load animation from the public folder at runtime to avoid build-time module resolution errors
// (public files are not importable via module aliases). The filename has spaces, so encode the URI.

export default function AboutOverview() {
  const theme = useTheme()
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    fetch('/animations/about-animation.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Error loading animation:', err))
  }, [])

  return (
    <Box sx={{ py: { xs: 5, sm: 6, md: 8 }, bgcolor: 'white' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 4, sm: 5, md: 6 }} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  component="span"
                  sx={{
                    bgcolor: '#fff5f0',
                    color: '#ff6b35',
                    px: 2,
                    py: 0.5,
                    borderRadius: 20,
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem' },
                    fontWeight: 600,
                    display: 'inline-block',
                  }}
                >
                  Who We Are
                </Typography>
              </Box>
              
              <Typography
                variant="h2"
                sx={{ 
                  fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem', lg: '2.5rem' }, 
                  fontWeight: 'bold', 
                  mb: { xs: 2, sm: 3 },
                  color: '#1a1a1a',
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                About Eminance Advice{' '}
                <Typography
                  component="span"
                  sx={{ color: '#ff6b35', display: 'inline-block' }}
                >
                  
                </Typography>
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666', 
                  mb: 2, 
                  lineHeight: 1.6, 
                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Eminance Advice is a leading HR services and career counseling platform dedicated to 
                bridging the gap between talent and opportunity. We provide comprehensive support to 
                students, freshers, professionals, and companies.
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#666', 
                  mb: { xs: 2, sm: 3 }, 
                  lineHeight: 1.6, 
                  fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Our mission is to empower individuals with the right skills, guidance, and opportunities 
                to achieve their career goals while helping organizations find the perfect talent.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, mt: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#ff6b35', fontWeight: 'bold', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
                    2009
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Founded</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ color: '#ff6b35', fontWeight: 'bold', fontSize: { xs: '1.3rem', sm: '1.5rem' } }}>
                    50+
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>Team Members</Typography>
                </Box>
              </Box>
              
              {/* Key Features */}
              <Box sx={{ 
                mt: 3, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                alignItems: { xs: 'center', md: 'flex-start' }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18 } }} />
                  <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    100% Placement Assistance
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18 } }} />
                  <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    Industry Expert Trainers
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18 } }} />
                  <Typography variant="body2" sx={{ color: '#555', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    Lifetime Support & Guidance
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Right Side - Lottie Animation */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: { xs: 280, sm: 350, md: 420, lg: 450 },
                  mx: 'auto',
                  bgcolor: '#fff5f0',
                  borderRadius: { xs: 4, sm: 5, md: 6 },
                  p: { xs: 2, sm: 2.5, md: 3 },
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(255,107,53,0.1)',
                }}
              >
                {/* Animated Gradient Border */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    background: 'linear-gradient(90deg, #ff6b35, #ffb74d, #ff6b35)',
                    borderRadius: 'inherit',
                    opacity: 0.25,
                    zIndex: -1,
                    animation: 'borderRotate 4s linear infinite',
                  }}
                />
                
                {/* Lottie Animation */}
                <Box 
                  sx={{ 
                    width: '100%',
                    aspectRatio: '1/1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  )
}