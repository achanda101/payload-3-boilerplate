import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { GrantPage } from '../../components/GrantPage/GrantPage'

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

  // Need to find out the document id using the collection name and slug value
  return (
    <>
      <GrantPage
        collection='grants'
        docId={page.id}
      /> 
    </>
  )
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'grants',
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
