import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { UAFPage } from '../../components/UAFPage/UAFPage'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const page = await queryPageBySlug({ slug })

  if (!page) {
    return <div>Page not found</div>
  }

  // Need to find out the document id using the collection name and slug value
  return (
    <>
      <UAFPage
        collection='pages'
        docId={page.id}
      />
    </>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
