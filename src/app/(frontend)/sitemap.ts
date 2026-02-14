import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { VALID_LOCALES } from '@/utilities/localeUtils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = getServerSideURL()
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Homepage for all locales (all get locale prefix)
  for (const locale of VALID_LOCALES) {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: locale === 'en' ? 1.0 : 0.9,
    })
  }

  // Helper function to add collection entries
  async function addCollectionToSitemap(
    collectionSlug: 'pages' | 'grants' | 'blog' | 'reports' | 'mmedia',
    basePath: string,
    priority: number,
    hasPageType = false,
  ) {
    // Build base query
    const baseQuery: any = {
      _status: {
        equals: 'published',
      },
    }

    // Add pageType filter if needed
    if (hasPageType) {
      baseQuery.pageType = {
        equals: 'individual',
      }
    }

    // All locales get /{locale}/ prefix
    for (const locale of VALID_LOCALES) {
      try {
        const docs = await payload.find({
          collection: collectionSlug,
          depth: 0,
          limit: 1000,
          locale: locale as any,
          overrideAccess: false,
          select: {
            slug: true,
            updatedAt: true,
          },
          where: baseQuery,
        })

        docs.docs.forEach((doc) => {
          const path = basePath ? `${basePath}/${doc.slug}` : `/${doc.slug}`
          sitemapEntries.push({
            url: `${baseUrl}/${locale}${path}`,
            lastModified: doc.updatedAt,
            changeFrequency: 'weekly',
            priority: locale === 'en' ? priority : priority - 0.1,
          })
        })
      } catch (error) {
        console.error(
          `Error generating sitemap for ${collectionSlug} locale ${locale}:`,
          error,
        )
      }
    }
  }

  // Add all collections
  await addCollectionToSitemap('pages', '', 0.9, false)
  await addCollectionToSitemap('grants', '/grants', 0.8, true)
  await addCollectionToSitemap('blog', '/blog', 0.7, true)
  await addCollectionToSitemap('reports', '/reports', 0.7, true)
  await addCollectionToSitemap('mmedia', '/mmedia', 0.6, false)

  return sitemapEntries
}
