'use client'

import { useState } from 'react'
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton,
  Select, MenuItem, CircularProgress, Button, Dialog,
  DialogTitle, DialogContent, DialogActions, Grid, Divider,
  Avatar,
} from '@mui/material'
import {
  Visibility, Close, Email, Phone,
  LocationOn, Work, School,
} from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const statusColors: Record<string, 'warning' | 'success' | 'error' | 'info' | 'default'> = {
  pending:     'warning',
  shortlisted: 'success',
  rejected:    'error',
  selected:    'info',
}

// Token helper
const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('token') || '' : ''

export default function ApplicationsManagement() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedApp, setSelectedApp]   = useState<any>(null)
  const [detailOpen, setDetailOpen]     = useState(false)
  const queryClient = useQueryClient()

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', statusFilter],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/applications`, {
        params: statusFilter !== 'all' ? { status: statusFilter } : {},
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      return res.data.data
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) =>
      axios.put(`${API_URL}/applications/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['applications'] }),
  })

  const openDetail = (app: any) => { setSelectedApp(app); setDetailOpen(true) }

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress sx={{ color: '#ff6b35' }} />
    </Box>
  )

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
            Applications Management
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
            {applications?.length || 0} total applications
          </Typography>
        </Box>
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          size="small" sx={{ minWidth: 160 }}>
          <MenuItem value="all">All Applications</MenuItem>
          <MenuItem value="pending">⏳ Pending</MenuItem>
          <MenuItem value="shortlisted">✅ Shortlisted</MenuItem>
          <MenuItem value="selected">🎉 Selected</MenuItem>
          <MenuItem value="rejected">❌ Rejected</MenuItem>
        </Select>
      </Box>

      {/* Table - NO DOWNLOAD BUTTON */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#fff5f0' }}>
              {['Applicant', 'Job', 'Experience', 'Location', 'Status', 'Applied', 'Actions'].map(h => (
                <TableCell key={h} sx={{ fontWeight: 700, color: '#1a1a1a' }}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 6, color: '#999' }}>
                  No applications found
                </TableCell>
              </TableRow>
            )}
            {applications?.map((app: any) => (
              <TableRow key={app._id} hover>
                <TableCell>
                  <Typography variant="body2" fontWeight={600}>{app.fullName}</Typography>
                  <Typography variant="caption" color="textSecondary">{app.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{app.job?.title || 'N/A'}</Typography>
                  <Typography variant="caption" color="textSecondary">{app.job?.company || ''}</Typography>
                </TableCell>
                <TableCell>
                  <Chip label={app.experienceType} size="small" sx={{
                    bgcolor: app.experienceType === 'fresher' ? '#e8f5e9' : '#e3f2fd',
                    color:   app.experienceType === 'fresher' ? '#2e7d32' : '#1565c0',
                    textTransform: 'capitalize',
                  }} />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{app.currentLocation || '—'}</Typography>
                </TableCell>
                <TableCell>
                  <Select value={app.status} size="small" sx={{ minWidth: 130 }}
                    onChange={e => updateStatusMutation.mutate({ id: app._id, status: e.target.value })}>
                    <MenuItem value="pending">⏳ Pending</MenuItem>
                    <MenuItem value="shortlisted">✅ Shortlisted</MenuItem>
                    <MenuItem value="selected">🎉 Selected</MenuItem>
                    <MenuItem value="rejected">❌ Rejected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {new Date(app.appliedAt || app.createdAt).toLocaleDateString('en-IN')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => openDetail(app)} title="View Details"
                    sx={{ color: '#ff6b35', '&:hover': { bgcolor: '#fff5f0' } }}>
                    <Visibility fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Detail Modal - NO RESUME SECTION */}
      <Dialog open={detailOpen} onClose={() => setDetailOpen(false)}
        maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedApp && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: '#ff6b35', width: 48, height: 48, fontSize: '1.2rem' }}>
                  {selectedApp.fullName?.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{selectedApp.fullName}</Typography>
                  <Chip label={selectedApp.status} size="small"
                    color={statusColors[selectedApp.status] || 'default'}
                    sx={{ textTransform: 'capitalize', mt: 0.5 }} />
                </Box>
              </Box>
              <IconButton onClick={() => setDetailOpen(false)}><Close /></IconButton>
            </DialogTitle>

            <DialogContent dividers>
              <Grid container spacing={3}>

                {/* Contact Information */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={700} color="#ff6b35" gutterBottom>
                    Contact Information
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" sx={{ color: '#ff6b35' }} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">Email</Typography>
                          <Typography variant="body2">{selectedApp.email}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone fontSize="small" sx={{ color: '#ff6b35' }} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">Phone</Typography>
                          <Typography variant="body2">{selectedApp.phone}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    {selectedApp.currentLocation && (
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn fontSize="small" sx={{ color: '#ff6b35' }} />
                          <Box>
                            <Typography variant="caption" color="textSecondary">Location</Typography>
                            <Typography variant="body2">{selectedApp.currentLocation}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                {/* Job & Experience */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={700} color="#ff6b35" gutterBottom>
                    Job & Experience
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Work fontSize="small" sx={{ color: '#ff6b35' }} />
                        <Box>
                          <Typography variant="caption" color="textSecondary">Applied For</Typography>
                          <Typography variant="body2">{selectedApp.job?.title || 'N/A'}</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" color="textSecondary">Experience Type</Typography>
                      <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                        {selectedApp.experienceType}
                      </Typography>
                    </Grid>
                    {selectedApp.experienceType === 'experienced' && selectedApp.experienceDetails && (
                      <>
                        {selectedApp.experienceDetails.currentCompany && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="textSecondary">Current Company</Typography>
                            <Typography variant="body2">{selectedApp.experienceDetails.currentCompany}</Typography>
                          </Grid>
                        )}
                        {selectedApp.experienceDetails.currentRole && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="textSecondary">Current Role</Typography>
                            <Typography variant="body2">{selectedApp.experienceDetails.currentRole}</Typography>
                          </Grid>
                        )}
                        {(selectedApp.experienceDetails.years || selectedApp.experienceDetails.months) && (
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="textSecondary">Experience</Typography>
                            <Typography variant="body2">
                              {selectedApp.experienceDetails.years || 0}y {selectedApp.experienceDetails.months || 0}m
                            </Typography>
                          </Grid>
                        )}
                      </>
                    )}
                    {selectedApp.preferredJobRole && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="textSecondary">Preferred Role</Typography>
                        <Typography variant="body2">{selectedApp.preferredJobRole}</Typography>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={12}><Divider /></Grid>

                {/* Education */}
                {selectedApp.qualification && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={700} color="#ff6b35" gutterBottom>
                      Education
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedApp.qualification.degree && (
                        <Grid item xs={12} sm={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <School fontSize="small" sx={{ color: '#ff6b35' }} />
                            <Box>
                              <Typography variant="caption" color="textSecondary">Degree</Typography>
                              <Typography variant="body2">{selectedApp.qualification.degree}</Typography>
                            </Box>
                          </Box>
                        </Grid>
                      )}
                      {selectedApp.qualification.institution && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" color="textSecondary">Institution</Typography>
                          <Typography variant="body2">{selectedApp.qualification.institution}</Typography>
                        </Grid>
                      )}
                      {selectedApp.qualification.yearOfPassing && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" color="textSecondary">Year of Passing</Typography>
                          <Typography variant="body2">{selectedApp.qualification.yearOfPassing}</Typography>
                        </Grid>
                      )}
                      {selectedApp.qualification.percentage && (
                        <Grid item xs={12} sm={6}>
                          <Typography variant="caption" color="textSecondary">Percentage / CGPA</Typography>
                          <Typography variant="body2">{selectedApp.qualification.percentage}%</Typography>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                )}

                {/* Skills */}
                {selectedApp.skills?.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={700} color="#ff6b35" gutterBottom>
                      Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {selectedApp.skills.map((s: string) => (
                        <Chip key={s} label={s} size="small" variant="outlined"
                          sx={{ borderColor: '#ff6b35', color: '#ff6b35' }} />
                      ))}
                    </Box>
                  </Grid>
                )}

                {/* Message */}
                {selectedApp.message && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={700} color="#ff6b35" gutterBottom>
                      Cover Message
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#fafafa' }}>
                      <Typography variant="body2" sx={{ lineHeight: 1.8 }}>{selectedApp.message}</Typography>
                    </Paper>
                  </Grid>
                )}

                {/* Links */}
                {(selectedApp.linkedinProfile || selectedApp.portfolioUrl) && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" fontWeight={700} color="#ff6b35" gutterBottom>
                      Links
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {selectedApp.linkedinProfile && (
                        <Button size="small" variant="outlined" href={selectedApp.linkedinProfile}
                          target="_blank" sx={{ borderColor: '#0077b5', color: '#0077b5' }}>
                          LinkedIn Profile
                        </Button>
                      )}
                      {selectedApp.portfolioUrl && (
                        <Button size="small" variant="outlined" href={selectedApp.portfolioUrl}
                          target="_blank" sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}>
                          Portfolio
                        </Button>
                      )}
                    </Box>
                  </Grid>
                )}

                {/* Applied Date */}
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">
                    Applied on: {new Date(selectedApp.appliedAt || selectedApp.createdAt).toLocaleString('en-IN')}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Select value={selectedApp.status} size="small" sx={{ minWidth: 140 }}
                onChange={e => {
                  updateStatusMutation.mutate({ id: selectedApp._id, status: e.target.value })
                  setSelectedApp({ ...selectedApp, status: e.target.value })
                }}>
                <MenuItem value="pending">⏳ Pending</MenuItem>
                <MenuItem value="shortlisted">✅ Shortlisted</MenuItem>
                <MenuItem value="selected">🎉 Selected</MenuItem>
                <MenuItem value="rejected">❌ Rejected</MenuItem>
              </Select>

              <Button variant="contained" onClick={() => setDetailOpen(false)}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  )
}