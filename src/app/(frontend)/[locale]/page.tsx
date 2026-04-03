import type { Metadata } from 'next/types'
import React from 'react'
import { notFound } from 'next/navigation'
import { Homepage } from '@/globals/Homepage/Component'

import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { isValidLocale } from '@/utilities/localeUtils'

// ISR Configuration
export const revalidate = 60
export const dynamic = 'force-static'
export const dynamicParams = true

type Args = {
  params: Promise<{
    locale: string
  }>
}

export default async function LocaleHomePage({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise

  if (!isValidLocale(locale)) {
    notFound()
  }

  return <Homepage locale={locale} />
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale } = await paramsPromise

  if (!isValidLocale(locale)) {
    return {}
  }

  const homepage = await getCachedGlobal('homepage', 1, locale)()

  return generateMeta({ doc: homepage })
}

export async function generateStaticParams() {
  return []
}
