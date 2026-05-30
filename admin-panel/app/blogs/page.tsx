'use client'

import { useState, useCallback } from 'react'
import {
  Box, Typography, Paper, Button, TextField, Grid, Alert,
  CircularProgress, FormControl, InputLabel, Select, MenuItem,
  Chip, IconButton, Divider, Card, CardContent, Stack, Tab, Tabs,
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions,
  Tooltip,
} from '@mui/material'
import {
  Save, Delete, Image as ImageIcon, Public, Edit, Add,
  Visibility, Close, CloudUpload, Refresh, Article,
  FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
  FormatListNumbered, FormatQuote, Code, Link as LinkIcon, Undo, Redo,
  FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
} from '@mui/icons-material'
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Placeholder from '@tiptap/extension-placeholder'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const categories = [
  'Career Guidance', 'Interview Tips', 'Resume Building', 'HR Insights',
  'Placement Guidance', 'Freelancing Tips', 'AI Tools Awareness', 'Workplace Skills',
]

const emptyForm = {
  title: '', slug: '', category: 'Career Guidance',
  content: '', excerpt: '', status: 'draft', tags: '',
}
const emptySeo = { metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '' }

// ── TipTap Toolbar ──────────────────────────────────────────────────────────
function EditorToolbar({ editor }: { editor: any }) {
  if (!editor) return null

  const btn = (active: boolean) => ({
    bgcolor: active ? '#fff5f0' : 'transparent',
    color: active ? '#ff6b35' : '#555',
    border: '1px solid',
    borderColor: active ? '#ff6b35' : '#ddd',
    borderRadius: 1,
    minWidth: 36,
    height: 36,
    p: 0.5,
    '&:hover': { bgcolor: '#fff5f0', borderColor: '#ff6b35', color: '#ff6b35' },
  })

  return (
    <Box sx={{
      display: 'flex', flexWrap: 'wrap', gap: 0.5, p: 1.5,
      bgcolor: '#fafafa', borderBottom: '1px solid #e0e0e0',
      borderRadius: '8px 8px 0 0',
    }}>
      <Tooltip title="Undo"><IconButton size="small" sx={btn(false)} onClick={() => editor.chain().focus().undo().run()}><Undo fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Redo"><IconButton size="small" sx={btn(false)} onClick={() => editor.chain().focus().redo().run()}><Redo fontSize="small" /></IconButton></Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      {[1, 2, 3].map(level => (
        <Tooltip key={level} title={`Heading ${level}`}>
          <IconButton size="small"
            sx={btn(editor.isActive('heading', { level }))}
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
            <Typography sx={{ fontSize: 11, fontWeight: 700, lineHeight: 1 }}>H{level}</Typography>
          </IconButton>
        </Tooltip>
      ))}

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Bold"><IconButton size="small" sx={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()}><FormatBold fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Italic"><IconButton size="small" sx={btn(editor.isActive('italic'))} onClick={() => editor.chain().focus().toggleItalic().run()}><FormatItalic fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Underline"><IconButton size="small" sx={btn(editor.isActive('underline'))} onClick={() => editor.chain().focus().toggleUnderline().run()}><FormatUnderlined fontSize="small" /></IconButton></Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Bullet List"><IconButton size="small" sx={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulleted fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Numbered List"><IconButton size="small" sx={btn(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()}><FormatListNumbered fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Blockquote"><IconButton size="small" sx={btn(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()}><FormatQuote fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Code Block"><IconButton size="small" sx={btn(editor.isActive('codeBlock'))} onClick={() => editor.chain().focus().toggleCodeBlock().run()}><Code fontSize="small" /></IconButton></Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Align Left"><IconButton size="small" sx={btn(editor.isActive({ textAlign: 'left' }))} onClick={() => editor.chain().focus().setTextAlign('left').run()}><FormatAlignLeft fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Align Center"><IconButton size="small" sx={btn(editor.isActive({ textAlign: 'center' }))} onClick={() => editor.chain().focus().setTextAlign('center').run()}><FormatAlignCenter fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Align Right"><IconButton size="small" sx={btn(editor.isActive({ textAlign: 'right' }))} onClick={() => editor.chain().focus().setTextAlign('right').run()}><FormatAlignRight fontSize="small" /></IconButton></Tooltip>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <Tooltip title="Add Link">
        <IconButton size="small" sx={btn(editor.isActive('link'))}
          onClick={() => {
            const url = window.prompt('Enter URL:')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}>
          <LinkIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
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
  const [deleteDialogId, setDeleteDialogId] = useState<string | null>(null)
  const [previewBlog, setPreviewBlog] = useState<any>(null)
  const queryClient = useQueryClient()

  // TipTap Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      Placeholder.configure({ placeholder: 'Start writing your blog content here...' }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    },
    editorProps: {
      attributes: {
        style: 'min-height: 500px; padding: 16px; outline: none; font-size: 1rem; line-height: 1.8; color: #333;',
      },
    },
  })

  const { data: blogs, isLoading, refetch } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: async () => {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No token found')
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
    editor?.commands.setContent('')
  }

  const preparePayload = () => {
    const fd = new FormData()
    fd.append('title', formData.title)
    fd.append('category', formData.category)
    fd.append('content', editor?.getHTML() || formData.content)
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
      return axios.post(`${API_URL}/blogs`, preparePayload(), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
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
      return axios.put(`${API_URL}/blogs/${selectedBlogId}`, preparePayload(), {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
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
      queryClient.invalidateQueries({ queryKey: ['admin-blogs'] })
      setDeleteDialogId(null)
      setSuccess('Blog deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Failed to delete blog')
      setTimeout(() => setError(''), 3000)
    },
  })

  const handleEdit = (blog: any) => {
    setSelectedBlogId(blog._id)
    setFormData({
      title: blog.title,
      slug: blog.slug || '',
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
    editor?.commands.setContent(blog.content || '')
    setActiveTab(1)
  }

  const handleSubmit = () => {
    if (!formData.title || !editor?.getHTML() || editor.getHTML() === '<p></p>' || !formData.excerpt) {
      setError('Please fill Title, Content, and Excerpt')
      setTimeout(() => setError(''), 3000)
      return
    }
    isEditing ? updateMutation.mutate() : createMutation.mutate()
  }

  const getStatusColor = (s: string): 'success' | 'warning' | 'error' | 'default' =>
    s === 'published' ? 'success' : s === 'draft' ? 'warning' : 'default'

  if (isLoading && activeTab === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress sx={{ color: '#ff6b35' }} />
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Blog Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => { resetForm(); setActiveTab(1) }}
          sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' } }}
        >
          Write New Blog
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      <Paper sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            px: 2,
            pt: 1,
            '& .Mui-selected': { color: '#ff6b35' },
            '& .MuiTabs-indicator': { bgcolor: '#ff6b35' },
          }}
        >
          <Tab label="All Blogs" icon={<Article />} iconPosition="start" />
          <Tab label={isEditing ? 'Edit Blog' : 'Write New Blog'} icon={<Edit />} iconPosition="start" />
        </Tabs>

        {/* ALL BLOGS TAB */}
        {activeTab === 0 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {[
                { label: 'Total Blogs', value: blogs?.length || 0, color: '#ff6b35', bg: '#fff5f0' },
                { label: 'Published', value: blogs?.filter((b: any) => b.status === 'published').length || 0, color: '#4caf50', bg: '#e8f5e9' },
                { label: 'Drafts', value: blogs?.filter((b: any) => b.status === 'draft').length || 0, color: '#ff9800', bg: '#fff3e0' },
              ].map((stat) => (
                <Grid item xs={12} sm={4} key={stat.label}>
                  <Card sx={{ bgcolor: stat.bg, borderLeft: `4px solid ${stat.color}` }}>
                    <CardContent>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>{stat.value}</Typography>
                      <Typography variant="body2" color="textSecondary">{stat.label}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Tooltip title="Refresh">
                <IconButton onClick={() => refetch()} sx={{ color: '#ff6b35' }}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>

            {blogs?.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Article sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                <Typography variant="h6" color="textSecondary">No blogs found</Typography>
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
              <Stack spacing={2}>
                {blogs?.map((blog: any) => (
                  <Card key={blog._id} sx={{ '&:hover': { boxShadow: 3 } }}>
                    <CardContent>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
                        <Box
                          sx={{
                            width: { xs: '100%', sm: 100 },
                            height: 75,
                            flexShrink: 0,
                            bgcolor: '#f5f5f5',
                            borderRadius: 2,
                            overflow: 'hidden',
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
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>{blog.title}</Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 0.5 }}>
                            <Chip label={blog.category} size="small" sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }} />
                            <Chip label={blog.status} size="small" color={getStatusColor(blog.status)} />
                            <Typography variant="caption" color="textSecondary">
                              {new Date(blog.createdAt).toLocaleDateString()}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">👁 {blog.views || 0}</Typography>
                            {blog.faqs?.length > 0 && (
                              <Chip
                                label={`${blog.faqs.length} FAQs`}
                                size="small"
                                variant="outlined"
                                sx={{ color: '#ff6b35', borderColor: '#ff6b35' }}
                              />
                            )}
                          </Stack>
                        </Box>
                        <Stack direction="row" spacing={0.5}>
                          <Tooltip title="Preview">
                            <IconButton size="small" onClick={() => setPreviewBlog(blog)} sx={{ color: '#666' }}>
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton size="small" onClick={() => handleEdit(blog)} sx={{ color: '#ff6b35' }}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => setDeleteDialogId(blog._id)}>
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            )}
          </Box>
        )}

        {/* WRITE/EDIT BLOG TAB */}
        {activeTab === 1 && (
          <Box sx={{ p: 3, maxHeight: '80vh', overflow: 'auto' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#ff6b35', mb: 3 }}>
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </Typography>

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
                          <IconButton
                            size="small"
                            onClick={() => {
                              const slug = formData.title
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, '-')
                                .replace(/^-|-$/g, '')
                              setFormData({ ...formData, slug })
                            }}
                          >
                            <Public />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
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
                  helperText="Short summary (max 1000 characters) - This appears in blog listings"
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

              {/* TipTap Editor */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  Content * <Typography component="span" variant="caption" color="textSecondary">(Rich Text Editor)</Typography>
                </Typography>
                <Box
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    overflow: 'hidden',
                    '&:focus-within': { borderColor: '#ff6b35', boxShadow: '0 0 0 2px rgba(255,107,53,0.1)' },
                    '& .ProseMirror': {
                      minHeight: 500,
                      p: 2,
                      outline: 'none',
                      '& h1': { fontSize: '2rem', fontWeight: 700, mt: 3, mb: 1.5, color: '#1a1a1a' },
                      '& h2': { fontSize: '1.5rem', fontWeight: 700, mt: 2.5, mb: 1, color: '#1a1a1a' },
                      '& h3': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1, color: '#1a1a1a' },
                      '& p': { mb: 1.5, lineHeight: 1.8 },
                      '& ul, & ol': { pl: 3, mb: 1.5 },
                      '& li': { mb: 0.5 },
                      '& blockquote': { borderLeft: '4px solid #ff6b35', pl: 2, ml: 0, color: '#666', fontStyle: 'italic', my: 2 },
                      '& code': { bgcolor: '#f5f5f5', px: 0.5, borderRadius: 0.5, fontFamily: 'monospace' },
                      '& pre': { bgcolor: '#1e1e1e', color: '#fff', p: 2, borderRadius: 1, my: 2, overflow: 'auto' },
                      '& img': { maxWidth: '100%', borderRadius: 1, my: 1 },
                      '& a': { color: '#ff6b35', textDecoration: 'underline' },
                    },
                  }}
                >
                  <EditorToolbar editor={editor} />
                  <EditorContent editor={editor} />
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                  Use H1/H2/H3 for headings, lists for bullet points, and the toolbar for formatting
                </Typography>
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
                            onClick={() => setSeoData({ ...seoData, metaTitle: `${formData.title} | Eminance Advice` })}
                          >
                            <Save />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
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
              <Paper key={index} variant="outlined" sx={{ p: 2.5, mb: 2, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#ff6b35' }}>FAQ #{index + 1}</Typography>
                  <IconButton size="small" color="error" onClick={() => setFaqs(faqs.filter((_, i) => i !== index))}>
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
                <TextField
                  fullWidth
                  label="Question *"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...faqs]
                    updated[index].question = e.target.value
                    setFaqs(updated)
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Answer *"
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqs]
                    updated[index].answer = e.target.value
                    setFaqs(updated)
                  }}
                />
              </Paper>
            ))}

            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
              sx={{ borderColor: '#ff6b35', color: '#ff6b35', borderStyle: 'dashed', mb: 2 }}
            >
              Add FAQ
            </Button>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 4, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Button onClick={() => { resetForm(); setActiveTab(0) }}>Cancel</Button>
              <Button
                variant="contained"
                startIcon={createMutation.isPending || updateMutation.isPending ? <CircularProgress size={20} /> : <Save />}
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                sx={{ bgcolor: '#ff6b35', '&:hover': { bgcolor: '#e55a2b' }, px: 4 }}
              >
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : isEditing ? 'Update Blog' : 'Publish Blog'}
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialogId} onClose={() => setDeleteDialogId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this blog? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogId(null)}>Cancel</Button>
          <Button onClick={() => deleteDialogId && deleteMutation.mutate(deleteDialogId)} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={!!previewBlog} onClose={() => setPreviewBlog(null)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Blog Preview</Typography>
            <IconButton onClick={() => setPreviewBlog(null)}><Close /></IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {previewBlog && (
            <Box>
              {previewBlog.featuredImage?.url && (
                <img src={previewBlog.featuredImage.url} alt={previewBlog.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
              )}
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>{previewBlog.title}</Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={previewBlog.category} size="small" sx={{ bgcolor: '#fff5f0', color: '#ff6b35' }} />
                <Chip label={previewBlog.status} size="small" color={getStatusColor(previewBlog.status)} />
              </Stack>
              <Divider sx={{ my: 2 }} />
              <div
                dangerouslySetInnerHTML={{ __html: previewBlog.content }}
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#333',
                }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  )
}