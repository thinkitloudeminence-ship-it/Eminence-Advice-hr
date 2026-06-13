'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Button, Stack, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import { ArrowForward, TrendingUp, BusinessCenter, EmojiEvents, Work } from '@mui/icons-material'
import Lottie from 'lottie-react'
import animationData from '@/public/herosectionanimation.json'

export default function HeroSection() {
  const theme = useTheme()

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
        pt: { xs: 10, sm: 12, md: 0 },
        pb: { xs: 6, sm: 8, md: 0 },
      }}
    >
      {/* Animated Background Gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #fff5f0 0%, #fff0e8 50%, #ffffff 100%)',
          clipPath: {
            xs: 'ellipse(100% 30% at 50% 0%)',
            sm: 'ellipse(100% 40% at 50% 0%)',
            md: 'polygon(55% 0%, 100% 0%, 100% 100%, 30% 100%)',
            lg: 'polygon(50% 0%, 100% 0%, 100% 100%, 25% 100%)',
          },
          zIndex: 0,
        }}
      />
      
      {/* Floating Bubbles Background */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: 20 + i * 5, md: 30 + i * 8 },
            height: { xs: 20 + i * 5, md: 30 + i * 8 },
            borderRadius: '50%',
            background: `rgba(255,107,53,${0.02 + i * 0.01})`,
            bottom: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${5 + i * 2}s infinite ease-in-out`,
            animationDelay: `${i * 0.5}s`,
            zIndex: 0,
          }}
        />
      ))}
      
      <Container 
        maxWidth="xl"
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
        }}
      >
        <Stack 
          direction={{ xs: 'column', lg: 'row' }}
          spacing={{ xs: 4, sm: 5, md: 6, lg: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left Content */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '1 1 50%' }, width: '100%' }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: '#fff5f0',
                    px: { xs: 1.5, sm: 2 },
                    py: { xs: 0.5, sm: 0.6 },
                    borderRadius: '50px',
                    mb: { xs: 2, sm: 3 },
                    mx: { xs: 'auto', lg: 0 },
                  }}
                >
                  <Work sx={{ fontSize: { xs: 16, sm: 18 }, color: '#ff6b35' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#ff6b35', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                    Since 2009 • Trusted by 5000+ Students
                  </Typography>
                </Box>
              </motion.div>

              {/* Heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '1.8rem',
                    sm: '2.2rem',
                    md: '2.6rem',
                    lg: '3rem',
                    xl: '3.5rem'
                  },
                  fontWeight: 800,
                  color: '#1a1a1a',
                  lineHeight: {
                    xs: 1.3,
                    sm: 1.25,
                    md: 1.2,
                  },
                  mb: { xs: 2, sm: 2.5, md: 3 },
                  textAlign: { xs: 'center', lg: 'left' },
                }}
              >
                Transform Your{' '}
                <Box component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
                  Career & Workforce
                </Box>
                {' with Expert Guidance'}
              </Typography>
              
              {/* Description */}
              <Typography
                sx={{
                  color: '#666',
                  fontSize: {
                    xs: '0.85rem',
                    sm: '0.95rem',
                    md: '1rem',
                    lg: '1.05rem'
                  },
                  lineHeight: { xs: 1.6, sm: 1.7 },
                  mb: { xs: 3, sm: 4 },
                  maxWidth: { xs: '100%', md: '90%' },
                  textAlign: { xs: 'center', lg: 'left' },
                  mx: { xs: 'auto', lg: 0 },
                }}
              >
                Eminance Advice helps students, freshers, professionals, and companies with 
                career counseling, training, internships, placements, recruitment, and HR support services.
              </Typography>
              
              {/* CTA Buttons */}
              <Stack 
                direction="row" 
                spacing={{ xs: 1, sm: 2 }} 
                sx={{ 
                  mb: { xs: 4, sm: 5 },
                  alignItems: 'center',
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  flexWrap: 'wrap',
                  width: '100%'
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
                      boxShadow: '0 10px 20px rgba(255,107,53,0.3)',
                    },
                    px: { xs: 1.5, sm: 3, md: 4 },
                    py: { xs: 0.6, sm: 0.8, md: 1 },
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                    minWidth: { xs: '100px', sm: '140px', md: '160px' },
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
                    px: { xs: 1.5, sm: 3, md: 4 },
                    py: { xs: 0.6, sm: 0.8, md: 1 },
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                    minWidth: { xs: '100px', sm: '140px', md: '160px' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Apply Jobs
                </Button>
                
                <Button
                  component={Link}
                  href="/contact"
                  variant="text"
                  sx={{
                    color: '#666',
                    '&:hover': { 
                      color: '#ff6b35',
                      transform: 'translateY(-2px)',
                      bgcolor: 'transparent',
                    },
                    px: { xs: 1.5, sm: 3, md: 4 },
                    py: { xs: 0.6, sm: 0.8, md: 1 },
                    borderRadius: '50px',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem', lg: '0.9rem' },
                    minWidth: { xs: '90px', sm: '130px', md: '150px' },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact
                </Button>
              </Stack>
              
              {/* Trust Badges */}
              <Stack 
                direction="row" 
                spacing={{ xs: 2, sm: 3, md: 4 }}
                sx={{ 
                  justifyContent: { xs: 'center', lg: 'flex-start' },
                  flexWrap: 'wrap',
                  rowGap: { xs: 1.5, sm: 0 }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: { xs: 0.6, sm: 0.8 } }}>
                    <TrendingUp sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18, md: 20 } }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>10,000+</Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Students Placed
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: { xs: 0.6, sm: 0.8 } }}>
                    <BusinessCenter sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18, md: 20 } }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>500+</Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Companies
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', p: { xs: 0.6, sm: 0.8 } }}>
                    <EmojiEvents sx={{ color: '#ff6b35', fontSize: { xs: 16, sm: 18, md: 20 } }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' } }}>10+</Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: { xs: '0.6rem', sm: '0.65rem' } }}>
                      Years Experience
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </motion.div>
          </Box>
          
          {/* Right Side - Lottie Animation - Fixed Size */}
          <Box 
            sx={{ 
              flex: { xs: '1 1 100%', lg: '1 1 45%' }, 
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ 
                width: '100%', 
                maxWidth: 480,
                margin: '0 auto'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  maxWidth: { xs: 280, sm: 350, md: 420, lg: 450 },
                  mx: 'auto',
                  bgcolor: '#fff',
                  borderRadius: { xs: 4, sm: 5, md: 6 },
                  p: { xs: 1.5, sm: 2, md: 2.5 },
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 30px 50px -20px rgba(0,0,0,0.15)',
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
                
                {/* Lottie Animation - Perfect Square */}
                <Box 
                  sx={{ 
                    width: '100%',
                    height: '100%',
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
          </Box>
        </Stack>
      </Container>

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(20px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  )
}