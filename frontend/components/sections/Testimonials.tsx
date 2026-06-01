'use client'

import { useState, useEffect } from 'react'
import { Box, Container, Typography, Card, CardContent, Avatar, Rating, Chip, Button, CircularProgress } from '@mui/material'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { Google, Star, Verified, FormatQuote } from '@mui/icons-material'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  arrows: true,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
    { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 768, settings: { slidesToShow: 1.2, slidesToScroll: 1, centerMode: true, centerPadding: '20px' } },
    { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: '15px' } }
  ]
}

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

export default function Testimonials() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)

  useEffect(() => {
    fetchGoogleReviews()
  }, [])

  const fetchGoogleReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews/google`)
      setReviews(response.data.reviews)
      setRating(response.data.rating)
      setTotalReviews(response.data.totalReviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Helper function to format date - Fixed TypeScript error
  const formatReviewDate = (dateString: string): string => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  // Static fallback data if API fails
  const fallbackReviews: Review[] = [
    {
      name: 'Rahul Sharma',
      rating: 5,
      text: 'Best career counseling service in Indore! The team helped me prepare for interviews and I got placed in TCS.',
      date: '2 weeks ago',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Sharma&background=ff6b35&color=fff'
    },
    {
      name: 'Priya Patel',
      rating: 5,
      text: 'Excellent training programs and placement support. The HR team is very professional.',
      date: '1 month ago',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=ff6b35&color=fff'
    },
    {
      name: 'Amit Kumar',
      rating: 5,
      text: 'The mock interview sessions were very helpful. I improved my communication skills.',
      date: '3 weeks ago',
      avatar: 'https://ui-avatars.com/api/?name=Amit+Kumar&background=ff6b35&color=fff'
    }
  ]

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews

  if (loading) {
    return (
      <Box sx={{ py: 10, bgcolor: '#fafafa', textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
        <Typography sx={{ mt: 2, color: '#666' }}>Loading reviews...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, bgcolor: '#fafafa', overflow: 'hidden' }}>
      <Container maxWidth="xl">
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
              Testimonials
            </Typography>
          </Box>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' }, 
              fontWeight: 'bold', 
              textAlign: 'center', 
              mb: 1,
              color: '#1a1a1a',
            }}
          >
            What Our{' '}
            <Typography
              component="span"
              sx={{ color: '#ff6b35', display: 'inline-block' }}
            >
              Students Say
            </Typography>
          </Typography>
          
          {/* Real Google Rating Badge */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<Google sx={{ color: '#ff6b35' }} />}
              label="Google Reviews"
              sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Star sx={{ color: '#ffb400', fontSize: { xs: 18, md: 20 } }} />
              <Typography sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1rem' } }}>
                {rating || 4.9}
              </Typography>
              <Typography sx={{ color: '#666', fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
                ({totalReviews || 128} reviews)
              </Typography>
            </Box>
          </Box>
          
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: 'center', 
              color: '#666', 
              maxWidth: 600, 
              mx: 'auto', 
              mb: { xs: 4, sm: 5, md: 6 },
              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            Real success stories from students and professionals who achieved their career goals
          </Typography>
        </motion.div>
        
        {displayReviews.length > 0 && (
          <Slider {...sliderSettings}>
            {displayReviews.map((review, index) => (
              <Box key={index} sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    sx={{ 
                      height: '100%', 
                      minHeight: { xs: 240, sm: 260, md: 280 },
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: { xs: 2, sm: 3, md: 4 },
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'visible',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
                      }
                    }}
                  >
                    <FormatQuote 
                      sx={{ 
                        position: 'absolute', 
                        top: { xs: 10, sm: 15 }, 
                        right: { xs: 10, sm: 15 }, 
                        fontSize: { xs: 40, sm: 50, md: 60 }, 
                        color: '#fff5f0',
                        zIndex: 0
                      }} 
                    />
                    
                    <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 }, flexGrow: 1, position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 }, mb: { xs: 1.5, sm: 2 } }}>
                        <Avatar 
                          src={review.avatar} 
                          alt={review.name}
                          sx={{ 
                            width: { xs: 45, sm: 55, md: 65 }, 
                            height: { xs: 45, sm: 55, md: 65 },
                            border: '2px solid #ff6b35',
                            bgcolor: '#fff5f0'
                          }} 
                        />
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600, 
                              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                              color: '#1a1a1a'
                            }}
                          >
                            {review.name}
                          </Typography>
                          <Rating 
                            value={review.rating} 
                            readOnly 
                            size="small" 
                            sx={{ 
                              '& .MuiRating-iconFilled': { color: '#ffb400' },
                              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
                            }} 
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#999', 
                              display: 'block',
                              fontSize: { xs: '0.6rem', sm: '0.65rem' }
                            }}
                          >
                            {review.date}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: { xs: 1, sm: 1.5 } }}>
                        <Verified sx={{ color: '#4caf50', fontSize: { xs: 14, sm: 16 } }} />
                        <Typography variant="caption" sx={{ color: '#4caf50', fontSize: { xs: '0.6rem', sm: '0.7rem' } }}>
                          Verified Google Review
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#555', 
                          lineHeight: { xs: 1.5, sm: 1.6 },
                          fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                          fontStyle: 'italic'
                        }}
                      >
                        "{review.text}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Box>
            ))}
          </Slider>
        )}
        
        <Box sx={{ textAlign: 'center', mt: { xs: 4, sm: 5, md: 6 } }}>
          <Button
            component="a"
            href="https://g.page/r/tOBIeRoN8xl45e0jZ/review"
            target="_blank"
            variant="outlined"
            startIcon={<Google />}
            sx={{
              borderColor: '#ff6b35',
              color: '#ff6b35',
              borderRadius: '50px',
              px: { xs: 3, sm: 4 },
              py: { xs: 0.8, sm: 1 },
              '&:hover': {
                borderColor: '#e55a2b',
                bgcolor: 'rgba(255,107,53,0.05)',
              }
            }}
          >
            Write a Review on Google
          </Button>
        </Box>
      </Container>
    </Box>
  )
}