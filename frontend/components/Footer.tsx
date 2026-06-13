'use client'

import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
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
import Link from 'next/link'

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
  QuickLinks: [
    { label: 'Apply for Jobs', href: '/jobs' },
    { label: 'Get in Touch', href: '/contact' },
    { label: 'Latest Blogs', href: '/blogs' },
  ],
}

const socialLinks = [
  { icon: Facebook, name: 'Facebook', url: 'https://www.facebook.com/eminenceadvice/', bgcolor: '#1877f2' },
  { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/eminenceadvice/', bgcolor: '#e4405f' },
  { icon: LinkedIn, name: 'LinkedIn', url: 'https://www.linkedin.com/company/eminence-advice-hr-services', bgcolor: '#0077b5' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const openGoogleMap = () => {
    window.open('https://www.google.com/maps?q=near+Hotel+Amrit,+Chhoti+Gwaltoli,+Indore,+Madhya+Pradesh+452001', '_blank')
  }

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#ffffff',
        color: '#1a1a1a',
        pt: { xs: 5, sm: 6, md: 7 },
        pb: { xs: 3, sm: 4 },
        mt: 'auto',
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <Container maxWidth="xl">
        {/* Main Footer Row */}
        <Grid container spacing={{ xs: 3, sm: 4, md: 3 }}>
          {/* Logo Column - OPTIMIZED SIZE */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left', md: 'center' } }}>
              <Link href="/">
                <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                  <Image
                    src="/Eminenceadvicelogo.png"
                    alt="Eminance Advice Logo"
                    width={140}
                    height={45}
                    style={{
                      width: '140px',
                      height: '45px',
                      objectFit: 'contain',
                      cursor: 'pointer',
                    }}
                    priority
                  />
                </Box>
              </Link>
            </Box>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '0.85rem' }}>
              Company
            </Typography>
            <Stack spacing={1}>
              {footerLinks.Company.map((link) => (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <MuiLink
                    sx={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      display: 'inline-block',
                      '&:hover': { color: '#ff6b35', transform: 'translateX(3px)' },
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </MuiLink>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Services Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '0.85rem' }}>
              Services
            </Typography>
            <Stack spacing={1}>
              {footerLinks.Services.map((link) => (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <MuiLink
                    sx={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      display: 'inline-block',
                      '&:hover': { color: '#ff6b35', transform: 'translateX(3px)' },
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </MuiLink>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Resources Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '0.85rem' }}>
              Resources
            </Typography>
            <Stack spacing={1}>
              {footerLinks.Resources.map((link) => (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <MuiLink
                    sx={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      display: 'inline-block',
                      '&:hover': { color: '#ff6b35', transform: 'translateX(3px)' },
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </MuiLink>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '0.85rem' }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {footerLinks.QuickLinks.map((link) => (
                <Link key={link.label} href={link.href} passHref legacyBehavior>
                  <MuiLink
                    sx={{
                      color: '#6b7280',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      display: 'inline-block',
                      '&:hover': { color: '#ff6b35', transform: 'translateX(3px)' },
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                    }}
                  >
                    {link.label}
                  </MuiLink>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact + Social */}
          <Grid item xs={12} sm={6} md={2}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left', md: 'center' } }}>
              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '0.85rem' }}>
                Contact
              </Typography>
              <Stack spacing={1.2} alignItems={{ xs: 'center', md: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, cursor: 'pointer' }} onClick={openGoogleMap}>
                  <LocationOn sx={{ fontSize: 14, color: '#ff6b35' }} />
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.65rem', lineHeight: 1.3 }}>
                    Near Hotel Amrit, Indore
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Phone sx={{ fontSize: 14, color: '#ff6b35' }} />
                  <Link href="tel:9826667279" passHref legacyBehavior>
                    <MuiLink sx={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.65rem', '&:hover': { color: '#ff6b35' } }}>
                      98266 67279
                    </MuiLink>
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Email sx={{ fontSize: 14, color: '#ff6b35' }} />
                  <Link href="mailto:info@eminanceadvice.com" passHref legacyBehavior>
                    <MuiLink sx={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.65rem', '&:hover': { color: '#ff6b35' } }}>
                      info@eminanceadvice.com
                    </MuiLink>
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <AccessTime sx={{ fontSize: 14, color: '#ff6b35' }} />
                  <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.65rem' }}>Since 2009</Typography>
                </Box>
              </Stack>

              {/* Social Links */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', color: '#ff6b35', mb: 2, fontSize: '0.85rem' }}>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={1.5} justifyContent={{ xs: 'center', md: 'center' }}>
                  {socialLinks.map((social, index) => (
                    <IconButton
                      key={index}
                      component={Link}
                      href={social.url}
                      target="_blank"
                      sx={{
                        bgcolor: social.bgcolor,
                        color: 'white',
                        width: 32,
                        height: 32,
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <social.icon sx={{ fontSize: 16 }} />
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Divider */}
        <Divider sx={{ my: { xs: 3, sm: 4 }, borderColor: '#e5e7eb' }} />

        {/* Copyright Row */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#9ca3af', fontSize: '0.7rem' }}>
            © {currentYear} Eminance Advice. All rights reserved. | Established Since 2009
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}