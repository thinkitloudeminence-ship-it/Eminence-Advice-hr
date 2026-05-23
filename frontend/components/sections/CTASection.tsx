'use client'

import { Box, Container, Typography, Button, Grid, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, Work, School, ArrowForward } from '@mui/icons-material'

export default function CTASection() {
  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 2,
                    fontSize: { xs: '1.8rem', md: '2.5rem', lg: '3rem' },
                    color: '#1a1a1a',
                  }}
                >
                  Ready to Transform Your Career?
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    color: '#666',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.5
                  }}
                >
                  Join thousands of successful professionals who started their journey with us
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    component={Link} 
                    href="/contact" 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{ 
                      bgcolor: '#ff6b35', 
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      '&:hover': { 
                        bgcolor: '#e55a2b',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Get Started Today
                  </Button>
                  
                  <Button 
                    component={Link} 
                    href="/jobs" 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      borderColor: '#ff6b35', 
                      color: '#ff6b35',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      '&:hover': { 
                        borderColor: '#e55a2b',
                        color: '#e55a2b',
                        bgcolor: 'rgba(255,107,53,0.05)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Browse Jobs
                  </Button>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
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
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 5px 15px rgba(255,107,53,0.2)',
                        }
                      }}
                    >
                      <TrendingUp sx={{ fontSize: 40, color: '#ff6b35' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Career Growth
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
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
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 5px 15px rgba(255,107,53,0.2)',
                        }
                      }}
                    >
                      <Work sx={{ fontSize: 40, color: '#ff6b35' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Job Placement
                    </Typography>
                  </Box>
                  
                  <Box sx={{ textAlign: 'center' }}>
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
                        mb: 1,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 5px 15px rgba(255,107,53,0.2)',
                        }
                      }}
                    >
                      <School sx={{ fontSize: 40, color: '#ff6b35' }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#666', fontWeight: 500 }}>
                      Expert Training
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  )
}