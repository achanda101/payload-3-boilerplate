import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Mmedia } from '../../../payload-types'

export const revalidateMMedia: CollectionAfterChangeHook<Mmedia> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/mmedia/${doc.slug}`

    payload.logger.info(`Revalidating MMedia at path: ${path}`)

    revalidatePath(path)
  }

  // If the MultiMediapost was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/mmedia/${previousDoc.slug}`

    payload.logger.info(`Revalidating old MultiMedia at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
