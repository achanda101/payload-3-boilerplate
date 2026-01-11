import type { Metadata } from 'next/types'
import React from 'react'
import { HomeHero } from './components/HomeHero/HomeHero'
import { PageContent } from './components/HomePageContent/PageContent'
import { ColumnIndicators } from './components/ColumnIndicators'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export default async function Page() {
  const { isEnabled: isDraftMode } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const homepage = await payload.findGlobal({
    slug: 'homepage',
    draft: isDraftMode,
    depth: 2,
  })

  return (
    <>
      {/* <div className="w-full px-[1.25rem] pt-[1.25rem] lg:px-[5rem] lg:pt-[2.5rem]">
        {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
          <div className="page_column_layout gap-6">
            <ColumnIndicators />
          </div>
          )}
      </div> */}

      <HomeHero data={homepage} isDraft={isDraftMode} />

      <div className="w-full px-[1.25rem] pt-[1.25rem] lg:px-[5rem] lg:pt-[2.5rem]">
        {process.env.NEXT_PUBLIC_SHOW_COLUMN_INDICATORS === 'true' && (
          <div className="page_column_layout gap-6">
            <ColumnIndicators />
          </div>
        )}

        <main className="flex flex-col gap-[2.5rem] md:gap-[5rem]">
          <PageContent data={homepage} isDraft={isDraftMode} />
        </main>
      </div>
    </>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Urgent Action Fund: Asia & Pacific`,
    description:
      'We are a feminist fund that boldly resources and powers women, trans, and non-binary human rights defenders in their critical defence of people and planet.',
  }
}
