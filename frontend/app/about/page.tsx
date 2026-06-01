'use client'

import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
} from '@mui/material'
import {
  School,
  Work,
  EmojiPeople,
  TrendingUp,
  Handshake,
  Lightbulb,
  Visibility,
  Assignment,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Lottie from 'lottie-react'
import animationData from '@/public/about section animation.json'

const stats = [
  { number: '5000+', label: 'Students Placed', icon: School, delay: 0 },
  { number: '200+', label: 'Corporate Partners', icon: Handshake, delay: 0.1 },
  { number: '50+', label: 'Expert Trainers', icon: EmojiPeople, delay: 0.2 },
  { number: '95%', label: 'Success Rate', icon: TrendingUp, delay: 0.3 },
]

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'Constantly evolving with industry trends and technologies.' },
  { icon: Visibility, title: 'Transparency', description: 'Clear communication and honest guidance at every step.' },
  { icon: Handshake, title: 'Integrity', description: 'Ethical practices and commitment to excellence.' },
  { icon: Assignment, title: 'Excellence', description: 'Striving for the highest quality in all our services.' },
]

export default function AboutPage() {
  return (
    <>
      <NextSeo
        title="About Us | Eminance Advice - Our Story & Mission"
        description="Learn about Eminance Advice - India's trusted career counseling and HR services platform. Founded in 2009, we've helped 5000+ students achieve their career dreams."
        canonical="https://eminenceadvice.com/about"
        openGraph={{
          url: 'https://eminenceadvice.com/about',
          title: 'About Eminance Advice - Our Journey Since 2009',
          description: 'Discover our mission to bridge the gap between talent and opportunity.',
        }}
      />
      
      <Box sx={{ pt: 12, pb: 8, bgcolor: 'white' }}>
        {/* Hero Section */}
        <Box sx={{ bgcolor: '#ff6b35', color: 'white', py: 8 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                About Eminance Advice
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  maxWidth: 800,
                  mx: 'auto',
                  opacity: 0.95,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                }}
              >
                Bridging the gap between talent and opportunity since 2009
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Story Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
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
                    Our Journey
                  </Typography>
                </Box>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 3, 
                    color: '#1a1a1a', 
                    fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' } 
                  }}
                >
                  Our <span style={{ color: '#ff6b35' }}>Story</span>
                </Typography>
                <Typography paragraph sx={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  Eminance Advice was founded in 2009 with a vision to transform the career 
                  landscape in India. What started as a small career counseling center has 
                  grown into a comprehensive HR services platform serving thousands of 
                  students, professionals, and companies.
                </Typography>
                <Typography paragraph sx={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  We believe that everyone deserves access to quality career guidance and 
                  placement opportunities. Our team of industry experts works tirelessly 
                  to bridge the gap between talent and opportunity.
                </Typography>
                <Typography paragraph sx={{ color: '#666', lineHeight: 1.7, fontSize: '0.95rem' }}>
                  Today, we are proud to have placed over 5000 students in top companies 
                  and partnered with more than 200 corporate organizations across India.
                </Typography>
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
                  <Lottie
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: 'auto' }}
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
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                      10+ Years of Excellence
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Stats Section */}
        <Box sx={{ bgcolor: '#f5f5f5', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
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
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 20px rgba(255,107,53,0.12)',
                          borderBottom: '2px solid #ff6b35',
                        },
                      }}
                    >
                      <CardContent>
                        <Box
                          sx={{
                            bgcolor: '#fff5f0',
                            borderRadius: '50%',
                            width: { xs: 50, sm: 55 },
                            height: { xs: 50, sm: 55 },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1.5,
                          }}
                        >
                          <stat.icon sx={{ fontSize: { xs: 26, sm: 30 }, color: '#ff6b35' }} />
                        </Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            fontWeight: 'bold', 
                            mb: 0.5, 
                            color: '#1a1a1a', 
                            fontSize: { xs: '1.1rem', sm: '1.3rem' } 
                          }}
                        >
                          {stat.number}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#666', 
                            fontSize: { xs: '0.6rem', sm: '0.7rem' },
                            display: 'block'
                          }}
                        >
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

        {/* Vision & Mission */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Paper sx={{ p: 4, height: '100%', bgcolor: '#fff5f0', borderRadius: 3 }}>
                  <Lightbulb sx={{ fontSize: 50, color: '#ff6b35', mb: 2 }} />
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      color: '#1a1a1a', 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                    }}
                  >
                    Our Vision
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    To become India's most trusted career guidance and HR services platform, 
                    empowering millions of individuals to achieve their professional dreams 
                    while helping organizations build exceptional teams.
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ff6b35', fontStyle: 'italic', mt: 2, fontSize: '0.9rem' }}>
                    "Empowering careers, transforming futures"
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Paper sx={{ p: 4, height: '100%', bgcolor: '#fff5f0', borderRadius: 3 }}>
                  <TrendingUp sx={{ fontSize: 50, color: '#ff6b35', mb: 2 }} />
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      color: '#1a1a1a', 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                    }}
                  >
                    Our Mission
                  </Typography>
                  <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7, fontSize: '0.95rem' }}>
                    To provide comprehensive career solutions through expert guidance, 
                    quality training, and seamless placement assistance, ensuring every 
                    individual finds their right career path.
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ff6b35', fontStyle: 'italic', mt: 2, fontSize: '0.9rem' }}>
                    "Your success is our mission"
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Core Values */}
        <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
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
                  Our Principles
                </Typography>
              </Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold', 
                  textAlign: 'center', 
                  mb: 3, 
                  color: '#1a1a1a', 
                  fontSize: { xs: '1.8rem', sm: '2rem', md: '2.2rem' } 
                }}
              >
                Our Core <span style={{ color: '#ff6b35' }}>Values</span>
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto', fontSize: '0.9rem' }}>
                The principles that guide everything we do
              </Typography>
            </motion.div>

            <Grid container spacing={3}>
              {values.map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card sx={{ textAlign: 'center', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(255,107,53,0.1)' } }}>
                      <CardContent>
                        <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', width: { xs: 60, sm: 65 }, height: { xs: 60, sm: 65 }, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                          <value.icon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#ff6b35' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6, fontSize: '0.8rem' }}>
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box sx={{ bgcolor: '#ff6b35', color: 'white', py: 6 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center" justifyContent="center" textAlign="center">
              <Grid item xs={12}>
                <Typography 
                  variant="h4" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                  }}
                >
                  Ready to Start Your Journey?
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.95, fontSize: '0.9rem' }}>
                  Join thousands of successful professionals who trusted us for their career growth
                </Typography>
                <Button
                  component={Link}
                  href="/contact"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: '#ff6b35',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.95)',
                      transform: 'translateY(-2px)',
                    },
                    px: 4,
                    py: 1.5,
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Us Today
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  )
}