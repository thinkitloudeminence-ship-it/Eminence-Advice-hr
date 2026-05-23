'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import WorkIcon from '@mui/icons-material/Work'
import DescriptionIcon from '@mui/icons-material/Description'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

const services = [
  { icon: SchoolIcon, title: 'Career Counseling', description: 'Expert guidance for career paths, job roles, and professional growth.' },
  { icon: EmojiPeopleIcon, title: 'Soft Skills Training', description: 'Enhance communication, leadership, and corporate etiquettes.' },
  { icon: WorkIcon, title: 'Placement Assistance', description: 'Connect with top companies for internships and full-time roles.' },
  { icon: DescriptionIcon, title: 'Resume Building', description: 'Professional CV creation and LinkedIn profile optimization.' },
  { icon: TrendingUpIcon, title: 'Interview Preparation', description: 'Mock interviews and comprehensive preparation sessions.' },
  { icon: PsychologyIcon, title: 'Freelancing Support', description: 'Guidance for starting and succeeding in freelancing career.' },
]

export default function ServicesHighlights() {
  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
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
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'inline-block',
                mb: 2,
              }}
            >
              What We Offer
            </Typography>
          </Box>
          
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' }, fontWeight: 'bold', textAlign: 'center', mb: 2, color: '#1a1a1a' }}>
            Our{' '}
            <Typography
              component="span"
              sx={{ color: '#ff6b35', display: 'inline-block' }}
            >
              Services
            </Typography>
          </Typography>
          
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#666', maxWidth: 700, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
            Comprehensive solutions for career growth and professional development
          </Typography>
        </motion.div>
        
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center', 
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(255,107,53,0.15)',
                      borderBottom: `3px solid #ff6b35`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box 
                      sx={{ 
                        bgcolor: '#fff5f0', 
                        borderRadius: '50%', 
                        width: 80, 
                        height: 80, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mx: 'auto', 
                        mb: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          bgcolor: '#ff6b35',
                          '& svg': {
                            color: 'white',
                          }
                        }
                      }}
                    >
                      <service.icon sx={{ fontSize: 40, color: '#ff6b35', transition: 'all 0.3s ease' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                      {service.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6 }}>
                      {service.description}
                    </Typography>
                    <Button 
                      component={Link} 
                      href="/services" 
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        color: '#ff6b35',
                        '&:hover': {
                          color: '#e55a2b',
                          transform: 'translateX(5px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Learn More
                    </Button>
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