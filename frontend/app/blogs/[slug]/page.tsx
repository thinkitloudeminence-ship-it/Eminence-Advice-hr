// 'use client'

// import { useState, useEffect } from 'react'
// import {
//   Box,
//   Container,
//   Typography,
//   Paper,
//   Chip,
//   Divider,
//   Avatar,
//   IconButton,
//   Skeleton,
//   Button,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
// } from '@mui/material'
// import {
//   CalendarToday,
//   Person,
//   Visibility,
//   Share,
//   Facebook,
//   Twitter,
//   LinkedIn,
//   WhatsApp,
//   ArrowBack,
// } from '@mui/icons-material'
// import { useParams, useRouter } from 'next/navigation'
// import axios from 'axios'
// import { motion } from 'framer-motion'
// import { format } from 'date-fns'
// import Link from 'next/link'

// interface Blog {
//   _id: string
//   title: string
//   slug: string  // ✅ Added slug property
//   content: string
//   excerpt: string
//   category: string
//   featuredImage: { url: string }
//   author: { name: string }
//   createdAt: string
//   views: number
//   tags: string[]
// }

// export default function BlogDetailPage() {
//   const { slug } = useParams()
//   const router = useRouter()
//   const [blog, setBlog] = useState<Blog | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])

//   useEffect(() => {
//     fetchBlog()
//   }, [slug])

//   const fetchBlog = async () => {
//     setLoading(true)
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`)
//       setBlog(response.data.data)

//       // Fetch related blogs
//       const relatedResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
//         params: { category: response.data.data.category, limit: 3 },
//       })
//       // ✅ Now b.slug exists because we added it to interface
//       setRelatedBlogs(relatedResponse.data.data.filter((b: Blog) => b.slug !== slug))
//     } catch (error) {
//       console.error('Error fetching blog:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleShare = (platform: string) => {
//     const url = window.location.href
//     const text = blog?.title || ''

//     const shareUrls = {
//       facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
//       twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
//       linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
//       whatsapp: `https://wa.me/?text=${text} ${url}`,
//     }

//     window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
//   }

//   if (loading) {
//     return (
//       <Container sx={{ pt: 12, pb: 8 }}>
//         <Skeleton variant="rectangular" height={400} />
//         <Skeleton variant="text" sx={{ mt: 2 }} />
//         <Skeleton variant="text" width="60%" />
//         <Skeleton variant="rectangular" height={600} sx={{ mt: 4 }} />
//       </Container>
//     )
//   }

//   if (!blog) {
//     return (
//       <Container sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
//         <Typography variant="h4" gutterBottom>
//           Blog not found
//         </Typography>
//         <Button variant="contained" href="/blogs">
//           Back to Blogs
//         </Button>
//       </Container>
//     )
//   }

//   return (
//     <Box sx={{ pt: 12, pb: 8, bgcolor: '#f5f5f5' }}>
//       <Container maxWidth="lg">
//         <motion.div
//           initial={{ y: -30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => router.back()}
//             sx={{ mb: 3 }}
//           >
//             Back
//           </Button>

//           <Paper sx={{ overflow: 'hidden' }}>
//             {/* Featured Image */}
//             <Box
//               component="img"
//               src={blog.featuredImage?.url || '/blog-placeholder.jpg'}
//               alt={blog.title}
//               sx={{
//                 width: '100%',
//                 height: { xs: '250px', md: '500px' },
//                 objectFit: 'cover',
//               }}
//             />

//             <Box sx={{ p: { xs: 2, md: 4 } }}>
//               {/* Meta Info */}
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
//                 <Chip label={blog.category} color="primary" />
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
//                   <Typography variant="body2" color="textSecondary">
//                     {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <Person sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
//                   <Typography variant="body2" color="textSecondary">
//                     {blog.author?.name || 'Admin'}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <Visibility sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
//                   <Typography variant="body2" color="textSecondary">
//                     {blog.views} views
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Title */}
//               <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#1a1a1a' }}>
//                 {blog.title}
//               </Typography>

//               {/* Content */}
//               <div
//                 dangerouslySetInnerHTML={{ __html: blog.content }}
//                 style={{
//                   fontSize: '1.1rem',
//                   lineHeight: '1.8',
//                   color: '#333',
//                 }}
//               />

//               <Divider sx={{ my: 4 }} />

//               {/* Tags */}
//               {blog.tags && blog.tags.length > 0 && (
//                 <Box sx={{ mb: 4 }}>
//                   <Typography variant="h6" gutterBottom>
//                     Tags
//                   </Typography>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                     {blog.tags.map((tag) => (
//                       <Chip key={tag} label={tag} variant="outlined" />
//                     ))}
//                   </Box>
//                 </Box>
//               )}

