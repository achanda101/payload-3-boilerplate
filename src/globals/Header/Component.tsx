import { HeaderClient } from './Component.client'
import React from 'react'
import { getGlobal } from '@/utilities/getGlobals'

interface HeaderProps {
  locale?: string
}

export async function Header({ locale = 'en' }: HeaderProps) {
  const headerData = await getGlobal('header', 1, locale)
  const navData = await getGlobal('nav', 1, locale)
  const footerData = await getGlobal('footer', 1, locale)

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
