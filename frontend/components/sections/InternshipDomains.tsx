'use client'

import { Box, Container, Typography, Grid, Chip, Paper } from '@mui/material'
import { motion } from 'framer-motion'
import { Work, TrendingUp, Computer, Business } from '@mui/icons-material'

const domains = [
  'HR', 'Finance', 'Sales', 'IT', 'BDE', 'Bidding', 'AI Tools', 'MS Office',
  'Digital Marketing', 'Content Writing', 'Graphic Design', 'Web Development',
  'Data Analytics', 'Cloud Computing', 'Cybersecurity', 'Project Management'
]

export default function InternshipDomains() {
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
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-block',
                mb: 2,
              }}
            >
              Explore Opportunities
            </Typography>
          </Box>
          
          <Typography variant="h2" sx={{ 
            fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' }, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 2,
            color: '#1a1a1a',
          }}>
            Internship{' '}
            <Typography
              component="span"
              sx={{ color: '#ff6b35', display: 'inline-block' }}
            >
              Domains
            </Typography>
          </Typography>
          
          <Typography variant="body1" sx={{ 
            textAlign: 'center', 
            color: '#666', 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 5,
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            Explore diverse internship opportunities across multiple domains
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
            {domains.map((domain, index) => (
              <Grid item xs={6} sm={4} md={3} key={index}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  viewport={{ once: true }}
                >
                  <Chip
                    label={domain}
                    sx={{ 
                      width: '100%', 
                      py: 1.5, 
                      height: 'auto',
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      fontWeight: 500,
                      bgcolor: '#f8f9fa',
                      color: '#444',
                      border: '1px solid #e9ecef',
                      '&:hover': { 
                        bgcolor: '#ff6b35', 
                        color: 'white',
                        borderColor: '#ff6b35',
                        transform: 'translateY(-3px)',
                        boxShadow: '0 4px 12px rgba(255,107,53,0.2)',
                      }, 
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Paper>
        
        {/* CTA for Internships */}
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            Don't see your preferred domain? Contact us for custom opportunities
          </Typography>
          <Box
            component="a"
            href="/contact"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: '#ff6b35',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              '&:hover': {
                color: '#e55a2b',
                gap: 1.5,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Talk to our counselor
            <TrendingUp sx={{ fontSize: 16 }} />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}