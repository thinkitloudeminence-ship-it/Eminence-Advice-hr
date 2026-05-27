'use client'

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  IconButton,
} from '@mui/material'
import { Dashboard, Work, Article, ContactMail, ChevronLeft } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { title: 'Dashboard', path: '/', icon: Dashboard },
  { title: 'Jobs', path: '/jobs', icon: Work },
  { title: 'Applications', path: '/applications', icon: Work },
  { title: 'Blogs', path: '/blogs', icon: Article },
  { title: 'Leads', path: '/leads', icon: ContactMail },
]

export default function AdminSidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const pathname = usePathname()

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 73,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 73,
          transition: 'width 0.3s',
          overflowX: 'hidden',
          bgcolor: '#ffffff',
          borderRight: '1px solid #f0f0f0',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            component={Link}
            href={item.path}
            selected={pathname === item.path}
            sx={{
              justifyContent: open ? 'initial' : 'center',
              px: open ? 2 : 1.5,
              '&.Mui-selected': { bgcolor: '#fff5f0', '& .MuiListItemIcon-root': { color: '#ff6b35' } },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}>
              <item.icon />
            </ListItemIcon>
            {open && <ListItemText primary={item.title} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}