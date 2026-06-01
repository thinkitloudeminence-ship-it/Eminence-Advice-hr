'use client'

import { motion } from 'framer-motion'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Divider,
} from '@mui/material'
import {
  School,
  EmojiPeople,
  WorkOutline,
  CheckCircle,
  Business,
  Computer,
  AttachMoney,
  People,
  Assessment,
  TrendingUp,
  ArrowForward,
  Handshake,
  Lightbulb,
} from '@mui/icons-material'
import Link from 'next/link'
import { NextSeo } from 'next-seo'
import Lottie from 'lottie-react'
import animationData from '@/public/ourserviceanimation.json'

const serviceCategories = [
  {
    title: 'Counseling Services',
    icon: School,
    color: '#ff6b35',
    bg: '#fff5f0',
    services: [
      { name: 'Career Counseling', description: 'Expert guidance for career paths and job roles' },
      { name: 'Industrial Awareness', description: 'Understanding industry trends and requirements' },
      { name: 'Job Role Guidance', description: 'Find the right role based on your skills' },
      { name: 'CV Creation', description: 'Professional resume writing and optimization' },
      { name: 'LinkedIn Profile Setup', description: 'Optimize your LinkedIn for recruiters' },
    ],
  },
  {
    title: 'Training Services',
    icon: EmojiPeople,
    color: '#ff6b35',
    bg: '#fff5f0',
    services: [
      { name: 'Soft Skills', description: 'Communication, leadership, and teamwork' },
      { name: 'Corporate Etiquettes', description: 'Professional behavior in workplace' },
      { name: 'Mock Interviews', description: 'Realistic interview practice sessions' },
      { name: 'Interview Preparation', description: 'Comprehensive interview training' },
      { name: 'Confidence Building', description: 'Boost your self-confidence' },
    ],
  },
  {
    title: 'Placement Services',
    icon: WorkOutline,
    color: '#ff6b35',
    bg: '#fff5f0',
    services: [
      { name: 'Internship Programs', description: 'Paid/unpaid internships in top companies' },
      { name: 'Placement Assistance', description: 'End-to-end placement support' },
      { name: 'Recruitment Support', description: 'For companies seeking talent' },
      { name: 'Freelancing Guidance', description: 'Start and grow your freelancing career' },
    ],
  },
]

const internshipDomains = [
  'HR', 'Finance', 'Sales', 'IT', 'BDE', 'Bidding', 'AI Tools', 'MS Office',
  'Digital Marketing', 'Content Writing', 'Graphic Design', 'Web Development',
  'Data Analytics', 'Cloud Computing', 'Cybersecurity', 'Project Management',
  'Product Management', 'Business Analytics', 'Social Media Marketing', 'SEO',
]

