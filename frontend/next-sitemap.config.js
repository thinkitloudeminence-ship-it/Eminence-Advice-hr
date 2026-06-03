/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eminenceadvice.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/admin/*', '/api/*', '/server-sitemap.xml'],
  generateIndexSitemap: false,
  
  // ✅ Additional paths for dynamic content
  additionalPaths: async (config) => {
    const result = []
    
    try {
      // Fetch all jobs for sitemap
      const jobsResponse = await fetch('https://eminence-advice-hr.onrender.com/api/jobs?limit=100')
      const jobsData = await jobsResponse.json()
      const jobs = jobsData.data || []
      
      jobs.forEach((job) => {
        result.push({
          loc: `/jobs/slug/${job.slug || job._id}`,
          lastmod: new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9,
        })
      })
      console.log(`✅ Added ${jobs.length} jobs to sitemap`)
    } catch (error) {
      console.error('Error fetching jobs for sitemap:', error)
    }
    
    try {
      // Fetch all blogs for sitemap
      const blogsResponse = await fetch('https://eminence-advice-hr.onrender.com/api/blogs?limit=100')
      const blogsData = await blogsResponse.json()
      const blogs = blogsData.data || []
      
      blogs.forEach((blog) => {
        if (blog.status === 'published') {
          result.push({
            loc: `/blogs/${blog.slug}`,
            lastmod: new Date(blog.updatedAt || blog.createdAt).toISOString(),
            changefreq: 'weekly',
            priority: 0.8,
          })
        }
      })
      console.log(`✅ Added ${blogs.length} blogs to sitemap`)
    } catch (error) {
      console.error('Error fetching blogs for sitemap:', error)
    }
    
    return result
  },
  
  transform: async (config, path) => {
    let priority = 0.7
    let changefreq = 'weekly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path === '/jobs') {
      priority = 0.9
      changefreq = 'daily'
    } else if (path === '/blogs') {
      priority = 0.8
      changefreq = 'daily'
    } else if (path === '/about' || path === '/services' || path === '/contact') {
      priority = 0.8
      changefreq = 'monthly'
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}