//               {/* Share Buttons */}
//               <Box sx={{ mb: 4 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Share this article
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <IconButton onClick={() => handleShare('facebook')} sx={{ bgcolor: '#1877f2', color: 'white' }}>
//                     <Facebook />
//                   </IconButton>
//                   <IconButton onClick={() => handleShare('twitter')} sx={{ bgcolor: '#1da1f2', color: 'white' }}>
//                     <Twitter />
//                   </IconButton>
//                   <IconButton onClick={() => handleShare('linkedin')} sx={{ bgcolor: '#0077b5', color: 'white' }}>
//                     <LinkedIn />
//                   </IconButton>
//                   <IconButton onClick={() => handleShare('whatsapp')} sx={{ bgcolor: '#25d366', color: 'white' }}>
//                     <WhatsApp />
//                   </IconButton>
//                 </Box>
//               </Box>
//             </Box>
//           </Paper>

//           {/* Related Blogs */}
//           {relatedBlogs.length > 0 && (
//             <Box sx={{ mt: 6 }}>
//               <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
//                 Related Articles
//               </Typography>
//               <Grid container spacing={3}>
//                 {relatedBlogs.map((relatedBlog) => (
//                   <Grid item xs={12} md={4} key={relatedBlog._id}>
//                     <Card sx={{ height: '100%', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}>
//                       <CardMedia
//                         component="img"
//                         height="180"
//                         image={relatedBlog.featuredImage?.url || '/blog-placeholder.jpg'}
//                         alt={relatedBlog.title}
//                       />
//                       <CardContent>
//                         <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
//                           {relatedBlog.title}
//                         </Typography>
//                         <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
//                           {relatedBlog.excerpt}
//                         </Typography>
//                         <Button
//                           component={Link}
//                           href={`/blogs/${relatedBlog.slug}`}
//                           variant="outlined"
//                           size="small"
//                           sx={{ color: '#ff6b35', borderColor: '#ff6b35', '&:hover': { bgcolor: 'rgba(255,107,53,0.05)', borderColor: '#e55a2b' } }}
//                         >
//                           Read More
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Box>
//           )}
//         </motion.div>
//       </Container>
//     </Box>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import {
  Box, Container, Typography, Paper, Chip, Divider, IconButton,
  Skeleton, Button, Grid, Card, CardMedia, CardContent,
  Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material'
import {
  CalendarToday, Person, Visibility, Facebook, Twitter,
  LinkedIn, WhatsApp, ArrowBack, ExpandMore,
} from '@mui/icons-material'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface Faq { question: string; answer: string }

interface Blog {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  featuredImage: { url: string }
  author: { name: string }
  createdAt: string
  views: number
  tags: string[]
  faqs: Faq[]
}

