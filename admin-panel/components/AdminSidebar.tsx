'use client'

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  IconButton,
} from '@mui/material'
import {
  Dashboard,
  Work,
  Article,
  People,
  ContactMail,
  Settings,
  Analytics,
  Description,
  RateReview,
  ChevronLeft,
} from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { title: 'Dashboard', path: '/', icon: Dashboard },
  { title: 'Jobs', path: '/jobs', icon: Work },
  { title: 'Applications', path: '/applications', icon: Description },
  { title: 'Blogs', path: '/blogs', icon: Article },
  { title: 'Leads', path: '/leads', icon: ContactMail },
  { title: 'Users', path: '/users', icon: People },
  { title: 'Analytics', path: '/analytics', icon: Analytics },
  { title: 'Reviews', path: '/reviews', icon: RateReview },
  { title: 'Settings', path: '/settings', icon: Settings },
]

interface AdminSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname()
  const drawerWidth = 240

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 73,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 73,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
          overflowX: 'hidden',
          position: 'relative',
          whiteSpace: 'nowrap',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            component={Link}
            href={item.path}
            disablePadding
            sx={{
              display: 'block',
            }}
          >
            <ListItemButton
              selected={pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <item.icon />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}