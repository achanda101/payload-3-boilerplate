import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HomeHero } from '@/app/(frontend)/components/HomeHero/HomeHero'
import { PageContent } from '@/app/(frontend)/components/HomePageContent/PageContent'

type HomepageProps = {
  locale?: string
}

export async function Homepage({ locale = 'en' }: HomepageProps) {
  const payload = await getPayload({ config: configPromise })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    locale: locale as any,
    depth: 3,
  })

  return (
    <>
      <HomeHero data={homepage} initialLocale={locale} />
      <PageContent data={homepage} initialLocale={locale} />
    </>
  )
}
