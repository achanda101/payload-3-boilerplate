import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { GrantCardComponent } from '../../components/GrantCardComponent/GrantCardComponent'

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
  const { isEnabled: isDraftMode } = await draftMode()
  const card = await queryCardBySlug({ slug })

  if (!card) {
    return <div>Grant Card not found</div>
  }

  // Need to find out the document id using the collection name and slug value
  return (
    <>
      <GrantCardComponent collection="grantcards" docId={card.id} isDraft={isDraftMode} />
    </>
  )
}

const queryCardBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'grantcards',
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
