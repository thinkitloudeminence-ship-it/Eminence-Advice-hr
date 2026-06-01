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
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4, md: 5 } }}>
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
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }, 
              fontWeight: 'bold', 
              textAlign: 'center', 
              mb: 2,
              color: '#1a1a1a',
            }}
          >
            Why Choose  Us?{' '}
            <Typography
              component="span"
              sx={{ color: '#ff6b35', display: 'inline-block' }}
            >
             
            </Typography>
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: '#666', 
              maxWidth: 600, 
              mx: 'auto', 
              mb: { xs: 4, sm: 5, md: 6 },
              fontSize: { xs: '0.9rem', sm: '1rem' },
              lineHeight: 1.6,
            }}
          >
            What makes Eminance Advice the preferred choice for career growth
          </Typography>
        </motion.div>
        
        {/* Grid - 3 cards per row on ALL devices (including mobile) */}
        <Grid 
          container 
          spacing={{ xs: 1.5, sm: 2, md: 3 }}
          sx={{ 
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {reasons.map((reason, index) => (
            <Grid 
              item 
              xs={4}       // ✅ Mobile pe 3 cards (12/4 = 3)
              sm={4}       // ✅ Tablet pe 3 cards
              md={4}       // ✅ Desktop pe 3 cards
              lg={4}       // ✅ Large desktop pe 3 cards
              key={index}
              sx={{
                display: 'flex',
              }}
            >
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                style={{ width: '100%', height: '100%' }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: { xs: 1.5, sm: 2, md: 3 },
                    '&:hover': {
                      boxShadow: '0 10px 30px rgba(255,107,53,0.12)',
                      borderBottom: `3px solid #ff6b35`,
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 1, sm: 1.5, md: 3 } }}>
                    <Box
                      sx={{
                        bgcolor: '#fff5f0',
                        borderRadius: '50%',
                        width: { xs: 40, sm: 50, md: 70 },
                        height: { xs: 40, sm: 50, md: 70 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: { xs: 0.8, sm: 1.5, md: 2 },
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
                      <reason.icon sx={{ 
                        fontSize: { xs: 20, sm: 26, md: 34 }, 
                        color: '#ff6b35', 
                        transition: 'all 0.3s ease' 
                      }} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#1a1a1a', 
                        fontSize: { xs: '0.7rem', sm: '0.85rem', md: '1.1rem' },
                        mb: { xs: 0.5, sm: 0.8, md: 1 },
                        lineHeight: 1.2
                      }}
                    >
                      {reason.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666', 
                        lineHeight: 1.4, 
                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.85rem' },
                        display: { xs: 'none', sm: 'block' }
                      }}
                    >
                      {reason.description}
                    </Typography>
                    {/* Mobile pe short description */}
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666', 
                        lineHeight: 1.3, 
                        fontSize: '0.55rem',
                        display: { xs: 'block', sm: 'none' }
                      }}
                    >
                      {reason.description.length > 50 ? reason.description.substring(0, 45) + '...' : reason.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        {/* Trust Badge */}
        <Box sx={{ textAlign: 'center', mt: { xs: 3, sm: 5, md: 6 } }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              bgcolor: '#fff5f0',
              px: { xs: 1.5, sm: 3 },
              py: { xs: 0.8, sm: 1.5 },
              borderRadius: 50,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Star sx={{ color: '#ff6b35', fontSize: { xs: 14, sm: 18, md: 20 } }} />
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#ff6b35', 
                fontWeight: 600, 
                fontSize: { xs: '0.6rem', sm: '0.75rem', md: '0.85rem' },
                textAlign: 'center'
              }}
            >
              Trusted by 5000+ students & 200+ companies
            </Typography>
            <Star sx={{ color: '#ff6b35', fontSize: { xs: 14, sm: 18, md: 20 } }} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}