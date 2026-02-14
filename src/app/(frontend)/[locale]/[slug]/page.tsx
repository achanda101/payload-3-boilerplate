import type { Metadata } from 'next/types'
import React, { cache } from 'react'
import { UAFPage } from '../../components/UAFPage/UAFPage'
import { notFound } from 'next/navigation'

import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { isValidLocale, VALID_LOCALES } from '@/utilities/localeUtils'

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

export default async function LocalePagePage({ params: paramsPromise }: Args) {
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
    <UAFPage
      collection='pages'
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
    collection: 'pages',
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
  // Skip static generation in development to avoid Payload initialization loops
  if (process.env.NODE_ENV === 'development') {
    return []
  }

  const payload = await getPayload({ config: configPromise })
  const params: Array<{ locale: string; slug: string }> = []

  for (const locale of VALID_LOCALES) {
    try {
      const pages = await payload.find({
        collection: 'pages',
        limit: 1000,
        locale: locale as any,
        where: {
          _status: {
            equals: 'published',
          },
        },
      })

      for (const page of pages.docs) {
        if (page.slug && page.slug !== 'home') {
          params.push({
            locale,
            slug: page.slug,
          })
        }
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error)
    }
  }

  return params
}
