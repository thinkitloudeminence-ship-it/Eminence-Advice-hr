'use client'

import { Box, Container, Typography, Grid, Chip, Paper, useMediaQuery, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { Work, TrendingUp, Computer, Business, ArrowForward, School, EmojiEvents } from '@mui/icons-material'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const getGridSize = () => {
    if (isMobile) return 6
    if (isTablet) return 4
    return 3
  }

  const getDomainIcon = (index: number) => {
    const icons = [Business, Computer, Work, TrendingUp, School, EmojiEvents]
    return icons[index % icons.length]
  }

  // Floating shapes for background
  const floatingShapes = [
    { icon: '🎓', size: 30, top: '10%', left: '5%', delay: 0 },
    { icon: '💼', size: 40, top: '20%', right: '8%', delay: 0.5 },
    { icon: '📊', size: 25, bottom: '15%', left: '10%', delay: 1 },
    { icon: '🚀', size: 35, bottom: '25%', right: '15%', delay: 1.5 },
    { icon: '💡', size: 28, top: '50%', left: '2%', delay: 2 },
    { icon: '🏆', size: 32, bottom: '40%', right: '5%', delay: 2.5 },
    { icon: '⚡', size: 22, top: '70%', left: '15%', delay: 3 },
    { icon: '⭐', size: 26, bottom: '10%', right: '25%', delay: 3.5 },
  ]

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: '#f8fafc', overflow: 'hidden', position: 'relative' }}>
      
      {/* Animated Gradient Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,107,53,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,107,53,0.02) 0%, transparent 50%)',
          zIndex: 0,
        }}
      />

      {/* Floating Shapes Animation */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{ y: [0, -20, 0, -15, 0], opacity: 0.15, scale: 1 }}
          transition={{ 
            duration: 8, 
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: shape.top,
            left: shape.left,
            right: shape.right,
            bottom: shape.bottom,
            fontSize: shape.size,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {shape.icon}
        </motion.div>
      ))}

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: [0, -50, -100, -50, 0],
            x: [0, Math.sin(i) * 20, 0, -Math.sin(i) * 20, 0],
            opacity: [0, 0.1, 0.2, 0.1, 0],
          }}
          transition={{
            duration: 10 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
          style={{
            position: 'absolute',
            width: 3,
            height: 3,
            borderRadius: '50%',
            background: '#ff6b35',
            left: `${Math.random() * 100}%`,
            bottom: 0,
            zIndex: 0,
          }}
        />
      ))}

      {/* Mouse Follower Glow */}
      <motion.div
        animate={{
          x: mousePosition.x - 150,
          y: mousePosition.y - 150,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 20 }}
        style={{
          position: 'fixed',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
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
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
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
                🚀 Explore Opportunities
              </Typography>
            </motion.div>
            
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
              <motion.span
                animate={{ 
                  color: ['#ff6b35', '#ffb74d', '#ff6b35'],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ display: 'inline-block', color: '#ff6b35' }}
              >
                Domains
              </motion.span>
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
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              }
            }}
          >
            {/* Animated Border */}
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
              }}
            />

            <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
              {domains.map((domain, index) => {
                const IconComponent = getDomainIcon(index)
                return (
                  <Grid item xs={getGridSize()} sm={4} md={3} key={index}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: Math.min(index * 0.02, 0.5)
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                    >
                      <Chip
                        label={domain}
                        icon={<IconComponent sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                        sx={{ 
                          width: '100%', 
                          py: { xs: 1.2, sm: 1.5 }, 
                          height: 'auto',
                          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                          fontWeight: 500,
                          bgcolor: hoveredIndex === index ? '#ff6b35' : '#f8f9fa',
                          color: hoveredIndex === index ? 'white' : '#444',
                          border: `1px solid ${hoveredIndex === index ? '#ff6b35' : '#e9ecef'}`,
                          borderRadius: 2,
                          justifyContent: 'flex-start',
                          '& .MuiChip-label': {
                            px: { xs: 1, sm: 1.5 },
                            py: { xs: 0.5, sm: 0.8 },
                          },
                          '& .MuiChip-icon': {
                            color: hoveredIndex === index ? 'white' : '#ff6b35',
                            ml: 1,
                          },
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          cursor: 'pointer',
                        }}
                      />
                    </motion.div>
                  </Grid>
                )
              })}
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
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
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
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}