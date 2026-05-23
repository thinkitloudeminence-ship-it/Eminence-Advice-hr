'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import { School, Work, Business, TrendingUp, CheckCircle, People, EmojiEvents } from '@mui/icons-material'
import Image from 'next/image'

const stats = [
  { number: '5000+', label: 'Students Placed', icon: School, color: '#ff6b35', delay: 0 },
  { number: '200+', label: 'Corporate Partners', icon: Business, color: '#ff6b35', delay: 0.1 },
  { number: '50+', label: 'Expert Trainers', icon: People, color: '#ff6b35', delay: 0.2 },
  { number: '95%', label: 'Success Rate', icon: EmojiEvents, color: '#ff6b35', delay: 0.3 },
]

export default function AboutOverview() {
  return (
    <Box sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
                    fontSize: '0.85rem',
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
                  fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' }, 
                  fontWeight: 'bold', 
                  mb: 3,
                  color: '#1a1a1a',
                }}
              >
                About{' '}
                <Typography
                  component="span"
                  sx={{ color: '#ff6b35', display: 'inline-block' }}
                >
                  Eminance Advice
                </Typography>
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ color: '#666', mb: 2, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Eminance Advice is a leading HR services and career counseling platform dedicated to 
                bridging the gap between talent and opportunity. We provide comprehensive support to 
                students, freshers, professionals, and companies.
              </Typography>
              
              <Typography variant="body1" paragraph sx={{ color: '#666', mb: 3, lineHeight: 1.6, fontSize: '0.95rem' }}>
                Our mission is to empower individuals with the right skills, guidance, and opportunities 
                to achieve their career goals while helping organizations find the perfect talent.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
                <Box>
                  <Typography variant="h4" sx={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    2009
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>Founded</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ color: '#ff6b35', fontWeight: 'bold', fontSize: '1.5rem' }}>
                    50+
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>Team Members</Typography>
                </Box>
              </Box>
              
              {/* Key Features */}
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ color: '#ff6b35', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem' }}>
                    100% Placement Assistance
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ color: '#ff6b35', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem' }}>
                    Industry Expert Trainers
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircle sx={{ color: '#ff6b35', fontSize: 18 }} />
                  <Typography variant="body2" sx={{ color: '#555', fontSize: '0.85rem' }}>
                    Lifetime Support & Guidance
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=450&fit=crop"
                  alt="Team collaboration at Eminance Advice"
                  sx={{ 
                    width: '100%', 
                    height: 'auto',
                    display: 'block',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    bgcolor: 'rgba(255,107,53,0.95)',
                    color: 'white',
                    p: 1.5,
                    borderRadius: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.85rem' }}>
                    10+ Years of Excellence in Career Guidance
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Stats Cards - Fixed Size */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} sm={3} md={3} key={index}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: stat.delay }}
                viewport={{ once: true }}
              >
                <Card 
                  sx={{ 
                    textAlign: 'center', 
                    py: 2.5,
                    px: 1,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 20px rgba(255,107,53,0.12)',
                      borderBottom: `2px solid #ff6b35`,
                    },
                    cursor: 'pointer',
                  }}
                >
                  <CardContent sx={{ p: 1 }}>
                    <Box
                      sx={{
                        bgcolor: '#fff5f0',
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1.5,
                      }}
                    >
                      <stat.icon sx={{ fontSize: 28, color: stat.color }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1a1a1a', fontSize: '1.3rem' }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#666', fontWeight: 500, fontSize: '0.7rem' }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}