'use client'

import { useState, useEffect, useRef } from 'react'
import { Box, Container, Typography, Card, CardContent, Avatar, Rating, Chip, Button, CircularProgress } from '@mui/material'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { Google, Star, Verified, FormatQuote } from '@mui/icons-material'
import axios from 'axios'
// @ts-ignore: imported CSS has no type declarations
import 'slick-carousel/slick/slick.css'
// @ts-ignore: imported CSS has no type declarations
import 'slick-carousel/slick/slick-theme.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// ✅ Slider Settings - 5 slides visible, auto-play every 5 seconds
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  arrows: true,
  centerMode: false,
  responsive: [
    { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 1 } },
    { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    { breakpoint: 900, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: '20px' } }
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
  const sliderRef = useRef<Slider>(null)

  useEffect(() => {
    fetchGoogleReviews()

    // Auto-play interval backup
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext()
      }
    }, 5000)

    return () => clearInterval(interval)
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

  // Format date
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

  // Static fallback data
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
    },
    {
      name: 'Neha Gupta',
      rating: 5,
      text: 'Great learning experience! The trainers are very knowledgeable and supportive.',
      date: '1 week ago',
      avatar: 'https://ui-avatars.com/api/?name=Neha+Gupta&background=ff6b35&color=fff'
    },
    {
      name: 'Vikram Singh',
      rating: 5,
      text: 'Got placed in my dream company thanks to their placement assistance.',
      date: '2 months ago',
      avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=ff6b35&color=fff'
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
            What Our Students Say
            <Typography
              component="span"
              sx={{ color: '#ff6b35', display: 'inline-block' }}
            >

            </Typography>
          </Typography>

          {/* Rating Badge */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
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
          <Slider ref={sliderRef} {...sliderSettings}>
            {displayReviews.map((review, index) => (
              <Box key={index} sx={{ px: 1 }}>
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
                      bgcolor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
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
                          Verified Review
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

        </Box>
      </Container>

      {/* Custom CSS for Slider */}
      <style jsx global>{`
        .slick-prev:before, .slick-next:before {
          color: #ff6b35 !important;
        }
        .slick-dots li button:before {
          color: #ff6b35 !important;
        }
        .slick-dots li.slick-active button:before {
          color: #ff6b35 !important;
        }
      `}</style>
    </Box>
  )
}