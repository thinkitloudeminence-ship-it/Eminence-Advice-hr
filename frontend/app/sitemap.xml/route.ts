import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = 'https://eminenceadvice.com'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://eminence-advice-hr.onrender.com/api'
  
  let urls = [
    { loc: '', priority: 1.0 },
    { loc: 'about', priority: 0.8 },
    { loc: 'services', priority: 0.8 },
    { loc: 'contact', priority: 0.8 },
    { loc: 'jobs', priority: 0.9 },
    { loc: 'blogs', priority: 0.8 },
  ]
  
  // Sirf jobs fetch kar
  try {
    const jobsRes = await fetch(`${apiUrl}/jobs?limit=100`)
    const jobsData = await jobsRes.json()
    const jobs = jobsData.data || []
    jobs.forEach((job: any) => {
      urls.push({
        loc: `jobs/slug/${job.slug || job._id}`,
        priority: 0.9,
      })
    })
  } catch (e) {}
  
  // Sirf blogs fetch kar
  try {
    const blogsRes = await fetch(`${apiUrl}/blogs?limit=100`)
    const blogsData = await blogsRes.json()
    const blogs = blogsData.data || []
    blogs.forEach((blog: any) => {
      if (blog.status === 'published') {
        urls.push({
          loc: `blogs/${blog.slug}`,
          priority: 0.8,
        })
      }
    })
  } catch (e) {}
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
<url>
  <loc>${baseUrl}/${url.loc}</loc>
  <priority>${url.priority}</priority>
</url>`).join('')}
</urlset>`
  
  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}