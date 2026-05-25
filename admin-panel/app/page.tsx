'use client'

import { Card, CardContent, Typography, Box, Grid } from '@mui/material'
import { Work, People, Article, ContactMail } from '@mui/icons-material'

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Jobs', value: 0, icon: Work, color: '#1976d2' },
    { title: 'Applications', value: 0, icon: People, color: '#2e7d32' },
    { title: 'Blogs', value: 0, icon: Article, color: '#ed6c02' },
    { title: 'Contact Leads', value: 0, icon: ContactMail, color: '#9c27b0' },
  ]

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: `${stat.color}20`,
                      borderRadius: '50%',
                      p: 1,
                      display: 'flex',
                    }}
                  >
                    <stat.icon sx={{ color: stat.color }} />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Welcome to Admin Panel
          </Typography>
          <Typography color="textSecondary">
            Select an option from the sidebar to manage your website.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}