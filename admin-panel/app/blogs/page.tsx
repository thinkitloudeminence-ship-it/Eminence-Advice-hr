'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Box, Typography, Paper, Button, TextField, Grid, Alert,
  CircularProgress, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Divider, Card, CardContent, Stack, Tab, Tabs,
  InputAdornment,
} from '@mui/material'
import { Save, Delete, Image as ImageIcon, Public, Edit, Add } from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ✅ MDEditor — react-quill nahi
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const categories = [
  'Career Guidance', 'Interview Tips', 'Resume Building', 'HR Insights',
  'Placement Guidance', 'Freelancing Tips', 'AI Tools Awareness', 'Workplace Skills',
]

const emptyForm = {
  title: '', slug: '', category: 'Career Guidance',
  content: '', excerpt: '', status: 'draft', tags: '',
}

const emptySeo = {
  metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '',
}

export default function BlogsManagement() {
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

  const queryClient = useQueryClient()

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      const res = await axios.get(`${API_URL}/blogs/admin/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return res.data.data
    },
  })

  const resetForm = () => {
    setFormData(emptyForm)
    setSeoData(emptySeo)
    setFaqs([])
    setSelectedImage(null)
    setImagePreview('')
    setSelectedBlogId(null)
    setIsEditing(false)
  }

  const appendFormData = () => {
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

  const createMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      return axios.post(`${API_URL}/blogs`, appendFormData(), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      resetForm()
      setSuccess('Blog published successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setActiveTab(0)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to create blog')
      setTimeout(() => setError(''), 3000)
    },
  })

  const updateMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      return axios.put(`${API_URL}/blogs/${selectedBlogId}`, appendFormData(), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      resetForm()
      setSuccess('Blog updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setActiveTab(0)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to update blog')
      setTimeout(() => setError(''), 3000)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token')
      return axios.delete(`${API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setSuccess('Blog deleted!')
      setTimeout(() => setSuccess(''), 3000)
    },
  })

  const handleEdit = (blog: any) => {
    setSelectedBlogId(blog._id)
    setFormData({
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      content: blog.content,
      excerpt: blog.excerpt,
      status: blog.status,
      tags: blog.tags?.join(', ') || '',
    })
    setSeoData({
      metaTitle: blog.seo?.metaTitle || '',
      metaDescription: blog.seo?.metaDescription || '',
      keywords: blog.seo?.keywords?.join(', ') || '',
      canonicalUrl: blog.seo?.canonicalUrl || '',
    })
    setFaqs(blog.faqs || [])
    setImagePreview(blog.featuredImage?.url || '')
    setIsEditing(true)
    setActiveTab(1)
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      setError('Please fill all required fields')
      setTimeout(() => setError(''), 3000)
      return
    }
    isEditing ? updateMutation.mutate() : createMutation.mutate()
  }

  const generateSlug = () => {
    setFormData({
      ...formData,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    })
  }

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }])

  const updateFaq = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = [...faqs]
    updated[index][field] = value
    setFaqs(updated)
  }

  const removeFaq = (index: number) => setFaqs(faqs.filter((_, i) => i !== index))

  if (isLoading && activeTab === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress sx={{ color: '#ff6b35' }} />
    </Box>
  )

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 3 }}>Blog CMS</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ borderRadius: 2 }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}>
          <Tab label="All Blogs" icon={<Public />} iconPosition="start" />
          <Tab label={isEditing ? 'Edit Blog' : 'Write New Blog'} icon={<Edit />} iconPosition="start" />
        </Tabs>

        {/* ALL BLOGS */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button variant="contained" startIcon={<Add />}
                onClick={() => { resetForm(); setActiveTab(1) }}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}>
                Write New Blog
              </Button>
            </Box>

            <Grid container spacing={2}>
              {blogs?.map((blog: any) => (
                <Grid item xs={12} key={blog._id}>
                  <Card sx={{ '&:hover': { boxShadow: 3 } }}>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ width: 100, height: 70, flexShrink: 0 }}>
                          {blog.featuredImage?.url
                            ? <img src={blog.featuredImage.url} alt={blog.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
                            : <Box sx={{ width: '100%', height: '100%', bgcolor: '#f0f0f0', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ImageIcon sx={{ color: '#ccc' }} />
                              </Box>
                          }
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>{blog.title}</Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                            <Chip label={blog.category} size="small" sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }} />
                            <Chip label={blog.status} size="small" color={blog.status === 'published' ? 'success' : 'default'} />
                            <Typography variant="caption" color="textSecondary">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              👁 {blog.views || 0}
                            </Typography>
                            {blog.faqs?.length > 0 && (
                              <Chip label={`${blog.faqs.length} FAQs`} size="small" variant="outlined"
                                sx={{ color: '#ff6b35', borderColor: '#ff6b35' }} />
                            )}
                          </Stack>
                        </Box>
                        <Box>
                          <Button size="small" variant="outlined" startIcon={<Edit />}
                            onClick={() => handleEdit(blog)}
                            sx={{ mr: 1, borderColor: '#ff6b35', color: '#ff6b35' }}>
                            Edit
                          </Button>
                          <Button size="small" variant="outlined" color="error" startIcon={<Delete />}
                            onClick={() => { if (confirm('Delete this blog?')) deleteMutation.mutate(blog._id) }}>
                            Delete
                          </Button>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* WRITE / EDIT BLOG */}
        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#ff6b35', mb: 3 }}>
              {isEditing ? 'Edit Blog' : 'Write New Blog'}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Basic Information</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField fullWidth label="Blog Title *" value={formData.title} required
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  helperText="This will be displayed as the main heading" />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField fullWidth label="Slug" value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
                  helperText="URL-friendly version of the title"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={generateSlug} size="small"><Public /></IconButton>
                      </InputAdornment>
                    )
                  }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={formData.category} label="Category"
                    onChange={e => setFormData({ ...formData, category: e.target.value })}>
                    {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select value={formData.status} label="Status"
                    onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <MenuItem value="draft">📝 Draft</MenuItem>
                    <MenuItem value="published">🚀 Published</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Tags" value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, JavaScript, Career (comma separated)"
                  helperText="Separate tags with commas" />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth multiline rows={2} label="Excerpt *" required
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  helperText="Short summary shown in blog listings" />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Featured Image</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="outlined" component="label" startIcon={<ImageIcon />}
                    sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}>
                    Upload Image
                    <input type="file" hidden accept="image/*"
                      onChange={e => {
                        if (e.target.files?.[0]) {
                          setSelectedImage(e.target.files[0])
                          setImagePreview(URL.createObjectURL(e.target.files[0]))
                        }
                      }} />
                  </Button>
                  {imagePreview && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img src={imagePreview} alt="preview"
                        style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                      <IconButton size="small"
                        onClick={() => { setSelectedImage(null); setImagePreview('') }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Grid>

              {/* ✅ MDEditor — react-quill ki jagah */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Content *</Typography>
                <div data-color-mode="light">
                  <MDEditor
                    value={formData.content}
                    onChange={(v) => setFormData({ ...formData, content: v || '' })}
                    height={400}
                    preview="edit"
                  />
                </div>
              </Grid>
            </Grid>

            {/* SEO Settings */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 6 }}>SEO Settings</Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Meta Title" value={seoData.metaTitle}
                  onChange={e => setSeoData({ ...seoData, metaTitle: e.target.value })}
                  helperText="60 characters recommended"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small"
                          onClick={() => setSeoData({ ...seoData, metaTitle: formData.title + ' | Eminance Advice' })}>
                          <Save />
                        </IconButton>
                      </InputAdornment>
                    )
                  }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={2} label="Meta Description"
                  value={seoData.metaDescription}
                  onChange={e => setSeoData({ ...seoData, metaDescription: e.target.value })}
                  helperText="160 characters recommended" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Meta Keywords" value={seoData.keywords}
                  onChange={e => setSeoData({ ...seoData, keywords: e.target.value })}
                  placeholder="career, job, placement (comma separated)" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Canonical URL" value={seoData.canonicalUrl}
                  onChange={e => setSeoData({ ...seoData, canonicalUrl: e.target.value })}
                  placeholder="https://eminenceadvice.com/blogs/slug" />
              </Grid>
            </Grid>

            {/* FAQ Section */}
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, mt: 6 }}>
              FAQ Section
              <Chip label={`${faqs.length} FAQs`} size="small"
                sx={{ ml: 1, bgcolor: '#fff5f0', color: '#ff6b35' }} />
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {faqs.map((faq, index) => (
              <Paper key={index} variant="outlined"
                sx={{ p: 2.5, mb: 2, borderRadius: 2, borderColor: '#f0f0f0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#ff6b35' }}>
                    FAQ #{index + 1}
                  </Typography>
                  <IconButton size="small" color="error" onClick={() => removeFaq(index)}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
                <TextField fullWidth label="Question *" value={faq.question}
                  onChange={e => updateFaq(index, 'question', e.target.value)}
                  placeholder="e.g. What is the best way to prepare for an interview?"
                  sx={{ mb: 2 }} />
                <TextField fullWidth multiline rows={3} label="Answer *" value={faq.answer}
                  onChange={e => updateFaq(index, 'answer', e.target.value)}
                  placeholder="Write a clear and helpful answer..." />
              </Paper>
            ))}

            <Button variant="outlined" startIcon={<Add />} onClick={addFaq}
              sx={{ borderColor: '#ff6b35', color: '#ff6b35', borderStyle: 'dashed', mb: 2 }}>
              Add FAQ
            </Button>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button onClick={() => { resetForm(); setActiveTab(0) }}>Cancel</Button>
              <Button variant="contained" startIcon={<Save />} onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2 }}>
                {createMutation.isPending || updateMutation.isPending
                  ? <CircularProgress size={24} />
                  : isEditing ? 'Update Blog' : 'Publish Blog'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  )
}