import { FooterClient } from './Component.client'
import React from 'react'
import { getGlobal } from '@/utilities/getGlobals'

interface FooterProps {
  locale?: string
}

export async function Footer({ locale = 'en' }: FooterProps) {
  const footerData = await getGlobal('footer', 1, locale)
  const navData = await getGlobal('nav', 1, locale)
  const contactData = await getGlobal('contactInfo', 1, locale)

  return (
    <FooterClient
      initialFooterData={footerData as any}
      initialNavData={navData as any}
      initialContactData={contactData as any}
      initialLocale={locale}
    />
  )
}
