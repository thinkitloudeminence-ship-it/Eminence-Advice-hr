// Ye file banai: frontend/app/robots.ts

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/_next/', '/static/'],
    },
    sitemap: 'https://eminenceadvice.com/sitemap.xml',
    host: 'https://eminenceadvice.com',
  }
}