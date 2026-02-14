import React, { cache } from 'react'
import { GrantCardComponent } from '../../../components/GrantCardComponent/GrantCardComponent'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { isValidLocale } from '@/utilities/localeUtils'

type Args = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function LocaleGrantCardPage({ params: paramsPromise }: Args) {
  const { locale, slug } = await paramsPromise

  if (!isValidLocale(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const card = await queryCardBySlug({ slug })

  if (!card) {
    notFound()
  }

  return <GrantCardComponent collection="grantcards" docId={card.id} isDraft={isDraftMode} locale={locale} initialData={card} />
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
    depth: 3,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
