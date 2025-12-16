import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Report } from '../../../payload-types'

export const revalidateReport: CollectionAfterChangeHook<Report> = ({
  doc,
  previousDoc,
  req: { payload },
}) => {
  if (doc._status === 'published') {
    const path = `/reports/${doc.slug}`

    payload.logger.info(`Revalidating Report at path: ${path}`)

    revalidatePath(path)
  }

  // If the Reportpost was previously published, we need to revalidate the old path
  if (previousDoc._status === 'published' && doc._status !== 'published') {
    const oldPath = `/reports/${previousDoc.slug}`

    payload.logger.info(`Revalidating old Report at path: ${oldPath}`)

    revalidatePath(oldPath)
  }

  return doc
}
