/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://eminenceadvice.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://eminenceadvice.com/api/sitemap',
    ],
  },
  // Disable automatic sitemap generation
  additionalPaths: async () => [],
}