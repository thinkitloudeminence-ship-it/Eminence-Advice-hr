'use client'

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material'
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
  AccessTime,
} from '@mui/icons-material'
import Image from 'next/image'

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Careers', href: '/jobs' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'Career Counseling', href: '/services#counseling' },
    { label: 'Training Programs', href: '/services#training' },
    { label: 'Placement Assistance', href: '/services#placement' },
    { label: 'Internships', href: '/services#internships' },
  ],
  Resources: [
    { label: 'Blog', href: '/blogs' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const openGoogleMap = () => {
    window.open('https://www.google.com/maps?q=near+Hotel+Amrit,+Chhoti+Gwaltoli,+Indore,+Madhya+Pradesh+452001', '_blank')
  }

  return (
    <Box
      component="footer"
      sx={{
        // bgcolor: '#1a1a1a',
        color: 'white',
        pt: 6,
        pb: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Image
                src="/Eminenceadvicelogo.png"
                alt="Eminance Advice Logo"
                width={60}
                height={60}
                style={{ borderRadius: '10px', objectFit: 'contain' }}
              />
              
            </Box>
            <Typography variant="body2" sx={{ mb: 2, color: '#999', lineHeight: 1.6 }}>
              Transforming careers and workforce with expert guidance, training, 
              and placement assistance. Your trusted partner in professional growth.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
              <IconButton sx={{ color: '#ff6b35', '&:hover': { color: '#e55a2b' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: '#ff6b35', '&:hover': { color: '#e55a2b' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: '#ff6b35', '&:hover': { color: '#e55a2b' } }}>
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: '#ff6b35', '&:hover': { color: '#e55a2b' } }}>
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={2.5} key={title}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35' }}>
                {title}
              </Typography>
              {links.map((link) => (
                <Box key={link.label} sx={{ mb: 1.5 }}>
                  <Link
                    href={link.href}
                    sx={{
                      color: '#999',
                      textDecoration: 'none',
                      '&:hover': { color: '#ff6b35' },
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.label}
                  </Link>
                </Box>
              ))}
            </Grid>
          ))}
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35' }}>
              Contact Info
            </Typography>
            
            {/* Clickable Address with Google Maps */}
            <Box 
              sx={{ display: 'flex', alignItems: 'flex-start', mb: 2, cursor: 'pointer' }}
              onClick={openGoogleMap}
            >
              <LocationOn sx={{ fontSize: 18, mr: 1, color: '#ff6b35', mt: 0.3 }} />
              <Typography variant="body2" sx={{ color: '#999', '&:hover': { color: '#ff6b35' } }}>
                Near Hotel Amrit, Chhoti Gwaltoli, Indore, Madhya Pradesh 452001
              </Typography>
            </Box>
            
            {/* Phone Number - Click to Call */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ fontSize: 18, mr: 1, color: '#ff6b35' }} />
              <Link
                href="tel:9826667279"
                sx={{
                  color: '#999',
                  textDecoration: 'none',
                  '&:hover': { color: '#ff6b35' },
                }}
              >
                <Typography variant="body2">98266 67279</Typography>
              </Link>
            </Box>
            
            {/* Email */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ fontSize: 18, mr: 1, color: '#ff6b35' }} />
              <Link
                href="mailto:info@eminanceadvice.com"
                sx={{
                  color: '#999',
                  textDecoration: 'none',
                  '&:hover': { color: '#ff6b35' },
                }}
              >
                <Typography variant="body2">info@eminanceadvice.com</Typography>
              </Link>
            </Box>

            {/* Since 2009 */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <AccessTime sx={{ fontSize: 18, mr: 1, color: '#ff6b35' }} />
              <Typography variant="body2" sx={{ color: '#999' }}>
                Since 2009
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, bgcolor: '#333' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            © {currentYear} Eminance Advice. All rights reserved. | Established Since 2009 
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}