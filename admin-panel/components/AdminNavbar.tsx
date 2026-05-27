'use client'

import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Notifications,
  Logout,
  Person,
  Settings,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface AdminNavbarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AdminNavbar({ open, setOpen }: AdminNavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handleProfile = () => {
    handleClose()
    // router.push('/profile')
  }

  const handleSettings = () => {
    handleClose()
    // router.push('/settings')
  }

  return (
    <AppBar position="absolute" sx={{ zIndex: 1201, ml: open ? 240 : 7, bgcolor: 'white', boxShadow: '0 1px 10px rgba(0,0,0,0.05)' }}>
      <Toolbar>
        <IconButton
          onClick={() => setOpen(!open)}
          edge="start"
          sx={{ mr: 2, color: '#ff6b35' }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#1a1a1a', fontWeight: 600 }}>
          Admin Dashboard
        </Typography>

        <IconButton sx={{ color: '#ff6b35' }}>
          <Badge badgeContent={0} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton onClick={handleMenu} sx={{ ml: 1 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: '#ff6b35' }}>
            A
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleProfile}>
            <Person sx={{ mr: 1, fontSize: 20 }} /> Profile
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <Settings sx={{ mr: 1, fontSize: 20 }} /> Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Logout sx={{ mr: 1, fontSize: 20, color: '#ff6b35' }} /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}