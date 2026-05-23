'use client'

import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import { motion } from 'framer-motion'
import { Verified, Speed, Support, TrendingUp, Groups, Security, Star } from '@mui/icons-material'

const reasons = [
  { icon: Verified, title: 'Industry Experts', description: 'Learn from experienced professionals with real-world expertise.' },
  { icon: Speed, title: 'Fast Placement', description: 'Quick and efficient placement process with top companies.' },
  { icon: Support, title: '24/7 Support', description: 'Round-the-clock assistance for all your queries.' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Continuous learning and growth opportunities.' },
  { icon: Groups, title: 'Corporate Network', description: 'Strong network of 200+ corporate partners.' },
  { icon: Security, title: 'Guaranteed Internship', description: 'Assured internship opportunities for all students.' },
]

export default function WhyChooseUs() {
  return (
    <Box sx={{ py: 8, bgcolor: 'white' }}>
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
              Our Advantages
            </Typography>
          </Box>
          
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' }, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 2,
            color: '#1a1a1a',
          }}>
            Why Choose{' '}
            <Typography
              component="span"
              sx={{ color: '#ff6b35', display: 'inline-block' }}
            >
              Us?
            </Typography>
          </Typography>
          
          <Typography variant="body1" sx={{ 
            textAlign: 'center', 
            color: '#666', 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 6,
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            What makes Eminance Advice the preferred choice for career growth
          </Typography>
        </motion.div>
        
        <Grid container spacing={3}>
          {reasons.map((reason, index) => (
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
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(255,107,53,0.12)',
                      borderBottom: `3px solid #ff6b35`,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
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
                      <reason.icon sx={{ fontSize: 32, color: '#ff6b35', transition: 'all 0.3s ease' }} />
                    </Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: '1.1rem' }}>
                      {reason.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6, fontSize: '0.85rem' }}>
                      {reason.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {/* Trust Badge */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#fff5f0',
              px: 3,
              py: 1.5,
              borderRadius: 50,
            }}
          >
            <Star sx={{ color: '#ff6b35', fontSize: 20 }} />
            <Typography variant="body2" sx={{ color: '#ff6b35', fontWeight: 600 }}>
              Trusted by 5000+ students and 200+ companies
            </Typography>
            <Star sx={{ color: '#ff6b35', fontSize: 20 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}