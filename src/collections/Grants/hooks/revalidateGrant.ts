import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Grant } from '../../../payload-types'

export const revalidateGrant: CollectionAfterChangeHook<Grant> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/grants/${doc.slug}`

    payload.logger.info(`Revalidating grant at path: ${path}`)

    revalidatePath(path)
  }

  // If the post was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/grants/${previousDoc.slug}`

    payload.logger.info(`Revalidating old grant at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
