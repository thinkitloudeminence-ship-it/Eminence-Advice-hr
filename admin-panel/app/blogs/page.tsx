'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Box, Typography, Paper, Button, TextField, Grid, Alert,
  CircularProgress, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Divider, Card, CardContent, Stack, Tab, Tabs,
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  Tooltip
} from '@mui/material'
import {
  Save, Delete, Image as ImageIcon, Public, Edit, Add,
  Visibility, Close, CloudUpload, Refresh, Article
} from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ✅ MDEditor - react-quill ki jagah (Next.js 14+ compatible)
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://eminence-advice-hr.onrender.com/api'  || 'https://eminence-advice-hr.onrender.com/api' 

const categories = [
  'Career Guidance', 'Interview Tips', 'Resume Building', 'HR Insights',
  'Placement Guidance', 'Freelancing Tips', 'AI Tools Awareness', 'Workplace Skills'
]

const emptyForm = {
  title: '',
  slug: '',
  category: 'Career Guidance',
  content: '',
  excerpt: '',
  status: 'draft',
  tags: ''
}

const emptySeo = {
  metaTitle: '',
  metaDescription: '',
  keywords: '',
  canonicalUrl: ''
}

export default function AdminBlogsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [seoData, setSeoData] = useState(emptySeo)
  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null)
  const [previewBlog, setPreviewBlog] = useState<any>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const queryClient = useQueryClient()

  // Fetch all blogs
  const { data: blogs, isLoading, refetch } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found')
      const res = await axios.get(`${API_URL}/blogs/admin/list`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data.data
    }
  })

  // Reset form
  const resetForm = () => {
    setFormData(emptyForm)
    setSeoData(emptySeo)
    setFaqs([])
    setSelectedImage(null)
    setImagePreview('')
    setSelectedBlogId(null)
    setIsEditing(false)
    setError('')
  }

  // Prepare FormData for API
  const prepareFormData = () => {
    const fd = new FormData()
    fd.append('title', formData.title)
    fd.append('category', formData.category)
    fd.append('content', formData.content)
    fd.append('excerpt', formData.excerpt)
    fd.append('status', formData.status)
    fd.append('tags', formData.tags)
    fd.append('seo', JSON.stringify(seoData))
    fd.append('faqs', JSON.stringify(faqs))
    if (selectedImage) fd.append('featuredImage', selectedImage)
    return fd
  }

  // Create blog mutation
  const createMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      return axios.post(`${API_URL}/blogs`, prepareFormData(), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      resetForm()
      setSuccess('Blog created successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setActiveTab(0)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create blog')
      setTimeout(() => setError(''), 3000)
    }
  })

  // Update blog mutation
  const updateMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      return axios.put(`${API_URL}/blogs/${selectedBlogId}`, prepareFormData(), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      resetForm()
      setSuccess('Blog updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setActiveTab(0)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to update blog')
      setTimeout(() => setError(''), 3000)
    }
  })

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token')
      return axios.delete(`${API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      setSuccess('Blog deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setDeleteDialogOpen(false)
      setBlogToDelete(null)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to delete blog')
      setTimeout(() => setError(''), 3000)
    }
  })

  // Handle edit blog
  const handleEdit = (blog: any) => {
    setSelectedBlogId(blog._id)
    setFormData({
      title: blog.title,
      slug: blog.slug || '',
      category: blog.category,
      content: blog.content,
      excerpt: blog.excerpt,
      status: blog.status,
      tags: blog.tags?.join(', ') || ''
    })
    setSeoData({
      metaTitle: blog.seo?.metaTitle || '',
      metaDescription: blog.seo?.metaDescription || '',
      keywords: blog.seo?.keywords?.join(', ') || '',
      canonicalUrl: blog.seo?.canonicalUrl || ''
    })
    setFaqs(blog.faqs || [])
    setImagePreview(blog.featuredImage?.url || '')
    setIsEditing(true)
    setActiveTab(1)
  }

  // Handle delete click
  const handleDeleteClick = (id: string) => {
    setBlogToDelete(id)
    setDeleteDialogOpen(true)
  }

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (blogToDelete) {
      deleteMutation.mutate(blogToDelete)
    }
  }

  // Handle submit
  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      setError('Please fill all required fields')
      setTimeout(() => setError(''), 3000)
      return
    }
    isEditing ? updateMutation.mutate() : createMutation.mutate()
  }

  // Generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setFormData({ ...formData, slug })
  }

  // Add FAQ
  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }])
  }

  // Update FAQ
  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  // Remove FAQ
  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index))
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success'
      case 'draft': return 'warning'
      case 'archived': return 'error'
      default: return 'default'
    }
  }

  // Preview blog
  const handlePreview = (blog: any) => {
    setPreviewBlog(blog)
    setPreviewOpen(true)
  }

  if (isLoading && activeTab === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
            Blog Management
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Create, edit, and manage your blog posts
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => { resetForm(); setActiveTab(1) }}
          sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}
        >
          Write New Blog
        </Button>
      </Box>

      {/* Messages */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      {/* Main Content */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
            pt: 1,
            '& .MuiTab-root.Mui-selected': { color: '#ff6b35' },
            '& .MuiTabs-indicator': { bgcolor: '#ff6b35' }
          }}
        >
          <Tab label="All Blogs" icon={<Article />} iconPosition="start" />
          <Tab label={isEditing ? 'Edit Blog' : 'Write New Blog'} icon={<Edit />} iconPosition="start" />
        </Tabs>

        {/* ==================== ALL BLOGS TAB ==================== */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            {/* Stats Cards */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#fff5f0', borderLeft: '4px solid #ff6b35' }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff6b35' }}>
                      {blogs?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">Total Blogs</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#e8f5e9', borderLeft: '4px solid #4caf50' }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#4caf50' }}>
                      {blogs?.filter((b: any) => b.status === 'published').length || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">Published</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ bgcolor: '#fff3e0', borderLeft: '4px solid #ff9800' }}>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#ff9800' }}>
                      {blogs?.filter((b: any) => b.status === 'draft').length || 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">Drafts</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Refresh Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Tooltip title="Refresh">
                <IconButton onClick={() => refetch()} sx={{ color: '#ff6b35' }}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Blogs List */}
            {blogs?.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Article sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="textSecondary">
                  No blogs found
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => { resetForm(); setActiveTab(1) }}
                  sx={{ mt: 2, bgcolor: '#ff6b35' }}
                >
                  Create Your First Blog
                </Button>
              </Box>
            ) : (
              <Grid container spacing={2}>
                {blogs?.map((blog: any) => (
                  <Grid item xs={12} key={blog._id}>
                    <Card sx={{ '&:hover': { boxShadow: 3 }, transition: 'box-shadow 0.3s' }}>
                      <CardContent>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                          {/* Thumbnail */}
                          <Box
                            sx={{
                              width: { xs: '100%', sm: 100 },
                              height: 80,
                              flexShrink: 0,
                              bgcolor: '#f5f5f5',
                              borderRadius: 2,
                              overflow: 'hidden'
                            }}
                          >
                            {blog.featuredImage?.url ? (
                              <img
                                src={blog.featuredImage.url}
                                alt={blog.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            ) : (
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                <ImageIcon sx={{ color: '#ccc' }} />
                              </Box>
                            )}
                          </Box>

                          {/* Blog Info */}
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {blog.title}
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                              <Chip label={blog.category} size="small" sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }} />
                              <Chip label={blog.status} size="small" color={getStatusColor(blog.status)} />
                              <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </Typography>
                              <Typography variant="caption" color="textSecondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                👁 {blog.views || 0}
                              </Typography>
                              {blog.faqs?.length > 0 && (
                                <Chip label={`${blog.faqs.length} FAQs`} size="small" variant="outlined" sx={{ color: '#ff6b35', borderColor: '#ff6b35' }} />
                              )}
                            </Stack>
                          </Box>

                          {/* Actions */}
                          <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
                            <Tooltip title="Preview">
                              <IconButton onClick={() => handlePreview(blog)} size="small" sx={{ color: '#666' }}>
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton onClick={() => handleEdit(blog)} size="small" sx={{ color: '#ff6b35' }}>
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton onClick={() => handleDeleteClick(blog._id)} size="small" color="error">
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* ==================== WRITE/EDIT BLOG TAB ==================== */}
        {activeTab === 1 && (
          <Box sx={{ p: 3, maxHeight: '80vh', overflow: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff6b35', mb: 3 }}>
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </Typography>

            {/* Basic Information */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Basic Information</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Blog Title *"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  helperText="This will be displayed as the main heading"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  helperText="URL-friendly version of the title"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Generate from title">
                          <IconButton onClick={generateSlug} size="small">
                            <Public />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c} value={c}>{c}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    label="Status"
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <MenuItem value="draft">📝 Draft - Save as draft</MenuItem>
                    <MenuItem value="published">🚀 Published - Make it live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, JavaScript, Career Tips (comma separated)"
                  helperText="Separate tags with commas"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Excerpt *"
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  helperText="Short summary (max 500 characters) - This appears in blog listings"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Featured Image</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUpload />}
                    sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}
                  >
                    Upload Image
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setSelectedImage(e.target.files[0])
                          setImagePreview(URL.createObjectURL(e.target.files[0]))
                        }
                      }}
                    />
                  </Button>
                  {imagePreview && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img
                        src={imagePreview}
                        alt="preview"
                        style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => {
                          setSelectedImage(null)
                          setImagePreview('')
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                  <Typography variant="caption" color="textSecondary">
                    Recommended size: 1200x630px
                  </Typography>
                </Box>
              </Grid>

              {/* ✅ MDEditor - Working perfectly with Next.js 14 */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Content *</Typography>
                <div data-color-mode="light">
                  <MDEditor
                    value={formData.content}
                    onChange={(v) => setFormData({ ...formData, content: v || '' })}
                    height={500}
                    preview="edit"
                    style={{ borderRadius: 8 }}
                  />
                </div>
              </Grid>
            </Grid>

            {/* SEO Settings */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 6 }}>SEO Settings</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meta Title"
                  value={seoData.metaTitle}
                  onChange={(e) => setSeoData({ ...seoData, metaTitle: e.target.value })}
                  helperText="60 characters recommended"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Generate from title">
                          <IconButton
                            size="small"
                            onClick={() => setSeoData({ ...seoData, metaTitle: formData.title + ' | Eminance Advice' })}
                          >
                            <Save />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Meta Description"
                  value={seoData.metaDescription}
                  onChange={(e) => setSeoData({ ...seoData, metaDescription: e.target.value })}
                  helperText="160 characters recommended"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Meta Keywords"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  placeholder="career, job, placement, training (comma separated)"
                  helperText="Separate keywords with commas"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Canonical URL"
                  value={seoData.canonicalUrl}
                  onChange={(e) => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                  placeholder="https://eminenceadvice.com/blogs/your-blog-slug"
                  helperText="Leave empty to auto-generate"
                />
              </Grid>
            </Grid>

            {/* FAQ Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 6 }}>
              FAQ Section
              <Chip label={`${faqs.length} FAQs`} size="small" sx={{ ml: 1, bgcolor: '#fff5f0', color: '#ff6b35' }} />
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {faqs.map((faq, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{ p: 2.5, mb: 2, borderRadius: 2, borderColor: '#f0f0f0' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#ff6b35' }}>
                    FAQ #{index + 1}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeFaq(index)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Question *"
                  value={faq.question}
                  onChange={(e) => updateFaq(index, 'question', e.target.value)}
                  placeholder="e.g. What is the best way to prepare for an interview?"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Answer *"
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                  placeholder="Write a clear and helpful answer..."
                />
              </Paper>
            ))}

            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addFaq}
              sx={{ borderColor: '#ff6b35', color: '#ff6b35', borderStyle: 'dashed', mb: 2 }}
            >
              Add FAQ
            </Button>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button onClick={() => { resetForm(); setActiveTab(0) }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={createMutation.isPending || updateMutation.isPending ? <CircularProgress size={20} /> : <Save />}
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2, px: 4 }}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? 'Saving...'
                  : isEditing
                    ? 'Update Blog'
                    : 'Publish Blog'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this blog? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Blog Preview</Typography>
            <IconButton onClick={() => setPreviewOpen(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {previewBlog && (
            <Box>
              {previewBlog.featuredImage?.url && (
                <img
                  src={previewBlog.featuredImage.url}
                  alt={previewBlog.title}
                  style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
                />
              )}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                {previewBlog.title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={previewBlog.category} size="small" sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }} />
                <Chip label={previewBlog.status} size="small" color={getStatusColor(previewBlog.status)} />
              </Stack>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {previewBlog.excerpt}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <div dangerouslySetInnerHTML={{ __html: previewBlog.content }} />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}