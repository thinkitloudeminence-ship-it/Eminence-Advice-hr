import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

interface UrlEntry {
  loc: string
  priority: number
  changefreq: string
  lastmod?: string
}

export async function GET() {
  const baseUrl = 'https://eminenceadvice.com'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://eminence-advice-hr.onrender.com/api'
  
  let urls: UrlEntry[] = [
    { loc: '', priority: 1.0, changefreq: 'daily' },
    { loc: 'about', priority: 0.8, changefreq: 'monthly' },
    { loc: 'services', priority: 0.8, changefreq: 'monthly' },
    { loc: 'contact', priority: 0.8, changefreq: 'monthly' },
    { loc: 'jobs', priority: 0.9, changefreq: 'daily' },
    { loc: 'blogs', priority: 0.8, changefreq: 'daily' },
  ]
  
  // Fetch jobs
  try {
    const jobsRes = await fetch(`${apiUrl}/jobs?limit=100`, {
      headers: { 'Cache-Control': 'no-cache' },
      next: { revalidate: 3600 }
    })
    if (jobsRes.ok) {
      const jobsData = await jobsRes.json()
      const jobs = jobsData.data || []
      jobs.forEach((job: any) => {
        urls.push({
          loc: `jobs/slug/${job.slug || job._id}`,
          priority: 0.9,
          changefreq: 'daily',
          lastmod: job.updatedAt || job.createdAt
        })
      })
    }
  } catch (error) {
    console.error('Jobs fetch error:', error)
  }
  
  // Fetch blogs
  try {
    const blogsRes = await fetch(`${apiUrl}/blogs?limit=100`, {
      headers: { 'Cache-Control': 'no-cache' },
      next: { revalidate: 3600 }
    })
    if (blogsRes.ok) {
      const blogsData = await blogsRes.json()
      const blogs = blogsData.data || []
      blogs.forEach((blog: any) => {
        if (blog.status === 'published') {
          urls.push({
            loc: `blogs/${blog.slug}`,
            priority: 0.8,
            changefreq: 'weekly',
            lastmod: blog.updatedAt || blog.createdAt
          })
        }
      })
    }
  } catch (error) {
    console.error('Blogs fetch error:', error)
  }
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => {
  const lastmod = url.lastmod ? new Date(url.lastmod).toISOString() : new Date().toISOString()
  return `
<url>
  <loc>${baseUrl}/${url.loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${url.changefreq}</changefreq>
  <priority>${url.priority}</priority>
</url>`
}).join('')}
</urlset>`
  
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}