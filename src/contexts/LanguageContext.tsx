'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Cookie utilities
const LANGUAGE_COOKIE_NAME = 'preferred-language'

const setCookie = (name: string, value: string, days: number = 365) => {
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`
    
    document.cookie = cookieString
    
    // Test if cookie was actually set
    const wasSet = getCookie(name) === value
    console.log('Cookie set attempt:', { name, value, wasSet, cookieString })
    
    return wasSet
  } catch (error) {
    console.warn('Cookie storage not available:', error)
    return false
  }
}

const getCookie = (name: string): string | null => {
  try {
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1]
    
    return value ? decodeURIComponent(value) : null
  } catch (error) {
    console.warn('Error reading cookie:', error)
    return null
  }
}

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
  defaultLanguages?: string[]
  defaultLanguage?: string
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  defaultLanguages = ['en'],
  defaultLanguage = 'en'
}) => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(defaultLanguages)
  const [selectedLanguage, setSelectedLanguageState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = getCookie(LANGUAGE_COOKIE_NAME)
      console.log('Initializing language:', { savedLanguage, defaultLanguages, defaultLanguage })
      // Trust the saved language initially, validation happens when server languages are loaded
      return savedLanguage || defaultLanguage
    }
    return defaultLanguage
  })

  const setSelectedLanguage = (language: string) => {
    setSelectedLanguageState(language)
    
    // Try to save to cookie, but don't fail if cookies are disabled
    if (typeof window !== 'undefined') {
      setCookie(LANGUAGE_COOKIE_NAME, language)
    }
  }

  // Update selected language if it's not in the new available languages
  useEffect(() => {
    if (availableLanguages.length > 1 && !availableLanguages.includes(selectedLanguage)) {
      // Only reset if we have actual languages from the server and current language is not available
      console.log('Language not available, switching from', selectedLanguage, 'to', availableLanguages[0])
      const newLanguage = availableLanguages[0] || defaultLanguage
      setSelectedLanguage(newLanguage)
    }
  }, [availableLanguages, selectedLanguage, defaultLanguage])

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