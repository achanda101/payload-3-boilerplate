import { CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
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

export const generatePreviewPath = ({ collection, slug, locale }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

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
