import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateBlog = createRevalidateHook({
  collectionSlug: 'blog',
  basePath: '/blog',
  tagName: 'blog',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'blog',
  basePath: '/blog',
  tagName: 'blog',
})
