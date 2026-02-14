import { CollectionSlug } from 'payload'
import { getLocalizedUrl } from './localeUtils'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  grants: '/grants',
  grantcards: '/grantcards',
  etests: '/etests',
  pages: '',
  blog: '/blog',
  reports: '/reports',
  mmedia: '/mmedia',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  locale?: string
}

export const generatePreviewPath = ({ collection, slug, locale = 'en' }: Props) => {
  // Build base path without locale
  const basePath = `${collectionPrefixMap[collection]}/${slug}`

  // Add locale prefix using getLocalizedUrl
  const path = getLocalizedUrl(basePath, locale)

  const params = {
    slug,
    collection,
    path,
    ...(locale && { locale }),
  }

  const encodedParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    encodedParams.append(key, value)
  })

  return `/next/preview?${encodedParams.toString()}`
}
