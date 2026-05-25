'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ width: 260, p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ textAlign: 'center', my: 2 }}>
        <Image
          src="/Eminenceadvicelogo.png"
          alt="Logo"
          width={130}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            href={item.path}
            onClick={handleDrawerToggle}
            sx={{
              textAlign: 'center',
              justifyContent: 'center',
              color: pathname === item.path ? '#ff6b35' : '#333',
              '&:hover': { bgcolor: '#fff5f0', color: '#ff6b35' }
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Button
        fullWidth
        variant="contained"
        component={Link}
        href="/jobs"
        onClick={handleDrawerToggle}
        sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, mt: 2 }}
      >
        Apply Now
      </Button>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? '#ffffff' : '#ffffff',
          boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.05)' : 'none',
          borderBottom: '1px solid #eee',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '64px !important', px: { xs: 1, sm: 2 } }}>
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                src="/Eminenceadvicelogo.png"
                alt="Eminance Advice"
                width={140}
                height={42}
                priority
                style={{ width: 'auto', height: '42px', objectFit: 'contain' }}
              />
            </Link>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  href={item.path}
                  sx={{
                    color: pathname === item.path ? '#ff6b35' : '#444',
                    fontWeight: pathname === item.path ? 600 : 400,
                    fontSize: '0.9rem',
                    px: 1.5,
                    '&:hover': { color: '#ff6b35', bgcolor: 'transparent' }
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="contained"
                component={Link}
                href="/jobs"
                sx={{
                  bgcolor: '#ff6b35',
                  '&:hover': { bgcolor: '#e55a2b' },
                  ml: 1,
                  px: 2.5,
                  py: 0.7,
                  fontSize: '0.85rem',
                  textTransform: 'none',
                  borderRadius: 2
                }}
              >
                Apply Now
              </Button>
            </Box>

            {/* Mobile Menu */}
            <IconButton onClick={handleDrawerToggle} sx={{ display: { xs: 'flex', md: 'none' }, color: '#ff6b35' }}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>

      <Box sx={{ height: '64px' }} />
    </>
  )
}