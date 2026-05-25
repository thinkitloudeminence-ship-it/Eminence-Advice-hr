'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Container, Typography, Grid, Card, CardContent, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import WorkIcon from '@mui/icons-material/Work'
import DescriptionIcon from '@mui/icons-material/Description'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PsychologyIcon from '@mui/icons-material/Psychology'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import Link from 'next/link'

const services = [
  { icon: SchoolIcon, title: 'Career Counseling', description: 'Expert guidance for career paths, job roles, and professional growth.', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { icon: EmojiPeopleIcon, title: 'Soft Skills Training', description: 'Enhance communication, leadership, and corporate etiquettes.', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { icon: WorkIcon, title: 'Placement Assistance', description: 'Connect with top companies for internships and full-time roles.', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { icon: DescriptionIcon, title: 'Resume Building', description: 'Professional CV creation and LinkedIn profile optimization.', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { icon: TrendingUpIcon, title: 'Interview Preparation', description: 'Mock interviews and comprehensive preparation sessions.', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { icon: PsychologyIcon, title: 'Freelancing Support', description: 'Guidance for starting and succeeding in freelancing career.', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
]

export default function ServicesHighlights() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const [activeIndex, setActiveIndex] = useState(0)

  const getSlidesPerView = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: '#f8fafc', overflow: 'hidden', position: 'relative' }}>
      {/* Background Decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.05) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.03) 0%, transparent 70%)',
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
                px: 2.5,
                py: 0.8,
                borderRadius: 30,
                fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
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
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '3rem' }, 
                fontWeight: 'bold', 
                textAlign: 'center', 
                mb: 2, 
                color: '#1a1a1a' 
              }}
            >
              Our{' '}
              <Typography
                component="span"
                sx={{ color: '#ff6b35', display: 'inline-block', position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: { xs: 2, sm: 4 },
                    left: 0,
                    width: '100%',
                    height: { xs: '4px', sm: '6px' },
                    bgcolor: 'rgba(255,107,53,0.2)',
                    borderRadius: '4px',
                  }
                }}
              >
                Services
              </Typography>
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                textAlign: 'center', 
                color: '#666', 
                maxWidth: 700, 
                mx: 'auto', 
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
                lineHeight: 1.6,
                px: { xs: 2, sm: 0 }
              }}
            >
              Comprehensive solutions for career growth and professional development
            </Typography>
          </Box>
        </motion.div>

        {/* Swiper Slider for Mobile/Tablet, Grid for Desktop */}
        {isMobile || isTablet ? (
          // Slider View
          <Box sx={{ position: 'relative', px: { xs: 0, sm: 2 } }}>
            <Swiper
              modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{
                prevEl: '.swiper-button-prev-custom',
                nextEl: '.swiper-button-next-custom',
              }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
              loop={true}
              style={{ paddingBottom: '50px' }}
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%', 
                        textAlign: 'center', 
                        transition: 'all 0.3s ease',
                        background: 'white',
                        borderRadius: { xs: 3, sm: 4 },
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '5px',
                          background: service.gradient,
                        }}
                      />
                      <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
                        <Box 
                          sx={{ 
                            bgcolor: '#fff5f0', 
                            borderRadius: '50%', 
                            width: { xs: 70, sm: 80 }, 
                            height: { xs: 70, sm: 80 }, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            mx: 'auto', 
                            mb: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              background: service.gradient,
                              '& svg': {
                                color: 'white',
                              }
                            }
                          }}
                        >
                          <service.icon sx={{ fontSize: { xs: 35, sm: 40 }, color: '#ff6b35', transition: 'all 0.3s ease' }} />
                        </Box>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
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
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* Custom Navigation Buttons */}
            <IconButton 
              className="swiper-button-prev-custom"
              sx={{ 
                position: 'absolute', 
                left: { xs: -10, sm: -20 }, 
                top: '50%', 
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: '#ff6b35', color: 'white' },
                zIndex: 2,
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton 
              className="swiper-button-next-custom"
              sx={{ 
                position: 'absolute', 
                right: { xs: -10, sm: -20 }, 
                top: '50%', 
                transform: 'translateY(-50%)',
                bgcolor: 'white',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                '&:hover': { bgcolor: '#ff6b35', color: 'white' },
                zIndex: 2,
                display: { xs: 'none', sm: 'flex' }
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        ) : (
          // Grid View for Desktop
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
                      borderRadius: 4,
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: '0 10px 30px rgba(255,107,53,0.15)',
                        '& .card-gradient': {
                          opacity: 1,
                        }
                      }
                    }}
                  >
                    <Box
                      className="card-gradient"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: service.gradient,
                        opacity: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                    <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                      <Box 
                        sx={{ 
                          bgcolor: '#fff5f0', 
                          borderRadius: '50%', 
                          width: { xs: 70, sm: 80, md: 90 }, 
                          height: { xs: 70, sm: 80, md: 90 }, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          mx: 'auto', 
                          mb: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            background: service.gradient,
                            '& svg': {
                              color: 'white',
                            }
                          }
                        }}
                      >
                        <service.icon sx={{ fontSize: { xs: 35, sm: 40, md: 45 }, color: '#ff6b35', transition: 'all 0.3s ease' }} />
                      </Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a', fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666', mb: 2, lineHeight: 1.6, fontSize: { xs: '0.8rem', sm: '0.85rem' } }}>
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
        )}
      </Container>

      {/* Swiper CSS for pagination styling */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #ff6b35 !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #ff6b35 !important;
        }
        .swiper-button-prev-custom, .swiper-button-next-custom {
          transition: all 0.3s ease;
        }
      `}</style>
    </Box>
  )
}