import { FooterClient } from './Component.client'
import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'

interface FooterProps {
  locale?: string
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const [footerData, navData, contactData] = await Promise.all([
    getCachedGlobal('footer', 1, locale)(),
    getCachedGlobal('nav', 1, locale)(),
    getCachedGlobal('contactInfo', 1, locale)(),
  ])

  return (
    <FooterClient
      initialFooterData={footerData as any}
      initialNavData={navData as any}
      initialContactData={contactData as any}
      initialLocale={locale}
    />
  )
}