export default function BlogDetailPage() {
  const { slug } = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([])

  useEffect(() => { fetchBlog() }, [slug])

  const fetchBlog = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${API_URL}/blogs/${slug}`)
      setBlog(res.data.data)
      const related = await axios.get(`${API_URL}/blogs`, {
        params: { category: res.data.data.category, limit: 3 },
      })
      setRelatedBlogs(related.data.data.filter((b: Blog) => b.slug !== slug))
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = blog?.title || ''
    const urls: any = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
    }
    window.open(urls[platform], '_blank')
  }

  if (loading) return (
    <Container sx={{ pt: 12, pb: 8 }}>
      <Skeleton variant="rectangular" height={400} />
      <Skeleton variant="text" sx={{ mt: 2 }} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="rectangular" height={400} sx={{ mt: 4 }} />
    </Container>
  )

  if (!blog) return (
    <Container sx={{ pt: 12, pb: 8, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Blog not found</Typography>
      <Button variant="contained" href="/blogs" sx={{ bgcolor: '#ff6b35' }}>Back to Blogs</Button>
    </Container>
  )

  return (
    <Box sx={{ pt: 12, pb: 8, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <motion.div initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>

          <Button startIcon={<ArrowBack />} onClick={() => router.back()}
            sx={{ mb: 3, color: '#ff6b35' }}>Back</Button>

          <Paper sx={{ overflow: 'hidden', borderRadius: 3 }}>
            {/* Featured Image */}
            <Box
              component="img"
              src={blog.featuredImage?.url || '/blog-placeholder.jpg'}
              alt={blog.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: { xs: 300, md: 500 },  // ✅ Limit max height, but maintain aspect ratio
                objectFit: 'contain',  // ✅ Full image dikhegi, cut nahi hogi
                display: 'block',
                bgcolor: '#f5f5f5'
              }}
            />
            <Box sx={{ p: { xs: 2, md: 4 } }}>
              {/* Meta */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Chip label={blog.category} sx={{ bgcolor: '#ff6b35', color: '#fff' }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                  <Typography variant="body2" color="textSecondary">
                    {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Person sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                  <Typography variant="body2" color="textSecondary">{blog.author?.name || 'Admin'}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Visibility sx={{ fontSize: 16, mr: 0.5, color: '#666' }} />
                  <Typography variant="body2" color="textSecondary">{blog.views} views</Typography>
                </Box>
              </Box>

              {/* Title */}
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}>
                {blog.title}
              </Typography>

              {/* Content */}
              <Box
                sx={{
                  '& h1, & h2, & h3, & h4': {
                    fontWeight: 700,
                    color: '#1a1a1a',
                    mt: 4,
                    mb: 2,
                  },
                  '& h1': { fontSize: { xs: '1.6rem', md: '2rem' } },
                  '& h2': { fontSize: { xs: '1.4rem', md: '1.6rem' } },
                  '& h3': { fontSize: { xs: '1.2rem', md: '1.3rem' } },
                  '& p': { fontSize: '1.05rem', lineHeight: 1.9, mb: 2, color: '#333' },
                  '& ul, & ol': { pl: 3, mb: 2 },
                  '& li': { fontSize: '1.05rem', lineHeight: 1.8, mb: 0.5, color: '#333' },
                  '& strong': { fontWeight: 700, color: '#1a1a1a' },
                  '& em': { fontStyle: 'italic' },
                  '& a': { color: '#ff6b35', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
                  '& blockquote': {
                    borderLeft: '4px solid #ff6b35',
                    pl: 2, ml: 0, my: 2,
                    color: '#555',
                    fontStyle: 'italic',
                    bgcolor: '#fff5f0',
                    py: 1,
                    borderRadius: '0 8px 8px 0',
                  },
                  '& code': {
                    bgcolor: '#f5f5f5',
                    px: 0.8, py: 0.2,
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.9em',
                    color: '#e53935',
                  },
                  '& pre': {
                    bgcolor: '#f5f5f5',
                    p: 2,
                    borderRadius: 2,
                    overflow: 'auto',
                    mb: 2,
                    '& code': { color: '#333', bgcolor: 'transparent' },
                  },
                  '& hr': { my: 3, borderColor: '#e0e0e0' },
                  '& img': { maxWidth: '100%', borderRadius: 2, my: 2 },
                  '& table': { width: '100%', borderCollapse: 'collapse', mb: 2 },
                  '& th, & td': { border: '1px solid #e0e0e0', p: 1.5, textAlign: 'left' },
                  '& th': { bgcolor: '#fff5f0', fontWeight: 700 },
                }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {blog.content}
                </ReactMarkdown>
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Tags</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {blog.tags.map(tag => (
                      <Chip key={tag} label={tag} variant="outlined"
                        sx={{ borderColor: '#ff6b35', color: '#ff6b35' }} />
                    ))}
                  </Box>
                </Box>
              )}

              {/* ── FAQs ── */}
              {blog.faqs?.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1a1a1a' }}>
                    Frequently Asked Questions
                  </Typography>
                  {blog.faqs.map((faq, i) => (
                    <Accordion key={i} sx={{
                      mb: 1, borderRadius: '8px !important',
                      '&:before': { display: 'none' },
                      border: '1px solid #f0f0f0',
                      '&.Mui-expanded': { border: '1px solid #ff6b35' },
                    }}>
                      <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#ff6b35' }} />}>
                        <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography color="textSecondary" sx={{ lineHeight: 1.8 }}>
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              {/* Share */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Share this article</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[
                    { key: 'facebook', Icon: Facebook, bg: '#1877f2' },
                    { key: 'twitter', Icon: Twitter, bg: '#1da1f2' },
                    { key: 'linkedin', Icon: LinkedIn, bg: '#0077b5' },
                    { key: 'whatsapp', Icon: WhatsApp, bg: '#25d366' },
                  ].map(({ key, Icon, bg }) => (
                    <IconButton key={key} onClick={() => handleShare(key)}
                      sx={{ bgcolor: bg, color: '#fff', '&:hover': { bgcolor: bg, opacity: 0.85 } }}>
                      <Icon />
                    </IconButton>
                  ))}
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>Related Articles</Typography>
              <Grid container spacing={3}>
                {relatedBlogs.map(rb => (
                  <Grid item xs={12} md={4} key={rb._id}>
                    <Card sx={{ height: '100%', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}>
                      <CardMedia component="img" height="180"
                        image={rb.featuredImage?.url || '/blog-placeholder.jpg'} alt={rb.title} />
                      <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>{rb.title}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>{rb.excerpt}</Typography>
                        <Button component={Link} href={`/blogs/${rb.slug}`} variant="outlined" size="small"
                          sx={{ color: '#ff6b35', borderColor: '#ff6b35' }}>
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  )
}