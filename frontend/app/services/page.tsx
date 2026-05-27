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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material'
import {
  School,
  EmojiPeople,
  WorkOutline,
  Description,
  Psychology,
  TrendingUp,
  CheckCircle,
  Business,
  Computer,
  AttachMoney,
  People,
  Assessment,
  ArrowForward,
} from '@mui/icons-material'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

const serviceCategories = [
  {
    title: 'Counseling Services',
    icon: School,
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
  {
    icon: Business,
    title: 'Corporate Network',
    description: 'Access to 200+ corporate partners',
  },
  {
    icon: Computer,
    title: 'Modern Infrastructure',
    description: 'State-of-the-art training facilities',
  },
  {
    icon: AttachMoney,
    title: 'Affordable Pricing',
    description: 'Quality services at best prices',
  },
  {
    icon: People,
    title: 'Expert Faculty',
    description: 'Industry experienced trainers',
  },
  {
    icon: Assessment,
    title: 'Regular Assessments',
    description: 'Track your progress continuously',
  },
  {
    icon: TrendingUp,
    title: 'Career Growth',
    description: 'Continuous learning opportunities',
  },
]

export default function ServicesPage() {
  return (
    <>
      <NextSeo
        title="Our Services - Career Counseling, Training & Placement | Eminance Advice"
        description="Explore our comprehensive career services: career counseling, soft skills training, placement assistance, resume building, interview preparation, and freelancing support."
        canonical="https://eminenceadvice.com/services"
        openGraph={{
          url: 'https://eminenceadvice.com/services',
          title: 'Eminance Advice Services - Your Career Growth Partner',
          description: 'Expert career guidance and placement services for students and professionals.',
        }}
      />
    <Box sx={{ pt: 12, pb: 8, bgcolor: 'white' }}>
      {/* Hero Section - Orange Theme */}
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
              Our Services
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Box
                  sx={{
                    bgcolor: '#fff5f0',
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                  }}
                >
                  <category.icon sx={{ fontSize: 32, color: '#ff6b35' }} />
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {category.title}
                </Typography>
              </Box>
            </motion.div>

            <Grid container spacing={3}>
              {category.services.map((service, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 10px 30px rgba(255,107,53,0.12)',
                          borderBottom: `3px solid #ff6b35`,
                        }
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
                            mb: 2,
                          }}
                        >
                          <CheckCircle sx={{ color: '#ff6b35', fontSize: 28 }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                          {service.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
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
              sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3, color: '#1a1a1a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}
            >
              Internship{' '}
              <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
                Domains
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto' }}
            >
              Choose from 20+ internship domains across various industries
            </Typography>
          </motion.div>

          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              bgcolor: 'white', 
              borderRadius: 3,
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
            }}
          >
            <Grid container spacing={1.5}>
              {internshipDomains.map((domain, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.01 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
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
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', sm: '0.85rem' }, fontWeight: 500 }}>
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
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3, color: '#1a1a1a', fontSize: { xs: '1.8rem', md: '2.2rem' } }}
          >
            Why Choose Our{' '}
            <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
              Services?
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: '#666', mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            What makes us different from others
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {benefits.map((benefit, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(255,107,53,0.12)',
                      borderBottom: `3px solid #ff6b35`,
                    }
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        bgcolor: '#fff5f0',
                        borderRadius: '50%',
                        width: 65,
                        height: 65,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <benefit.icon sx={{ fontSize: 32, color: '#ff6b35' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.6 }}>
                      {benefit.description}
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
          <Grid container spacing={3} alignItems="center" justifyContent="center" textAlign="center">
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Ready to Transform Your Career?
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.95 }}>
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
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                }}
              >
                Book a Free Consultation
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
     </>
  )
}