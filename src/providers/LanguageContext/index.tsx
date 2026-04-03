'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { getLocaleFromUrl } from '@/utilities/localeUtils'

interface LanguageContextType {
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
  availableLanguages: string[]
  setAvailableLanguages: (languages: string[]) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
  locale?: string
  defaultLanguages?: string[]
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  locale,
  defaultLanguages = ['en'],
}) => {
  const pathname = usePathname()
  const urlLocale = getLocaleFromUrl(pathname) ?? 'en'
  const initialLocale = locale || urlLocale

  const [availableLanguages, setAvailableLanguages] = useState<string[]>(defaultLanguages)
  const [selectedLanguage, setSelectedLanguageState] = useState<string>(initialLocale)

  // Sync selectedLanguage with URL changes (e.g., navigating between locale routes)
  useEffect(() => {
    const detectedLocale = getLocaleFromUrl(pathname) ?? 'en'
    setSelectedLanguageState((prev) => (detectedLocale !== prev ? detectedLocale : prev))
  }, [pathname])

  const setSelectedLanguage = (language: string) => {
    setSelectedLanguageState(language)
  }

  return (
    <LanguageContext.Provider value={{
      selectedLanguage,
      setSelectedLanguage,
      availableLanguages,
      setAvailableLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  )
}
