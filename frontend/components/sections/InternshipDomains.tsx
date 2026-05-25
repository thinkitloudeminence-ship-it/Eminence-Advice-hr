'use client'

import { Box, Container, Typography, Grid, Chip, Paper, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { Work, TrendingUp, Computer, Business, ArrowForward } from '@mui/icons-material'
import Link from 'next/link'

const domains = [
  'HR', 'Finance', 'Sales', 'IT', 'BDE', 'Bidding', 'AI Tools', 'MS Office',
  'Digital Marketing', 'Content Writing', 'Graphic Design', 'Web Development',
  'Data Analytics', 'Cloud Computing', 'Cybersecurity', 'Project Management',
  'Product Management', 'Business Analytics', 'Social Media Marketing', 'SEO'
]

export default function InternshipDomains() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  // Responsive grid sizes
  const getGridSize = () => {
    if (isMobile) return 6  // 2 items per row on mobile
    if (isTablet) return 4  // 3 items per row on tablet
    return 3  // 4 items per row on desktop
  }

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: '#f8fafc', overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        
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
                py: { xs: 0.5, sm: 0.7 },
                borderRadius: 30,
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                fontWeight: 600,
                display: 'inline-block',
                mb: 2,
              }}
            >
              Explore Opportunities
            </Typography>
            
            <Typography 
              variant="h2" 
              sx={{ 
                fontSize: { xs: '1.6rem', sm: '1.8rem', md: '2.2rem', lg: '2.5rem' }, 
                fontWeight: 'bold', 
                textAlign: 'center', 
                mb: 2,
                color: '#1a1a1a',
              }}
            >
              Internship{' '}
              <Typography
                component="span"
                sx={{ color: '#ff6b35', display: 'inline-block', position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: { xs: 2, sm: 4 },
                    left: 0,
                    width: '100%',
                    height: { xs: '3px', sm: '4px' },
                    bgcolor: 'rgba(255,107,53,0.2)',
                    borderRadius: '4px',
                  }
                }}
              >
                Domains
              </Typography>
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center', 
                color: '#666', 
                maxWidth: 650, 
                mx: 'auto', 
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                lineHeight: 1.6,
                px: { xs: 2, sm: 0 }
              }}
            >
              Explore diverse internship opportunities across multiple domains. 
              Choose your path and kickstart your career journey.
            </Typography>
          </Box>
        </motion.div>

        {/* Domains Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              bgcolor: 'white', 
              borderRadius: { xs: 3, sm: 4 },
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              }
            }}
          >
            <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
              {domains.map((domain, index) => (
                <Grid item xs={getGridSize()} sm={4} md={3} key={index}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: Math.min(index * 0.01, 0.5),
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <Chip
                      label={domain}
                      icon={index < 8 ? <Business sx={{ fontSize: { xs: 14, sm: 16 } }} /> : <Computer sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                      sx={{ 
                        width: '100%', 
                        py: { xs: 1.2, sm: 1.5 }, 
                        height: 'auto',
                        fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                        fontWeight: 500,
                        bgcolor: '#f8f9fa',
                        color: '#444',
                        border: '1px solid #e9ecef',
                        borderRadius: 2,
                        justifyContent: 'flex-start',
                        '& .MuiChip-label': {
                          px: { xs: 1, sm: 1.5 },
                          py: { xs: 0.5, sm: 0.8 },
                        },
                        '& .MuiChip-icon': {
                          color: '#ff6b35',
                          ml: 1,
                        },
                        '&:hover': { 
                          bgcolor: '#ff6b35', 
                          color: 'white',
                          borderColor: '#ff6b35',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 6px 16px rgba(255,107,53,0.25)',
                          '& .MuiChip-icon': {
                            color: 'white',
                          }
                        }, 
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                      }}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mt: { xs: 4, sm: 5, md: 6 } }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666', 
                mb: 2, 
                fontSize: { xs: '0.8rem', sm: '0.85rem' }
              }}
            >
              Don't see your preferred domain? We've got you covered!
            </Typography>
            <Box
              component={Link}
              href="/contact"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: '#ff6b35',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                px: { xs: 2.5, sm: 3 },
                py: { xs: 0.8, sm: 1 },
                borderRadius: 40,
                bgcolor: '#fff5f0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#e55a2b',
                  gap: 1.5,
                  bgcolor: '#ffe8e0',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Talk to our counselor
              <ArrowForward sx={{ fontSize: { xs: 14, sm: 16 } }} />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}