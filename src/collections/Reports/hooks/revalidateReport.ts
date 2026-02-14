import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateReport = createRevalidateHook({
  collectionSlug: 'reports',
  basePath: '/reports',
  tagName: 'reports',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'reports',
  basePath: '/reports',
  tagName: 'reports',
})
