'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Image
            src="/Eminenceadvicelogo.png"
            alt="Eminance Advice Logo"
            width={50}
            height={50}
            style={{ borderRadius: '8px', objectFit: 'contain' }}
          />
        </Box>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            href={item.path}
            sx={{
              textAlign: 'center',
              color: pathname === item.path ? '#ff6b35' : '#333',
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          component={Link}
          href="/jobs"
          sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}
        >
          Apply Now
        </Button>
      </Box>
    </Box>
  )

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          backgroundColor: 'white',
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : '0 1px 0 rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 2 }}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Image
                  src="/Eminenceadvicelogo.png"
                  alt="Eminance Advice Logo"
                  width={100}
                  height={60}
                  style={{ borderRadius: '10px', objectFit: 'contain' }}
                  priority
                />
              </Link>
            </motion.div>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Button
                      component={Link}
                      href={item.path}
                      sx={{
                        color: pathname === item.path ? '#ff6b35' : '#333',
                        fontWeight: pathname === item.path ? 600 : 400,
                        fontSize: '0.95rem',
                        '&:hover': {
                          color: '#ff6b35',
                          backgroundColor: 'transparent',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#ff6b35',
                    '&:hover': { bgcolor: '#e55a2b' },
                    textTransform: 'none',
                    px: 3,
                    py: 0.75,
                    fontSize: '0.9rem',
                  }}
                  component={Link}
                  href="/jobs"
                >
                  Apply Now
                </Button>
              </Box>
            )}

            {isMobile && (
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#ff6b35' }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}