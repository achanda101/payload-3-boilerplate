import type { Metadata } from 'next'

import type { Grant, Mmedia, Page, Blog, Report, Homepage } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Generic document type for meta generation
interface DocWithMeta {
  meta?: {
    title?: string | null
    description?: string | null
    image?: any
  }
  seoImage?: any // For Grants and Pages which have a dedicated SEO image field
  slug?: string | string[] | null
}

export const generateMeta = async (args: {
  doc: Partial<Page | Blog | Report | Grant | Mmedia | Homepage> | DocWithMeta | null
}): Promise<Metadata> => {
  const { doc } = args || {}

  const meta = (doc as DocWithMeta | null)?.meta
  const seoImage = (doc as DocWithMeta | null)?.seoImage

  let ogImageUrl: string | null = null

  // Helper function to extract image URL
  const getImageUrl = (image: any): string | null => {
    if (typeof image === 'object' && image !== null) {
      // Check for sizes.ogImage first (JPG format for Open Graph)
      if (image.sizes?.ogImage?.url) {
        return image.sizes.ogImage.url
      }
      // Fall back to the main url if ogImage doesn't exist
      if ('url' in image && image.url) {
        const imageUrl = image.url
        // Check if the URL is WebP format
        if (imageUrl.toLowerCase().endsWith('.webp')) {
          return null // Skip WebP, will fall back to default
        }
        return imageUrl
      }
    }
    return null
  }

  // Priority: meta.image > seoImage > default
  ogImageUrl = getImageUrl(meta?.image) || getImageUrl(seoImage) || '/uafanp-icon2.png'

  const ogImage = ogImageUrl ? `${getServerSideURL()}${ogImageUrl}` : null

  const title = meta?.title ? meta?.title : 'Urgent Action Fund: Asia & Pacific'

  // Generate URL for Open Graph
  const slug = doc && 'slug' in doc ? doc.slug : null
  const ogUrl = Array.isArray(slug) ? slug.join('/') : '/'

  return {
    description: meta?.description,
    openGraph: mergeOpenGraph({
      description: meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: ogUrl,
    }),
    title,
  }
}
