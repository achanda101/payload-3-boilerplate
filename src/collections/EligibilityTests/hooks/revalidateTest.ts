import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Etest } from '../../../payload-types'

export const revalidateTest: CollectionAfterChangeHook<Etest> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/etests/${doc.slug}`

    payload.logger.info(`Revalidating Test at path: ${path}`)

    revalidatePath(path)
  }

  // If the Eligibility Test was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/etests/${previousDoc.slug}`

    payload.logger.info(`Revalidating old Eligibility Test at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
