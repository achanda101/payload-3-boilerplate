import React from 'react'
import { Header } from '@/globals/Header/Component'
import { Footer } from '@/globals/Footer/Component'
import { ScrollToAnchor } from '@/components/ScrollToAnchor'
import { isValidLocale } from '@/utilities/localeUtils'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const validLocale = isValidLocale(locale) ? locale : 'en'

  return (
    <div>
      <ScrollToAnchor />
      <Header locale={validLocale} />
      <main>{children}</main>
      <Footer locale={validLocale} />
    </div>
  )
}
