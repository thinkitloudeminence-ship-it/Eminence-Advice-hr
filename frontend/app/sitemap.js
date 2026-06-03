// Ye file banai: frontend/app/sitemap.js

export default async function sitemap() {
  const baseUrl = 'https://eminenceadvice.com'
  
  // Static pages
  const staticPages = [
    { url: '', lastModified: new Date() },
    { url: '/about', lastModified: new Date() },
    { url: '/services', lastModified: new Date() },
    { url: '/contact', lastModified: new Date() },
    { url: '/jobs', lastModified: new Date() },
    { url: '/blogs', lastModified: new Date() },
    { url: '/payment', lastModified: new Date() },
  ]
  
  // Fetch blogs from API
  let blogs = []
  try {
    const res = await fetch('https://eminenceadvice.com/api/blogs?limit=100', {
      next: { revalidate: 3600 }
    })
    const data = await res.json()
    blogs = data.data || []
  } catch (err) {
    console.error('Sitemap blog fetch error:', err)
  }
  
  // Fetch jobs from API
  let jobs = []
  try {
    const res = await fetch('https://eminenceadvice.com/api/jobs?limit=100', {
      next: { revalidate: 3600 }
    })
    const data = await res.json()
    jobs = data.data || []
  } catch (err) {
    console.error('Sitemap job fetch error:', err)
  }
  
  // Convert static pages to sitemap format
  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: page.lastModified,
    changeFrequency: page.url === '' ? 'daily' : 'weekly',
    priority: page.url === '' ? 1.0 : 0.8,
  }))
  
  // Convert blogs to sitemap format
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))
  
  // Convert jobs to sitemap format
  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(job.updatedAt || job.createdAt),
    changeFrequency: 'daily',
    priority: 0.9,
  }))
  
  return [...staticRoutes, ...blogRoutes, ...jobRoutes]
}