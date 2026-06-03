/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://eminenceadvice.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
  },
  exclude: ['/admin/*', '/api/*', '/_next/*'],
  
  // 🔥 YAHI SE DYNAMIC BLOGS AUR JOBS ADD HONGE
  additionalPaths: async (config) => {
    const paths = []
    
    // 1. SARE BLOGS FETCH KARO
    try {
      const blogRes = await fetch('https://eminenceadvice.com/api/blogs?limit=100')
      const blogData = await blogRes.json()
      const blogs = blogData.data || []
      
      for (const blog of blogs) {
        paths.push({
          loc: `/blogs/${blog.slug}`,
          lastmod: blog.updatedAt || new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8
        })
      }
      console.log(`✅ Added ${blogs.length} blogs to sitemap`)
    } catch (err) {
      console.error('Blogs fetch error:', err)
    }
    
    // 2. SARE JOBS FETCH KARO
    try {
      const jobRes = await fetch('https://eminenceadvice.com/api/jobs?limit=100')
      const jobData = await jobRes.json()
      const jobs = jobData.data || []
      
      for (const job of jobs) {
        paths.push({
          loc: `/jobs/${job.id}`,
          lastmod: job.updatedAt || new Date().toISOString(),
          changefreq: 'daily',
          priority: 0.9
        })
      }
      console.log(`✅ Added ${jobs.length} jobs to sitemap`)
    } catch (err) {
      console.error('Jobs fetch error:', err)
    }
    
    return paths
  },
  
  transform: async (config, path) => {
    let priority = 0.7
    let changefreq = 'weekly'
    
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    } else if (path === '/payment') {
      priority = 0.9
      changefreq = 'daily'
    } else if (path === '/about' || path === '/services' || path === '/contact') {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.startsWith('/jobs')) {
      priority = 0.9
      changefreq = 'daily'
    } else if (path.startsWith('/blogs')) {
      priority = 0.8
      changefreq = 'daily'
    }
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  }
}