const benefits = [
  { icon: Handshake, title: 'Corporate Network', description: 'Access to 200+ corporate partners' },
  { icon: Computer, title: 'Modern Infrastructure', description: 'State-of-the-art training facilities' },
  { icon: AttachMoney, title: 'Affordable Pricing', description: 'Quality services at best prices' },
  { icon: People, title: 'Expert Faculty', description: 'Industry experienced trainers' },
  { icon: Assessment, title: 'Regular Assessments', description: 'Track your progress continuously' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Continuous learning opportunities' },
]

export default function ServicesPage() {
  return (
    <>
      <NextSeo
        title="Our Services | Career Counseling, Training & Placement"
        description="Explore Eminance Advice's comprehensive career services: career counseling, soft skills training, placement assistance, resume building, interview prep, and freelancing support."
        canonical="https://eminenceadvice.com/services"
        openGraph={{
          url: 'https://eminenceadvice.com/services',
          title: 'Eminance Advice Services - Your Career Growth Partner',
          description: 'Expert career guidance and placement services for students and professionals.',
        }}
      />
      
      <Box sx={{ pt: 12, pb: 8, bgcolor: 'white', overflow: 'hidden' }}>
        
        {/* Hero Section with Animation Background */}
        <Box sx={{ bgcolor: '#ff6b35', color: 'white', py: 8, position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
            <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
                Our Services
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
                Comprehensive solutions for your career growth and professional development
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Service Categories */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          {serviceCategories.map((category, catIndex) => (
            <Box key={catIndex} sx={{ mb: 8 }}>
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Box
                    sx={{
                      bgcolor: category.bg,
                      borderRadius: '50%',
                      width: { xs: 50, sm: 60 },
                      height: { xs: 50, sm: 60 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: { xs: 1.5, md: 2 },
                    }}
                  >
                    <category.icon sx={{ fontSize: { xs: 28, sm: 32 }, color: category.color }} />
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: '#1a1a1a', 
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' } 
                    }}
                  >
                    {category.title}
                  </Typography>
                </Box>
              </motion.div>

              <Grid container spacing={{ xs: 2, sm: 3 }}>
                {category.services.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <motion.div
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Card 
                        sx={{ 
                          height: '100%',
                          transition: 'all 0.3s ease',
                          borderRadius: { xs: 2, sm: 3 },
                          '&:hover': {
                            boxShadow: '0 10px 30px rgba(255,107,53,0.12)',
                            borderBottom: '3px solid #ff6b35',
                          }
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                          <Box
                            sx={{
                              bgcolor: '#fff5f0',
                              borderRadius: '50%',
                              width: { xs: 45, sm: 50 },
                              height: { xs: 45, sm: 50 },
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 1.5,
                            }}
                          >
                            <CheckCircle sx={{ color: '#ff6b35', fontSize: { xs: 24, sm: 26 } }} />
                          </Box>
                          <Typography 
                            variant="h6" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600, 
                              color: '#1a1a1a', 
                              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' } 
                            }}
                          >
                            {service.name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            color="textSecondary" 
                            sx={{ lineHeight: 1.6, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                          >
                            {service.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              {catIndex < serviceCategories.length - 1 && <Divider sx={{ my: 6, borderColor: '#e0e0e0' }} />}
            </Box>
          ))}
        </Container>

        {/* Internship Domains */}
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
                  Explore Opportunities
                </Typography>
              </Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold', 
                  textAlign: 'center', 
                  mb: 3, 
                  color: '#1a1a1a', 
                  fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' } 
                }}
              >
                Internship <span style={{ color: '#ff6b35' }}>Domains</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto', fontSize: '0.9rem' }}
              >
                Choose from 20+ internship domains across various industries
              </Typography>
            </motion.div>

            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, sm: 3, md: 4 }, 
                bgcolor: 'white', 
                borderRadius: { xs: 2, sm: 3 },
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
              }}
            >
              <Grid container spacing={{ xs: 1, sm: 1.5 }}>
                {internshipDomains.map((domain, index) => (
                  <Grid item xs={6} sm={4} md={3} key={index}>
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.01, 0.5) }}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          p: { xs: 1, sm: 1.2, md: 1.5 },
                          textAlign: 'center',
                          bgcolor: '#f8f9fa',
                          borderRadius: 2,
                          border: '1px solid #e9ecef',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            bgcolor: '#ff6b35',
                            color: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(255,107,53,0.2)',
                            borderColor: '#ff6b35',
                          },
                        }}
                      >
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }, 
                            fontWeight: 500,
                            '&:hover': { color: 'white' }
                          }}
                        >
                          {domain}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Container>
        </Box>

        {/* Why Choose Our Services */}
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
                Our Advantages
              </Typography>
            </Box>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 'bold', 
                textAlign: 'center', 
                mb: 3, 
                color: '#1a1a1a', 
                fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2rem', lg: '2.2rem' } 
              }}
            >
              Why Choose Our <span style={{ color: '#ff6b35' }}>Services?</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto', fontSize: '0.9rem' }}
            >
              What makes us different from others
            </Typography>
          </motion.div>

          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                      borderRadius: { xs: 2, sm: 3 },
                      '&:hover': {
                        boxShadow: '0 10px 30px rgba(255,107,53,0.12)',
                        borderBottom: '3px solid #ff6b35',
                      }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                      <Box
                        sx={{
                          bgcolor: '#fff5f0',
                          borderRadius: '50%',
                          width: { xs: 55, sm: 60, md: 65 },
                          height: { xs: 55, sm: 60, md: 65 },
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 1.5,
                        }}
                      >
                        <benefit.icon sx={{ fontSize: { xs: 28, sm: 30, md: 32 }, color: '#ff6b35' }} />
                      </Box>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 600, 
                          color: '#1a1a1a', 
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' } 
                        }}
                      >
                        {benefit.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="textSecondary" 
                        sx={{ lineHeight: 1.6, fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' } }}
                      >
                        {benefit.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box sx={{ bgcolor: '#ff6b35', color: 'white', py: 6 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Grid container spacing={3} alignItems="center" justifyContent="center" textAlign="center">
                <Grid item xs={12}>
                  <Typography 
                    variant="h4" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                    }}
                  >
                    Ready to Transform Your Career?
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, opacity: 0.95, fontSize: '0.9rem' }}>
                    Get started with our expert guidance today
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
                      px: { xs: 3, sm: 4 },
                      py: { xs: 1, sm: 1.5 },
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' }
                    }}
                  >
                    Book a Free Consultation
                  </Button>
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </>
  )
}