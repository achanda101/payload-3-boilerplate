import { HeaderClient } from './Component.client'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'

interface HeaderProps {
  locale?: string
}

export async function Header({ locale = 'en' }: HeaderProps) {
  const [headerData, navData, footerData] = await Promise.all([
    getCachedGlobal('header', 1, locale)(),
    getCachedGlobal('nav', 1, locale)(),
    getCachedGlobal('footer', 1, locale)(),
  ])

  return (
    <HeaderClient
      initialHeaderData={headerData as any}
      initialNavData={navData as any}
      initialDonateData={{
        url: (footerData as any)?.donateCTA?.url || '',
        buttonText: (footerData as any)?.donateCTA?.buttonText || 'Donate',
      }}
      initialLocale={locale}
    />
  )
}
