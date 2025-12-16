import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = getServerSideURL()

  // Fetch all published pages
  const pagesData = await payload.find({
    collection: 'pages',
    where: {
      _status: {
        equals: 'published',
      },
    },
    limit: 1000,
    depth: 0,
  })

  // Fetch all published blog posts (individual only, not landing pages)
  const blogData = await payload.find({
    collection: 'blog',
    where: {
      _status: {
        equals: 'published',
      },
      pageType: {
        equals: 'individual',
      },
    },
    limit: 1000,
    depth: 0,
  })

  // Fetch all published reports (individual only, not landing pages)
  const reportsData = await payload.find({
    collection: 'reports',
    where: {
      _status: {
        equals: 'published',
      },
      pageType: {
        equals: 'individual',
      },
    },
    limit: 1000,
    depth: 0,
  })

  // Fetch all published grants (individual only, not landing pages)
  const grantsData = await payload.find({
    collection: 'grants',
    where: {
      _status: {
        equals: 'published',
      },
      pageType: {
        equals: 'individual',
      },
    },
    limit: 1000,
    depth: 0,
  })

  // Map pages to sitemap entries
  const pageUrls: MetadataRoute.Sitemap = pagesData.docs.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Map blog posts to sitemap entries
  const blogUrls: MetadataRoute.Sitemap = blogData.docs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Map reports to sitemap entries
  const reportUrls: MetadataRoute.Sitemap = reportsData.docs.map((report) => ({
    url: `${baseUrl}/reports/${report.slug}`,
    lastModified: report.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Map grants to sitemap entries
  const grantUrls: MetadataRoute.Sitemap = grantsData.docs.map((grant) => ({
    url: `${baseUrl}/grants/${grant.slug}`,
    lastModified: grant.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pageUrls,
    ...blogUrls,
    ...reportUrls,
    ...grantUrls,
  ]
}
