import type { Metadata } from 'next'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { Header } from '@/globals/Header/Component'
import { ColumnIndicators } from './components/ColumnIndicators'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '@/styles/globals.scss';
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* <LivePreviewListener /> */}
          <div>
            <Header />
            
            <div className="w-full px-[1.25rem] pt-[1.25rem] lg:px-[5rem] lg:pt-[2.5rem]">
            {process.env.NODE_ENV === 'development' && (
              <div className="page_column_layout gap-6">
                <ColumnIndicators />
              </div>
            )}
            
            <main className="flex flex-col gap-[2.5rem] md:gap-[5rem]">
                {children}
            </main>
          
            {process.env.NODE_ENV === 'development' && (
              <div className="page_column_layout gap-6">
                <ColumnIndicators />
              </div>
            )}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@uaf_asiapacific',
  },
}
