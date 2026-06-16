// app/blogs/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  MenuItem,
  Pagination,
  Skeleton,
  InputAdornment,
} from '@mui/material'
import { Search, CalendarToday, Person } from '@mui/icons-material'
import Link from 'next/link'
import axios from 'axios'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { NextSeo } from 'next-seo'

interface Blog {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  featuredImage: { url: string }
  author: { name: string }
  createdAt: string
  views: number
}

const categories = [
  'All',
  'Career Guidance',
  'Interview Tips',
  'Resume Building',
  'HR Insights',
  'Placement Guidance',
  'Freelancing Tips',
  'AI Tools Awareness',
  'Workplace Skills',
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchBlogs()
  }, [page, selectedCategory, searchQuery])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const params: any = { page, limit: 9 }
      if (selectedCategory !== 'All') params.category = selectedCategory
      if (searchQuery) params.search = searchQuery

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, { params })
      setBlogs(response.data.data)
      setTotalPages(response.data.pages)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NextSeo
        title="Career Blogs - Expert Tips, Interview Guides & Insights | Eminance Advice"
        description="Read expert career advice, interview preparation tips, resume building guides, HR insights, placement strategies, and freelance tips. Stay updated with latest career trends."
        canonical="https://eminenceadvice.com/blogs"
        openGraph={{
          url: 'https://eminenceadvice.com/blogs',
          title: 'Career Guidance Blogs - Expert Insights | Eminance Advice',
          description: 'Get expert career tips, interview preparation, resume building guides, and job search strategies.',
          images: [
            {
              url: 'https://eminenceadvice.com/blogs-og.jpg',
              width: 1200,
              height: 630,
              alt: 'Eminance Advice Blogs',
            },
          ],
        }}
        additionalMetaTags={[
          { name: 'keywords', content: 'career blogs, interview tips, resume building, HR insights, placement guidance, freelance tips, career advice, job search tips, career growth, professional development' },
          { name: 'author', content: 'Eminance Advice' },
          { name: 'publisher', content: 'Eminance Advice' },
          { name: 'robots', content: 'index, follow' },
        ]}
      />
      <Box sx={{ pt: 12, pb: 8, minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <Typography
                component="span"
                sx={{
                  bgcolor: '#fff5f0',
                  color: '#ff6b35',
                  px: 2,
                  py: 0.5,
                  borderRadius: 20,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'inline-block',
                  mb: 2,
                }}
              >
                Latest Updates
              </Typography>
            </Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 2,
                color: '#1a1a1a',
              }}
            >
              Our{' '}
              <Typography component="span" sx={{ color: '#ff6b35', display: 'inline-block' }}>
                Blog
              </Typography>
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: '#666',
                maxWidth: 600,
                mx: 'auto',
                mb: 6,
              }}
            >
              Insights, tips, and guidance for your career growth
            </Typography>
          </motion.div>

          {/* Search and Filter */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Blog Listings */}
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Grid item xs={12} md={6} lg={4} key={item}>
                  <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <>
              <Grid container spacing={3}>
                {blogs.map((blog, index) => (
                  <Grid item xs={12} md={6} lg={4} key={blog._id}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', '&:hover': { boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}>
                        <CardMedia
                          component="img"
                          height="200"
                          image={blog.featuredImage?.url || '/blog-placeholder.jpg'}
                          alt={blog.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Chip
                            label={blog.category}
                            size="small"
                            sx={{ bgcolor: '#fff5f0', color: '#ff6b35', mb: 2 }}
                          />
                          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                            {blog.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                            {blog.excerpt}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarToday sx={{ fontSize: 14, mr: 0.5, color: '#ff6b35' }} />
                              <Typography variant="caption" color="textSecondary">
                                {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Person sx={{ fontSize: 14, mr: 0.5, color: '#ff6b35' }} />
                              <Typography variant="caption" color="textSecondary">
                                {blog.author?.name || 'Admin'}
                              </Typography>
                            </Box>
                          </Box>
                          <Button
                            component={Link}
                            href={`/blogs/${blog.slug}`}
                            variant="outlined"
                            fullWidth
                            sx={{ color: '#ff6b35', borderColor: '#ff6b35', '&:hover': { bgcolor: 'rgba(255,107,53,0.05)', borderColor: '#e55a2b' } }}
                          >
                            Read More
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    sx={{ '& .MuiPaginationItem-root.Mui-selected': { bgcolor: '#ff6b35', color: 'white' } }}
                    size="large"
                  />
                </Box>
              )}

              {blogs.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h6" color="textSecondary">
                    No blogs found. Please try different search criteria.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>
    </>
  )
}