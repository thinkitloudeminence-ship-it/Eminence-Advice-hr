import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://eminenceadvice.com'
  
  // Static pages
  const staticPages = [
    '', '/about', '/services', '/contact', '/jobs', '/blogs'
  ]
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
  
  // Add static pages
  staticPages.forEach((page) => {
    sitemap += `
<url>
  <loc>${baseUrl}${page}</loc>
  <lastmod>${new Date().toISOString()}</lastmod>
  <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
  <priority>${page === '' ? '1.0' : '0.8'}</priority>
</url>`
  })
  
  try {
    // Fetch jobs
    const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs?limit=100`)
    const jobsData = await jobsRes.json()
    const jobs = jobsData.data || []
    
    jobs.forEach((job: any) => {
      sitemap += `
<url>
  <loc>${baseUrl}/jobs/slug/${job.slug || job._id}</loc>
  <lastmod>${new Date(job.updatedAt || job.createdAt).toISOString()}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.9</priority>
</url>`
    })
    
    // Fetch blogs
    const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?limit=100`)
    const blogsData = await blogsRes.json()
    const blogs = blogsData.data || []
    
    blogs.forEach((blog: any) => {
      if (blog.status === 'published') {
        sitemap += `
<url>
  <loc>${baseUrl}/blogs/${blog.slug}</loc>
  <lastmod>${new Date(blog.updatedAt || blog.createdAt).toISOString()}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`
      }
    })
  } catch (error) {
    console.error('Error fetching dynamic routes:', error)
  }
  
  sitemap += `
</urlset>`
  
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}