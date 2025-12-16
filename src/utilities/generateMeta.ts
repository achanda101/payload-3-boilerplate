import type { Metadata } from 'next'

import type { Grant, Mmedia, Post, Page, Blog, Report, Homepage } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

// Generic document type for meta generation
interface DocWithMeta {
  meta?: {
    title?: string | null
    description?: string | null
    image?: any
  }
  slug?: string | string[] | null
}

export const generateMeta = async (args: {
  doc: Partial<Post | Page | Blog | Report | Grant | Mmedia | Homepage> | DocWithMeta | null
}): Promise<Metadata> => {
  const { doc } = args || {}

  const meta = (doc as DocWithMeta | null)?.meta

  let ogImageUrl: string | null = null

  if (typeof meta?.image === 'object' && meta.image !== null) {
    // Check for sizes.ogImage first (JPG format for Open Graph)
    if (meta.image.sizes?.ogImage?.url) {
      ogImageUrl = meta.image.sizes.ogImage.url
    }
    // Fall back to the main url if ogImage doesn't exist
    else if ('url' in meta.image && meta.image.url) {
      const imageUrl = meta.image.url
      // Check if the URL is WebP format
      if (imageUrl.toLowerCase().endsWith('.webp')) {
        // Use default icon for WebP images
        ogImageUrl = '/uafanp-icon2.png'
      } else {
        ogImageUrl = imageUrl
      }
    }
  } else {
    // If no meta.image exists, use default icon
    ogImageUrl = '/uafanp-icon2.png'
  }

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
