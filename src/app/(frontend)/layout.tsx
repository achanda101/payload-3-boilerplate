import type { Metadata } from 'next'
import React from 'react'
import localFont from 'next/font/local'
import dynamic from 'next/dynamic'

import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import '@/styles/globals.scss'
import { getServerSideURL } from '@/utilities/getURL'

// Dynamically load AdminBar only when in draft mode (not needed for production pages)
const AdminBar = dynamic(() => import('@/components/AdminBar').then(mod => mod.AdminBar))

// Load fonts with next/font for optimal SSG performance and to prevent CLS
const schibstedGrotesk = localFont({
  src: [
    {
      path: '../../../public/fonts/SchibstedGrotesk-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SchibstedGrotesk-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/SchibstedGrotesk-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-schibsted',
  preload: true,
})

const roslindale = localFont({
  src: '../../../public/fonts/Roslindale-DisplayNarrowSemiBold-Testing.woff2',
  weight: '600',
  style: 'normal',
  display: 'swap',
  variable: '--font-roslindale',
  preload: true,
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${schibstedGrotesk.variable} ${roslindale.variable}`}
    >
      <head>
        {/* <InitTheme /> */}
        <link href="/uafanp-icon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {isEnabled && (
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
          )}

          {children}
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
