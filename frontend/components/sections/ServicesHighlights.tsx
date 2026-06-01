'use client'

import { motion } from 'framer-motion'
import { Box, Container, Typography, Grid, Card, CardContent, Button, useMediaQuery, useTheme } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import WorkIcon from '@mui/icons-material/Work'
import DescriptionIcon from '@mui/icons-material/Description'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Lottie from 'lottie-react'
import Link from 'next/link'
import animationData from '@/public/ourserviceanimation.json'

const services = [
  { icon: SchoolIcon, title: 'Career Counseling', description: 'Expert guidance for career paths, job roles, and professional growth.' },
  { icon: EmojiPeopleIcon, title: 'Soft Skills Training', description: 'Enhance communication, leadership, and corporate etiquettes.' },
  { icon: WorkIcon, title: 'Placement Assistance', description: 'Connect with top companies for internships and full-time roles.' },
  { icon: DescriptionIcon, title: 'Resume Building', description: 'Professional CV creation and LinkedIn profile optimization.' },
  { icon: TrendingUpIcon, title: 'Interview Preparation', description: 'Mock interviews and comprehensive preparation sessions.' },
  { icon: PsychologyIcon, title: 'Freelancing Support', description: 'Guidance for starting and succeeding in freelancing career.' },
]

export default function ServicesHighlights() {
  const theme = useTheme()

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      
      {/* Lottie Animation Background - Subtle and Clean */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          opacity: 0.08,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '0',
          width: { xs: 200, sm: 300, md: 400 },
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '0',
          width: { xs: 200, sm: 300, md: 400 },
          height: { xs: 200, sm: 300, md: 400 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.04) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        
        {/* Section Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 5, md: 6 } }}>
            <Typography
              component="span"
              sx={{
                bgcolor: '#fff5f0',
                color: '#ff6b35',
                px: { xs: 2, sm: 2.5 },
                py: { xs: 0.6, sm: 0.8 },
                borderRadius: 30,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                fontWeight: 600,
                display: 'inline-block',
                mb: 2,
              }}
            >
              What We Offer
            </Typography>
            
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem', lg: '2.8rem' }, 
                fontWeight: 'bold', 
                textAlign: 'center', 
                mb: 2, 
                color: '#1a1a1a' 
              }}
            >
              Our <span style={{ color: '#ff6b35' }}>Services</span>
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center', 
                color: '#666', 
                maxWidth: 600, 
                mx: 'auto', 
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                lineHeight: 1.6,
                px: { xs: 2, sm: 0 }
              }}
            >
              Comprehensive solutions for career growth and professional development
            </Typography>
          </Box>
        </motion.div>

        {/* Services Grid - 3 cards on mobile, 2 on tablet, 3 on desktop */}
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
          {services.map((service, index) => (
            <Grid item xs={4} sm={6} md={4} key={index}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center', 
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    borderRadius: { xs: 2, sm: 2.5, md: 3 },
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    '&:hover': {
                      boxShadow: '0 8px 20px rgba(255,107,53,0.1)',
                    }
                  }}
                >
                  {/* Top Border on Hover */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #ff6b35, #ffb74d)',
                      opacity: 0,
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                    {/* Icon Box */}
                    <Box 
                      sx={{ 
                        bgcolor: '#fff5f0', 
                        borderRadius: '50%', 
                        width: { xs: 45, sm: 60, md: 75 }, 
                        height: { xs: 45, sm: 60, md: 75 }, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mx: 'auto', 
                        mb: { xs: 1, sm: 1.5, md: 2 },
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
                      <service.icon sx={{ 
                        fontSize: { xs: 22, sm: 28, md: 35 }, 
                        color: '#ff6b35', 
                        transition: 'all 0.3s ease' 
                      }} />
                    </Box>
                    
                    {/* Title */}
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#1a1a1a', 
                        fontSize: { xs: '0.7rem', sm: '0.9rem', md: '1rem', lg: '1.1rem' },
                        mb: { xs: 0.5, sm: 1, md: 1 },
                        lineHeight: 1.2
                      }}
                    >
                      {service.title}
                    </Typography>
                    
                    {/* Description - Full on tablet+, hidden on mobile */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666', 
                        lineHeight: 1.5, 
                        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.8rem' },
                        display: { xs: 'none', sm: 'block' },
                        px: { sm: 0.5, md: 1 }
                      }}
                    >
                      {service.description}
                    </Typography>
                    
                    {/* Short Description for Mobile */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666', 
                        lineHeight: 1.3, 
                        fontSize: '0.55rem',
                        display: { xs: 'block', sm: 'none' },
                        mt: 0.5
                      }}
                    >
                      {service.description.substring(0, 40)}...
                    </Typography>
                    
                    {/* Learn More Button */}
                    <Button 
                      component={Link} 
                      href="/services" 
                      size="small" 
                      endIcon={<ArrowForwardIcon sx={{ fontSize: { xs: 12, sm: 16 } }} />}
                      sx={{ 
                        color: '#ff6b35',
                        fontWeight: 500,
                        fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.8rem' },
                        mt: { xs: 0.5, sm: 1 },
                        '&:hover': {
                          color: '#e55a2b',
                          transform: 'translateX(3px)',
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