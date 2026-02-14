import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateGrant = createRevalidateHook({
  collectionSlug: 'grants',
  basePath: '/grants',
  tagName: 'grants',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'grants',
  basePath: '/grants',
  tagName: 'grants',
})
