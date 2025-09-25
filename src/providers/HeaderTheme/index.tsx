'use client'

// HeaderTheme stores the colour name chosen for the header banner image

import React, { createContext, useCallback, useContext, useState } from 'react'

export interface ContextType {
  headerTheme?: string | null
  setHeaderTheme: (theme: string | null) => void
}

const initialContext: ContextType = {
  headerTheme: 'trans',
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<string | null>('trans')

  const setHeaderTheme = useCallback((themeToSet: string | null) => {
    setThemeState(themeToSet)
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext)
