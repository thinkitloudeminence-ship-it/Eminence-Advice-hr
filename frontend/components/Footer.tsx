'use client'

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
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
        bgcolor: '#111827', // Dark background - same as navbar's dark mode
        color: '#f3f4f6',
        pt: 6,
        pb: 4,
        mt: 'auto',
        borderTop: '1px solid #374151',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Column 1 - Logo & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Image
                src="/Eminenceadvicelogo.png"
                alt="Eminance Advice Logo"
                width={190}
                height={70}
                style={{
                  width: '190px',
                  height: '70px',
                  objectFit: 'contain',
                }}
              />

            </Box>
            <Typography variant="body2" sx={{ color: '#9ca3af', lineHeight: 1.7, mb: 3, fontSize: '0.875rem' }}>
              Transforming careers and workforce with expert guidance, training,
              and placement assistance. Your trusted partner in professional growth.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: '#9ca3af', '&:hover': { color: '#ff6b35' } }}>
                <Facebook sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton sx={{ color: '#9ca3af', '&:hover': { color: '#ff6b35' } }}>
                <Twitter sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton sx={{ color: '#9ca3af', '&:hover': { color: '#ff6b35' } }}>
                <LinkedIn sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton sx={{ color: '#9ca3af', '&:hover': { color: '#ff6b35' } }}>
                <Instagram sx={{ fontSize: 20 }} />
              </IconButton>
            </Stack>
          </Grid>

          {/* Column 2 - Company Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '1rem' }}>
              Company
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.Company.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    '&:hover': { color: '#ff6b35' },
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 3 - Services Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '1rem' }}>
              Services
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.Services.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    '&:hover': { color: '#ff6b35' },
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 4 - Resources Links */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '1rem' }}>
              Resources
            </Typography>
            <Stack spacing={1.5}>
              {footerLinks.Resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    '&:hover': { color: '#ff6b35' },
                    transition: 'color 0.3s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Column 5 - Contact Info */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '1rem' }}>
              Contact
            </Typography>
            <Stack spacing={2}>
              <Box
                sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, cursor: 'pointer' }}
                onClick={openGoogleMap}
              >
                <LocationOn sx={{ fontSize: 16, color: '#9ca3af', mt: 0.2, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.8rem', lineHeight: 1.4, '&:hover': { color: '#ff6b35' } }}>
                  Near Hotel Amrit, Chhoti Gwaltoli, Indore, MP 452001
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }} />
                <Link
                  href="tel:9826667279"
                  sx={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': { color: '#ff6b35' },
                  }}
                >
                  98266 67279
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }} />
                <Link
                  href="mailto:info@eminanceadvice.com"
                  sx={{
                    color: '#9ca3af',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    '&:hover': { color: '#ff6b35' },
                  }}
                >
                  info@eminanceadvice.com
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime sx={{ fontSize: 16, color: '#9ca3af', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.8rem' }}>
                  Since 2009
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#374151' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.75rem' }}>
            © {currentYear} Eminance Advice. All rights reserved. | Established Since 2009
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}