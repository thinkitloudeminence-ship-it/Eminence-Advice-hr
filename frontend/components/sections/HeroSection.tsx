'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { ArrowForward, TrendingUp, BusinessCenter, EmojiEvents } from '@mui/icons-material'
import Image from 'next/image'

export default function HeroSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.between('md', 'lg'))
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: { xs: 'auto', sm: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 9, sm: 10, md: 12, lg: 0 },
        pb: { xs: 6, sm: 8, md: 10, lg: 0 },
      }}
    >
      {/* Background Decoration - Responsive */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #fff5f0 0%, #fff0e8 100%)',
          clipPath: {
            xs: 'ellipse(100% 40% at 50% 0%)',
            sm: 'ellipse(100% 50% at 50% 0%)',
            md: 'polygon(60% 0%, 100% 0%, 100% 100%, 40% 100%)',
            lg: 'polygon(55% 0%, 100% 0%, 100% 100%, 35% 100%)',
          },
          zIndex: 0,
        }}
      />
      
      <Container 
        maxWidth={false}
        sx={{ 
          position: 'relative', 
          zIndex: 1, 
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          maxWidth: { xs: '100%', sm: '100%', md: '90%', lg: '1200px', xl: '1400px' },
          mx: 'auto',
        }}
      >
        <Stack 
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, sm: 5, md: 6, lg: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Content */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 55%' }, width: '100%' }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '1.6rem',
                    sm: '2rem',
                    md: '2.5rem',
                    lg: '3rem',
                    xl: '3.5rem'
                  },
                  fontWeight: 800,
                  color: '#1a1a1a',
                  lineHeight: {
                    xs: 1.3,
                    sm: 1.25,
                    md: 1.2,
                    lg: 1.2
                  },
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Transform Your{' '}
                <Typography
                  component="span"
                  sx={{ color: '#ff6b35', display: 'inline-block' }}
                >
                  Career 
                </Typography>
                {' & '}
                <Typography
                  component="span"
                  sx={{ color: '#ff6b35', display: 'inline-block' }}
                >
                  Workforce
                </Typography>
                {' with Expert Guidance'}
              </Typography>
              
              {/* Description */}
              <Typography
                sx={{
                  color: '#666',
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.9rem',
                    md: '0.95rem',
                    lg: '1rem',
                    xl: '1.05rem'
                  },
                  lineHeight: { xs: 1.6, sm: 1.7, md: 1.7 },
                  mb: { xs: 3, sm: 4, md: 4 },
                  maxWidth: { xs: '100%', md: '90%' },
                  textAlign: { xs: 'center', md: 'left' },
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Eminance Advice helps students, freshers, professionals, and companies with 
                career counseling, training, internships, placements, recruitment, and HR support services.
              </Typography>
              
              {/* CTA Buttons */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1.5, sm: 2, md: 2.5 }} 
                sx={{ 
                  mb: { xs: 4, sm: 5, md: 5 },
                  alignItems: 'center',
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                <Button
                  component={Link}
                  href="/services"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: '#ff6b35',
                    color: 'white',
                    '&:hover': { 
                      bgcolor: '#e55a2b',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(255,107,53,0.3)',
                    },
                    px: { xs: 3, sm: 3.5, md: 4, lg: 5 },
                    py: { xs: 0.8, sm: 0.9, md: 1, lg: 1.2 },
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '260px', sm: 'none' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
                
                <Button
                  component={Link}
                  href="/jobs"
                  variant="outlined"
                  sx={{
                    borderColor: '#ff6b35',
                    color: '#ff6b35',
                    '&:hover': { 
                      borderColor: '#e55a2b',
                      color: '#e55a2b',
                      bgcolor: 'rgba(255,107,53,0.05)',
                      transform: 'translateY(-2px)',
                    },
                    px: { xs: 3, sm: 3.5, md: 4, lg: 5 },
                    py: { xs: 0.8, sm: 0.9, md: 1, lg: 1.2 },
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '260px', sm: 'none' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Apply for Jobs
                </Button>
                
                <Button
                  component={Link}
                  href="/contact"
                  variant="outlined"
                  sx={{
                    borderColor: '#ddd',
                    color: '#666',
                    '&:hover': { 
                      borderColor: '#ff6b35',
                      color: '#ff6b35',
                      bgcolor: 'rgba(255,107,53,0.05)',
                      transform: 'translateY(-2px)',
                    },
                    px: { xs: 3, sm: 3.5, md: 4, lg: 5 },
                    py: { xs: 0.8, sm: 0.9, md: 1, lg: 1.2 },
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                    width: { xs: '100%', sm: 'auto' },
                    maxWidth: { xs: '260px', sm: 'none' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
              
              {/* Trust Badges */}
              <Stack 
                direction={{ xs: 'row', sm: 'row' }} 
                spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 4 }}
                sx={{ 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  flexWrap: 'wrap',
                  rowGap: { xs: 1.5, sm: 0 }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1, md: 1.2 } }}>
                  <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: { xs: 0.6, sm: 0.8, md: 1 }, display: 'flex' }}>
                    <TrendingUp sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18, md: 20, lg: 22 } }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' } }}>
                      5000+
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }, display: { xs: 'none', sm: 'block' } }}>
                      Students Placed
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }, display: { xs: 'block', sm: 'none' } }}>
                      Students
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1, md: 1.2 } }}>
                  <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: { xs: 0.6, sm: 0.8, md: 1 }, display: 'flex' }}>
                    <BusinessCenter sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18, md: 20, lg: 22 } }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' } }}>
                      200+
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }, display: { xs: 'none', sm: 'block' } }}>
                      Companies
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }, display: { xs: 'block', sm: 'none' } }}>
                      Companies
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1, md: 1.2 } }}>
                  <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: { xs: 0.6, sm: 0.8, md: 1 }, display: 'flex' }}>
                    <EmojiEvents sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18, md: 20, lg: 22 } }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' } }}>
                      10+
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }, display: { xs: 'none', sm: 'block' } }}>
                      Years Experience
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem', md: '0.7rem', lg: '0.75rem' }, display: { xs: 'block', sm: 'none' } }}>
                      Years
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </motion.div>
          </Box>
          
          {/* Right Side - Image - Responsive */}
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 40%' }, 
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ x: 50, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: {
                    xs: 280,
                    sm: 350,
                    md: 380,
                    lg: 420,
                    xl: 480
                  },
                  mx: 'auto',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: { xs: '20px', sm: '24px', md: '28px', lg: '32px' },
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    background: 'linear-gradient(135deg, #ff6b35 0%, #ff8f5e 100%)',
                    p: { xs: 1.5, sm: 2, md: 2.5, lg: 3 },
                  }}
                >
                  <Box
                    component="img"
                    src="/hero-illustration.svg"
                    alt="Career Growth"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=500&fit=crop'
                    }}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      borderRadius: { xs: '16px', sm: '20px', md: '24px', lg: '28px' },
                    }}
                  />
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Stack>
      </Container>
    </Box>
  )
}