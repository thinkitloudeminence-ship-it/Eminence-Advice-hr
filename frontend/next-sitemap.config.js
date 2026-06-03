/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eminenceadvice.com' || 'https://www.eminenceadvice.com' ,
  generateRobotsTxt: false,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
    ],
  },
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*'],
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
  },
}