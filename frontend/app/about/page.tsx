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
  Divider,
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

const stats = [
  { number: '5000+', label: 'Students Placed', icon: School, delay: 0 },
  { number: '200+', label: 'Corporate Partners', icon: Handshake, delay: 0.1 },
  { number: '50+', label: 'Expert Trainers', icon: EmojiPeople, delay: 0.2 },
  { number: '95%', label: 'Success Rate', icon: TrendingUp, delay: 0.3 },
]

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Constantly evolving with industry trends and technologies.',
  },
  {
    icon: Visibility,
    title: 'Transparency',
    description: 'Clear communication and honest guidance at every step.',
  },
  {
    icon: Handshake,
    title: 'Integrity',
    description: 'Ethical practices and commitment to excellence.',
  },
  {
    icon: Assignment,
    title: 'Excellence',
    description: 'Striving for the highest quality in all our services.',
  },
]

const team = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Founder & CEO',
    experience: '20+ years in HR',
    avatar: '/team/ceo.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Training',
    experience: '15+ years in Corporate Training',
    avatar: '/team/training-head.jpg',
  },
  {
    name: 'Amit Patel',
    role: 'Placement Director',
    experience: '12+ years in Recruitment',
    avatar: '/team/placement-head.jpg',
  },
  {
    name: 'Neha Gupta',
    role: 'Career Counselor',
    experience: '10+ years in Counseling',
    avatar: '/team/counselor.jpg',
  },
]

export default function AboutPage() {
  return (
    <Box sx={{ pt: 12, pb: 8, bgcolor: 'white' }}>
      {/* Hero Section - Orange Accent */}
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
                fontSize: { xs: '2rem', md: '3rem', lg: '3.5rem' },
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
                fontSize: { xs: '1rem', md: '1.25rem' },
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
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#1a1a1a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                Our{' '}
                <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
                  Story
                </Typography>
              </Typography>
              <Typography paragraph sx={{ color: '#666', lineHeight: 1.7 }}>
                Eminance Advice was founded in 2009 with a vision to transform the career 
                landscape in India. What started as a small career counseling center has 
                grown into a comprehensive HR services platform serving thousands of 
                students, professionals, and companies.
              </Typography>
              <Typography paragraph sx={{ color: '#666', lineHeight: 1.7 }}>
                We believe that everyone deserves access to quality career guidance and 
                placement opportunities. Our team of industry experts works tirelessly 
                to bridge the gap between talent and opportunity.
              </Typography>
              <Typography paragraph sx={{ color: '#666', lineHeight: 1.7 }}>
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
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Our Story"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
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
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    10+ Years of Excellence
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section - Updated Orange Theme */}
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
                        borderBottom: `2px solid #ff6b35`,
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          bgcolor: '#fff5f0',
                          borderRadius: '50%',
                          width: 55,
                          height: 55,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1.5,
                        }}
                      >
                        <stat.icon sx={{ fontSize: 30, color: '#ff6b35' }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5, color: '#1a1a1a', fontSize: '1.3rem' }}>
                        {stat.number}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#666', fontSize: '0.7rem' }}>
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
                <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                  To become India's most trusted career guidance and HR services platform, 
                  empowering millions of individuals to achieve their professional dreams 
                  while helping organizations build exceptional teams.
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff6b35', fontStyle: 'italic', mt: 2 }}>
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
                <Typography variant="h4" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: '#555', lineHeight: 1.7 }}>
                  To provide comprehensive career solutions through expert guidance, 
                  quality training, and seamless placement assistance, ensuring every 
                  individual finds their right career path.
                </Typography>
                <Typography variant="body2" sx={{ color: '#ff6b35', fontStyle: 'italic', mt: 2 }}>
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
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3, color: '#1a1a1a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}
            >
              Our Core{' '}
              <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
                Values
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto' }}
            >
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
                      <Box sx={{ bgcolor: '#fff5f0', borderRadius: '50%', width: 65, height: 65, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                        <value.icon sx={{ fontSize: 32, color: '#ff6b35' }} />
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
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

      {/* Leadership Team */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
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
              Meet Our Leaders
            </Typography>
          </Box>
          <Typography
            variant="h3"
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3, color: '#1a1a1a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}
          >
            Leadership{' '}
            <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
              Team
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            Meet the experts behind our success
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card sx={{ textAlign: 'center', height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(255,107,53,0.1)' } }}>
                  <CardContent>
                    <Avatar
                      src={member.avatar}
                      sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        border: '3px solid #ff6b35',
                      }}
                    />
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ff6b35', fontWeight: 500, mb: 1 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.experience}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA - Orange Theme */}
      <Box sx={{ bgcolor: '#ff6b35', color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="center" textAlign="center">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Ready to Start Your Journey?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
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
  )
}