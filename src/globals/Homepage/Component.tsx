import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HomeHero } from '@/app/(frontend)/components/HomeHero/HomeHero'
import { PageContent } from '@/app/(frontend)/components/HomePageContent/PageContent'

type HomepageProps = {
  locale?: string
}

export async function Homepage({ locale = 'en' }: HomepageProps) {
  const homepage = await getCachedGlobal('homepage', 3, locale)()

  return (
    <>
      <HomeHero data={homepage} initialLocale={locale} />
      <PageContent data={homepage} initialLocale={locale} />
    </>
  )
}
