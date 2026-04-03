import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { BlogPage } from '../../../components/BlogPage/BlogPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { isValidLocale } from '@/utilities/localeUtils'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

type Args = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export default async function LocaleBlogPage({ params: paramsPromise }: Args) {
  const { locale, slug } = await paramsPromise

  if (!isValidLocale(locale)) {
    notFound()
  }

  const { isEnabled: isDraftMode } = await draftMode()
  const page = await queryPageBySlug({ slug, locale })

  if (!page) {
    notFound()
  }

  return (
    <BlogPage
      collection='blog'
      docId={page.id}
      isDraft={isDraftMode}
      locale={locale}
      initialData={page}
    />
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug } = await paramsPromise

  if (!isValidLocale(locale)) {
    return {}
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blog',
    draft,
    depth: 3,  // Increase depth to match client-side fetching
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale as any,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

export async function generateStaticParams() {
  return []
}
