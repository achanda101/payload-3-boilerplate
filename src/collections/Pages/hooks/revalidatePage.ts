import { createRevalidateHook, createRevalidateDeleteHook } from '@/utilities/revalidateCollection'

export const revalidatePage = createRevalidateHook({
  collectionSlug: 'pages',
  basePath: '',
  tagName: 'pages',
})

export const revalidateDelete = createRevalidateDeleteHook({
  collectionSlug: 'pages',
  basePath: '',
  tagName: 'pages',
})
