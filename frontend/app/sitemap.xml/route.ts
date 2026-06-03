import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = 'https://eminenceadvice.com'
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://eminence-advice-hr.onrender.com/api'
  
  // ✅ Manually added existing jobs
  const existingJobs = [
    'admission-counsellor-experienced',
    'admission-counsellor-fresher',
    'hr-executive',
    'flutter-developer',
    'laravel-developer',
    'business-development-executive',
    'field-sales-executive',
    'hr-internship',
  ]
  
  // ✅ Manually added existing blogs
  const existingBlogs = [
    'how-mock-interviews-increase-your-chances-of-getting-hired-in-2026',
    '7-resume-tips-to-get-more-interview-calls-in-2026',
    'how-career-training-improves-interview-success-rates-in-2026',
  ]
  
  let urls = [
    { loc: '', priority: 1.0 },
    { loc: 'about', priority: 0.8 },
    { loc: 'services', priority: 0.8 },
    { loc: 'contact', priority: 0.8 },
    { loc: 'jobs', priority: 0.9 },
    { loc: 'blogs', priority: 0.8 },
  ]
  
  // ✅ Add manually added jobs
  existingJobs.forEach(slug => {
    urls.push({ loc: `jobs/${slug}`, priority: 0.9 })
  })
  
  // ✅ Add manually added blogs
  existingBlogs.forEach(slug => {
    urls.push({ loc: `blogs/${slug}`, priority: 0.8 })
  })
  
  // ✅ Fetch new jobs from API (auto)
  try {
    const jobsRes = await fetch(`${apiUrl}/jobs?limit=100`, {
      next: { revalidate: 3600 }
    })
    if (jobsRes.ok) {
      const jobsData = await jobsRes.json()
      const jobs = jobsData.data || []
      jobs.forEach((job: any) => {
        const slug = job.slug || job._id
        // Avoid duplicate existing jobs
        if (!existingJobs.includes(slug) && !urls.some(u => u.loc === `jobs/${slug}`)) {
          urls.push({ loc: `jobs/${slug}`, priority: 0.9 })
        }
      })
    }
  } catch (error) {
    console.error('Jobs fetch error:', error)
  }
  
  // ✅ Fetch new blogs from API (auto)
  try {
    const blogsRes = await fetch(`${apiUrl}/blogs?limit=100`, {
      next: { revalidate: 3600 }
    })
    if (blogsRes.ok) {
      const blogsData = await blogsRes.json()
      const blogs = blogsData.data || []
      blogs.forEach((blog: any) => {
        if (blog.status === 'published') {
          const slug = blog.slug
          // Avoid duplicate existing blogs
          if (!existingBlogs.includes(slug) && !urls.some(u => u.loc === `blogs/${slug}`)) {
            urls.push({ loc: `blogs/${slug}`, priority: 0.8 })
          }
        }
      })
    }
  } catch (error) {
    console.error('Blogs fetch error:', error)
  }
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
<url>
  <loc>${baseUrl}/${url.loc}</loc>
  <priority>${url.priority}</priority>
</url>`).join('')}
</urlset>`
  
  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}