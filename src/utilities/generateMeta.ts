import type { Metadata } from 'next'

import type { Post } from '../payload-types'

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
  doc: Partial<Post> | DocWithMeta
}): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    typeof doc?.meta?.image === 'object' &&
    doc.meta.image !== null &&
    'url' in doc.meta.image &&
    `${getServerSideURL()}`

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Urgent Action Fund: Asia & Pacific'
    : 'Urgent Action Fund: Asia & Pacific'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
