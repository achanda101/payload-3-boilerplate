import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidateMMedia = createRevalidateHook({
  collectionSlug: 'mmedia',
  basePath: '/mmedia',
  tagName: 'mmedia',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'mmedia',
  basePath: '/mmedia',
  tagName: 'mmedia',
})
