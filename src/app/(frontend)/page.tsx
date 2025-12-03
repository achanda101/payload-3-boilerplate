import type { Metadata } from 'next/types'
import React from 'react'
import { HomeHero } from './components/HomeHero/HomeHero'
import { PageContent } from './components/PageContent/PageContent'
import { ColumnIndicators } from './components/ColumnIndicators'

export const dynamic = 'force-static'
export const revalidate = 60

export default function Page() {
  return (
    <>
      {/* <div className="w-full px-[1.25rem] pt-[1.25rem] lg:px-[5rem] lg:pt-[2.5rem]">
        {process.env.NODE_ENV === 'development' && (
          <div className="page_column_layout gap-6">
            <ColumnIndicators />
          </div>
          )}
      </div> */}

      <HomeHero />

      <div className="w-full px-[1.25rem] pt-[1.25rem] lg:px-[5rem] lg:pt-[2.5rem]">
        {process.env.NODE_ENV === 'development' && (
          <div className="page_column_layout gap-6">
            <ColumnIndicators />
          </div>
        )}

        <main className="flex flex-col gap-[2.5rem] md:gap-[5rem]">
          <PageContent />
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
