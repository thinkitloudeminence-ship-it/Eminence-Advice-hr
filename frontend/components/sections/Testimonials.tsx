'use client'

import { Box, Container, Typography, Card, CardContent, Avatar, Rating } from '@mui/material'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const testimonials = [
  { name: 'Rahul Sharma', role: 'Software Engineer', company: 'TCS', content: 'Eminance Advice helped me transform my career. Their guidance and placement support were exceptional.', rating: 5, avatar: '/avatars/avatar1.jpg' },
  { name: 'Priya Patel', role: 'HR Manager', company: 'Infosys', content: 'The training and interview preparation sessions were top-notch. Highly recommended!', rating: 5, avatar: '/avatars/avatar2.jpg' },
  { name: 'Amit Kumar', role: 'Business Analyst', company: 'Deloitte', content: 'Great platform for freshers. Got my dream job through their placement assistance.', rating: 5, avatar: '/avatars/avatar3.jpg' },
  { name: 'Neha Singh', role: 'Marketing Executive', company: 'Amazon', content: 'Professional approach and excellent support throughout the placement process.', rating: 5, avatar: '/avatars/avatar4.jpg' },
]

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  responsive: [{ breakpoint: 1024, settings: { slidesToShow: 2 } }, { breakpoint: 600, settings: { slidesToShow: 1 } }],
}

export default function Testimonials() {
  return (
    <Box sx={{ py: 8, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 'bold', textAlign: 'center', mb: 2 }}>
            What Our Students Say
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', color: '#666', maxWidth: 600, mx: 'auto', mb: 6 }}>
            Success stories from our placed students and professionals
          </Typography>
        </motion.div>
        
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ p: 2 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={testimonial.avatar} sx={{ width: 60, height: 60, mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{testimonial.role} at {testimonial.company}</Typography>
                      <Rating value={testimonial.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>"{testimonial.content}"</Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  )
}