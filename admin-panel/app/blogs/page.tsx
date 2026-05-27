'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Divider,
  Card,
  CardContent,
  Stack,
  Tab,
  Tabs,
  InputAdornment,
} from '@mui/material'
import {
  Save,
  Delete,
  Image as ImageIcon,
  Public,
  Visibility,
  Edit,
  Add,
} from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

// Dynamic import for React Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

if (typeof window !== 'undefined') {
  require('react-quill/dist/quill.snow.css')
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const categories = [
  'Career Guidance',
  'Interview Tips',
  'Resume Building',
  'HR Insights',
  'Placement Guidance',
  'Freelancing Tips',
  'AI Tools Awareness',
  'Workplace Skills',
]

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']
  ],
}

const formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
  'list', 'bullet', 'check', 'indent', 'align',
  'link', 'image', 'video'
]

export default function BlogsManagement() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Career Guidance',
    content: '',
    excerpt: '',
    status: 'draft',
    tags: '',
  })
  const [seoData, setSeoData] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    canonicalUrl: '',
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const queryClient = useQueryClient()

  // Fetch all blogs for listing
  const { data: blogs, isLoading } = useQuery({
  queryKey: ['blogs'],
  queryFn: async () => {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/blogs/admin/list`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data.data
  },
})

  // Fetch single blog for editing
  const { data: singleBlog, refetch: refetchSingle } = useQuery({
    queryKey: ['blog', selectedBlogId],
    queryFn: async () => {
      if (!selectedBlogId) return null
      const token = localStorage.getItem('token')
      const response = await axios.get(`${API_URL}/blogs/admin/${selectedBlogId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data.data
    },
    enabled: !!selectedBlogId,
  })

  // Create blog
  const createMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('excerpt', formData.excerpt)
      formDataToSend.append('status', formData.status)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('seo', JSON.stringify(seoData))
      
      if (selectedImage) {
        formDataToSend.append('featuredImage', selectedImage)
      }

      return axios.post(`${API_URL}/blogs`, formDataToSend, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
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

  // Update blog
  const updateMutation = useMutation({
    mutationFn: async () => {
      const token = localStorage.getItem('token')
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('content', formData.content)
      formDataToSend.append('excerpt', formData.excerpt)
      formDataToSend.append('status', formData.status)
      formDataToSend.append('tags', formData.tags)
      formDataToSend.append('seo', JSON.stringify(seoData))
      
      if (selectedImage) {
        formDataToSend.append('featuredImage', selectedImage)
      }

      return axios.put(`${API_URL}/blogs/${selectedBlogId}`, formDataToSend, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      resetForm()
      setSuccess('Blog updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
      setActiveTab(0)
      setIsEditing(false)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to update blog')
      setTimeout(() => setError(''), 3000)
    },
  })

  // Delete blog
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem('token')
      return axios.delete(`${API_URL}/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setSuccess('Blog deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to delete blog')
      setTimeout(() => setError(''), 3000)
    },
  })

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: 'Career Guidance',
      content: '',
      excerpt: '',
      status: 'draft',
      tags: '',
    })
    setSeoData({
      metaTitle: '',
      metaDescription: '',
      keywords: '',
      canonicalUrl: '',
    })
    setSelectedImage(null)
    setImagePreview('')
    setSelectedBlogId(null)
    setIsEditing(false)
  }

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
    setImagePreview(blog.featuredImage?.url || '')
    setIsEditing(true)
    setActiveTab(0)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      setError('Please fill all required fields')
      setTimeout(() => setError(''), 3000)
      return
    }
    
    if (isEditing) {
      updateMutation.mutate()
    } else {
      createMutation.mutate()
    }
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setFormData({ ...formData, slug })
  }

  const generateMetaTitle = () => {
    setSeoData({ ...seoData, metaTitle: formData.title + ' | Eminance Advice' })
  }

  if (isLoading && activeTab === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 3 }}>
        Blog CMS
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, val) => setActiveTab(val)}
          sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1 }}
        >
          <Tab label="All Blogs" icon={<Public />} iconPosition="start" />
          <Tab 
            label={isEditing ? "Edit Blog" : "Write New Blog"} 
            icon={<Edit />} 
            iconPosition="start" 
          />
        </Tabs>

        {/* All Blogs List */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  resetForm()
                  setIsEditing(false)
                  setActiveTab(1)
                }}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}
              >
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
                          {blog.featuredImage?.url ? (
                            <img 
                              src={blog.featuredImage.url} 
                              alt={blog.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                            />
                          ) : (
                            <Box sx={{ width: '100%', height: '100%', bgcolor: '#f0f0f0', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <ImageIcon sx={{ color: '#ccc' }} />
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {blog.title}
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                            <Chip label={blog.category} size="small" sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }} />
                            <Chip 
                              label={blog.status} 
                              size="small" 
                              color={blog.status === 'published' ? 'success' : 'default'} 
                            />
                            <Typography variant="caption" color="textSecondary">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              👁 {blog.views || 0} views
                            </Typography>
                          </Stack>
                        </Box>
                        <Box>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            startIcon={<Edit />}
                            onClick={() => handleEdit(blog)}
                            sx={{ mr: 1, borderColor: '#ff6b35', color: '#ff6b35' }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="small" 
                            variant="outlined" 
                            color="error" 
                            startIcon={<Delete />}
                            onClick={() => {
                              if (confirm('Delete this blog?')) deleteMutation.mutate(blog._id)
                            }}
                          >
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

        {/* Write/Edit Blog Form */}
        {activeTab === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#ff6b35', mb: 3 }}>
              {isEditing ? 'Edit Blog' : 'Write New Blog'}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={generateSlug} size="small">
                          <Public />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText="URL-friendly version of the title"
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
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
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
                    <MenuItem value="published">🚀 Publish - Make it live</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, JavaScript, Career, Tips (comma separated)"
                  helperText="Separate tags with commas"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  label="Excerpt *"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  helperText="A short summary (max 200 characters) - This appears in blog listings"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Featured Image</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<ImageIcon />}
                    sx={{ borderColor: '#ff6b35', color: '#ff6b35' }}
                  >
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </Button>
                  {imagePreview && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <img src={imagePreview} alt="Preview" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                      <IconButton size="small" onClick={() => { setSelectedImage(null); setImagePreview('') }}>
                        <Delete fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>Content *</Typography>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={modules}
                  formats={formats}
                  style={{ height: 400, marginBottom: 50 }}
                  placeholder="Write your blog content here..."
                />
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={generateMetaTitle} size="small">
                          <Save />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText="SEO Title (60 characters recommended)"
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
                  helperText="SEO Description (160 characters recommended)"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Meta Keywords"
                  value={seoData.keywords}
                  onChange={(e) => setSeoData({ ...seoData, keywords: e.target.value })}
                  placeholder="career, job, placement, training (comma separated)"
                  helperText="Separate keywords with commas"
                />
              </Grid>

              <Grid item xs={12}>
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

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button onClick={() => setActiveTab(0)}>Cancel</Button>
              <Button 
                variant="contained" 
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                startIcon={<Save />}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, borderRadius: 2 }}
              >
                {createMutation.isPending || updateMutation.isPending 
                  ? <CircularProgress size={24} /> 
                  : (isEditing ? 'Update Blog' : 'Publish Blog')}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  )
}