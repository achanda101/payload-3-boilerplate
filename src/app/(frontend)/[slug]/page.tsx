import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { UAFPage } from '../components/UAFPage/UAFPage'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug })

  if (!page) {
    notFound()
  }

  // Need to find out the document id using the collection name and slug value
  return (
    <>
      <UAFPage collection="pages" docId={page.id} isDraft={isDraftMode} />
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const page = await queryPageBySlug({ slug })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: isDraftMode } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft: isDraftMode,
    limit: 1,
    overrideAccess: isDraftMode,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
