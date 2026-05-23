'use client'

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
  AccountCircle,
} from '@mui/icons-material'
import { useState } from 'react'
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
    router.push('/login')
  }

  return (
    <AppBar position="static" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => setOpen(!open)}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>

        <IconButton color="inherit">
          <Badge badgeContent={4} color="error">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton onClick={handleMenu} color="inherit">
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
            A
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}