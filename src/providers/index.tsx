import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LanguageProvider } from './LanguageContext'

export const Providers: React.FC<{
  children: React.ReactNode
  locale?: string
}> = ({ children, locale = 'en' }) => {
  return (
    <ThemeProvider>
      <LanguageProvider locale={locale}>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
